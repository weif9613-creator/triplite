// ============================================
// 首页逻辑
// ============================================
function renderHome() {
  const main = document.getElementById('appMain');
  if (!main) return;
  
  const dayIdx = getCurrentDayIndex();
  const today = TRIP_DATA.days[dayIdx];
  const totalDays = TRIP_DATA.days.length;
  const progress = Math.round(((dayIdx + 1) / totalDays) * 100);
  
  // 更新顶部日期
  const headerDate = document.getElementById('headerDate');
  if (headerDate) {
    const now = new Date();
    headerDate.textContent = `${now.getMonth()+1}月${now.getDate()}日`;
  }
  
  main.innerHTML = `
    <!-- Hero 主卡 -->
    <div class="hero-card fade-in">
      <div class="hero-day-label">Day ${dayIdx + 1} · ${today.shortDate}</div>
      <div class="hero-city">${today.city} ${today.emoji}</div>
      <div class="hero-summary">${today.summary}</div>
      <div class="hero-tags">
        ${today.tags.map(t => `<span class="hero-tag">${t}</span>`).join('')}
        <span class="hero-tag" style="background:rgba(255,255,255,0.12)">体力：${getEnergyLabel(today.energyLevel)}</span>
      </div>
    </div>
    
    <!-- 行程进度 -->
    <div class="progress-strip fade-in">
      <div class="progress-header">
        <span class="progress-label">整趟行程进度</span>
        <span class="progress-count">第 ${dayIdx + 1} 天 / 共 ${totalDays} 天</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width:${progress}%"></div>
      </div>
      <div class="progress-cities">
        ${[{name:'澳门',idx:0},{name:'芭提雅',idx:1},{name:'曼谷',idx:3},{name:'返程',idx:6}].map(c => `
          <div class="progress-city-dot">
            <div class="city-dot ${dayIdx > c.idx ? 'done' : (dayIdx === c.idx ? 'active' : '')}"></div>
            <span class="city-label">${c.name}</span>
          </div>
        `).join('')}
      </div>
    </div>
    
    <!-- 今日重点 -->
    <div class="card fade-in">
      <div class="card-header">
        <div class="card-title"><span class="icon">📋</span>今日要点</div>
        <a href="trip.html?day=${today.id}" style="font-size:13px;color:var(--primary-light);font-weight:600;">查看详情 →</a>
      </div>
      <div class="step-list">
        ${today.times.map(t => t.activities.filter(a => a.type === 'must').map(a => `
          <div class="step-item ${t.period === 'am' ? 'am' : t.period === 'pm' ? 'pm' : 'night'}">
            <div class="step-time">${t.label}</div>
            <div class="step-content">
              <div class="step-title">${a.name}</div>
              <div class="step-desc">${a.desc.substring(0, 60)}${a.desc.length > 60 ? '...' : ''}</div>
            </div>
          </div>
        `).join('')).join('')}
      </div>
    </div>
    
    <!-- 重要提醒 -->
    ${today.warnings.length > 0 ? `
    <div class="card fade-in">
      <div class="card-header"><div class="card-title"><span class="icon">⚠️</span>今日提醒</div></div>
      ${today.warnings.slice(0, 2).map(w => `
        <div class="alert-card ${w.type}">
          <div class="alert-icon">${w.type === 'danger' ? '🚨' : w.type === 'warning' ? '⚠️' : w.type === 'success' ? '✅' : 'ℹ️'}</div>
          <div class="alert-content">
            <div class="alert-title">${w.title}</div>
            <div class="alert-text">${w.text.substring(0, 80)}${w.text.length > 80 ? '...' : ''}</div>
          </div>
        </div>
      `).join('')}
    </div>
    ` : ''}
    
    <!-- 今日天气速览 -->
    ${renderTodayWeather(dayIdx)}

    <!-- 安装引导横幅（已安装则隐藏） -->
    ${!isStandalone ? `
    <div id="home-install-card" class="fade-in" style="
      background:linear-gradient(135deg,#1a3a5c,#0369a1);
      border-radius:16px;padding:14px 16px;margin-bottom:12px;
      display:flex;align-items:center;gap:12px;cursor:pointer;
    " onclick="showInstallGuide()">
      <div style="font-size:26px;flex-shrink:0;">📲</div>
      <div style="flex:1;">
        <div style="font-size:14px;font-weight:800;color:white;margin-bottom:2px;">添加到手机桌面</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.75);">像App一样使用 · 弱网/断网均可打开</div>
      </div>
      <div style="
        background:white;color:#0369a1;
        padding:7px 14px;border-radius:10px;
        font-size:12px;font-weight:800;flex-shrink:0;
      ">安装 →</div>
    </div>
    ` : ''}

    <!-- 快捷按钮 -->
    <div class="section-label">快捷入口</div>
    <div class="quick-grid fade-in">
      <a href="trip.html" class="quick-btn">
        <div class="quick-btn-icon blue"><i class="fas fa-route"></i></div>
        <span class="quick-btn-label">查看行程</span>
      </a>
      <a href="map.html" class="quick-btn">
        <div class="quick-btn-icon teal"><i class="fas fa-map-marker-alt"></i></div>
        <span class="quick-btn-label">地图路线</span>
      </a>
      <a href="checklist.html" class="quick-btn">
        <div class="quick-btn-icon amber"><i class="fas fa-check-square"></i></div>
        <span class="quick-btn-label">行前清单</span>
      </a>
      <a href="weather.html" class="quick-btn">
        <div class="quick-btn-icon" style="background:linear-gradient(135deg,#0369a1,#0ea5e9);"><i class="fas fa-cloud-sun" style="color:white;"></i></div>
        <span class="quick-btn-label">天气提醒</span>
      </a>
      <a href="stay.html" class="quick-btn">
        <div class="quick-btn-icon" style="background:linear-gradient(135deg,#059669,#10b981);"><i class="fas fa-bed" style="color:white;"></i></div>
        <span class="quick-btn-label">住宿建议</span>
      </a>
      <a href="emergency.html" class="quick-btn">
        <div class="quick-btn-icon rose"><i class="fas fa-shield-alt"></i></div>
        <span class="quick-btn-label">应急帮助</span>
      </a>
      <a href="budget.html" class="quick-btn">
        <div class="quick-btn-icon" style="background:linear-gradient(135deg,#d97706,#f59e0b);"><i class="fas fa-coins" style="color:white;"></i></div>
        <span class="quick-btn-label">费用预算</span>
      </a>
      <a href="note.html" class="quick-btn">
        <div class="quick-btn-icon" style="background:linear-gradient(135deg,#7c3aed,#a78bfa);"><i class="fas fa-pen-nib" style="color:white;"></i></div>
        <span class="quick-btn-label">涂鸦笔记</span>
      </a>
    </div>
    
    <!-- 行程时间轴 -->
    <div class="section-label" style="margin-top:4px;">全程日历</div>
    <div class="timeline fade-in">
      ${TRIP_DATA.days.map((d, i) => `
        <div class="tl-item ${i < dayIdx ? 'done' : i === dayIdx ? 'current' : 'future'}">
          <div class="tl-card ${i === dayIdx ? 'current' : ''}" onclick="location.href='trip.html?day=${d.id}'">
            <div class="tl-date">${d.shortDate} ${d.emoji}</div>
            <div class="tl-title">${d.title}</div>
            <div class="tl-subtitle">${d.city}</div>
            <span class="tl-badge ${d.cityCode}">${d.city}</span>
            ${i === dayIdx ? '<span class="tl-badge urgent" style="margin-left:4px;">今天</span>' : ''}
          </div>
        </div>
      `).join('')}
    </div>
    
    <!-- TDAC 特别提醒 -->
    <div class="alert-card info fade-in" style="margin-top:4px;">
      <div class="alert-icon">📲</div>
      <div class="alert-content">
        <div class="alert-title">TDAC提醒（4/25–4/26完成，抵泰前72小时内有效）</div>
        <div class="alert-text">入境泰国前必须在线填写电子入境卡，建议4/25–4/26之间完成（确保在72小时窗口内）。<br><a href="https://tdac.immigration.go.th" target="_blank" style="color:var(--primary-light);font-weight:600;">点击前往官网填写 →</a></div>
      </div>
    </div>
    
    <div class="safe-bottom"></div>
  `;
}

