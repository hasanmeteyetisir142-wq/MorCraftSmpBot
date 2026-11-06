require("dotenv").config();
const mineflayer = require("mineflayer");
const http = require("node:http");

// Render Web Service health endpoint. This does not keep a free service awake.
const healthServer = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ service: "MorCraftBot", minecraftConnected: Boolean(bot && bot.player) }));
    return;
  }
  res.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
  res.end("MorCraftBot servisi hazır.");
});
healthServer.listen(Number(process.env.PORT || 3000), "0.0.0.0", () => {
  console.log("[MorCraftBot] HTTP sağlık sunucusu hazır.");
});

const config = {
  host: process.env.MC_HOST || "MorCraftSmp.aternos.me",
  port: Number(process.env.MC_PORT || 25565),
  version: process.env.MC_VERSION || "1.21.8",
  username: process.env.BOT_USERNAME || "MorCraftBot",
  auth: process.env.MC_AUTH || "offline"
};

let bot;
let welcomeTimer;
let shuttingDown = false;
const lastReplyByPlayer = new Map();
const REPLY_COOLDOWN_MS = 5000;

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
  bot.once("spawn", () => {
    console.log("[MorCraftBot] Dünyaya giriş tamamlandı.");
    clearTimeout(welcomeTimer);
    welcomeTimer = setTimeout(() => {
      if (bot && bot.player) bot.chat("MorCraftSmp'ye hoş geldiniz!");
    }, 3000);
  });

  bot.on("chat", (username, message) => {
    if (!username || username === bot.username) return;

    const now = Date.now();
    const previous = lastReplyByPlayer.get(username) || 0;
    if (now - previous < REPLY_COOLDOWN_MS) return;

    const command = message.trim().toLocaleLowerCase("tr-TR");
    let reply = null;

    if (command === "!bot" || command === "!yardim") {
      reply = "MorCraftBot aktif! Komutlar: !bot, !oyuncular";
    } else if (command === "!oyuncular") {
      const names = Object.keys(bot.players);
      reply = `Çevrimiçi oyuncular (${names.length}): ${names.slice(0, 10).join(", ") || "yok"}`;
    }

    if (reply) {
      lastReplyByPlayer.set(username, now);
      bot.chat(reply);
    }
  });

  bot.on("kicked", reason => console.log("[MorCraftBot] Sunucudan atıldı:", reason));
  bot.on("error", err => console.error("[MorCraftBot] Bağlantı hatası:", err.message));
  bot.on("end", () => {
    clearTimeout(welcomeTimer);
    console.log("[MorCraftBot] Bağlantı sona erdi. Otomatik tekrar bağlanma kapalı.");
  });
}

function shutdown() {
  if (shuttingDown) return;
  shuttingDown = true;
  clearTimeout(welcomeTimer);
  if (bot) bot.quit("Kapatılıyor");
  setTimeout(() => process.exit(0), 250);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

startBot();
