import "dotenv/config";
import TelegramBot from "node-telegram-bot-api";
import { appendRow, readRows } from "./sheets.js";

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🤖 Bot connected to Google Sheets!");
});

// bot.onText(/\/add (.+)/, async (msg, match) => {
//   const chatId = msg.chat.id;
//   const text = match[1];

//   await appendRow({ Message: text, User: msg.from.username });
//   bot.sendMessage(chatId, "✅ Data added to Google Sheet");
// });
bot.onText(/\/add (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  try {
    const text = match[1];
    await appendRow({ Message: text, User: msg.from.username });
    bot.sendMessage(chatId, `✅ Added: "${text}"`);
    console.log(`Row added: ${text} by ${msg.from.username}`);
  } catch (err) {
    console.error("Failed to append row:", err);
    bot.sendMessage(chatId, "❌ Failed to add data to Google Sheet");
  }
});


bot.onText(/\/read/, async (msg) => {
  const chatId = msg.chat.id;
  const rows = await readRows();

  if (rows.length === 0) {
    bot.sendMessage(chatId, "Sheet is empty.");
    return;
  }

  const last = rows[rows.length - 1];
  bot.sendMessage(chatId, `📄 Last entry:\n${JSON.stringify(last._rawData)}`);
});