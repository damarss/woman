import nodemailer from 'nodemailer'

const Gmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'womanrpl@gmail.com',
    pass: process.env.EMAIL_SECRET
  }
})

export default Gmail

export const mailOptions = {
  from: 'womanrpl@gmail.com'
}
