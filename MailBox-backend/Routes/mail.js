const mailCont = require("../Controller/Mail");
const express = require("express");
const { authenticate } = require("../Middleware/email");

const router = express.Router();

router.post("/postMail", authenticate, mailCont.postMail);
router.get("/getMails", authenticate, mailCont.getMails);
router.get("/getSentMails", authenticate, mailCont.getSentMails);
router.post("/readMail", authenticate, mailCont.readMail);
router.post("/deleteMail", authenticate, mailCont.deleteMail);

module.exports = router;
