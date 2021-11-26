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


async function sendInviteAdministratorMail(email, farmName) {
  const mailSubject = "Fish farm invitation"
  const mailText =
    `You were invited as administrator to farm ${farmName}
     But you haven't got an account on FISH Farm
     Welcome and join to us here:
     http://localhost:8080`

  await mailer(email, mailSubject, mailText)
}

async function sendInviteWorkerMail(email, farmName) {
  const mailSubject = "Fish farm invitation"
  const mailText =
    `You were invited as a worker to farm ${farmName}
     But you haven't got an account on FISH Farm
     Welcome and join to us here:
     http://localhost:8080`

  await mailer(email, mailSubject, mailText)
}


module.exports = {
  sendInviteAdministratorMail,
  sendInviteWorkerMail
}