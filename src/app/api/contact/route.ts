import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const toEmail = process.env.CONTACT_TO_EMAIL || "mitchrusso@gmail.com";
const fromEmail = process.env.CONTACT_FROM_EMAIL || "ResultsBreakthrough <onboarding@resend.dev>";
const genericSendError = "Message could not be sent. Please email mitchrusso@gmail.com directly.";
const isResendTestSender = fromEmail.includes("onboarding@resend.dev");

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

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
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