// ── 今日天气速览卡（异步版）──
function renderTodayWeather(dayIdx) {
  // 先用气候参考数据渲染占位卡，异步再更新
  if (typeof WEATHER_DATA === 'undefined') return '';
  const w = WEATHER_DATA.days[dayIdx];
  if (!w) return '';

  const riskStyle = w.riskLevel === 'danger'
    ? 'background:#fee2e2;border-left:4px solid #ef4444;'
    : w.riskLevel === 'medium'
    ? 'background:#fef3c7;border-left:4px solid #f59e0b;'
    : 'background:#d1fae5;border-left:4px solid #10b981;';
  const riskTc = w.riskLevel === 'danger' ? '#b91c1c' : w.riskLevel === 'medium' ? '#92400e' : '#065f46';
  const uvC = w.uvIndex >= 11 ? '#7c3aed' : w.uvIndex >= 8 ? '#ef4444' : w.uvIndex >= 6 ? '#f97316' : w.uvIndex >= 3 ? '#eab308' : '#22c55e';

  // 异步更新（如有天气服务），不延迟直接调用，API快速探测失败则立即fallback
  if (typeof WEATHER_SERVICE !== 'undefined') {
    WEATHER_SERVICE.getWeather().then(result => {
      const liveW = result.days && result.days[dayIdx];
      if (!liveW) return;
      const card = document.getElementById('home-weather-card');
      if (!card) return;
      const isApi = result.source === 'api' || result.source === 'cache';
      const rc2 = liveW.riskLevel === 'danger'
        ? 'background:#fee2e2;border-left:4px solid #ef4444;'
        : liveW.riskLevel === 'medium'
        ? 'background:#fef3c7;border-left:4px solid #f59e0b;'
        : 'background:#d1fae5;border-left:4px solid #10b981;';
      const tc2 = liveW.riskLevel === 'danger' ? '#b91c1c' : liveW.riskLevel === 'medium' ? '#92400e' : '#065f46';
      const uvc2 = liveW.uvIndex >= 11 ? '#7c3aed' : liveW.uvIndex >= 8 ? '#ef4444' : liveW.uvIndex >= 6 ? '#f97316' : liveW.uvIndex >= 3 ? '#eab308' : '#22c55e';
      card.style.cssText = `${rc2}border-radius:14px;margin-bottom:12px;padding:14px;`;
      card.innerHTML = buildWeatherCardInner(liveW, tc2, uvc2, isApi);
    }).catch(()=>{});
  }

  return `<div id="home-weather-card" class="fade-in" style="${riskStyle}border-radius:14px;margin-bottom:12px;padding:14px;">
    ${buildWeatherCardInner(w, riskTc, uvC, false)}
  </div>`;
}

