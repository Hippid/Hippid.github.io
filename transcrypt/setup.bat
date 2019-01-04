@ECHO off
REM One click script to automate setting up any python package on windows PCs with a specific virtual environment.
REM 
REM Note: Current version uses Anaconda, but also supports pip ;)
REM Author: Twan Springeling
REM 
REM The following example automates installation of transcrypt in it's own virtual environment.
REM
REM [REMARKS]
REM I chose to keep the script sequential.
REM To install multiple things in parallel you could use the 'start' command.
REM Note: "CALL <x>" is the same as START /wait <x> (Call some function, wait till it's complete and continue.)
REM [Parallel Examples]
REM Run a script in a new window and close it when done:
REM 	START "Window title" CMD /c something.bat SomeParam
REM Run a command without creating a new window (note:  Ctrl-C will be ignored, use Ctrl-Break)
REM 	START /b something.bat SomeParam
REM Opens a second command window and leave open the CMD prompt when done.
REM 	START cmd /k something.bat SomeParam
REM 
REM "Window title" is optional
REM "something.bat SomeParam" can be changed to any windows command, not just bat files.
REM "SomeParam" is optional.
REM "cmd /c" Closes the window after command was run.
REM
REM [Future] Check if environment already exists
REM conda env list
REM [Future] Check if package already exists
REM [Future] Use requirement.txt | environment.yml files
REM [Future] Check for errors
ECHO Create a new 'conda' virtual environment, called 'transcrypt'
conda create --yes --name transcrypt python=3.7 pip
ECHO Use the new environtment
REM MacOS / Linux: source activate myenv
CALL activate transcrypt
ECHO Use pip to install transcrypt inside the 'transcrypt' conda environment
pip install transcrypt
ECHO Done installing 'transcrypt' package into 'transcrypt' environment, deactivating conda 'transcrypt' environment.
CALL deactivate
ECHO Done