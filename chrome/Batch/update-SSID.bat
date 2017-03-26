@Echo Off
cd /d %~dp0
wget.exe -N --no-check-certificate https://raw.githubusercontent.com/jjhy520/profiles/master/chrome/0000Shadowsocks.uc.js
copy /y "0000Shadowsocks.uc.js" ..\0000Shadowsocks.uc.js