function buildWeatherCardInner(w, riskTc, uvC, isLive) {
  return `
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
      <div>
        <div style="font-size:11px;font-weight:700;color:${riskTc};margin-bottom:2px;">
          ☀️ 今日天气${isLive ? ' <span style=\'font-size:10px;background:#d1fae5;color:#065f46;padding:1px 6px;border-radius:10px;\'>实时</span>' : ' <span style=\'font-size:10px;background:#dbeafe;color:#1d4ed8;padding:1px 6px;border-radius:10px;\'>气候参考</span>'}
        </div>
        <div style="font-size:18px;font-weight:800;color:var(--text-primary);">${w.weatherIcon} ${w.weather}</div>
        <div style="font-size:12px;color:var(--text-secondary);margin-top:2px;">${w.feelsLike}</div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:26px;font-weight:800;color:var(--text-primary);">${w.tempHigh}°</div>
        <div style="font-size:12px;color:var(--text-secondary);">夜间 ${w.tempLow}°</div>
      </div>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;">
      <span style="font-size:11px;padding:3px 8px;border-radius:20px;background:${uvC}22;color:${uvC};font-weight:700;">☀️ UV ${w.uvIndex} ${w.uvLabel}</span>
      <span style="font-size:11px;padding:3px 8px;border-radius:20px;background:#dbeafe;color:#1d4ed8;font-weight:600;">🌧️ 降雨 ${w.rainChance}%</span>
      <span style="font-size:11px;padding:3px 8px;border-radius:20px;background:#f0fdf4;color:#15803d;font-weight:600;">💨 ${w.wind}</span>
    </div>
    <div style="font-size:12px;background:rgba(255,255,255,0.6);border-radius:8px;padding:7px 10px;color:var(--text-primary);line-height:1.6;">
      <strong>⚡ 今日必做：</strong>${w.mustDo}
    </div>
    <a href="weather.html" style="display:block;margin-top:8px;text-align:center;font-size:12px;font-weight:700;color:${riskTc};padding:6px;border-radius:8px;background:rgba(255,255,255,0.5);">查看全程8天天气详情 →</a>
  `;
}

// DOM Ready后执行
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('appMain')) {
    renderHome();
  }
});
