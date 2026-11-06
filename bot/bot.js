require("dotenv").config();
const mineflayer = require("mineflayer");

const config = {
  host: process.env.MC_HOST || "MorCraftSmp.aternos.me",
  port: Number(process.env.MC_PORT || 25565),
  version: process.env.MC_VERSION || "1.21.8",
  username: process.env.BOT_USERNAME || "MorCraftBot",
  auth: process.env.MC_AUTH || "offline",
  admin: process.env.BOT_ADMIN || ""
};

let bot;
let stopping = false;

function startBot() {
  console.log(`[MorCraftBot] ${config.host}:${config.port} sürüm=${config.version}`);
  bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username,
    auth: config.auth,
    version: config.version,
    hideErrors: false
  });

  bot.once("login", () => console.log("[MorCraftBot] Sunucuya giriş yapıldı."));
  bot.once("spawn", () => console.log("[MorCraftBot] Dünyaya giriş tamamlandı."));
  bot.on("kicked", reason => console.log("[MorCraftBot] Sunucudan atıldı:", reason));
  bot.on("error", err => console.error("[MorCraftBot] Bağlantı hatası:", err.message));
  bot.on("end", () => {
    console.log("[MorCraftBot] Bağlantı sona erdi. Otomatik tekrar bağlanma kapalı.");
    stopping = true;
  });

  bot.on("chat", (username, message) => {
    if (username === bot.username) return;
    const text = message.trim().toLowerCase();
    if (text === "!bot" || text === "!yardim") {
      bot.chat("MorCraftBot aktif! Komutlar: !bot, !oyuncular");
    } else if (text === "!oyuncular") {
      const names = Object.keys(bot.players);
      bot.chat(`Çevrimiçi oyuncular (${names.length}): ${names.slice(0, 10).join(", ") || "yok"}`);
    }
  });
}

process.on("SIGINT", () => {
  stopping = true;
  if (bot) bot.quit("Kapatılıyor");
  process.exit(0);
});

startBot();
