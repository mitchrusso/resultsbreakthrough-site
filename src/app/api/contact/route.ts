import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const toEmail = process.env.CONTACT_TO_EMAIL || "mitchrusso@gmail.com";
const fromEmail = process.env.CONTACT_FROM_EMAIL || "ResultsBreakthrough <onboarding@resend.dev>";
const genericSendError = "Message could not be sent. Please email mitchrusso@gmail.com directly.";
const isResendTestSender = fromEmail.includes("onboarding@resend.dev");

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const MAX_MESSAGE_LENGTH = 3000;
const MAX_URLS = 3;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function clean(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return request.headers.get("cf-connecting-ip") || request.headers.get("x-real-ip") || forwardedFor || "unknown";
}

function isRateLimited(request: Request) {
  const key = getClientIp(request);
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX;
}

function countUrls(value: string) {
  return (value.match(/https?:\/\/|www\./gi) || []).length;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const honey = clean(formData.get("_honey"));

  if (honey) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(formData.get("name"));
  const email = clean(formData.get("email"));
  const subject = clean(formData.get("subject"));
  const message = clean(formData.get("message"));

  if (isRateLimited(request)) {
    return NextResponse.json({ error: "Too many messages were sent. Please wait a few minutes and try again." }, { status: 429 });
  }

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  }

  if (message.length > MAX_MESSAGE_LENGTH || countUrls(`${subject}
${message}`) > MAX_URLS) {
    return NextResponse.json({ error: "Please shorten the message and remove extra links before sending." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("Contact form is missing RESEND_API_KEY.");
    return NextResponse.json({ error: genericSendError }, { status: 503 });
  }

  const resendApiKey = process.env.RESEND_API_KEY.trim();

  if (!resendApiKey.startsWith("re_")) {
    console.error("Contact form RESEND_API_KEY is not a valid Resend key format.");
    return NextResponse.json({ error: genericSendError }, { status: 503 });
  }

  const resend = new Resend(resendApiKey);

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    ...(isResendTestSender ? {} : { replyTo: email }),
    subject: `ResultsBreakthrough contact: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #18211f;">
        <h2>New ResultsBreakthrough Contact Form Message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      </div>
    `,
    text: `New ResultsBreakthrough Contact Form Message\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
  });

  if (error) {
    console.error("Resend contact form error", error);
    return NextResponse.json({ error: genericSendError }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
