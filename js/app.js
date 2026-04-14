// ============================================
// TripLite · app.js  v1.14
// 全局逻辑：导航高亮 · SW注册 · PWA安装引导
// 平台覆盖：Android Chrome / iOS Safari / 桌面 / 非标浏览器
// ============================================

// ── 导航高亮 ──
function setActiveNav() {
  var path = location.pathname;
  var navItems = document.querySelectorAll('.nav-item');
  for (var i = 0; i < navItems.length; i++) {
    var item = navItems[i];
    item.classList.remove('active');
    var href = item.getAttribute('href') || '';
    if (!href) continue;
    var hrefBase = href.replace(/\.html$/, '').replace(/^\.\//, '');
    var pathBase = path.replace(/\.html$/, '').replace(/\/$/, '') || '/index';
    var isHome = hrefBase === 'index' || hrefBase === '/' || hrefBase === '';
    var pathIsHome = path === '/' || path.indexOf('/index.html') !== -1 || path.indexOf('/index') !== -1 || path === '';
    if (isHome && pathIsHome) { item.classList.add('active'); continue; }
    if (!isHome && pathBase.indexOf('/' + hrefBase) !== -1) {
      item.classList.add('active');
    }
  }
}

// ── Service Worker 注册 ──
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js')
      .then(function() { console.log('[TripLite] SW registered'); })
      .catch(function(err) { console.warn('[TripLite] SW failed:', err); });
  });
}

// ── 环境检测 ──
var UA = navigator.userAgent;
var isIOS        = /iPad|iPhone|iPod/.test(UA) && !window.MSStream;
var isAndroid    = /Android/.test(UA);
var isMobile     = isIOS || isAndroid;
var isChrome     = /Chrome/.test(UA) && !/Edg|OPR|QQ|UCBrowser|MiuiBrowser/.test(UA);
var isWeChat     = /MicroMessenger/.test(UA);  // 微信内
var isMiniProgram = (typeof wx !== 'undefined') || isWeChat; // 微信小程序预留
var isStandalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches)
                   || window.navigator.standalone === true;

// ── 捕获 Chrome 安装事件 ──
var deferredPrompt = null;
window.addEventListener('beforeinstallprompt', function(e) {
  e.preventDefault();
  deferredPrompt = e;
  // 事件到了就更新首页安装按钮状态
  _updateInstallCardState();
});

// 安装成功后隐藏按钮
window.addEventListener('appinstalled', function() {
  deferredPrompt = null;
  _hideInstallCard();
});

// ── 初始化 ──
document.addEventListener('DOMContentLoaded', function() {
  setActiveNav();
});

// ══════════════════════════════════════════════
// 对外接口：首页安装卡片调用
// ══════════════════════════════════════════════

// 点击"安装/添加到桌面"按钮时调用
function showInstallGuide() {

  // ① 已安装（standalone模式）
  if (isStandalone) {
    _showToast('✅ 已安装到桌面！');
    return;
  }

  // ② 微信内 → 引导用浏览器打开
  if (isWeChat) {
    _showWechatGuide();
    return;
  }

  // ③ iOS Safari → 分享菜单引导
  if (isIOS) {
    _showIOSGuide();
    return;
  }

  // ④⑤ Android Chrome → 统一引导用菜单"添加到主屏幕"，比deferredPrompt更稳定
  if (isAndroid && isChrome) {
    _showAndroidChromeManual();
    return;
  }

  // ⑥ Android 非Chrome浏览器 → 建议用Chrome打开
  if (isAndroid) {
    _showAndroidOtherGuide();
    return;
  }

  // ⑦ 桌面电脑 Chrome → 地址栏安装提示
  if (!isMobile && isChrome) {
    _showDesktopChromeGuide();
    return;
  }

  // ⑧ 桌面其他浏览器（Safari Mac / Firefox / Edge等）
  _showDesktopOtherGuide();
}

// ══════════════════════════════════════════════
// 各平台弹窗实现
// ══════════════════════════════════════════════

