

import "dotenv/config";
import { testInstagramStoryActor } from "./apify/testInstagramStoryActor.js";
import { testInstagramStoryActor02 } from "./apify/testInstagramStoryActor02.js";

async function main() {
    try {
        const result = await testInstagramStoryActor02();
        console.dir(result, { depth: null });
    } catch (err) {
        console.error("❌ Error:", err.message);
    }
}

main();




