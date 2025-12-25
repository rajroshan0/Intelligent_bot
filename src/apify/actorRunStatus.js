import 'dotenv/config';
import { getActorRunStatus } from './apify/actorRunStatus.js';

async function testActorRunStatus() {
    try {
        const runId = "ugTcltKigYUIvhMuF"; // real runId
        const runInfo = await getActorRunStatus(runId);

        console.log("Actor Run Status:");
        console.dir(runInfo, { depth: null });
    } catch (err) {
        console.error("Error:", err.message);
    }
}

testActorRunStatus();