// iOS Safari 引导
function _showIOSGuide() {
  _showModal(
    '📱 添加到 iPhone 主屏幕',
    '<div style="background:#f1f5f9;border-radius:12px;padding:14px;margin:12px 0;">'
    + _step(1, '#0ea5e9', '点击底部 <b>分享</b> 按钮', '底部中间「方块+箭头↑」图标')
    + _step(2, '#0ea5e9', '向下滑动，找到<b>「添加到主屏幕」</b>', '英文版：Add to Home Screen')
    + _step(3, '#10b981', '点右上角 <b>「添加」</b>', '桌面出现 TripLite 图标 ✓')
    + '</div>'
    + '<div style="font-size:12px;color:#64748b;text-align:center;">⚠️ 必须在 Safari 浏览器中操作</div>',
    '我知道了，去操作 →',
    null
  );
}

// Android Chrome 手动引导（统一入口，最稳定）
function _showAndroidChromeManual() {
  _showModal(
    '📲 添加到手机桌面',
    '<div style="background:#f1f5f9;border-radius:12px;padding:14px;margin:12px 0;">'
    + _step(1, '#0ea5e9', '点 Chrome 右上角 <b>⋮</b>', '浏览器右上角三个点菜单')
    + _step(2, '#0ea5e9', '选「<b>添加到主屏幕</b>」', '英文版：Add to Home screen')
    + _step(3, '#10b981', '弹框里点「<b>添加</b>」', '桌面立刻出现 TripLite 图标 ✓')
    + '</div>'
    + '<div style="background:#fef3c7;border-radius:10px;padding:10px 14px;font-size:12px;color:#92400e;line-height:1.6;">'
    + '⚠️ 如弹出「安装应用」而非「添加到主屏幕」，建议选<b>取消</b>，改用菜单手动添加，图标更稳定</div>',
    '好的，我去操作 →',
    null
  );
}

// Android 非Chrome浏览器
function _showAndroidOtherGuide() {
  _showModal(
    '🌐 建议用 Chrome 打开',
    '<div style="text-align:center;padding:8px 0 16px;">'
    + '<div style="font-size:40px;margin-bottom:8px;">🟡</div>'
    + '<div style="font-size:14px;font-weight:700;color:#1e293b;margin-bottom:6px;">当前浏览器不支持安装</div>'
    + '<div style="font-size:13px;color:#64748b;line-height:1.6;">请用 <b>Google Chrome</b> 打开<br>'
    + '<span style="color:#0ea5e9;font-weight:700;">triplite.cn</span><br>即可一键安装到桌面</div>'
    + '</div>'
    + '<div style="background:#f1f5f9;border-radius:10px;padding:10px 14px;font-size:12px;color:#475569;">'
    + '💡 也可在当前浏览器菜单中找「添加到主屏幕」手动添加</div>',
    '知道了',
    null
  );
}

// 微信内引导
function _showWechatGuide() {
  _showModal(
    '📲 请在浏览器中打开',
    '<div style="text-align:center;padding:8px 0 16px;">'
    + '<div style="font-size:40px;margin-bottom:8px;">🔗</div>'
    + '<div style="font-size:14px;font-weight:700;color:#1e293b;margin-bottom:6px;">微信内无法安装到桌面</div>'
    + '<div style="font-size:13px;color:#64748b;line-height:1.8;">'
    + '点右上角 <b>···</b> → <b>在浏览器打开</b><br>'
    + '然后在浏览器中添加到桌面</div>'
    + '</div>',
    '知道了',
    null
  );
}

// 桌面 Chrome 引导
function _showDesktopChromeGuide() {
  // 如果有deferredPrompt直接触发
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function() {
      deferredPrompt = null;
    });
    return;
  }
  _showModal(
    '💻 安装到电脑',
    '<div style="background:#f1f5f9;border-radius:12px;padding:14px;margin:12px 0;">'
    + _step(1, '#0ea5e9', '点地址栏右侧 <b>⊕</b> 安装图标', '或点右上角 ⋮ → 安装网页应用')
    + _step(2, '#10b981', '点「<b>安装</b>」确认', '桌面/开始菜单出现 TripLite ✓')
    + '</div>'
    + '<div style="font-size:12px;color:#64748b;text-align:center;">安装后像本地App一样使用，支持离线</div>',
    '知道了',
    null
  );
}

