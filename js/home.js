// ============================================
// 首页逻辑 v1.20 · 总控台模式
// 兼容 ES5+，不使用 const/let/arrow/template literal
// ============================================

// ── 行程关键数据（酒店/航班），供总控台展示 ──
var TRIP_KEY_INFO = {
  departDate:   '2026-04-26',
  returnDate:   '2026-05-03',
  returnFlight: '5/3 凌晨02:50 · 素万那普→上海',
  returnFlightNo: 'CZ8396',          // 回程航班号（占位，改为实际票号）
  hotels: [
    { phase: 'macau',    dates: '4/26',      name: '艺居酒店（氹仔）',     addr: 'Art Residence Hotel, Taipa, Macau',      mapUrl: 'https://maps.google.com/?q=22.1530,113.5780' },
    { phase: 'pattaya',  dates: '4/27–4/28', name: '芭提雅中央区酒店',     addr: 'Central Pattaya / Centara Avenue Hotel',  mapUrl: 'https://maps.google.com/?q=12.9366,100.8830' },
    { phase: 'bangkok',  dates: '4/29–5/1',  name: '曼谷 Asok 区酒店',    addr: 'Sukhumvit / Asok, Bangkok',              mapUrl: 'https://maps.google.com/?q=13.7373,100.5600' }
  ],
  // 每日预算基准（泰铢+人民币）
  dailyBudget: {
    macau:   { label: '澳门',   base: 200,  unit: 'MOP', cny: 176  },
    pattaya: { label: '芭提雅', base: 800,  unit: 'THB', cny: 168  },
    bangkok: { label: '曼谷',   base: 600,  unit: 'THB', cny: 126  }
  }
};

// ── 判断当前旅行阶段 ──
function getTripPhase(dayIdx) {
  var day = TRIP_DATA.days[dayIdx];
  var cc  = day ? day.cityCode : '';
  if (cc === 'macau')   return { label: '🎰 澳门阶段',   color: '#0369a1', bg: '#dbeafe',  code: 'macau'    };
  if (cc === 'pattaya') return { label: '🏖️ 芭提雅',    color: '#059669', bg: '#d1fae5',  code: 'pattaya'  };
  if (cc === 'bangkok') return { label: '🏛️ 曼谷阶段',  color: '#7c3aed', bg: '#ede9fe',  code: 'bangkok'  };
  if (cc === 'return')  return { label: '✈️ 返程阶段',  color: '#b45309', bg: '#fef3c7',  code: 'return'   };
  return { label: '出发前', color: '#1d4ed8', bg: '#dbeafe', code: '' };
}

// ── 获取当前住宿信息 ──
function getCurrentHotel(dayIdx) {
  var cc = TRIP_DATA.days[dayIdx] ? TRIP_DATA.days[dayIdx].cityCode : '';
  for (var i = 0; i < TRIP_KEY_INFO.hotels.length; i++) {
    if (TRIP_KEY_INFO.hotels[i].phase === cc) return TRIP_KEY_INFO.hotels[i];
  }
  return null;
}

// ── 倒计时计算 ──
function getDaysToDepart() {
  var today = new Date(); today.setHours(0,0,0,0);
  var dep   = new Date(TRIP_KEY_INFO.departDate); dep.setHours(0,0,0,0);
  return Math.ceil((dep - today) / 86400000);
}

function getDaysToReturn() {
  var today = new Date(); today.setHours(0,0,0,0);
  var ret   = new Date(TRIP_KEY_INFO.returnDate); ret.setHours(0,0,0,0);
  return Math.ceil((ret - today) / 86400000);
}

// ── 读取预算记录（来自 localStorage，budget.html 写入）──
function getBudgetSummary(phaseCode) {
  try {
    var raw = localStorage.getItem('triplite_budget_' + phaseCode);
    if (raw) {
      var obj = JSON.parse(raw);
      return obj; // { spent: number, total: number, currency: 'THB'|'MOP' }
    }
  } catch(e) {}
  return null;
}

