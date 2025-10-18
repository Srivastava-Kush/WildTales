import express from "express";

import { sendContactEmail } from "../controllers/contactMail.controller.js";
import { validateContact } from "../middlewares/validateContact.js";

const router = express.Router();

router.post("/send-email", validateContact, sendContactEmail);

export default router;
