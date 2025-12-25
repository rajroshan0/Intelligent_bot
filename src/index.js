// import "dotenv/config";
// import "./bot.js";
// import { runInstagramActor } from './apify/instagramActor.js';

// async function main() {
//     try {
//         const data = await runInstagramActor();
//         console.log("Apify Results:", data);
//     } catch (error) {
//         console.error("Apify Error:", error);
//     }
// }

// main();


// import { getActorRunStatus } from './apify/actorRunStatus.js';

// async function main() {
//     try {
//         // 👇 use a REAL runId from your logs
//         const runId = "ugTcltKigYUIvhMuF";

//         const runInfo = await getActorRunStatus(runId);
//         console.log("Actor Run Status:");
//         console.dir(runInfo, { depth: null });
//     } catch (err) {
//         console.error("Error:", err.message);
//     }
// }

// main();


// console.log("🚀 Telegram Google Sheets bot is running...");



// import 'dotenv/config';
// import './bot.js';
// import { runInstagramActor } from './apify/instagramActor.js';
// import { getActorRunStatus } from './apify/actorRunStatus.js';

// async function main() {
//     const mode = process.argv[2]; // read first CLI argument

//     if (mode === 'instagram') {
//         console.log('🚀 Running Instagram Actor...');
//         try {
//             const data = await runInstagramActor();
//             console.log("Instagram Actor Results:", data);
//         } catch (error) {
//             console.error("Instagram Actor Error:", error);
//         }
//     } else if (mode === 'status') {
//         const runId = process.argv[3]; // second argument = runId
//         if (!runId) {
//             console.error("Please provide runId for status check: node index.js status <runId>");
//             return;
//         }
//         console.log(`🔍 Checking Actor Run Status for ${runId}...`);
//         try {
//             const runInfo = await getActorRunStatus(runId);
//             console.dir(runInfo, { depth: null });
//         } catch (error) {
//             console.error("Actor Run Status Error:", error.message);
//         }
//     } else {
//         console.log("Usage:");
//         console.log("  node index.js instagram       # Run Instagram Actor");
//         console.log("  node index.js status <runId>  # Check Actor Run Status");
//     }
// }

// main();


import "dotenv/config";
import { testInstagramStoryActor } from "./apify/testInstagramStoryActor.js";
import { testInstagramStoryActor02 } from "./apify/testInstagramStoryActor02.js";
// await testInstagramStoryActor02();

// async function main() {
//     try {
//         const result = await testInstagramStoryActor();
//         console.dir(result, { depth: null });
//     } catch (err) {
//         console.error("❌ Error:", err.message);
//     }
// }


async function main() {
    try {
        const result = await testInstagramStoryActor02();
        console.dir(result, { depth: null });
    } catch (err) {
        console.error("❌ Error:", err.message);
    }
}

main();




