import { google } from "googleapis";
import "dotenv/config";

const SHEET_NAME = "instagramStory02";

export async function saveInstagramStory02ToSheet(data) {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials/service-account.json",
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${SHEET_NAME}!A1`,
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        requestBody: {
            values: [[
                data.username,
                data.mediaType,
                data.imageUrl,
                data.videoUrl,
                data.takenAt,
                data.storyId,
            ]],
        },
    });

    console.log("📤 Saved data to Google Sheet:", SHEET_NAME);
}