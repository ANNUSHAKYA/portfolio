import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";

const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Simple in-memory rate limiter ───────────────────────────────────────────
// Stores: ip → { count, windowStart }
// Resets after WINDOW_MS. Max MAX_REQUESTS per window per IP.
const rateLimitMap = new Map<string, { count: number; windowStart: number }>();
const MAX_REQUESTS = 3;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= MAX_REQUESTS) {
    return true;
  }

  entry.count += 1;
  return false;
}

// ─── Validation ───────────────────────────────────────────────────────────────
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_PROJECT_TYPES = [
  "Business Website",
  "E-Commerce",
  "Web Application",
  "AI Application",
  "SaaS Platform",
  "API / Backend Architecture",
  "Other Digital Product",
];
const VALID_BUDGETS = [
  "₹10k – ₹25k",
  "₹25k – ₹50k",
  "₹50k – ₹1L",
  "₹1L+",
  "",
];

interface ValidationError {
  field: string;
  message: string;
}

function validateInput(body: Record<string, unknown>): ValidationError[] {
  const errors: ValidationError[] = [];
  const { name, email, projectType, message, budget } = body as Record<
    string,
    string
  >;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.push({ field: "name", message: "Please enter your full name." });
  } else if (name.trim().length > 100) {
    errors.push({ field: "name", message: "Name is too long." });
  }

  if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    errors.push({
      field: "email",
      message: "Please enter a valid email address.",
    });
  } else if (email.trim().length > 254) {
    errors.push({ field: "email", message: "Email address is too long." });
  }

  if (!projectType || !VALID_PROJECT_TYPES.includes(projectType)) {
    errors.push({
      field: "projectType",
      message: "Please select a project type.",
    });
  }

  if (budget !== undefined && !VALID_BUDGETS.includes(budget)) {
    errors.push({ field: "budget", message: "Invalid budget selection." });
  }

  if (!message || typeof message !== "string" || message.trim().length < 10) {
    errors.push({
      field: "message",
      message: "Please describe your project (at least 10 characters).",
    });
  } else if (message.trim().length > 5000) {
    errors.push({
      field: "message",
      message: "Message is too long (max 5000 characters).",
    });
  }

  return errors;
}

// ─── Email HTML helpers ───────────────────────────────────────────────────────

