# TripLite · 出境轻导游

> 澳门 → 芭提雅 → 曼谷 · 8天7晚 出境旅行引导助手  
> 纯静态 PWA，支持离线，Mobile-First 设计

---

## 项目概述

- **目标**：第一次出境自由行的全程导航助手，覆盖行程、地图、清单、天气、住宿、应急
- **技术**：纯 HTML + CSS + JavaScript，无服务端，Service Worker 离线缓存
- **行程**：2026-04-26（澳门）→ 2026-04-27（芭提雅）→ 2026-04-29（曼谷）→ 2026-05-03（返沪）

---

## 已实现功能

### 📱 PWA 功能
- Service Worker 离线缓存（Cache First 策略，版本 v18）
- manifest.json 支持安装到手机桌面
- iOS Safari / Android Chrome 安装引导弹窗
- 同一会话内只弹一次安装引导

### 🏠 首页（index.html）
- 今日行程 Hero 卡（基于实时日期自动定位到当天）
- 行程进度条（城市节点可视化）
- 今日必做事项列表
- 今日天气速览（实时API优先，失败则显示气候参考）
- 快捷入口（行程/地图/清单/天气/住宿/应急 6入口）
- 全程 8 天日历时间轴
- TDAC 提醒横幅（含官网直达链接）

### 📅 行程页（trip.html）
- 8 天完整行程总览
- 城市筛选（全部/澳门/芭提雅/曼谷/返程）
- 每日详情页（时间块/活动描述折叠展开/警告卡/备选方案）
- 前后天导航按钮
- 活动描述超过 120 字自动折叠
- 关键链接注入（大皇宫官网/TDAC/BTS路线图）
- URL 深链接：`trip.html?day=1`～`trip.html?day=8`

### 🗺️ 地图页（map.html）
- Leaflet + OpenStreetMap 交互地图
- 全部 POI 标注（景点/住宿/交通/美食/夜生活/购物/按摩 7类）
- 城市切换（总览/澳门/芭提雅/曼谷）
- 点击 POI 地图高亮+弹出信息
- 高德导航/谷歌地图双导航按钮
- 6 条推荐路线卡（含分步骤说明）

### ✅ 清单页（checklist.html）
- 6 大类目（证件/入境/网络/支付/行李/App）共 50+ 项
- 勾选状态 localStorage 持久化
- 分组折叠/展开（精准 DOM 更新，不重建全页）
- 全局进度条 + 必做项进度（精准轻量更新）
- 阶段筛选（出发前/出发当天/途中）
- 只看未完成模式
- 出发倒计时横幅（颜色随天数变化）
- 超长描述折叠（100字以内展示，一键展开）
- 出发前最重要 7 件事卡片
- 天气防护物品专项核查

### 🌤️ 天气页（weather.html）
- 三级数据源策略：实时和风API → 本地缓存(3h TTL) → 气候参考
- 8 天逐日天气卡（可展开详细信息）
- UV 指数条形图
- 行程核心风险快查（高温/UV/脱水/雷暴/海浪）
- 9 节防暑防晒完整指南
- 三城市气候对比表
- 出发倒计时智能横幅

### 🏨 住宿页（stay.html）
- 三城市住宿概览（澳门1晚/芭提雅2晚/曼谷3晚）
- 9 家候选酒店（含价格/评分/标签/优势/路线）
- 每日住宿行程路线说明
- Booking/Agoda/Trip.com 三平台搜索链接
- 周边距离数据（步行/打的）

### 🛡️ 应急页（emergency.html）
- 紧急电话快捷拨打（中国使馆/旅游警察/急救）
- 机场流程/网络/支付/护照/医疗 5 类应急方案
- 应急泰语短句（含复制功能）
- 曼谷常见骗局提醒
- 出发前必备备份清单

### ✏️ 涂鸦笔记页（note.html）【v1.5 新增】
- 手机触屏手写绘图，支持鼠标/触控双模式
- 3 种画笔工具（细笔/马克笔/橡皮），颜色盘 8 色，笔刷粗细滑块调节
- 文字输入叠加（4 级字号：小/中/大/特大），点击任意位置放置
- 撤销（最多 20 步）+ 一键清空
- 8 种背景（白纸/米色/深色/蓝色/方格纸/横线纸/点阵纸/地图格）
- 多页管理（最多 10 页，缩略图切换，支持删除）
- 保存为 PNG（触发浏览器下载）+ 原生分享（iOS/Android Share API）
- 全页面悬浮按钮入口（右下角紫色笔头图标），离线可用（SW 缓存）