// ── 渲染"状态总控台"顶部Banner ──
function renderStatusBanner(dayIdx) {
  var daysToDepart = getDaysToDepart();
  var daysToReturn = getDaysToReturn();
  var phase        = getTripPhase(dayIdx);
  var tripStarted  = daysToDepart <= 0 && daysToReturn > 0;
  var tripEnded    = daysToReturn <= 0;

  var statusLabel, statusSub, mainNum, mainUnit, mainColor;

  if (tripEnded) {
    statusLabel = '🎉 旅途圆满完成！';
    statusSub   = '澳门·芭提雅·曼谷 · 美好回忆已封存';
    mainNum     = '✓';
    mainUnit    = '已返回';
    mainColor   = '#059669';
  } else if (tripStarted) {
    statusLabel = phase.label;
    statusSub   = '距离返回上海还有 ' + daysToReturn + ' 天';
    mainNum     = 'D' + (dayIdx + 1);
    mainUnit    = '/ 8天';
    mainColor   = phase.color;
  } else if (daysToDepart === 0) {
    statusLabel = '🚀 今天出发！';
    statusSub   = '4/26 · 上海→澳门→曼谷 · 出发前再查一遍清单';
    mainNum     = '今天';
    mainUnit    = '出发';
    mainColor   = '#dc2626';
  } else if (daysToDepart <= 3) {
    statusLabel = '⚡ 即将出发';
    statusSub   = '4月26日出发 · 现在检查清单和TDAC！';
    mainNum     = String(daysToDepart);
    mainUnit    = '天后';
    mainColor   = '#dc2626';
  } else if (daysToDepart <= 14) {
    statusLabel = '📅 出发倒计时';
    statusSub   = '出发：4月26日 · 去检查行前清单';
    mainNum     = String(daysToDepart);
    mainUnit    = '天后';
    mainColor   = '#d97706';
  } else {
    statusLabel = '✈️ 行程规划中';
    statusSub   = '出发：4月26日 · 返回：5月3日';
    mainNum     = String(daysToDepart);
    mainUnit    = '天后出发';
    mainColor   = '#0369a1';
  }

  // 4格状态（2行×2列）
  var today = new Date();
  var todayStr = (today.getMonth()+1) + '月' + today.getDate() + '日';

  var cell1 = makeStatCell('出发日期', '4月26日',  '#0369a1', '#dbeafe');
  var cell2 = makeStatCell('今天',      todayStr,   '#475569', '#f1f5f9');
  var cell3 = makeStatCell('当前阶段',  phase.label.replace(/^[\u{1F000}-\u{1FFFF}✈️🎰🏖️🏛️⚡📅🎉🚀]+\s*/u, '').replace(/^[\uD800-\uDBFF][\uDC00-\uDFFF]\s*/,''), phase.color, phase.bg);
  var cell4 = tripStarted
    ? makeStatCell('距返程', daysToReturn + '天', '#b45309', '#fef3c7')
    : makeStatCell('距出发', (daysToDepart > 0 ? daysToDepart : 0) + '天', mainColor, mainColor.replace('#','') === 'dc2626' ? '#fee2e2' : '#dbeafe');

  var row1 = '<div style="display:flex;gap:8px;margin-bottom:8px;">' + cell1 + cell2 + '</div>';
  var row2 = '<div style="display:flex;gap:8px;">'                   + cell3 + cell4 + '</div>';

  return '<div class="card fade-in" style="margin-bottom:12px;padding:0;overflow:hidden;">'
    + '<div style="background:linear-gradient(135deg,#1a3a5c,#0369a1);padding:14px 16px 12px;">'
    + '<div style="display:flex;align-items:center;justify-content:space-between;">'
    + '<div style="flex:1;min-width:0;">'
    + '<div style="font-size:10px;color:rgba(255,255,255,0.65);letter-spacing:1.5px;margin-bottom:4px;font-weight:600;">行程总控台</div>'
    + '<div style="font-size:17px;font-weight:800;color:white;line-height:1.3;">' + statusLabel + '</div>'
    + '<div style="font-size:11px;color:rgba(255,255,255,0.75);margin-top:3px;line-height:1.4;">' + statusSub + '</div>'
    + '</div>'
    + '<div style="text-align:right;margin-left:12px;flex-shrink:0;">'
    + '<div style="font-size:36px;font-weight:900;color:white;line-height:1;">' + mainNum + '</div>'
    + '<div style="font-size:11px;color:rgba(255,255,255,0.65);">' + mainUnit + '</div>'
    + '</div>'
    + '</div>'
    + '</div>'
    + '<div style="padding:12px;">' + row1 + row2 + '</div>'
    + '</div>';
}

