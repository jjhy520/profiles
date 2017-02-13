@Echo Off
cd /d %~dp0
copy /y "gui-config.jsonbak1" gui-config.json
copy /y "gui-config.jsonbak2" gui-config.jsonbak1
copy /y "gui-config.jsonbak3" gui-config.jsonbak2
copy /y "gui-config.jsonbak4" gui-config.jsonbak3
copy /y "gui-config.jsonbak5" gui-config.jsonbak4
taskkill /f /im Shadowsocks.exe
start Shadowsocks.exe
exit
