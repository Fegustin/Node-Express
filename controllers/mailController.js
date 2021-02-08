import SendMail from "../utils/SendMail.js";


export const sendMail = async (req, res) => {
    res.send('send mail')
}

export const sendMailPost = async (req, res) => {
    const {email} = req.body
    const send = new SendMail(
        email,
        'sobaka',
        'Soob',
        '<p>Nice Dick bro</p>'
    )

    await send.info()

    res.send("send mail")
}