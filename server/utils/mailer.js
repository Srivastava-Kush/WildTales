// utils/mailer.js

import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

let transporterInstance = null;

export const getTransporter = () => {
  if (transporterInstance) return transporterInstance;

  const { MAIL_USER, MAIL_PASS } = process.env;
  if (!MAIL_USER || !MAIL_PASS) {
    console.warn(
      "MAIL_USER or MAIL_PASS missing in .env. Transporter may fail."
    );
  }

  transporterInstance = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS, // App Password (16 chars) when using 2FA
    },
  });

  // optional verify
  transporterInstance.verify((err, success) => {
    if (err) {
      console.error(
        "Error verifying mail transporter:",
        err && err.message ? err.message : err
      );
    } else {
      console.log("Mail transporter verified and ready");
    }
  });

  return transporterInstance;
};
