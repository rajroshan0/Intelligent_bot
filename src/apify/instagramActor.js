import apifyClient from './apifyClient.js';

export async function runInstagramActor() {
    const runInput = {
        username: [
            "https://www.instagram.com/sinojon_sohibov/",
        ],
        resultsLimit: 30,
        onlyPostsNewerThan: "2025-11-01",
        skipPinnedPosts: false,
    };

    // Run the Actor
    const run = await apifyClient
        .actor("nH2AHrwxeTRJoN5hX")
        .call(runInput);

    const results = [];

    // Fetch results from dataset
    const dataset = apifyClient.dataset(run.defaultDatasetId);
    for await (const item of dataset.iterateItems()) {
        results.push(item);
    }

    return results;
}