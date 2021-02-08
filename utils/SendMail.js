import nodemailer from "nodemailer";
import keys from '../keys/index.js'

export default class SendMail {
    constructor(emailTo, title, subject, html) {
        this.emailTo = emailTo
        this.title = title
        this.subject = subject
        this.html = html
    }

    transporter() {
        return nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: keys.emailFrom,
                pass: keys.passwordEmailFrom,
            },
        })
    }

    message() {
        return {
            from: `${this.title} ${keys.emailFrom}`,
            to: `${this.emailTo}`,
            subject: this.subject,
            html: this.html
        }
    }

    info() {
        this.transporter().sendMail(this.message())
    }
}