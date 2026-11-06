# MorCraftBot bulut barindirma

## Gercek durum
- GitHub Pages Node.js bot surecini calistirmaz.
- Render ucretsiz web servislerini 15 dakika gelen trafik olmazsa uyutur; kalici Minecraft botu icin uygun degildir.
- Koyeb ucretsiz instance 1 saat trafik almazsa sifira iner; surekli oyuncu botu icin garanti degildir.
- Oracle Cloud Always Free VM, uygun kapasite ve hesap onayi varsa Node.js surecini uzun sure calistirmak icin en uygun ucretsiz secenektir. Oracle bos/az kullanilan ucretsiz makineleri geri alabilir; 7/24 garanti degildir.

## Oracle VM hazir oldugunda
Ubuntu 22.04/24.04 VM olustur, SSH ile baglan ve su komutlari calistir:

```bash
sudo apt update && sudo apt install -y git curl
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
git clone https://github.com/hasanmeteyetisir142-wq/MorCraftSmpBot.git
cd MorCraftSmpBot/bot
cp .env.example .env
nano .env
npm install --omit=dev
node bot.js
```

Bu ilk test icindir. Terminal kapandiginda surec durabilir; kalici servis icin systemd ayari yapilmalidir. `.env` dosyasini GitHub'a yukleme. Microsoft parolasi, Aternos sifresi veya oturum belirteci paylasma. Aternos kurallarini veya AFK sinirlarini asmaya yonelik ayar kullanma.
