const nodemailer = require("nodemailer")
const gmailAccount = require("../appConfig").gmailAccount
const logError = require("./errorHandler")


async function mailer(recipientEmail, mailSubject, mailText, mailHtml) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      secure: true,
      logger: true,
      debug: true,
      secureConnection: false,
      auth: {
        user: gmailAccount.email,
        pass: gmailAccount.password
      },
      tls: {
        rejectUnAuthorized: true
      }
    })

    await transporter.sendMail({
      from: gmailAccount.email,
      to: recipientEmail,
      subject: mailSubject,
      text: mailText,
      html: mailHtml
    })
  } catch (exception) {
    logError("Can't send an email", exception)
  }
}


module.exports = mailer