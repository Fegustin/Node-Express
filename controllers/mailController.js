import nodemailer from 'nodemailer'


export const sendMail = async (req, res) => {
    res.send('send mail')
}

export const sendMailPost = async (req, res) => {
    const {email} = req.body
    console.log(email)

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'ziotyr1@gmail.com',
            pass: 'konosuba90',
        },
    });

    let msg = {
        from: '"Fred Foo 👻" <TheFuckerMan@example.com>',
        to: `${email}`,
        subject: "Hello ✔",
        text: "Hello world?",
        html: "<b>Hello world?</b>",
    }

    let info = await transporter.sendMail(msg);

    console.log("Message sent: %s", info.messageId);

    res.send("send mail")
}