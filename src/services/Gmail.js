import nodemailer from 'nodemailer'

const Gmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mitachi78@gmail.com',
    pass: 'azddqoctonffwyxk'
  }
})

export default Gmail
