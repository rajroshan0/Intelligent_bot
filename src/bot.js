
import "dotenv/config";
import TelegramBot from "node-telegram-bot-api";
import { saveInstagramStory02ToSheet } from "./googleSheets/writeInstagramStory02.js";

import { parseInstagramLink } from "./utils/instagramParser.js";
import { testInstagramStoryActor02 } from "./apify/testInstagramStoryActor02.js";
import { saveInputToTestASheet } from "./googleSheets/writetestA.js";




const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
bot.onText(/\/add (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const rawInput = match[1];

    try {
        const parsed = parseInstagramLink(rawInput);

        if (!parsed.username || typeof parsed.username !== "string") {
            return bot.sendMessage(chatId, "Could not extract username from link");
        }

        // Save input to testA sheet
        await saveInputToTestASheet({
            Message: parsed.username,
            User: msg.from.username || msg.from.id,
            StoryID: parsed.storyId || "",
        });

        // Call actor
        const results = await testInstagramStoryActor02(parsed.username);

        if (!results.length) {
            return bot.sendMessage(chatId, " No stories found for this user.");
        }

        // Match by StoryID if provided
        let matched = results;
        if (parsed.storyId) {
            matched = results.filter(item => item.storyId === parsed.storyId);
        }

        if (!matched.length) {
            return bot.sendMessage(chatId, " No matching story found.");
        }

        // Send all matched stories directly as videos
        for (const story of matched) {
            await bot.sendVideo(chatId, story.videoUrl, {
                caption: ` Story from ${story.username}\n ${story.takenAt}`
            });
        }

    } catch (err) {
        console.error("Add command error:", err);
        bot.sendMessage(chatId, "Invalid Instagram link or processing failed");
    }
});