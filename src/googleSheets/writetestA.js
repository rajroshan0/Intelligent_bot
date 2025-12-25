// import { google } from "googleapis";
// import "dotenv/config";

// const SHEET_NAME = "testA";

// export async function saveUserInput({ username, telegramUserId, storyId }) {
//     const auth = new google.auth.GoogleAuth({
//         keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
//         scopes: ["https://www.googleapis.com/auth/spreadsheets"],
//     });

//     const sheets = google.sheets({ version: "v4", auth });

//     await sheets.spreadsheets.values.append({
//         spreadsheetId: process.env.GOOGLE_SHEET_ID,
//         range: `${SHEET_NAME}!A:C`,
//         valueInputOption: "RAW",
//         requestBody: {
//             values: [[username, telegramUserId, storyId || ""]],
//         },
//     });
// }

// import { google } from "googleapis";
// import "dotenv/config";

// const SHEET_NAME = "testA";

// export async function saveInputToTestASheet({ Message, User, StoryID }) {
//   const auth = new google.auth.GoogleAuth({
//     keyFile: "credentials/service-account.json",
//     scopes: ["https://www.googleapis.com/auth/spreadsheets"],
//   });

//   const sheets = google.sheets({ version: "v4", auth });

//   await sheets.spreadsheets.values.append({
//     spreadsheetId: process.env.GOOGLE_SHEET_ID,
//     range: `${SHEET_NAME}!A:C`,
//     valueInputOption: "USER_ENTERED",
//     requestBody: {
//       values: [[Message, User, StoryID]],
//     },
//   });

//   console.log("📤 Saved input to sheet:", SHEET_NAME);
// }

import { google } from "googleapis";
import "dotenv/config";

const SHEET_NAME = "testA";

export async function saveInputToTestASheet(data) {
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
            values: [[data.Message, data.User, data.StoryID]],
        },
    });

    console.log("📤 Saved input to sheet:", SHEET_NAME);
}