function makeStatCell(label, value, color, bg) {
  return '<div style="flex:1;background:' + bg + ';border-radius:10px;padding:9px 10px;">'
    + '<div style="font-size:10px;color:' + color + ';font-weight:600;margin-bottom:3px;">' + label + '</div>'
    + '<div style="font-size:13px;font-weight:700;color:var(--text-primary);line-height:1.3;">' + value + '</div>'
    + '</div>';
}

// ── 今日Top3 必做事项 ──
function renderTop3Card(dayIdx) {
  var today = TRIP_DATA.days[dayIdx];
  var mustItems = [];
  for (var ti = 0; ti < today.times.length; ti++) {
    var t = today.times[ti];
    for (var ai = 0; ai < t.activities.length; ai++) {
      if (t.activities[ai].type === 'must') {
        mustItems.push({ label: t.label, act: t.activities[ai] });
      }
    }
  }
  mustItems = mustItems.slice(0, 3);

  var itemsHtml = '';
  for (var mi = 0; mi < mustItems.length; mi++) {
    var item = mustItems[mi];
    // 去掉 emoji，保留纯文字
    var nm = item.act.name.replace(/[\u{1F000}-\u{1FFFF}]/gu, '').replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,'').replace(/[✈️🛂🏨🍜🚤⛴🏖🌅🦞💃🏰👑🛕🌊💆🍽🧳🚗🏮📋⚓🎭🛍🔥🎯⚡🌿🏝🚢🎪🌺]/g,'').trim();
    var metaText = item.act.meta && item.act.meta[0] ? item.act.meta[0] : '';
    itemsHtml += '<div style="display:flex;align-items:flex-start;gap:10px;padding:9px 0;border-bottom:1px solid var(--border);">'
      + '<div style="min-width:26px;height:26px;border-radius:50%;background:' + (['#dbeafe','#d1fae5','#ede9fe'][mi] || '#f1f5f9') + ';display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:900;color:' + (['#1d4ed8','#059669','#7c3aed'][mi] || '#475569') + ';flex-shrink:0;">' + (mi+1) + '</div>'
      + '<div style="flex:1;min-width:0;">'
      + '<div style="font-size:13px;font-weight:700;color:var(--text-primary);line-height:1.4;">' + nm + '</div>'
      + (metaText ? '<div style="font-size:11px;color:var(--text-muted);margin-top:2px;">' + item.label + ' · ' + metaText + '</div>' : '<div style="font-size:11px;color:var(--text-muted);margin-top:2px;">' + item.label + '</div>')
      + '</div>'
      + '</div>';
  }
  if (!itemsHtml) {
    itemsHtml = '<div style="font-size:13px;color:var(--text-muted);padding:10px 0;text-align:center;">今天是轻松日，无强制安排 🎉</div>';
  }

  return '<div class="card fade-in" style="margin-bottom:12px;">'
    + '<div class="card-header" style="margin-bottom:0;">'
    + '<div class="card-title"><span class="icon">🎯</span>今日最重要的 ' + (mustItems.length || 0) + ' 件事</div>'
    + '<a href="trip.html?day=' + today.id + '" style="font-size:12px;color:var(--primary-light);font-weight:600;white-space:nowrap;">详情 →</a>'
    + '</div>'
    + '<div style="border-top:1px solid var(--border);margin-top:10px;">' + itemsHtml + '</div>'
    + '</div>';
}

