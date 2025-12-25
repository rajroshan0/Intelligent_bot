
import { ApifyClient } from "apify-client";
import { saveInstagramStory02ToSheet } from "../googleSheets/writeInstagramStory02.js"; // ✅ import it
import "dotenv/config";

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

export async function testInstagramStoryActor02(username) {
    if (!username || typeof username !== "string") {
        throw new Error("Username must be a non-empty string");
    }

    const run = await client
        .actor("x6rkhMUeZ3X6Qw4Vd")
        .call({ usernames: [username] });

    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    if (!items.length) return [];

    const cleaned = items.map(i => ({
        username: i.username,
        mediaType: i.mediaType,
        imageUrl: i.imageUrl,
        videoUrl: i.videoUrl,
        takenAt: i.takenAt,
        storyId: i.storyId,
    }));

    // Save each story
    for (const story of cleaned) {
        await saveInstagramStory02ToSheet(story);
    }

    return cleaned;
}