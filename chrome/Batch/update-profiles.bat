@Echo Off
cd /d %~dp0
rd "profiles" /s/q
wget.exe -N --no-check-certificate https://github.com/jjhy520/profiles/archive/master.zip
7z.exe x master.zip -y
ren profiles-master profiles
profiles\chrome\Batch\update-profilesRenFile.bat
xcopy "profiles" ..\..\ /s /y /i
rd "profiles" /s/q
del "master.zip"
