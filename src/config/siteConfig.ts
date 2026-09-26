/**
 * ARDM Academy - Core Platform Configuration
 * 
 * Central configuration holding verified contact details, official social media links,
 * PROSTUTI Class 10 mock test series settings, and server-side admin credentials.
 */

export const SITE_CONFIG = {
  name: "ARDM Academy",
  legalName: "ARDM Academy of Education & Technology",
  tagline: "BUILD • PROGRESS • TOGETHER",
  motto: "Learn. Practice. Improve.",
  subtext: "Education, guidance and structured mock tests designed to help students learn with confidence.",
  
  // Official Verified Contact Information
  contact: {
    phoneNumber: "6289139984", // Clickable tel:6289139984
    whatsappNumber: "6289139984",
    emailAddress: "ardmacademy@gmail.com", // Clickable mailto:ardmacademy@gmail.com
    upiId: "akashpaik570@oksbi", // Official ARDM UPI VPA for course & test payments
    courseUpiId: "akashpaik570@oksbi",
    location: "Kolkata, West Bengal, India",
    workingHours: "Monday – Sunday: 8:00 AM – 9:00 PM IST",
  },

  // Official Social Media Channels
  social: {
    whatsappChannel: "https://whatsapp.com/channel/0029VbDUvfu6BIErmz6pxX1h",
    facebook: "https://www.facebook.com/share/1FA562wUSQ/",
    instagram: "https://www.instagram.com/ardmacademy2026?stkn=bTZnejdwbXJnNWY=",
    youtube: "https://youtube.com/@ardmacademy?si=GWXca9H1pAZhdZU4",
  },

  // Server-Side Role-Based Admin Protection
  // NOTE: Authorized admin emails are configured and verified strictly on the server (/server.ts)
  // to ensure zero client-side credential exposure.

  // Google Sheets configuration
  sheets: {
    spreadsheetTitle: "ARDM Academy - Class 10 Mock Test Registrations 2026",
    sheetName: "Registrations",
    defaultSpreadsheetUrl: "",
  },

  // PROSTUTI Mock Test Series Settings
  prostuti: {
    title: "PROSTUTI",
    subtitle: "The Ultimate Class 10 Mock Test Series",
    description: "Designed for focused Class 10 board preparation with structured mock tests, subject-wise practice, performance analysis and ranking.",
    session: "2025-2026 Batch",
    durationMinutes: 45,
    maxQuestions: 25,
    passingScorePercent: 40,
    registrationPrefix: "ARDM-2026",
    // Historical prediction accuracy metrics (with disclaimer)
    historicalStats: {
      year2024Accuracy: "96.30%",
      year2025Accuracy: "97.10%",
      similarity: "95%+",
      disclaimer: "Historical analysis does not guarantee future examination questions.",
    }
  },

  // Default exam settings
  mockTest: {
    examTitle: "PROSTUTI Class 10 State-Level Mock Test 2026",
    session: "2025-2026 Batch",
    durationMinutes: 45,
    maxQuestions: 25,
    passingScorePercent: 40,
    registrationPrefix: "ARDM-2026",
  },
};

/**
 * Returns formatted clickable tel: link
 */
export function getTelLink(phone: string = SITE_CONFIG.contact.phoneNumber): string {
  const clean = phone.replace(/[^0-9+]/g, "");
  return `tel:${clean}`;
}

/**
 * Returns WhatsApp chat link or official channel link
 */
export function getWhatsAppLink(
  message: string = "Hello ARDM Academy, I have an inquiry regarding Class 10 Mock Tests and Classes."
): string {
  return `https://wa.me/91${SITE_CONFIG.contact.phoneNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Returns official WhatsApp channel link
 */
export function getWhatsAppChannelLink(): string {
  return SITE_CONFIG.social.whatsappChannel;
}

/**
 * Returns clickable mailto: link
 */
export function getMailtoLink(
  email: string = SITE_CONFIG.contact.emailAddress,
  subject: string = "Inquiry: ARDM Academy Courses & PROSTUTI Mock Test"
): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

/**
 * Server-side RBAC verification helper
 * Verifies if an email belongs to the authorized admin group via secure server endpoint.
 * Protects authorized email list from being displayed or bundled in the client.
 */
export async function verifyAdminOnServer(
  email?: string | null,
  passcode?: string | null
): Promise<{
  authorized: boolean;
  role: 'ADMIN' | 'STUDENT';
  token?: string;
  email?: string;
  error?: string;
}> {
  if (!email && !passcode) {
    return { authorized: false, role: 'STUDENT', error: 'Please provide administrator email or security passcode' };
  }

  try {
    const payload: { email?: string; passcode?: string } = {};
    if (email) payload.email = email.trim().toLowerCase();
    if (passcode) payload.passcode = passcode.trim();

    const res = await fetch('/api/auth/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err: any) {
    return {
      authorized: false,
      role: 'STUDENT',
      error: 'Admin verification server is currently unreachable. Please ensure network connection and retry.',
    };
  }
}