// ── 关键信息速查（酒店+航班+TDAC+预算）──
function renderKeyInfoCard(dayIdx) {
  var today        = TRIP_DATA.days[dayIdx];
  var hotel        = getCurrentHotel(dayIdx);
  var phase        = getTripPhase(dayIdx);
  var daysToDepart = getDaysToDepart();
  var daysToReturn = getDaysToReturn();
  var tripStarted  = daysToDepart <= 0 && daysToReturn > 0;
  var tripEnded    = daysToReturn <= 0;

  var rows = '';

  // ① 出发前 —— 始终显示航班/酒店速查（提前知道）
  if (!tripStarted && !tripEnded) {
    // 首班酒店：澳门 4/26
    rows += makeInfoRow('🏨', '第一晚住宿（澳门）',
      TRIP_KEY_INFO.hotels[0].name,
      TRIP_KEY_INFO.hotels[0].addr + ' · 4月26日入住');
    // 回程航班始终可见
    rows += makeInfoRow('✈️', '回程航班（已购）',
      TRIP_KEY_INFO.returnFlight,
      '航班号：' + TRIP_KEY_INFO.returnFlightNo + ' · 5/2 晚 22:00 从曼谷 Asok 出发去机场');
    // 总预算速览
    rows += makeInfoRow('💰', '旅行总预算参考',
      '约 ¥3,500 – ¥5,000 / 人',
      '<a href="budget.html" style="color:#d97706;font-weight:700;">查看费用明细 →</a>');
  }

  // ② 今夜住宿（旅行中显示）
  if (tripStarted && hotel) {
    var mapLink = hotel.mapUrl
      ? ' <a href="' + hotel.mapUrl + '" target="_blank" style="color:#0369a1;font-size:11px;font-weight:700;">📍地图</a>'
      : '';
    rows += makeInfoRow('🏨', '今夜住宿', hotel.name + mapLink, hotel.addr + ' · ' + hotel.dates);
  }

  // ③ 回程航班（旅行中 + 出发前3天都显示）
  if (tripStarted || (daysToDepart >= 0 && daysToDepart <= 5)) {
    rows += makeInfoRow('✈️', '回程航班', TRIP_KEY_INFO.returnFlight, '航班号：' + TRIP_KEY_INFO.returnFlightNo + ' · 5/2 晚 22:00 从 Asok 出发去机场 · 2:05 前到登机口');
  }

  // ④ 大皇宫着装（4/30当天）
  if (today && today.date === '2026-04-30') {
    rows += makeInfoRow('👔', '⚠️ 着装检查', '大皇宫必须：长裤 + 有袖上衣', '现在出门前检查！违规会被拦在门口换衣');
  }

  // ⑤ 泰国入境TDAC提醒（出发前5天内未到泰国）
  if (daysToDepart > 0 && daysToDepart <= 5) {
    rows += makeInfoRow('📋', 'TDAC 入境卡',
      '<a href="https://tdac.immigration.go.th" target="_blank" style="color:#0369a1;font-weight:700;">点击填写 TDAC →</a>',
      '抵泰前72小时内填写 · 截图二维码备用 · 建议今晚WiFi下完成');
  }

  // ⑥ 行李称重（出发前2天）
  if (daysToDepart > 0 && daysToDepart <= 2) {
    rows += makeInfoRow('⚖️', '行李称重', '出发前称重，勿超 23kg', '回程至少预留 5kg 买手信空间');
  }

  // ⑦ 当日预算参考（旅行中）
  if (tripStarted && phase.code && TRIP_KEY_INFO.dailyBudget[phase.code]) {
    var bd = TRIP_KEY_INFO.dailyBudget[phase.code];
    var budgetSaved = getBudgetSummary(phase.code);
    if (budgetSaved && budgetSaved.spent !== undefined) {
      var remain = budgetSaved.total - budgetSaved.spent;
      var pct    = Math.round(budgetSaved.spent / budgetSaved.total * 100);
      rows += makeInfoRow('💰', '预算剩余',
        remain + ' ' + bd.unit + ' / ' + budgetSaved.total + ' ' + bd.unit,
        '已花 ' + pct + '% · <a href="budget.html" style="color:#d97706;font-weight:700;">查看明细 →</a>');
    } else {
      rows += makeInfoRow('💰', '当日预算参考',
        bd.base + ' ' + bd.unit + '/天（≈¥' + bd.cny + '）',
        '<a href="budget.html" style="color:#d97706;font-weight:700;">打开费用记录 →</a>');
    }
  }

  // ⑧ 旅行结束后回顾
  if (tripEnded) {
    rows += makeInfoRow('🎉', '旅行已结束', '澳门 → 芭提雅 → 曼谷',
      '<a href="budget.html" style="color:#d97706;font-weight:700;">查看全程费用 →</a>');
  }

  if (!rows) return '';

  return '<div class="card fade-in" style="margin-bottom:12px;">'
    + '<div class="card-title" style="margin-bottom:10px;"><span class="icon">📌</span>关键信息速查</div>'
    + '<div style="display:flex;flex-direction:column;">' + rows + '</div>'
    + '</div>';
}

