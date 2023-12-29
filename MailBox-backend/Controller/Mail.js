const User = require("../Models/User");
const Mail = require("../Models/Mail");

exports.postMail = async (req, res, next) => {
  const user = req.user;
  const xbody = req.body;

  const obj = {
    toEmail: xbody.to,
    fromEmail: user.email,
    subject: xbody.subject,
    body: JSON.stringify(xbody.content),
    read: false,
  };

  try {
    const result = await req.user.createMail(obj);

    res.json({ msg: "Mail Sent Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Error in sending the mail" });
  }
};

exports.getMails = async (req, res, next) => {
  try {
    const result = await Mail.findAll({ where: { toEmail: req.user.email } });
    const result2 = await Mail.findAll({
      where: { toEmail: req.user.email, read: false },
    });

    res.json({ mails: result, unread: result2.length });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Error in getting  the  mail" });
  }
};

exports.readMail = async (req, res, next) => {
  const id = req.body.id;
  try {
    const mail = await Mail.findOne({ where: { id: id } });
    await mail.update({ read: true });
    res.json({ status: "Status updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Something went wrong" });
  }
};

exports.getSentMails = async (req, res, next) => {
  try {
    const result = await Mail.findAll({ where: { fromEmail: req.user.email } });

    res.json({ mails: result });
  } catch (err) {
    res.status(500).json({ err: "Error in getting  the inbox mail" });
  }
};

exports.deleteMail = async (req, res, next) => {
  const id = req.body.id;
  try {
    const response = await Mail.destroy({ where: { id: id } });
    res.json({ message: "Mail Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Error in deleteing Mail" });
  }
};
