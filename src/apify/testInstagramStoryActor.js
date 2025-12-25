import { ApifyClient } from "apify-client";
import "dotenv/config";
import { saveInstagramStoriesToSheet } from "../googleSheets/writeInstagramStories.js";

const client = new ApifyClient({
    token: process.env.APIFY_TOKEN,
});

export async function testInstagramStoryActor() {
    const runInput = {
        story_urls: [
            {
                url: "https://www.instagram.com/stories/taj_deeshay/3790172098078190906",
            },
             {
                url: "https://www.instagram.com/stories/shamshod.8/3781706628803169193/",
                },
                {
                url: "https://www.instagram.com/stories/taj_deeshay/3790172098078190906"
                }

        ],
        proxy: {
            useApifyProxy: true,
            apifyProxyGroups: ["RESIDENTIAL"],
            apifyProxyCountry: "US",
        },
    };

    

    console.log("Running Instagram Story Actor...");

    const run = await client
        .actor("lspV9PZ5ykk3gDnKE")
        .call(runInput);

    console.log("Actor finished");
    console.log("Run ID:", run.id);

    const datasetClient = client.dataset(run.defaultDatasetId);
    const { items } = await datasetClient.listItems();

    console.log("Dataset Results:");
    console.dir(items, { depth: null });

    //  Save ONE 

    await saveInstagramStoriesToSheet(items[0]);

    return items;
}