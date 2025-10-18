// controllers/contactController.js
import { getTransporter } from "../utils/mailer.js";

export const sendContactEmail = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    // basic validation (you may already have middleware)
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ ok: false, message: "Missing required fields" });
    }

    const mailOptions = {
      from: process.env.MAIL_USER, // safer: send from your app account
      replyTo: email, // so replies go to user
      to: process.env.RECEIVER_EMAIL,
      subject: subject
        ? `Contact: ${subject}`
        : `Contact form message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${
          subject
            ? `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>`
            : ""
        }
        <p><strong>Message:</strong><br/>${escapeHtml(message).replace(
          /\n/g,
          "<br/>"
        )}</p>
      `,
    };

    const transporter = getTransporter();
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.messageId);
    return res.json({ ok: true, message: "Email sent successfully." });
  } catch (err) {
    return next(err);
  }
};

function escapeHtml(unsafe) {
  return String(unsafe || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
