import { google } from "googleapis";

/**
 * Save ONE Apify result into ONE Google Sheet row
 */
export async function saveInstagramStoriesToSheet(apifyItem) {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials/service-account.json", // <-- your service account file
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const sheetName = "instagramstories01";

    // ---- Flatten media items into columns ----
    const row = {
        url: apifyItem.url,
        success: apifyItem.success,
        total_count: apifyItem.total_count,
        video_count: apifyItem.video_count,
        image_count: apifyItem.image_count,
    };

    apifyItem.media_items.forEach((item, index) => {
        row[`media_items/${index}/Story No`] = item["Story No"];
        row[`media_items/${index}/type`] = item.type;
        row[`media_items/${index}/Media URL`] = item["Media URL"];
    });

    // ---- Column order MUST match your sheet ----
    const values = [[
        row.image_count,

        row["media_items/0/Media URL"], row["media_items/0/Story No"], row["media_items/0/type"],
        row["media_items/1/Media URL"], row["media_items/1/Story No"], row["media_items/1/type"],
        row["media_items/2/Media URL"], row["media_items/2/Story No"], row["media_items/2/type"],
        row["media_items/3/Media URL"], row["media_items/3/Story No"], row["media_items/3/type"],
        row["media_items/4/Media URL"], row["media_items/4/Story No"], row["media_items/4/type"],
        row["media_items/5/Media URL"], row["media_items/5/Story No"], row["media_items/5/type"],
        row["media_items/6/Media URL"], row["media_items/6/Story No"], row["media_items/6/type"],
        row["media_items/7/Media URL"], row["media_items/7/Story No"], row["media_items/7/type"],

        row.success,
        row.total_count,
        row.url,
        row.video_count,
    ]];

    await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${sheetName}!A1`,
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        requestBody: { values },
    });

    console.log("✅ Saved to Google Sheets");
}