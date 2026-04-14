#!/bin/bash
# ============================================================
# TripLite · 从 Genspark 同步最新文件到本地 D:\triplite
# 使用方法：在 Git Bash 中执行：
#   bash sync-from-genspark.sh <发布URL>
# 示例：
#   bash sync-from-genspark.sh https://xxxxx.genspark.site
# ============================================================

S="${1}"
if [ -z "$S" ]; then
  echo "❌ 请提供 Genspark 发布 URL，例如："
  echo "   bash sync-from-genspark.sh https://xxxxx.genspark.site"
  exit 1
fi

# 去掉末尾斜杠
S="${S%/}"
DEST="/d/triplite"

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║   TripLite · 从 Genspark 同步最新文件        ║"
echo "╚══════════════════════════════════════════════╝"
echo ""
echo "源站: $S"
echo "目标: $DEST"
echo ""

cd "$DEST" || { echo "❌ 找不到目录 $DEST"; exit 1; }

# 需要同步的文件列表
FILES=(
  "index.html"
  "trip.html"
  "map.html"
  "checklist.html"
  "stay.html"
  "emergency.html"
  "weather.html"
  "budget.html"
  "note.html"
  "manifest.json"
  "sw.js"
  "_headers"
  "push.bat"
  "js/data.js"
  "js/app.js"
  "js/home.js"
  "js/weather-service.js"
  "css/style.css"
)

OK=0
FAIL=0

for f in "${FILES[@]}"; do
  # 确保目标子目录存在
  dir=$(dirname "$f")
  if [ "$dir" != "." ]; then
    mkdir -p "$DEST/$dir"
  fi

  url="$S/$f"
  dest="$DEST/$f"
  http_code=$(curl -s -o "$dest" -w "%{http_code}" "$url")

  if [ "$http_code" = "200" ]; then
    echo "  ✅  $f"
    OK=$((OK+1))
  else
    echo "  ⚠️  $f  (HTTP $http_code，跳过)"
    FAIL=$((FAIL+1))
  fi
done

echo ""
echo "══════════════════════════════════════════════"
echo "  同步完成：✅ $OK 个成功  ⚠️ $FAIL 个跳过"
echo ""
echo "  下一步：确认文件无误后执行推送"
echo "    git add . && git commit -m \"sync\" && git push"
echo "══════════════════════════════════════════════"
echo ""
