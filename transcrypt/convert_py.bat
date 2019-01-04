@ECHO off
REM Auto convert python to javascript for web pages
REM Author: Twan Springeling
REM
REM For initial setup run 'setup.bat'
REM 
REM 
ECHO Activate conda 'transcrypt' environment.
CALL activate transcrypt
REM At this point the specific python environment is active.
REM We can now execute anything:
REM python my_script.py
ECHO Transcrypt hello.py.
transcrypt -b hello.py
ECHO Done transcrypting hello.py, deactivating conda 'transcrypt' environment.
CALL deactivate
ECHO Done