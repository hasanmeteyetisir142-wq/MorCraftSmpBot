@echo off
chcp 65001 >nul
title MorCraftSmp Bot
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js bulunamadi. Once https://nodejs.org adresinden LTS surumunu kur.
  pause
  exit /b 1
)
if not exist .env (
  copy .env.example .env >nul
  echo .env ayar dosyasi olusturuldu. Gerekirse bilgileri duzenle.
)
if not exist node_modules (
  echo Gerekli paketler kuruluyor...
  call npm install
  if errorlevel 1 pause & exit /b 1
)
echo MorCraftBot baslatiliyor...
call npm start
echo.
echo Bot durdu. Pencereyi kapatmak icin bir tusa bas.
pause
