import nodemailer from "nodemailer";
import cron from "node-cron";
const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: 465,
    secure: true,
    service: process.env.SMPT_SERVICE,
    auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_PASSWORD,
    },
});

export default function handler(req, res) {
    try {
        const data = req.body;

        data.forEach((ele) => {
            cron.schedule(`${ele.SendDate}`, async () => {
                try {
                    const mail = await transporter.sendMail({
                        from: process.env.SMPT_MAIL,
                        to: ele.Email,
                        subject: ele.EmailSubject,
                        text: ele.EmailBody,
                    });
                } catch (error) {
                    console.error("sending email error", error);
                }
            });
        });

        res.status(200).json({
            message: "Emails scheduled successfully.",
            jobs: cron.getTasks(),
        });
    } catch (error) {
        console.log("error", error);
    }
}
