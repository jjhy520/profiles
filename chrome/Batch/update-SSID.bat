@Echo Off
cd /d %~dp0
del "Readsshkid.bat"
del "Readssjpid.bat"
del "Readssusid.bat"
wget.exe -N --no-check-certificate https://raw.githubusercontent.com/jjhy520/profiles/master/chrome/Batch/Readsshkid.bat
wget.exe -N --no-check-certificate https://raw.githubusercontent.com/jjhy520/profiles/master/chrome/Batch/Readssjpid.bat
wget.exe -N --no-check-certificate https://raw.githubusercontent.com/jjhy520/profiles/master/chrome/Batch/Readssusid.bat
Readssjpid.bat