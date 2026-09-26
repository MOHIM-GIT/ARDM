import { StudentProfile, Registration } from '../types';
import { SITE_CONFIG } from '../config/siteConfig';

export const SHEET_COLUMNS = [
  'Registration ID',
  'Student Name',
  'Student Email',
  'Student Phone',
  'Guardian Name',
  'Guardian Phone',
  'Address',
  'School',
  'Teacher Name (Optional)',
  'Class',
  'Board',
  'Selected Subjects',
  'Subject Count',
  'Amount Paid (₹)',
  'Payment ID',
  'Payment Status',
  'Registration Status',
  'Date (IST)',
  'Time (IST)'
];

/**
 * Format registration into sheet row array
 */
export function formatRegistrationToRow(reg: StudentProfile): string[] {
  const createdDate = new Date(reg.createdAt || Date.now());
  const istDate = createdDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });
  const istTime = createdDate.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });

  return [
    reg.registrationId || reg.id,
    reg.fullName,
    reg.email,
    reg.mobile,
    reg.guardianName || 'N/A',
    reg.guardianPhone || 'N/A',
    reg.address || 'N/A',
    reg.school || 'N/A',
    reg.teacherName || 'N/A',
    reg.studentClass || 'Class 10',
    reg.board || 'WBBSE (Madhyamik)',
    (reg.selectedSubjectNames || []).join(', '),
    String(reg.selectedSubjectNames?.length || reg.selectedSubjectIds?.length || 1),
    String(reg.paymentAmount || 100),
    reg.paymentTransactionId || 'N/A',
    reg.paymentStatus,
    reg.applicationStatus,
    istDate,
    istTime,
  ];
}

/**
 * Create a new Google Spreadsheet in the user's Drive for ARDM Academy
 */
export async function createRegistrationSpreadsheet(accessToken: string): Promise<{ id: string; url: string }> {
  const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: `${SITE_CONFIG.sheets.spreadsheetTitle} - ${new Date().getFullYear()}`,
      },
      sheets: [
        {
          properties: {
            title: SITE_CONFIG.sheets.sheetName,
            gridProperties: {
              frozenRowCount: 1,
            },
          },
          data: [
            {
              startRow: 0,
              startColumn: 0,
              rowData: [
                {
                  values: SHEET_COLUMNS.map(col => ({
                    userEnteredValue: { stringValue: col },
                    userEnteredFormat: {
                      textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } },
                      backgroundColor: { red: 0.12, green: 0.23, blue: 0.54 }, // ARDM Navy
                      horizontalAlignment: 'CENTER',
                    }
                  }))
                }
              ]
            }
          ]
        }
      ]
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Google Sheets API Error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const sheetId = data.spreadsheetId;
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/edit`;

  return { id: sheetId, url: sheetUrl };
}

/**
 * Append registration to Google Sheet
 */
export async function appendRegistrationToSheet(
  accessToken: string,
  spreadsheetId: string,
  reg: Registration
): Promise<boolean> {
  const row = formatRegistrationToRow(reg);
  const range = `${SITE_CONFIG.sheets.sheetName}!A:S`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: [row]
    })
  });

  if (!response.ok) {
    const errorMsg = await response.text();
    throw new Error(`Failed to append row to Google Sheet: ${errorMsg}`);
  }

  return true;
}

/**
 * Check if a spreadsheet is accessible with the token
 */
export async function checkSpreadsheetAccess(accessToken: string, spreadsheetId: string): Promise<boolean> {
  try {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=properties.title`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });
    return response.ok;
  } catch {
    return false;
  }
}
