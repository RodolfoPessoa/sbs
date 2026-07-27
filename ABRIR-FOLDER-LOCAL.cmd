@echo off
setlocal
cd /d "%~dp0"
set "PATH=C:\Users\rodol\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;%PATH%"
start "Servidor do Folder" cmd /k call "C:\Users\rodol\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd" run dev
timeout /t 4 /nobreak >nul
start "" http://localhost:3000
endlocal