function makeInfoRow(emoji, label, value, sub) {
  return '<div style="display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-bottom:1px solid var(--border);">'
    + '<div style="font-size:18px;flex-shrink:0;margin-top:1px;">' + emoji + '</div>'
    + '<div style="flex:1;min-width:0;">'
    + '<div style="font-size:10px;color:var(--text-muted);font-weight:600;letter-spacing:0.5px;margin-bottom:2px;">' + label + '</div>'
    + '<div style="font-size:13px;font-weight:700;color:var(--text-primary);line-height:1.4;">' + value + '</div>'
    + (sub ? '<div style="font-size:11px;color:var(--text-secondary);margin-top:2px;line-height:1.4;">' + sub + '</div>' : '')
    + '</div>'
    + '</div>';
}

// ── 今日重点提醒（最多2条）──
function renderWarningCards(dayIdx) {
  var today = TRIP_DATA.days[dayIdx];
  if (!today.warnings || !today.warnings.length) return '';
  var wItems = today.warnings.slice(0, 2).map(function(w) {
    var icon      = w.type === 'danger' ? '🚨' : w.type === 'warning' ? '⚠️' : w.type === 'success' ? '✅' : 'ℹ️';
    var shortText = w.text.substring(0, 90) + (w.text.length > 90 ? '…' : '');
    return '<div class="alert-card ' + w.type + '">'
      + '<div class="alert-icon">' + icon + '</div>'
      + '<div class="alert-content">'
      + '<div class="alert-title">' + w.title + '</div>'
      + '<div class="alert-text">' + shortText + '</div>'
      + '</div>'
      + '</div>';
  }).join('');
  return '<div class="card fade-in" style="margin-bottom:12px;">'
    + '<div class="card-title" style="margin-bottom:10px;"><span class="icon">⚡</span>今日重点提醒</div>'
    + wItems
    + '</div>';
}

// ── 安装引导卡 ──
function renderInstallCard() {
  var _pwaInstalled = false;
  try { _pwaInstalled = localStorage.getItem('pwaInstalled') === '1'; } catch(e) {}
  if (isStandalone || _pwaInstalled) return '';
  var _installSub = '点击查看添加步骤 · 弱网/断网均可打开';
  if (isIOS)          _installSub = '📍 Safari → 分享 → 添加到主屏幕';
  else if (isWeChat)  _installSub = '📍 右上角 ··· → 在浏览器中打开';
  else if (isAndroid) _installSub = '📍 Chrome菜单 ⋮ → 添加到主屏幕';
  else                _installSub = '📍 点击查看电脑安装步骤';
  return '<div id="home-install-card" class="fade-in" style="background:linear-gradient(135deg,#1a3a5c,#0369a1);border-radius:16px;padding:14px 16px;margin-bottom:12px;display:flex;align-items:center;gap:12px;cursor:pointer;" onclick="showInstallGuide()">'
    + '<div style="font-size:26px;flex-shrink:0;">📲</div>'
    + '<div style="flex:1;min-width:0;">'
    + '<div style="font-size:14px;font-weight:800;color:white;margin-bottom:2px;">添加到桌面，断网也能用</div>'
    + '<div style="font-size:11px;color:rgba(255,255,255,0.8);line-height:1.4;">' + _installSub + '</div>'
    + '</div>'
    + '<div style="background:white;color:#0369a1;padding:7px 14px;border-radius:10px;font-size:12px;font-weight:800;flex-shrink:0;white-space:nowrap;">安装</div>'
    + '</div>';
}

