// ============================================
// TripLite · 天气服务模块
// 和风天气 API v7（免费版）
// 策略：有网 → 实时预报；无网 → 本地缓存；缓存过期 → 气候参考
// ES5兼容版：无 async/await / const / 箭头函数 / 模板字面量
// ============================================

var WEATHER_SERVICE = (function() {

  // ── 配置 ──
  var API_KEY   = 'c5ef7c8f45fa419bb1dbfe87c83f6058';
  var BASE_URL  = 'https://devapi.qweather.com/v7';
  var CACHE_KEY = 'triplite_weather_cache';
  var CACHE_TTL = 3 * 60 * 60 * 1000; // 3小时刷新一次

  // ── 行程城市坐标 ──
  var CITIES = {
    macau:   { name: '澳门',   id: '101110900', lat: 22.1987, lon: 113.5439 },
    pattaya: { name: '芭提雅', id: '7509128',   lat: 12.9236, lon: 100.8825 },
    bangkok: { name: '曼谷',   id: '101290101', lat: 13.7563, lon: 100.5018 }
  };

  // ── 行程日期与城市映射 ──
  var TRIP_DAYS = [
    { date: '2026-04-26', cityKey: 'macau',   label: '澳门',         emoji: '🎰' },
    { date: '2026-04-27', cityKey: 'pattaya', label: '芭提雅',       emoji: '🏖️' },
    { date: '2026-04-28', cityKey: 'pattaya', label: '芭提雅·格兰岛', emoji: '🏝️' },
    { date: '2026-04-29', cityKey: 'bangkok', label: '芭提雅→曼谷',  emoji: '🏙️' },
    { date: '2026-04-30', cityKey: 'bangkok', label: '曼谷·老城区',  emoji: '🏛️' },
    { date: '2026-05-01', cityKey: 'bangkok', label: '曼谷·购物日',  emoji: '🛍️' },
    { date: '2026-05-02', cityKey: 'bangkok', label: '曼谷·收尾日',  emoji: '🏠' },
    { date: '2026-05-03', cityKey: 'bangkok', label: '返程',         emoji: '✈️' }
  ];

  // ── 和风天气图标 → emoji 映射 ──
  var ICON_MAP = {
    '100':'☀️','101':'🌤️','102':'🌤️','103':'⛅','104':'☁️',
    '150':'🌙','151':'🌙','152':'🌙','153':'🌙',
    '200':'🌬️','201':'🌬️','202':'💨','203':'💨','204':'💨',
    '205':'💨','206':'💨','207':'💨','208':'💨','209':'💨','210':'💨',
    '211':'💨','212':'💨','213':'💨',
    '300':'🌦️','301':'🌦️','302':'⛈️','303':'⛈️','304':'⛈️',
    '305':'🌧️','306':'🌧️','307':'🌧️','308':'🌧️','309':'🌧️',
    '310':'🌧️','311':'🌧️','312':'🌧️','313':'🌧️','314':'🌧️',
    '315':'🌧️','316':'🌧️','317':'🌧️','318':'🌧️','399':'🌧️',
    '400':'🌨️','401':'🌨️','402':'❄️','403':'❄️','404':'🌨️',
    '405':'🌨️','406':'🌨️','407':'🌨️','408':'🌨️','409':'🌨️',
    '410':'🌨️','499':'🌨️',
    '500':'🌫️','501':'🌫️','502':'🌫️','503':'🌫️','504':'🌫️',
    '507':'🌫️','508':'🌫️','509':'🌫️','510':'🌫️','511':'🌫️',
    '512':'🌫️','513':'🌫️','514':'🌫️','515':'🌫️'
  };

  function iconToEmoji(code) {
    return ICON_MAP[String(code)] || '🌡️';
  }

  // ── UV 等级文字 ──
  function uvLabel(idx) {
    var n = parseInt(idx) || 0;
    if (n <= 2)  return '低';
    if (n <= 5)  return '中等';
    if (n <= 7)  return '较强';
    if (n <= 10) return '很强';
    return '极强';
  }

  // ── 风力等级 → 文字 ──
  function windDesc(scale, dir) {
    return (dir || '') + '风 ' + (scale || '') + '级';
  }

  // ── 综合风险评估 ──
  function assessRisk(day) {
    var uv   = parseInt(day.uvIndex) || 0;
    var temp = parseInt(day.tempHigh) || 0;
    var pop  = parseInt(day.rainChance) || 0;
    if (uv >= 10 || temp >= 37) return { level: 'danger', label: '⚠️ 高风险（防晒防暑）' };
    if (uv >= 7  || temp >= 34 || pop >= 50) return { level: 'medium', label: '中等风险' };
    return { level: 'low', label: '低风险' };
  }

  // ── 本地缓存读写 ──
  function saveCache(data) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        data: data
      }));
    } catch(e) {}
  }

  function loadCache() {
    try {
      var raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      var obj = JSON.parse(raw);
      if (Date.now() - obj.timestamp > CACHE_TTL) return { expired: true, data: obj.data };
      return { expired: false, data: obj.data };
    } catch(e) { return null; }
  }

  // ── API 可用性缓存（本次会话内只探测一次）──
  var _apiAvailable = null; // null=未探测, true=可用, false=不可用

  // ── 带超时的 fetch 封装（3秒超时，快速失败）──
  function fetchWithTimeout(url, timeoutMs) {
    timeoutMs = timeoutMs || 3000;
    if (typeof AbortController === 'undefined') {
      return fetch(url);
    }
    var controller = new AbortController();
    var timer = setTimeout(function() { controller.abort(); }, timeoutMs);
    return fetch(url, { signal: controller.signal })
      .then(function(res) { clearTimeout(timer); return res; })
      .catch(function(err) { clearTimeout(timer); throw err; });
  }

  // ── 探测API是否可用 ──
  function probeApiAvailable() {
    if (_apiAvailable !== null) return Promise.resolve(_apiAvailable);
    var city = CITIES.macau;
    var url = BASE_URL + '/weather/3d?location=' + city.lon + ',' + city.lat + '&key=' + API_KEY + '&lang=zh&unit=m';
    return fetchWithTimeout(url, 1500)
      .then(function(res) {
        _apiAvailable = res.ok;
        return _apiAvailable;
      })
      .catch(function() {
        _apiAvailable = false;
        return false;
      });
  }

  // ── 和风天气：获取某城市10天预报（返回Promise）──
  function fetchForecast(cityKey) {
    var city = CITIES[cityKey];
    if (!city) return Promise.resolve(null);
    var url = BASE_URL + '/weather/10d?location=' + city.lon + ',' + city.lat + '&key=' + API_KEY + '&lang=zh&unit=m';
    return fetchWithTimeout(url)
      .then(function(res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function(json) {
        if (json.code !== '200') throw new Error('API code ' + json.code);
        return json.daily;
      });
  }

  // ── 和风天气：获取某城市逐日UV指数（返回Promise）──
  function fetchUV(cityKey) {
    var city = CITIES[cityKey];
    if (!city) return Promise.resolve({});
    var url = BASE_URL + '/indices/3d?type=5&location=' + city.lon + ',' + city.lat + '&key=' + API_KEY + '&lang=zh';
    return fetchWithTimeout(url)
      .then(function(res) { return res.json(); })
      .then(function(json) {
        if (json.code !== '200') return {};
        var map = {};
        var daily = json.daily || [];
        for (var i = 0; i < daily.length; i++) {
          map[daily[i].date] = daily[i].level;
        }
        return map;
      })
      .catch(function() { return {}; });
  }

  // ── 自动生成提示 ──
  function buildTips(raw, uv, pop, tripDay) {
    var tips = [];
    var tmax = parseInt(raw.tempMax);

    if (uv >= 10) tips.push('🔴 紫外线极强，防晒霜出门前20分钟涂，每2小时补涂，格兰岛必备防水防晒');
    else if (uv >= 7) tips.push('🟠 紫外线很强，SPF50+防晒必须，帽子+墨镜不能省');
    else if (uv >= 4) tips.push('🟡 紫外线中等，户外活动建议涂防晒SPF30+');

    if (tmax >= 37) tips.push('🌡️ 极度高温，11:00–15:00避免户外活动，大皇宫参观必须07:30出发');
    else if (tmax >= 34) tips.push('🌡️ 高温天气，户外每小时补水500ml以上，随身携带矿泉水');

    if (pop >= 60) tips.push('☔ 降雨概率高，折叠伞/雨衣必带，Jodd Fairs等户外夜市留意天气');
    else if (pop >= 30) tips.push('🌦️ 午后可能有短暂阵雨（30–60分钟后放晴），备折叠伞');

    if (tripDay && tripDay.cityKey === 'pattaya' && tripDay.date === '2026-04-28') {
      tips.push('🏝️ 格兰岛出海日：出发前查AccuWeather确认海况，风力3级以上不建议出海');
    }
    if (tripDay && tripDay.date === '2026-04-30') {
      tips.push('🏛️ 大皇宫参观：着装合规（有袖+长裤/过膝裙），售票截止15:00');
    }
    if (tips.length === 0) tips.push('今天天气较舒适，正常出行即可');
    return tips;
  }

  function buildOutfit(raw, uv, tripDay) {
    var tmax = parseInt(raw.tempMax);
    if (tripDay && tripDay.date === '2026-04-30') {
      return '长袖或薄款有袖上衣（合大皇宫规定）+ 长裤/过膝裙，宽沿遮阳帽，UV墨镜，防晒喷雾';
    }
    if (tmax >= 34 && uv >= 8) return '防晒衣/长袖速干衫 + 宽松短裤，凉鞋，宽沿遮阳帽，UV墨镜';
    if (tmax >= 30) return '吸湿排汗短袖 + 宽松短裤，凉鞋，帽子';
    return '短袖T恤 + 轻便长裤或短裤，薄外套备用';
  }

  function buildMustDo(raw, uv, pop, tripDay) {
    var parts = [];
    if (uv >= 8)  parts.push('SPF50+防水防晒霜');
    else if (uv >= 4) parts.push('SPF30+防晒');
    if (parseInt(raw.tempMax) >= 34) parts.push('随身大瓶矿泉水');
    if (pop >= 30) parts.push('带折叠伞');
    if (tripDay && tripDay.date === '2026-04-28') parts.push('查海况再出发');
    if (tripDay && tripDay.date === '2026-04-30') parts.push('07:30前出发去大皇宫');
    if (tripDay && tripDay.date === '2026-05-02') parts.push('22:00机场出发不可动摇');
    return parts.length ? parts.join('，') : '正常出行，注意补水';
  }

  // ── 将和风原始数据转为 TripLite 标准格式 ──
  function normalizeDay(raw, tripDay, uvMap) {
    var uvRaw = (uvMap && uvMap[raw.fxDate]) || '5';
    var uvNum = parseInt(uvRaw) || 5;
    var pop   = parseInt(raw.precipProbability || raw.pop || '20');
    var risk  = assessRisk({ uvIndex: uvNum, tempHigh: raw.tempMax, rainChance: pop });

    return {
      date:        tripDay ? raw.fxDate.slice(5).replace('-', '/') : raw.fxDate.slice(5).replace('-', '/'),
      fullDate:    raw.fxDate,
      city:        tripDay ? tripDay.label : '',
      cityCode:    tripDay ? tripDay.cityKey : '',
      emoji:       tripDay ? tripDay.emoji : '📅',
      weather:     raw.textDay,
      weatherIcon: iconToEmoji(raw.iconDay),
      tempHigh:    parseInt(raw.tempMax),
      tempLow:     parseInt(raw.tempMin),
      humidity:    parseInt(raw.humidity),
      uvIndex:     uvNum,
      uvLabel:     uvLabel(uvNum),
      rainChance:  pop,
      wind:        windDesc(raw.windScaleDay, raw.windDirDay),
      feelsLike:   '白天' + raw.tempMax + '°，体感约' + (parseInt(raw.tempMax) + 2) + '°，湿度' + raw.humidity + '%',
      riskLevel:   risk.level,
      riskLabel:   risk.label,
      tips:        buildTips(raw, uvNum, pop, tripDay),
      outfit:      buildOutfit(raw, uvNum, tripDay),
      mustDo:      buildMustDo(raw, uvNum, pop, tripDay),
      source:      'api'
    };
  }

  // ── 主函数：拉取全程天气并缓存（返回Promise）──
  function fetchAllTripWeather() {
    return Promise.all([
      fetchForecast('macau'),
      fetchForecast('pattaya'),
      fetchForecast('bangkok'),
      fetchUV('macau'),
      fetchUV('pattaya'),
      fetchUV('bangkok')
    ]).then(function(results) {
      var macauData   = results[0];
      var pattayaData = results[1];
      var bangkokData = results[2];
      var uvMacau     = results[3];
      var uvPattaya   = results[4];
      var uvBangkok   = results[5];

      // 建立日期→预报的快速查找表
      var forecastMap = {};
      var i;
      if (macauData) {
        for (i = 0; i < macauData.length; i++) {
          forecastMap['macau_' + macauData[i].fxDate] = macauData[i];
        }
      }
      if (pattayaData) {
        for (i = 0; i < pattayaData.length; i++) {
          forecastMap['pattaya_' + pattayaData[i].fxDate] = pattayaData[i];
        }
      }
      if (bangkokData) {
        for (i = 0; i < bangkokData.length; i++) {
          forecastMap['bangkok_' + bangkokData[i].fxDate] = bangkokData[i];
        }
      }

      var uvMap = {
        macau:   uvMacau   || {},
        pattaya: uvPattaya || {},
        bangkok: uvBangkok || {}
      };

      // 组装8天数据
      var days = [];
      for (var di = 0; di < TRIP_DAYS.length; di++) {
        var tripDay = TRIP_DAYS[di];
        var cityKey = tripDay.cityKey;
        var raw = forecastMap[cityKey + '_' + tripDay.date];

        if (!raw) {
          // 该日期超出预报范围，用气候参考数据补
          var ref = null;
          if (typeof WEATHER_DATA !== 'undefined' && WEATHER_DATA && WEATHER_DATA.days) {
            var shortDate = tripDay.date.slice(5).replace('-', '/');
            for (var ri = 0; ri < WEATHER_DATA.days.length; ri++) {
              if (WEATHER_DATA.days[ri].date === shortDate) { ref = WEATHER_DATA.days[ri]; break; }
            }
          }
          if (!ref) continue;
          // 兼容旧版浏览器：不用对象展开，用 Object.assign 或手动拷贝
          var merged = {};
          if (typeof Object.assign === 'function') {
            merged = Object.assign({}, ref, { source: 'climate', fullDate: tripDay.date });
          } else {
            for (var k in ref) {
              if (Object.prototype.hasOwnProperty.call(ref, k)) merged[k] = ref[k];
            }
            merged.source   = 'climate';
            merged.fullDate = tripDay.date;
          }
          days.push(merged);
        } else {
          days.push(normalizeDay(raw, tripDay, uvMap[cityKey]));
        }
      }

      return days;
    });
  }

  // ── 对外接口 ──

  // 获取天气数据（返回Promise，优先缓存，自动判断是否需要刷新）
  function getWeather(forceRefresh) {
    if (forceRefresh === undefined) forceRefresh = false;

    if (!forceRefresh) {
      var cached = loadCache();
      if (cached && !cached.expired) {
        return Promise.resolve({ days: cached.data, source: 'cache', fresh: true });
      }
      if (cached && cached.expired) {
        // 有过期缓存，先返回，后台刷新
        refreshInBackground();
        return Promise.resolve({ days: cached.data, source: 'cache', fresh: false });
      }
    }

    // 先快速探测API是否可用，不可用立即降级
    return probeApiAvailable().then(function(apiOk) {
      if (!apiOk) {
        if (typeof console !== 'undefined') console.warn('[Weather] API probe failed, using climate fallback');
        if (typeof WEATHER_DATA !== 'undefined' && WEATHER_DATA && WEATHER_DATA.days) {
          return { days: WEATHER_DATA.days, source: 'climate', fresh: false };
        }
        return { days: [], source: 'error', fresh: false };
      }

      // 无缓存或强制刷新，联网获取
      return fetchAllTripWeather()
        .then(function(days) {
          saveCache(days);
          return { days: days, source: 'api', fresh: true };
        })
        .catch(function(e) {
          if (typeof console !== 'undefined') console.warn('[Weather] API failed:', e);
          if (typeof WEATHER_DATA !== 'undefined' && WEATHER_DATA && WEATHER_DATA.days) {
            return { days: WEATHER_DATA.days, source: 'climate', fresh: false };
          }
          return { days: [], source: 'error', fresh: false };
        });
    });
  }

  function refreshInBackground() {
    fetchAllTripWeather()
      .then(function(days) { saveCache(days); })
      .catch(function() {});
  }

  // 获取单天天气（给首页卡用，返回Promise）
  function getDayWeather(dayIndex) {
    return getWeather().then(function(result) {
      return result.days[dayIndex] || null;
    });
  }

  // 判断今天是否在行程内
  function getTripDayIndex() {
    var today = new Date().toISOString().slice(0, 10);
    for (var i = 0; i < TRIP_DAYS.length; i++) {
      if (TRIP_DAYS[i].date === today) return i;
    }
    return -1;
  }

  // 距出发天数
  function daysUntilTrip() {
    var start = new Date('2026-04-26');
    var now   = new Date();
    now.setHours(0, 0, 0, 0);
    return Math.ceil((start - now) / 86400000);
  }

  // 预报可用性说明
  function forecastAvailability() {
    var days = daysUntilTrip();
    if (days <= 0)  return { available: true,  msg: '行程进行中，显示实时预报' };
    if (days <= 7)  return { available: true,  msg: '出发还有' + days + '天，7天预报已覆盖全程' };
    if (days <= 10) return { available: true,  msg: '出发还有' + days + '天，10天预报已覆盖部分行程' };
    return {
      available: false,
      msg: '出发还有' + days + '天，预报尚未覆盖（约' + (days - 10) + '天后可看真实预报）。现在显示气候参考数据。'
    };
  }

  return {
    getWeather: getWeather,
    getDayWeather: getDayWeather,
    getTripDayIndex: getTripDayIndex,
    daysUntilTrip: daysUntilTrip,
    forecastAvailability: forecastAvailability,
    TRIP_DAYS: TRIP_DAYS
  };

})();
