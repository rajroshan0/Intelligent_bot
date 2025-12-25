
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import fs from "fs";

console.log(" Loading service account credentials...");

const creds = JSON.parse(
  fs.readFileSync("credentials/service-account.json", "utf8")
);

console.log(" Credentials loaded");
console.log("Service account email:", creds.client_email);

// NEW AUTH METHOD
const auth = new JWT({
  email: creds.client_email,
  key: creds.private_key,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export async function getSheet() {
  console.log("🔗 Connecting to Google Spreadsheet...");

  const doc = new GoogleSpreadsheet(process.env.SHEET_ID, auth);

  await doc.loadInfo();
  console.log("Spreadsheet title:", doc.title);

  const sheet = doc.sheetsByTitle["testA"];
  if (!sheet) {
    throw new Error(" Sheet 'testA' not found");
  }

  console.log(" Worksheet found:", sheet.title);
  return sheet;
}

export async function appendRow(data) {
  console.log(" Appending row:", data);

  const sheet = await getSheet();

  // ensure headers exist
  await sheet.loadHeaderRow();
  if (!sheet.headerValues.length) {
    await sheet.setHeaderRow(["Message", "User"]);
  }

  await sheet.addRow(data);
  console.log(" Row appended successfully");
}

export async function readRows() {
  console.log("Reading rows...");

  const sheet = await getSheet();
  const rows = await sheet.getRows();

  console.log("Total rows:", rows.length);
  return rows;
}