function buildAdminEmail(data: {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  submittedAt: string;
}) {
  const { name, email, projectType, budget, message, submittedAt } = data;
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0A1931;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A1931;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#0D2040;border:1px solid #1A3D63;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">
        
        <!-- Header -->
        <tr><td style="background:#0A1931;padding:28px 36px;border-bottom:1px solid #1A3D63;">
          <p style="margin:0 0 4px;color:#4A7FA7;font-size:11px;font-family:monospace;text-transform:uppercase;letter-spacing:2px;">New Freelance Enquiry</p>
          <h1 style="margin:0;color:#F6FAFD;font-size:22px;font-weight:700;letter-spacing:-0.5px;">📨 ${projectType}</h1>
        </td></tr>

        <!-- Details -->
        <tr><td style="padding:28px 36px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #1A3D63;color:#4A7FA7;font-size:11px;font-family:monospace;text-transform:uppercase;letter-spacing:1.5px;width:130px;vertical-align:top;">Name</td>
              <td style="padding:10px 0;border-bottom:1px solid #1A3D63;color:#F6FAFD;font-size:15px;font-weight:600;">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #1A3D63;color:#4A7FA7;font-size:11px;font-family:monospace;text-transform:uppercase;letter-spacing:1.5px;vertical-align:top;">Email</td>
              <td style="padding:10px 0;border-bottom:1px solid #1A3D63;font-size:15px;"><a href="mailto:${email}" style="color:#B3CFE5;text-decoration:none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #1A3D63;color:#4A7FA7;font-size:11px;font-family:monospace;text-transform:uppercase;letter-spacing:1.5px;vertical-align:top;">Project</td>
              <td style="padding:10px 0;border-bottom:1px solid #1A3D63;color:#F6FAFD;font-size:15px;">${projectType}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #1A3D63;color:#4A7FA7;font-size:11px;font-family:monospace;text-transform:uppercase;letter-spacing:1.5px;vertical-align:top;">Budget</td>
              <td style="padding:10px 0;border-bottom:1px solid #1A3D63;color:#F6FAFD;font-size:15px;">${budget || "Not specified"}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#4A7FA7;font-size:11px;font-family:monospace;text-transform:uppercase;letter-spacing:1.5px;vertical-align:top;">Received</td>
              <td style="padding:10px 0;color:#F6FAFD;font-size:13px;">${submittedAt}</td>
            </tr>
          </table>

          <!-- Message -->
          <div style="margin-top:24px;">
            <p style="margin:0 0 10px;color:#4A7FA7;font-size:11px;font-family:monospace;text-transform:uppercase;letter-spacing:1.5px;">Message</p>
            <div style="background:#0A1931;border:1px solid #1A3D63;border-radius:8px;padding:20px;color:#F6FAFD;font-size:15px;line-height:1.75;white-space:pre-wrap;">${message}</div>
          </div>
        </td></tr>

        <!-- CTA -->
        <tr><td style="padding:0 36px 28px;text-align:center;">
          <a href="mailto:${email}?subject=Re: Your ${projectType} enquiry" style="display:inline-block;background:#F6FAFD;color:#0A1931;font-weight:700;font-size:12px;letter-spacing:2px;text-transform:uppercase;text-decoration:none;padding:14px 32px;border-radius:4px;">Reply to ${name}</a>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 36px;border-top:1px solid #1A3D63;text-align:center;">
          <p style="margin:0;color:#4A7FA7;font-size:11px;font-family:monospace;">Sent from annushakya.dev portfolio contact form</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildClientEmail(data: { name: string; projectType: string }) {
  const { name, projectType } = data;
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0A1931;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A1931;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#0D2040;border:1px solid #1A3D63;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">
        
        <!-- Header -->
        <tr><td style="background:#0A1931;padding:32px 36px;border-bottom:1px solid #1A3D63;text-align:center;">
          <h1 style="margin:0 0 6px;color:#F6FAFD;font-size:22px;font-weight:700;letter-spacing:-0.5px;">Thanks for reaching out, ${name}.</h1>
          <p style="margin:0;color:#4A7FA7;font-size:13px;">Annu Shakya · Full-Stack Developer &amp; AI Builder</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:32px 36px;">
          <p style="margin:0 0 20px;color:#F6FAFD;font-size:16px;line-height:1.7;">
            I've received your enquiry about a <strong style="color:#B3CFE5;">${projectType}</strong> project and will review your details shortly.
          </p>
          <p style="margin:0 0 20px;color:#B3CFE5;font-size:15px;line-height:1.7;">
            I typically respond within <strong>24 hours</strong> on weekdays. If your project is time-sensitive, feel free to reply directly to this email.
          </p>
          <p style="margin:0;color:#F6FAFD/70;font-size:14px;line-height:1.7;color:#8aabb8;">
            In the meantime, you can explore my work at my portfolio.
          </p>
        </td></tr>

        <!-- Divider -->
        <tr><td style="padding:0 36px;">
          <div style="height:1px;background:#1A3D63;"></div>
        </td></tr>

        <!-- Sign-off -->
        <tr><td style="padding:28px 36px;">
          <p style="margin:0 0 4px;color:#F6FAFD;font-size:15px;font-weight:600;">Annu Shakya</p>
          <p style="margin:0;color:#4A7FA7;font-size:13px;font-family:monospace;">Full-Stack Developer · AI Builder</p>
          <p style="margin:8px 0 0;color:#4A7FA7;font-size:13px;">annushakya94526@gmail.com</p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 36px;border-top:1px solid #1A3D63;text-align:center;">
          <p style="margin:0;color:#4A7FA7;font-size:11px;font-family:monospace;">You received this because you submitted the contact form at annushakya.dev</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Route Handler ─────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  // 1. Rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        error:
          "Too many submissions. Please wait a few minutes before trying again.",
      },
      { status: 429 }
    );
  }

  // 2. Parse body
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // 3. Honeypot check — bots fill the hidden field, humans don't
  if (body.website && String(body.website).trim() !== "") {
    // Silently return success to confuse bots
    return NextResponse.json({ success: true }, { status: 200 });
  }

  // 4. Validate
  const validationErrors = validateInput(body);
  if (validationErrors.length > 0) {
    return NextResponse.json(
      { error: "Validation failed.", fields: validationErrors },
      { status: 422 }
    );
  }

  const name = String(body.name).trim();
  const email = String(body.email).trim().toLowerCase();
  const projectType = String(body.projectType).trim();
  const budget = body.budget ? String(body.budget).trim() : "";
  const message = String(body.message).trim();
  const adminEmail = process.env.ADMIN_EMAIL || "annushakya94526@gmail.com";
  const submittedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });

  // 5. Insert into Supabase
  let submissionId: string | undefined;
  try {
    const supabase = createAdminClient();
    const { data, error: dbError } = await supabase
      .from("contact_submissions")
      .insert({
        name,
        email,
        project_type: projectType,
        budget: budget || null,
        message,
        status: "new",
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("[Contact] Supabase insert error:", dbError.message);
      // Don't fail the whole request — still send email
    } else {
      submissionId = data?.id;
    }
  } catch (err) {
    console.error("[Contact] Supabase client error:", err);
    // Continue — email is more important than DB logging
  }

  // 6. Send admin notification email
  let adminEmailSent = false;
  try {
    const { error: adminEmailError } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [adminEmail],
      replyTo: email,
      subject: `New Freelance Project Enquiry — ${projectType}`,
      html: buildAdminEmail({ name, email, projectType, budget, message, submittedAt }),
    });

    if (adminEmailError) {
      console.error("[Contact] Admin email error:", adminEmailError.message);
    } else {
      adminEmailSent = true;
    }
  } catch (err) {
    console.error("[Contact] Admin email exception:", err);
  }

  // 7. Send client confirmation email
  try {
    const { error: clientEmailError } = await resend.emails.send({
      from: "Annu Shakya <onboarding@resend.dev>",
      to: [email],
      subject: "Thanks for reaching out — Annu Shakya",
      html: buildClientEmail({ name, projectType }),
    });

    if (clientEmailError) {
      console.error("[Contact] Client email error:", clientEmailError.message);
    }
  } catch (err) {
    console.error("[Contact] Client email exception:", err);
  }

  // 8. Return success (even if DB/email had partial failures — don't expose internals)
  if (!adminEmailSent && !submissionId) {
    // Both failed — something is very wrong
    return NextResponse.json(
      {
        error:
          "We couldn't process your submission right now. Please email annushakya94526@gmail.com directly.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
