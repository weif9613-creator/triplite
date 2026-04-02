// ============================================
// TripLite · app.js
// 全局逻辑：导航高亮 · SW注册 · PWA安装引导
// 支持：iOS Safari / Android Chrome / 桌面Chrome
// ============================================

// ── 导航高亮 ──
function setActiveNav() {
  const path = location.pathname;
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    const href = item.getAttribute('href') || '';
    if (href && path.endsWith(href)) item.classList.add('active');
    if ((path.endsWith('/') || path.endsWith('index.html') || path === '/') && href === 'index.html') {
      item.classList.add('active');
    }
  });
}

// ── Service Worker 注册 ──
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(() => console.log('[TripLite] SW registered'))
      .catch(err => console.warn('[TripLite] SW failed:', err));
  });
}

// ── 设备/环境检测 ──
const UA = navigator.userAgent;
const isIOS        = /iPad|iPhone|iPod/.test(UA) && !window.MSStream;
const isAndroid    = /Android/.test(UA);
const isMobile     = isIOS || isAndroid;
const isStandalone = window.matchMedia('(display-mode: standalone)').matches
                     || window.navigator.standalone === true;

// 已经以App模式运行，不再提示
if (isStandalone) {
  // 已安装，无需引导
}

// Android Chrome: 捕获 beforeinstallprompt
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
});

// ── 主入口：页面加载后决定是否显示引导 ──
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();

  // 已安装/已关闭过 → 不弹
  if (isStandalone) return;
  if (sessionStorage.getItem('pwaGuideShown')) return; // 同一次会话只弹一次

  // 延迟2秒再弹，让用户先看到内容
  setTimeout(() => {
    if (isIOS) {
      showIOSGuide();
    } else if (isAndroid) {
      // 等待 beforeinstallprompt 事件（最多3秒）
      if (deferredPrompt) {
        showAndroidBanner();
      } else {
        setTimeout(() => {
          if (deferredPrompt) showAndroidBanner();
          else showAndroidManualGuide(); // 部分安卓浏览器无事件，走手动引导
        }, 3000);
      }
    }
    // 桌面不弹，Chrome会自动在地址栏显示安装按钮
  }, 2000);
});

