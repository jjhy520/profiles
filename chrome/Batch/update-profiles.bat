@Echo Off
cd /d %~dp0
wget.exe -N --no-check-certificate https://github.com/jjhy520/profiles/archive/master.zip
7z.exe x master.zip -y
ren profiles-master profiles
xcopy "profiles" ..\..\ /s /y /i
rd "profiles-master" /s/q
del "master.zip"
