// middleware/validateContact.js

export const validateContact = (req, res, next) => {
  const { name, email, message } = req.body || {};

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({ ok: false, message: "Invalid name" });
  }
  if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ ok: false, message: "Invalid email" });
  }
  if (!message || typeof message !== "string" || message.trim().length < 5) {
    return res.status(400).json({ ok: false, message: "Message too short" });
  }

  // normalize
  req.body.name = name.trim();
  req.body.email = email.trim();
  req.body.message = message.trim();

  next();
};