// ── 快捷入口 ──
function renderQuickGrid() {
  return '<div class="section-label">快捷入口</div>'
    + '<div class="quick-grid fade-in">'
    + '<a href="trip.html" class="quick-btn"><div class="quick-btn-icon blue"><i class="fas fa-route"></i></div><span class="quick-btn-label">查看行程</span></a>'
    + '<a href="map.html" class="quick-btn"><div class="quick-btn-icon teal"><i class="fas fa-map-marker-alt"></i></div><span class="quick-btn-label">地图路线</span></a>'
    + '<a href="checklist.html" class="quick-btn"><div class="quick-btn-icon amber"><i class="fas fa-check-square"></i></div><span class="quick-btn-label">行前清单</span></a>'
    + '<a href="weather.html" class="quick-btn"><div class="quick-btn-icon" style="background:linear-gradient(135deg,#0369a1,#0ea5e9);"><i class="fas fa-cloud-sun" style="color:white;"></i></div><span class="quick-btn-label">天气提醒</span></a>'
    + '<a href="stay.html" class="quick-btn"><div class="quick-btn-icon" style="background:linear-gradient(135deg,#059669,#10b981);"><i class="fas fa-bed" style="color:white;"></i></div><span class="quick-btn-label">住宿建议</span></a>'
    + '<a href="emergency.html" class="quick-btn"><div class="quick-btn-icon rose"><i class="fas fa-shield-alt"></i></div><span class="quick-btn-label">应急帮助</span></a>'
    + '<a href="budget.html" class="quick-btn"><div class="quick-btn-icon" style="background:linear-gradient(135deg,#d97706,#f59e0b);"><i class="fas fa-coins" style="color:white;"></i></div><span class="quick-btn-label">费用预算</span></a>'
    + '<a href="note.html" class="quick-btn"><div class="quick-btn-icon" style="background:linear-gradient(135deg,#7c3aed,#a78bfa);"><i class="fas fa-pen-nib" style="color:white;"></i></div><span class="quick-btn-label">旅行笔记</span></a>'
    + '</div>';
}

// ── 全程日历 ──
function renderTimeline(dayIdx) {
  var tlHtml = TRIP_DATA.days.map(function(d, i) {
    var stateClass = i < dayIdx ? 'done' : i === dayIdx ? 'current' : 'future';
    var cardClass  = i === dayIdx ? 'current' : '';
    var todayBadge = i === dayIdx ? '<span class="tl-badge urgent" style="margin-left:4px;">今天</span>' : '';
    return '<div class="tl-item ' + stateClass + '"><div class="tl-card ' + cardClass + '" onclick="location.href=\'trip.html?day=' + d.id + '\'">'
      + '<div class="tl-date">' + d.shortDate + ' ' + d.emoji + '</div>'
      + '<div class="tl-title">' + d.title + '</div>'
      + '<div class="tl-subtitle">' + d.city + '</div>'
      + '<span class="tl-badge ' + d.cityCode + '">' + d.city + '</span>' + todayBadge
      + '</div></div>';
  }).join('');
  return '<div class="section-label" style="margin-top:4px;">全程日历</div>'
    + '<div class="timeline fade-in">' + tlHtml + '</div>';
}

// ── 今日天气速览卡 ──
function renderTodayWeather(dayIdx) {
  if (typeof WEATHER_DATA === 'undefined') return '';
  var w = WEATHER_DATA.days[dayIdx];
  if (!w) return '';
  var riskStyle = w.riskLevel === 'danger'
    ? 'background:#fee2e2;border-left:4px solid #ef4444;'
    : w.riskLevel === 'medium'
    ? 'background:#fef3c7;border-left:4px solid #f59e0b;'
    : 'background:#d1fae5;border-left:4px solid #10b981;';
  var riskTc = w.riskLevel === 'danger' ? '#b91c1c' : w.riskLevel === 'medium' ? '#92400e' : '#065f46';
  var uvC    = w.uvIndex >= 11 ? '#7c3aed' : w.uvIndex >= 8 ? '#ef4444' : w.uvIndex >= 6 ? '#f97316' : w.uvIndex >= 3 ? '#eab308' : '#22c55e';

  if (typeof WEATHER_SERVICE !== 'undefined') {
    var p = WEATHER_SERVICE.getWeather();
    if (p && typeof p.then === 'function') {
      p.then(function(result) {
        var liveW = result.days && result.days[dayIdx];
        if (!liveW) return;
        var card = document.getElementById('home-weather-card');
        if (!card) return;
        var isApi = result.source === 'api' || result.source === 'cache';
        var rc2 = liveW.riskLevel === 'danger' ? 'background:#fee2e2;border-left:4px solid #ef4444;' : liveW.riskLevel === 'medium' ? 'background:#fef3c7;border-left:4px solid #f59e0b;' : 'background:#d1fae5;border-left:4px solid #10b981;';
        var tc2 = liveW.riskLevel === 'danger' ? '#b91c1c' : liveW.riskLevel === 'medium' ? '#92400e' : '#065f46';
        var uvc2 = liveW.uvIndex >= 11 ? '#7c3aed' : liveW.uvIndex >= 8 ? '#ef4444' : liveW.uvIndex >= 6 ? '#f97316' : liveW.uvIndex >= 3 ? '#eab308' : '#22c55e';
        card.style.cssText = rc2 + 'border-radius:14px;margin-bottom:12px;padding:14px;';
        card.innerHTML = buildWeatherCardInner(liveW, tc2, uvc2, isApi);
      })['catch'](function() {});
    }
  }
  return '<div id="home-weather-card" class="fade-in" style="' + riskStyle + 'border-radius:14px;margin-bottom:12px;padding:14px;">'
    + buildWeatherCardInner(w, riskTc, uvC, false)
    + '</div>';
}