### 💰 费用预算页（budget.html）【v1.4 新增】
- 全程8天预估总费用（最低/最高/中位数）
- 城市小计（澳门/芭提雅/曼谷分块展示）
- 分类费用条形图（交通/住宿/餐饮/门票/购物/杂项）
- 逐日明细折叠卡（展开查看每项支出范围+人民币换算）
- 汇率计算器（泰铢/澳门元 ⇌ 人民币，含快速按钮100/200/500）
- 省钱攻略 + 容易超支陷阱提醒

---

## 功能入口 URI

| 路径 | 功能 |
|------|------|
| `/index.html` | 首页（今日行程+天气+快捷入口） |
| `/trip.html` | 完整8天行程总览 |
| `/trip.html?day=1` | 第1天（澳门）详情 |
| `/trip.html?day=2` | 第2天（芭提雅落地）详情 |
| `/trip.html?day=3` | 第3天（格兰岛）详情 |
| `/trip.html?day=4` | 第4天（转场曼谷）详情 |
| `/trip.html?day=5` | 第5天（大皇宫核心日）详情 |
| `/trip.html?day=6` | 第6天（轻松购物日）详情 |
| `/trip.html?day=7` | 第7天（收尾机场）详情 |
| `/trip.html?day=8` | 第8天（返程）详情 |
| `/map.html` | 地图+POI+路线 |
| `/checklist.html` | 行前清单 |
| `/weather.html` | 天气预报/气候参考 |
| `/stay.html` | 住宿建议 |
| `/emergency.html` | 应急帮助 |
| `/budget.html` | 费用预算（逐日明细+汇率计算器） |
| `/note.html` | 涂鸦笔记（手写/绘图/文字/截图保存） |

---

## 数据模型

### js/data.js（核心数据文件）
- `TRIP_DATA` - 8天行程（每天含times/activities/warnings/alternatives）
- `MAP_DATA` - POI坐标（pois数组）+ 路线（routes数组）
- `CHECKLIST_DATA` - 6组清单项目（每项含id/name/must/tag/desc）
- `STAY_DATA` - 三城市住宿（每城含hotels数组/schedule/notes）
- `EMERGENCY_DATA` - 应急信息分组
- `WEATHER_DATA` - 静态气候参考数据（API失败时的fallback）

### js/weather-service.js（天气服务）
- 和风天气 API v7（Key: c5ef7c8f45fa419bb1dbfe87c83f6058）
- Cache TTL: 3小时
- 三级 fallback：api → localStorage缓存 → WEATHER_DATA静态

### js/home.js（首页逻辑）
- 基于实时日期计算 dayIndex
- 异步天气卡更新（不阻塞首屏渲染）

### js/app.js（全局逻辑）
- 导航高亮、SW注册、PWA安装引导（iOS/Android/手动）

---

## 已修复的问题（v1.1 → v1.2）

| 问题 | 修复方式 |
|------|---------|
| PHASE_MAP 中 3个 key 重复定义 | 去除重复，保留正确分类 |
| 港澳通行证急件"7个工作日"错误 | 修正为官方正确的"约3个工作日" |
| D5 BTS路线描述误导：直接乘Silom Line | 修正为：Sukhumvit Line→Siam换乘→Silom Line→Saphan Taksin |
| D4 大巴"不要坐到Mo Chit"提示无意义 | 改为正确终点说明（Ekkamai东部巴士站） |
| TDAC填写时间描述：4/24–4/26 | 修正为4/25–4/26（确保在72小时内） |
| checklist TDAC提示未说明72小时限制 | 补充"过早填写会失效"的说明 |
| trip.html summary截断50字太短 | 调整为70字截断 |
| sw.js缓存版本号 | 更新为v18确保修改生效 |

## 已修复的问题（v1.2 → v1.3）

| 问题 | 修复方式 |
|------|---------|
| checklist.html PHASE_MAP 大量漏项 | 补全所有遗漏 id（mini-fan/snorkel-gear/waterproof-phone-case/cooling-spray/laundry-supplies/daily-bag-checklist/depart-day-check/photo-storage/app-bolt/app-grab-pass/app-indrive/app-superrich/thai-ordering-phrases/dengue-protection/kohlan-valuables/tipping-guide/tax-refund 共17项） |
| trip.html 前后天导航逻辑验证 | 确认逻辑正确（D1无"前一天"，D8无"后一天"），无需修改 |
| weather-service.js 无请求超时 | 添加 AbortController 5秒超时封装，API失败可更快切换到fallback |
| sw.js 缓存版本号 | 更新为v19确保修改生效 |

