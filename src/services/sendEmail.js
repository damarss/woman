import nodemailer from 'nodemailer'
import fs from 'fs'
import mustache from 'mustache'
import path from 'path'

const Gmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'womanrpl@gmail.com',
    pass: process.env.EMAIL_SECRET
  }
})

const mailOptions = {
  from: 'womanrpl@gmail.com'
}

const sendMailProjectCreated = async payload => {
  const template = fs.readFileSync(path.resolve(__dirname, '../../../../src/views/email/email_project.html'), 'utf8')

  payload.logo = 'cid:womanrpl@gmail.com'

  const mail = {
    to: payload.to,
    from: payload.from,
    subject: payload.subject,
    html: mustache.render(template, { ...payload }),
    attachments: [{
      filename: 'logo.png',
      path: path.resolve(__dirname, '../../../../src/views/email/img/logo.png'),
      cid: 'womanrpl@gmail.com'
    }]
  }

  Gmail.sendMail(mail, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

export { sendMailProjectCreated, mailOptions }