function buildWeatherCardInner(w, riskTc, uvC, isLive) {
  var liveTag = isLive
    ? ' <span style="font-size:10px;background:#d1fae5;color:#065f46;padding:1px 6px;border-radius:10px;">实时</span>'
    : ' <span style="font-size:10px;background:#dbeafe;color:#1d4ed8;padding:1px 6px;border-radius:10px;">气候参考</span>';
  return '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">'
    + '<div><div style="font-size:11px;font-weight:700;color:' + riskTc + ';margin-bottom:2px;">☀️ 今日天气' + liveTag + '</div>'
    + '<div style="font-size:18px;font-weight:800;color:var(--text-primary);">' + w.weatherIcon + ' ' + w.weather + '</div>'
    + '<div style="font-size:12px;color:var(--text-secondary);margin-top:2px;">' + w.feelsLike + '</div></div>'
    + '<div style="text-align:right;"><div style="font-size:26px;font-weight:800;color:var(--text-primary);">' + w.tempHigh + '°</div>'
    + '<div style="font-size:12px;color:var(--text-secondary);">夜间 ' + w.tempLow + '°</div></div></div>'
    + '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;">'
    + '<span style="font-size:11px;padding:3px 8px;border-radius:20px;background:' + uvC + '22;color:' + uvC + ';font-weight:700;">☀️ UV ' + w.uvIndex + ' ' + w.uvLabel + '</span>'
    + '<span style="font-size:11px;padding:3px 8px;border-radius:20px;background:#dbeafe;color:#1d4ed8;font-weight:600;">🌧️ 降雨 ' + w.rainChance + '%</span>'
    + '<span style="font-size:11px;padding:3px 8px;border-radius:20px;background:#f0fdf4;color:#15803d;font-weight:600;">💨 ' + w.wind + '</span>'
    + '</div>'
    + '<div style="font-size:12px;background:rgba(255,255,255,0.6);border-radius:8px;padding:7px 10px;color:var(--text-primary);line-height:1.6;"><strong>⚡ 今日必做：</strong>' + w.mustDo + '</div>'
    + '<a href="weather.html" style="display:block;margin-top:8px;text-align:center;font-size:12px;font-weight:700;color:' + riskTc + ';padding:6px;border-radius:8px;background:rgba(255,255,255,0.5);">查看全程8天天气详情 →</a>';
}

// ── 主渲染函数 ──
function renderHome() {
  var main = document.getElementById('appMain');
  if (!main) return;

  var dayIdx = getCurrentDayIndex();

  // 更新顶部：今日日期 + 出发状态
  var headerDate = document.getElementById('headerDate');
  if (headerDate) {
    var now = new Date();
    var dToD = getDaysToDepart();
    var dToR = getDaysToReturn();
    if (dToD > 0) {
      headerDate.textContent = '出发前 · 还剩' + dToD + '天';
    } else if (dToR > 0) {
      headerDate.textContent = '旅行中 · ' + (now.getMonth()+1) + '/' + now.getDate();
    } else {
      headerDate.textContent = '已返回';
    }
  }

  main.innerHTML =
    renderStatusBanner(dayIdx)
    + renderTop3Card(dayIdx)
    + renderKeyInfoCard(dayIdx)
    + renderWarningCards(dayIdx)
    + renderTodayWeather(dayIdx)
    + renderInstallCard()
    + renderQuickGrid()
    + renderTimeline(dayIdx)
    + '<div class="safe-bottom"></div>';
}

// DOM Ready 后执行
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('appMain')) {
    renderHome();
  }
});
