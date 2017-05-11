@Echo Off
Title 一键Flash免沙箱
Pushd %~dp0
If "%PROCESSOR_ARCHITECTURE%"=="AMD64" (Set b=%SystemRoot%\SysWOW64) Else (Set b=%SystemRoot%\system32)
Rd "%b%\test_permission_JayXon" 2>nul
Md "%b%\test_permission_JayXon" 2>nul||(Echo 请使用右键管理员身份运行浏览器后再关闭Flash沙箱&&Pause >nul&&Exit)
Rd "%b%\test_permission_JayXon" 2>nul
Set p=Profiles
SetLocal EnableDelayedExpansion
:Menu
Cls

rem 判断64位系统和32位系统
if /i %PROCESSOR_IDENTIFIER:~0,3%==x86 (
    echo 32位操作系统
    md "%windir%\System32\Macromed\Flash"
    >%windir%\System32\Macromed\Flash\mms.cfg (
echo SilentAutoUpdateEnable=0
echo AutoUpdateDisable=1
echo RTMFPP2PDisable=1
echo ProtectedMode=0
)
) else (
    echo 64位操作系统
    md "%windir%\SysWOW64\Macromed\Flash"
    >%windir%\SysWOW64\Macromed\Flash\mms.cfg (
echo SilentAutoUpdateEnable=0
echo AutoUpdateDisable=1
echo RTMFPP2PDisable=1
echo ProtectedMode=0
)
)
ECHO.&ECHO.已成功关闭FLASH沙箱,请按任意键退出! &PAUSE >NUL 2>NUL