// 桌面其他浏览器
function _showDesktopOtherGuide() {
  _showModal(
    '💻 添加到桌面',
    '<div style="text-align:center;padding:8px 0 12px;">'
    + '<div style="font-size:13px;color:#64748b;line-height:1.8;">'
    + '推荐用 <b>Chrome 浏览器</b> 访问<br>'
    + '<span style="color:#0ea5e9;font-weight:700;">triplite.cn</span><br>'
    + '可一键安装为桌面应用</div>'
    + '</div>'
    + '<div style="background:#f1f5f9;border-radius:10px;padding:10px 14px;font-size:12px;color:#475569;line-height:1.6;">'
    + '📌 Safari Mac：分享菜单 → 添加到程序坞<br>'
    + '📌 Edge：⋯ 菜单 → 应用 → 安装此站点为应用</div>',
    '知道了',
    null
  );
}

// ── 辅助：步骤条目 ──
function _step(num, color, title, sub) {
  return '<div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-bottom:1px solid #e2e8f0;">'
    + '<div style="width:24px;height:24px;border-radius:50%;background:' + color + ';color:white;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' + num + '</div>'
    + '<div><div style="font-size:14px;font-weight:600;color:#1e293b;">' + title + '</div>'
    + '<div style="font-size:12px;color:#64748b;margin-top:2px;">' + sub + '</div></div></div>';
}

// ── 通用弹窗 ──
function _showModal(title, body, btnText, btnAction) {
  _closeModal();
  _injectStyles();

  var mask = document.createElement('div');
  mask.id = 'pwa-modal-mask';
  mask.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:flex-end;animation:tlFadeIn 0.2s ease;';

  var box = document.createElement('div');
  box.style.cssText = 'width:100%;background:#fff;border-radius:22px 22px 0 0;padding:22px 20px calc(24px + env(safe-area-inset-bottom,0px));animation:tlSlideUp 0.28s ease;max-height:85vh;overflow-y:auto;';

  box.innerHTML =
    '<div style="width:36px;height:4px;background:#d1d5db;border-radius:2px;margin:0 auto 16px;"></div>'
    + '<div style="font-size:17px;font-weight:800;color:#1e293b;margin-bottom:4px;">' + title + '</div>'
    + body
    + '<button id="pwa-modal-btn" style="width:100%;padding:14px;background:#1a3a5c;border:none;border-radius:12px;font-size:15px;color:white;font-weight:800;cursor:pointer;margin-top:12px;">' + btnText + '</button>';

  mask.appendChild(box);
  document.body.appendChild(mask);

  mask.addEventListener('click', function(e) {
    if (e.target === mask) _closeModal();
  });

  var btn = document.getElementById('pwa-modal-btn');
  if (btn) {
    btn.addEventListener('click', function() {
      _closeModal();
      if (typeof btnAction === 'function') btnAction();
    });
  }
}

function _closeModal() {
  var el = document.getElementById('pwa-modal-mask');
  if (el) el.remove();
}

// ── 更新/隐藏首页安装卡片 ──
function _updateInstallCardState() {
  var card = document.getElementById('home-install-card');
  if (!card) return;
  var btn = card.querySelector('.install-btn-text');
  if (btn && deferredPrompt) {
    btn.textContent = '立即安装';
  }
}

function _hideInstallCard() {
  var card = document.getElementById('home-install-card');
  if (card) {
    card.style.display = 'none';
    try { localStorage.setItem('pwaInstalled', '1'); } catch(e) {}
  }
}

// ── Toast 提示 ──
function _showToast(msg) {
  var t = document.createElement('div');
  t.style.cssText = 'position:fixed;bottom:90px;left:50%;transform:translateX(-50%);background:#1a3a5c;color:white;padding:10px 20px;border-radius:20px;font-size:14px;font-weight:600;z-index:9999;white-space:nowrap;animation:tlFadeIn 0.2s ease;';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(function() { t.remove(); }, 2500);
}

// ── 注入动画CSS ──
function _injectStyles() {
  if (document.getElementById('tl-pwa-styles')) return;
  var s = document.createElement('style');
  s.id = 'tl-pwa-styles';
  s.textContent = '@keyframes tlSlideUp{from{transform:translateY(40px);opacity:0}to{transform:translateY(0);opacity:1}}'
    + '@keyframes tlFadeIn{from{opacity:0}to{opacity:1}}';
  document.head.appendChild(s);
}

// ── 导航高亮双重保障 ──
document.addEventListener('DOMContentLoaded', setActiveNav);