// ════════════════════════════════════════════
// iOS Safari 引导弹窗
// ════════════════════════════════════════════
function showIOSGuide() {
  if (document.getElementById('pwa-overlay')) return;
  sessionStorage.setItem('pwaGuideShown', '1');

  const overlay = document.createElement('div');
  overlay.id = 'pwa-overlay';
  overlay.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,0.55);
    z-index:9000;display:flex;align-items:flex-end;
    animation:fadeIn 0.25s ease;
  `;

  overlay.innerHTML = `
    <div style="
      width:100%;background:#fff;border-radius:22px 22px 0 0;
      padding:22px 20px calc(28px + env(safe-area-inset-bottom));
      animation:slideUp 0.3s ease;
    ">
      <!-- 拖拽条 -->
      <div style="width:40px;height:4px;background:#d1d5db;border-radius:2px;margin:0 auto 18px;"></div>

      <!-- 标题 -->
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
        <span style="font-size:28px;">✈️</span>
        <div>
          <div style="font-size:17px;font-weight:800;color:#1e293b;">添加到主屏幕</div>
          <div style="font-size:12px;color:#64748b;">像App一样使用 · 断网也能打开</div>
        </div>
      </div>

      <div style="background:#f1f5f9;border-radius:12px;padding:14px 16px;margin:14px 0;">
        <div style="font-size:12px;color:#475569;font-weight:600;margin-bottom:10px;">📋 按以下步骤操作（Safari浏览器）</div>

        <!-- 步骤1 -->
        <div style="display:flex;gap:12px;align-items:flex-start;padding:8px 0;border-bottom:1px solid #e2e8f0;">
          <div style="
            width:26px;height:26px;border-radius:50%;background:#0ea5e9;
            color:white;font-size:13px;font-weight:800;
            display:flex;align-items:center;justify-content:center;flex-shrink:0;
          ">1</div>
          <div>
            <div style="font-size:14px;font-weight:700;color:#1e293b;">点击底部 <span style="background:#e0f2fe;color:#0369a1;padding:2px 7px;border-radius:6px;font-size:13px;">分享</span> 按钮</div>
            <div style="font-size:12px;color:#64748b;margin-top:2px;">就是 Safari 底部中间那个 <strong>方块+向上箭头</strong> 的图标 ↑</div>
          </div>
        </div>

        <!-- 步骤2 -->
        <div style="display:flex;gap:12px;align-items:flex-start;padding:8px 0;border-bottom:1px solid #e2e8f0;">
          <div style="
            width:26px;height:26px;border-radius:50%;background:#0ea5e9;
            color:white;font-size:13px;font-weight:800;
            display:flex;align-items:center;justify-content:center;flex-shrink:0;
          ">2</div>
          <div>
            <div style="font-size:14px;font-weight:700;color:#1e293b;">向下滑动菜单</div>
            <div style="font-size:12px;color:#64748b;margin-top:2px;">找到 <strong>「添加到主屏幕」</strong>（Add to Home Screen）</div>
          </div>
        </div>

        <!-- 步骤3 -->
        <div style="display:flex;gap:12px;align-items:flex-start;padding:8px 0;">
          <div style="
            width:26px;height:26px;border-radius:50%;background:#10b981;
            color:white;font-size:13px;font-weight:800;
            display:flex;align-items:center;justify-content:center;flex-shrink:0;
          ">3</div>
          <div>
            <div style="font-size:14px;font-weight:700;color:#1e293b;">点 <span style="color:#10b981;">「添加」</span> 确认</div>
            <div style="font-size:12px;color:#64748b;margin-top:2px;">桌面出现 TripLite 图标，完成！</div>
          </div>
        </div>
      </div>

      <div style="font-size:11px;color:#94a3b8;text-align:center;margin-bottom:14px;">
        ⚡ 首次安装后离线也能使用全部功能
      </div>

      <div style="display:flex;gap:10px;">
        <button onclick="closePwaOverlay()" style="
          flex:1;padding:13px;background:#f1f5f9;border:none;border-radius:12px;
          font-size:14px;color:#64748b;font-weight:600;cursor:pointer;
        ">稍后再说</button>
        <button onclick="closePwaOverlay(true)" style="
          flex:2;padding:13px;background:#0ea5e9;border:none;border-radius:12px;
          font-size:14px;color:white;font-weight:800;cursor:pointer;
        ">我知道了，去操作 →</button>
      </div>
    </div>
  `;

  // 点遮罩关闭
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closePwaOverlay();
  });

  document.body.appendChild(overlay);
  injectPwaStyles();
}

// ════════════════════════════════════════════
// Android Chrome 一键安装横幅
// ════════════════════════════════════════════
function showAndroidBanner() {
  if (document.getElementById('pwa-overlay')) return;
  sessionStorage.setItem('pwaGuideShown', '1');

  const banner = document.createElement('div');
  banner.id = 'pwa-overlay';
  banner.style.cssText = `
    position:fixed;
    bottom:calc(68px + env(safe-area-inset-bottom));
    left:12px;right:12px;
    background:linear-gradient(135deg,#1a3a5c,#0ea5e9);
    color:white;border-radius:18px;
    padding:16px 16px;
    display:flex;align-items:center;gap:12px;
    z-index:9000;
    box-shadow:0 8px 32px rgba(0,0,0,0.3);
    animation:slideUp 0.35s ease;
  `;

  banner.innerHTML = `
    <div style="font-size:28px;flex-shrink:0;">✈️</div>
    <div style="flex:1;min-width:0;">
      <div style="font-size:14px;font-weight:800;margin-bottom:2px;">安装 TripLite 到桌面</div>
      <div style="font-size:11px;opacity:0.85;">离线可用 · 一键查行程天气</div>
    </div>
    <button id="pwa-install-btn" style="
      background:white;color:#0369a1;border:none;
      padding:9px 16px;border-radius:10px;
      font-size:13px;font-weight:800;cursor:pointer;
      white-space:nowrap;flex-shrink:0;
    ">立即安装</button>
    <button onclick="closePwaOverlay()" style="
      background:rgba(255,255,255,0.2);color:white;border:none;
      width:30px;height:30px;border-radius:8px;
      font-size:18px;cursor:pointer;flex-shrink:0;
      display:flex;align-items:center;justify-content:center;
    ">×</button>
  `;

  document.body.appendChild(banner);
  injectPwaStyles();

  document.getElementById('pwa-install-btn').addEventListener('click', () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(result => {
      closePwaOverlay(true);
      deferredPrompt = null;
    });
  });
}

// ════════════════════════════════════════════
// 安卓其他浏览器（没有 beforeinstallprompt）手动引导
// ════════════════════════════════════════════
function showAndroidManualGuide() {
  if (document.getElementById('pwa-overlay')) return;
  sessionStorage.setItem('pwaGuideShown', '1');

  const overlay = document.createElement('div');
  overlay.id = 'pwa-overlay';
  overlay.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,0.55);
    z-index:9000;display:flex;align-items:flex-end;
    animation:fadeIn 0.25s ease;
  `;

  overlay.innerHTML = `
    <div style="
      width:100%;background:#fff;border-radius:22px 22px 0 0;
      padding:22px 20px calc(28px + env(safe-area-inset-bottom));
      animation:slideUp 0.3s ease;
    ">
      <div style="width:40px;height:4px;background:#d1d5db;border-radius:2px;margin:0 auto 18px;"></div>

      <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
        <span style="font-size:28px;">✈️</span>
        <div>
          <div style="font-size:17px;font-weight:800;color:#1e293b;">添加到主屏幕</div>
          <div style="font-size:12px;color:#64748b;">安卓手机 · Chrome浏览器</div>
        </div>
      </div>

      <div style="background:#f1f5f9;border-radius:12px;padding:14px 16px;margin-bottom:14px;">
        <div style="font-size:12px;color:#475569;font-weight:600;margin-bottom:10px;">📋 操作步骤</div>

        <div style="display:flex;gap:12px;align-items:flex-start;padding:8px 0;border-bottom:1px solid #e2e8f0;">
          <div style="width:26px;height:26px;border-radius:50%;background:#f59e0b;color:white;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;">1</div>
          <div>
            <div style="font-size:14px;font-weight:700;color:#1e293b;">点右上角 <span style="background:#fef3c7;color:#92400e;padding:2px 7px;border-radius:6px;">⋮</span> 菜单</div>
            <div style="font-size:12px;color:#64748b;margin-top:2px;">浏览器右上角三个点</div>
          </div>
        </div>

        <div style="display:flex;gap:12px;align-items:flex-start;padding:8px 0;border-bottom:1px solid #e2e8f0;">
          <div style="width:26px;height:26px;border-radius:50%;background:#f59e0b;color:white;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;">2</div>
          <div>
            <div style="font-size:14px;font-weight:700;color:#1e293b;">找到「添加到主屏幕」</div>
            <div style="font-size:12px;color:#64748b;margin-top:2px;">或「安装应用」/ Add to Home screen</div>
          </div>
        </div>

        <div style="display:flex;gap:12px;align-items:flex-start;padding:8px 0;">
          <div style="width:26px;height:26px;border-radius:50%;background:#10b981;color:white;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;">3</div>
          <div>
            <div style="font-size:14px;font-weight:700;color:#1e293b;">点「<span style="color:#10b981;">添加</span>」确认</div>
            <div style="font-size:12px;color:#64748b;margin-top:2px;">桌面出现图标，完成！</div>
          </div>
        </div>
      </div>

      <div style="font-size:11px;color:#94a3b8;text-align:center;margin-bottom:14px;">
        ⚡ 安装后离线可用全部功能
      </div>

      <button onclick="closePwaOverlay(true)" style="
        width:100%;padding:14px;background:#f59e0b;border:none;border-radius:12px;
        font-size:15px;color:white;font-weight:800;cursor:pointer;
      ">我知道了 ✓</button>
    </div>
  `;

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closePwaOverlay();
  });

  document.body.appendChild(overlay);
  injectPwaStyles();
}

// ── 关闭引导 ──
function closePwaOverlay(permanent) {
  const el = document.getElementById('pwa-overlay');
  if (el) el.remove();
  if (permanent) localStorage.setItem('pwaInstallDone', '1');
}

// ── 注入动画CSS（只注入一次）──
function injectPwaStyles() {
  if (document.getElementById('pwa-styles')) return;
  const s = document.createElement('style');
  s.id = 'pwa-styles';
  s.textContent = `
    @keyframes slideUp {
      from { transform: translateY(30px); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
  `;
  document.head.appendChild(s);
}

// ── 手动触发安装引导（首页按钮可调用）──
function showInstallGuide() {
  // 已安装则提示
  if (isStandalone) {
    alert('✅ 已安装！在桌面找到 TripLite 图标即可使用。');
    return;
  }
  // 清除session记录，强制重新弹
  sessionStorage.removeItem('pwaGuideShown');

  if (isIOS) showIOSGuide();
  else if (deferredPrompt) showAndroidBanner();
  else showAndroidManualGuide();
}

// 初始化
document.addEventListener('DOMContentLoaded', setActiveNav);