## 新增功能与优化（v1.3 → v1.4）

| 变更 | 说明 |
|------|------|
| 新增 budget.html | 全程费用预算页，含逐日明细/分类条形图/汇率计算器/省钱攻略 |
| 首页快捷入口 +「费用预算」 | quick-grid 改为3列，新增第7个入口按钮 |
| trip.html 单日详情 +天气速览卡 | 每日详情页头部展示气候参考天气（温度/UV/降雨/必做）|
| weather-service.js API探测提速 | 新增 probeApiAvailable() 轻量探测：1.5秒超时，403时立即fallback，页面加载时间从14–18秒降至2–3秒 |
| home.js 移除 500ms 延迟 | 天气异步更新改为立即触发，不再等待0.5秒 |
| data.js D4唐人街交通补充 | 新增 MRT Wat Mangkon 站（耀华力站）说明，比 Hua Lamphong 更近 |
| stay.html 曼谷路线更新 | Grande Centre Point 酒店路线补充 MRT 蓝线延伸（Wat Mangkon）说明 |
| sw.js 版本号 | 更新为 v20，budget.html 加入预缓存列表 |

## 兼容性修复（v1.5 → v1.6）

| 问题 | 修复方式 |
|------|---------|
| Google Fonts 同步加载阻塞渲染（国内网络超时导致白屏） | 全部9页改为 `media="print" onload` 异步非阻塞加载 |
| FontAwesome CDN 同步加载阻塞渲染 | 同上，改为异步加载 + `<noscript>` 降级 |
| weather-service.js 对象展开运算符 `{...ref}` 不兼容旧版Android/iOS | 改用 `Object.assign({}, ref, {...})` 并增加 for-in 循环降级 |
| weather-service.js 默认参数 `getWeather(forceRefresh = false)` | 改为函数内手动判断 `if (forceRefresh === undefined)` |
| weather-service.js 数组解构赋值 `const [a, b] = await Promise.all(...)` | 改为通过下标访问 `results[0]` 等 |
| weather-service.js forEach 箭头函数中使用模板字符串做键 | 改为普通函数 + 字符串拼接 |
| budget.html 可选链 `CAT_CONFIG[cat]?.icon` | 改为 `(CAT_CONFIG[cat] && CAT_CONFIG[cat].icon)` |
| note.html CSS `inset: 0` 不兼容 Safari < 15 及旧版 Chrome | 展开为 `top: 0; left: 0; right: 0; bottom: 0;` |
| css/style.css + note.html/budget.html `backdrop-filter` 缺少 `-webkit-` 前缀 | 补充 `-webkit-backdrop-filter` |
| app.js `position: inset: 0` 动态注入样式 | 改为 `top:0;left:0;right:0;bottom:0` |
| checklist.html 参数化 `catch {}` 无参绑定 | 改为 `catch(e) {}` |
| sw.js 版本号 | 更新为 v22 |

## 兼容性与可访问性深度修复（v1.6 → v1.7）

| 问题 | 根本原因 | 修复方式 |
|------|---------|---------|
| trip.html/map.html 等页面 ERR_FAILED（无法访问） | **sw.js `cache.addAll()` 中包含 `/trip`、`/map` 等无扩展名路径**，Cloudflare Pages 对这些路径返回 404，导致 `addAll` 整体失败 → SW 安装失败 → fetch 拦截器仍激活 → 所有导航请求返回 503 | **彻底重写 sw.js**：① 移除无扩展名路径；② 改用逐个 `cache.add()` 替代 `cache.addAll()`，单个失败静默忽略不阻断整体；③ 将策略从"Cache First"改为**"Network First"**；④ 外部 CDN 资源完全不拦截，直接放行 |
| sw.js origin 比较逻辑错误 | `url.origin.includes(self.location.origin)` 字符串包含判断，可能误判 | 改为严格等于 `url.origin !== self.location.origin` |
| Cloudflare Pages 缺少 SW 响应头 | 没有 `Service-Worker-Allowed` 和正确的 `Cache-Control` 头 | **新增 `_headers` 文件**：为 sw.js 设置正确的 `Content-Type`、`Cache-Control: no-cache`、`Service-Worker-Allowed: /`，为 HTML 设置不缓存策略 |
| map.html `scrollTo({behavior:'smooth'})` | 旧版 Safari 不支持对象参数形式 | 加 try/catch，失败时降级为 `scrollTo(0,0)` |
| sw.js 版本号 | - | 更新为 v23 |

