@echo off
chcp 65001 >nul
echo.
echo ╔══════════════════════════════════════════╗
echo ║      TripLite 一键推送到 GitHub          ║
echo ╚══════════════════════════════════════════╝
echo.

:: 切换到脚本所在目录（即项目目录）
cd /d "%~dp0"

echo [1/4] 检查项目目录...
echo 当前目录: %cd%
echo.

echo [2/4] 添加所有修改的文件...
git add .
echo.

echo [3/4] 提交更改...
git commit -m "v1.13: 修复地图/应急/天气页JS语法错误-修复涂鸦文字放置-修复PWA icon-512空文件-规范manifest"
echo.

echo [4/4] 推送到 GitHub...
git push
echo.

echo ══════════════════════════════════════════
echo.
if %errorlevel% == 0 (
    echo ✅ 推送成功！
    echo.
    echo Cloudflare 将在 1-2 分钟内自动重新部署。
    echo.
    echo 测试页面:
    echo   首页:    https://triplite.cn
    echo   行程:    https://triplite.cn/trip
    echo   地图:    https://triplite.cn/map
    echo   清单:    https://triplite.cn/checklist
    echo   天气:    https://triplite.cn/weather
    echo   住宿:    https://triplite.cn/stay
    echo   应急:    https://triplite.cn/emergency
    echo   预算:    https://triplite.cn/budget
    echo   涂鸦:    https://triplite.cn/note
) else (
    echo ❌ 推送失败，请截图查看错误信息。
)
echo.
pause
