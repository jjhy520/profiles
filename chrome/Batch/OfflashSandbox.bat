@Echo Off
Title һ��Flash��ɳ��
Pushd %~dp0
If "%PROCESSOR_ARCHITECTURE%"=="AMD64" (Set b=%SystemRoot%\SysWOW64) Else (Set b=%SystemRoot%\system32)
Rd "%b%\test_permission_JayXon" 2>nul
Md "%b%\test_permission_JayXon" 2>nul||(Echo ��ʹ���Ҽ�����Ա���������������ٹر�Flashɳ��&&Pause >nul&&Exit)
Rd "%b%\test_permission_JayXon" 2>nul
Set p=Profiles
SetLocal EnableDelayedExpansion
:Menu
Cls

rem �ж�64λϵͳ��32λϵͳ
if /i %PROCESSOR_IDENTIFIER:~0,3%==x86 (
    echo 32λ����ϵͳ
    md "%windir%\System32\Macromed\Flash"
    >%windir%\System32\Macromed\Flash\mms.cfg (
echo SilentAutoUpdateEnable=0
echo AutoUpdateDisable=1
echo RTMFPP2PDisable=1
echo ProtectedMode=0
)
) else (
    echo 64λ����ϵͳ
    md "%windir%\SysWOW64\Macromed\Flash"
    >%windir%\SysWOW64\Macromed\Flash\mms.cfg (
echo SilentAutoUpdateEnable=0
echo AutoUpdateDisable=1
echo RTMFPP2PDisable=1
echo ProtectedMode=0
)
)
ECHO.&ECHO.�ѳɹ��ر�FLASHɳ��,�밴������˳�! &PAUSE >NUL 2>NUL