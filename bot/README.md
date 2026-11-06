# MorCraftBot

MorCraftSmp için Mineflayer tabanlı Java Edition sohbet botu.

## Gereksinimler
- Node.js 20 veya üzeri
- Sunucunun erişilebilir olması
- Sunucu kimlik doğrulama ayarına uygun hesap

## Kurulum
1. Bu klasörü botu çalıştıracağın bilgisayara/Node.js barındırma ortamına indir.
2. `npm install` çalıştır.
3. `.env.example` dosyasını `.env` olarak kopyala.
4. Sunucu ayarlarına uygun kimlik doğrulamayı seç ve kendi Minecraft hesabını kullan.
5. `npm start` çalıştır.

## Önemli
- Microsoft hesabı parolasını veya oturum belirtecini kimseyle paylaşma; bunları GitHub'a yükleme.
- `MC_AUTH=microsoft` çevrimiçi mod sunucular içindir. `offline` yalnızca sunucu sahibi offline/cracked erişimi etkinleştirmişse kullanılabilir.
- Botun bağlanabilmesi Aternos'un bot bağlantılarına izin vermesine ve sunucu kurallarına bağlıdır. Aternos'un AFK/çevrimiçi kalma sınırlarını aşmaya çalışmaz; otomatik yeniden bağlanma özellikle kapalıdır.
- Bu bot şu an yalnızca `!bot`, `!yardim` ve `!oyuncular` sohbet komutlarını yanıtlar. Sunucu yönetim komutları için yetki ve güvenli bir entegrasyon gerekir.
- GitHub Pages yalnızca web panelini barındırır; bu Node.js botunu çalıştırmaz. Bot için ayrı, sürekli çalışan bir Node.js ortamı gerekir. Ücretsiz servislerin uyku/kota sınırları olabilir.
