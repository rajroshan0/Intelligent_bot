import "dotenv/config";
import { appendRow, readRows } from "./sheets.js";

(async () => {
  try {
    console.log("🚀 Starting Google Sheets test...");

    await appendRow({
      Message: "Test row from Node.js",
      User: "local-test"
    });

    const rows = await readRows();
    console.log("🧾 Last row data:", rows[rows.length - 1]._rawData);

    console.log("🎉 Google Sheets test SUCCESS");
  } catch (err) {
    console.error("🔥 Google Sheets test FAILED");
    console.error(err);
  }
})();