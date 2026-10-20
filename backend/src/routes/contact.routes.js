import { Router } from "express";
import rateLimit from "express-rate-limit";
import { env } from "../config/env.js";
import { HttpError } from "../lib/http-error.js";
import { sendEmail } from "../services/email.js";

export const contactRouter = Router();

/* a few messages an hour per visitor is plenty for a contact form */
const limiter = rateLimit({ windowMs: 60 * 60_000, limit: 5, standardHeaders: "draft-8", legacyHeaders: false });

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clip = (v, n) => String(v ?? "").trim().slice(0, n);
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/* body { kind: "contact" | "review", name, email, message, topic?, stars? }
   from the marketing site's contact and review forms; emailed to CONTACT_TO */
contactRouter.post("/contact", limiter, async (req, res) => {
  const b = req.body || {};
  const kind = b.kind === "review" ? "review" : "contact";
  const name = clip(b.name, 80);
  const email = clip(b.email, 160);
  const message = clip(b.message, 4000);
  const topic = clip(b.topic, 40) || "Question";
  const stars = Math.min(5, Math.max(1, Math.round(Number(b.stars) || 5)));

  if (!name) throw new HttpError(400, "Please add your name");
  if (message.length < 10) throw new HttpError(400, "The message needs at least 10 characters");
  if (kind === "contact" ? !EMAIL.test(email) : email && !EMAIL.test(email)) throw new HttpError(400, "Please check your email address");

  const subject = kind === "review" ? `Atlas review: ${"★".repeat(stars)} from ${name}` : `Atlas contact: ${topic} from ${name}`;
  const lines = [
    kind === "review" ? `Rating: ${stars}/5` : `Topic: ${topic}`,
    `Name: ${name}`,
    `Email: ${email || "(not given)"}`,
    "",
    message,
  ];
  await sendEmail({
    to: env.contactTo,
    subject,
    text: lines.join("\n"),
    html: `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5">${lines.slice(0, 3).map((l) => `<p style="margin:0">${esc(l)}</p>`).join("")}<p style="white-space:pre-wrap;margin-top:16px">${esc(message)}</p></div>`,
    ...(email ? { replyTo: email } : {}),
  });
  res.json({ ok: true });
});