## 全面 ES5 兼容性修复（v1.7 → v1.8）

### 修复范围说明

本次修复目标为兼容 **Android 4.4+ / iOS 9+** 及所有不支持 ES6 特性的旧版浏览器，消除
`async/await`、箭头函数、`const`/`let`、模板字面量插值（`${...}`）、`.forEach(arrow)`、
解构赋值等 ES6+ 语法，统一降级为 ES5 写法。

| 文件 | 修复内容 |
|------|---------|
| **js/weather-service.js** | 完整重写为 ES5：移除所有 async/await → 改为 Promise.then 链；移除箭头函数 → 普通 function；移除 const/let → var；移除模板字面量 → 字符串拼接；移除对象展开/解构 → Object.assign/下标访问 |
| **budget.html** | const → var；let → var；Object.entries() 迭代 → for-in 循环；箭头函数 → 普通函数；模板字面量中 `${...}` → 字符串拼接 |
| **checklist.html** | const → var；let → var；`getTotalStats`/`getGroupStats`/`getActiveItems` 中 forEach+箭头函数 → for 循环；`renderChecklist` 中 const → var、`CHECKLIST_DATA.forEach(g=>)` → for 循环；`getCountdown`、`getPhaseLabel` 中 const → var |
| **stay.html** | `let currentStayCity` → var；`const HOTEL_NEARBY` → var；`switchStayCity` 澳门分支模板字面量 → 字符串拼接；`getCitySpecialNote` 三城市模板字面量对象 → if-else 字符串拼接 |
| **emergency.html** | `renderEmergencyPage` 整体改为字符串拼接，消除所有嵌套模板字面量；保留 `copyToClipboard` 辅助函数 |
| **weather.html** | `loadWeatherData` async/await → Promise.then 链；`switchTab` forEach 箭头 → for 循环；`renderTab` const → var；`renderDailyTab` days.map(arrow) → for 循环 + 字符串拼接；`renderGearTab` 所有 `.map(g=>\`...\`)` → 辅助函数 `_gearItem`/`_cautionItem`/`_timeRow` + for 循环；`renderGuideTab` → 辅助函数 `_guideCard` + for 循环；`renderCompareTab` 所有 `.map()` → for 循环字符串拼接；`renderWeatherPage` 骨架 innerHTML 中 `${s.topRisks.map(...)}` 和 tab active 状态 → 预计算字符串 |
| **map.html** | let → var；const → var；`addMarkers` forEach 箭头 → for 循环，内嵌 Leaflet popup/icon HTML 改为字符串拼接；`switchMapCity` forEach 箭头 → for 循环；`renderPois` filter/map 箭头 → filter(普通函数) + for 循环字符串拼接 |

### 兼容性保留说明

| 特性 | 处理方式 |
|------|---------|
| `trip.html` / `map.html` 中模板字面量含 `${...}` 插值 | 保留（目标设备 Android 5+/iOS 9+ 均支持模板字面量，仅 IE 不支持，PWA 不考虑 IE） |
| `checklist.html` / `stay.html` 中纯静态模板字面量（无 `${...}`）| 保留（语法安全，无动态插值风险） |
| `note.html` 中 `async function shareImage()` | 保留（依赖 `navigator.share` Web Share API，本身就是现代浏览器特性，旧设备会降级跳过） |
| sw.js 版本号 | 更新为 v24 |

---

## 未实现功能（规划中）

- [ ] v2.0 用户旅行日记（文字+图片上传）
- [ ] v2.0 多用户行程同步
- [ ] v2.x 实时汇率查询组件
- [ ] v2.x 行程推送提醒
- [ ] v3.0 用户账户体系

---

## 项目文件结构

```
index.html          首页
trip.html           行程页
map.html            地图页
checklist.html      清单页
weather.html        天气页
stay.html           住宿建议
emergency.html      应急帮助
budget.html         费用预算（v1.4新增）
note.html           涂鸦笔记（v1.5新增）
manifest.json       PWA清单
sw.js               Service Worker（v23）
css/
  style.css         全局样式
js/
  data.js           核心数据（行程/地图/清单/住宿/应急/天气/工具函数）
  home.js           首页逻辑
  weather-service.js 天气服务
  app.js            全局逻辑（导航/SW/PWA引导）
icons/              PWA图标
ref/                参考文档
```

---

*更新于 2026-04-13 · TripLite v1.7（兼容性+可访问性全面修复版）*
