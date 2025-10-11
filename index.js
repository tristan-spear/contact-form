import express from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import dotenv from "dotenv";   // <--- import dotenv

dotenv.config(); 

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport(
    {
        secure: true,
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: process.env.EMAIL_USER, // pulled from .env
            pass: process.env.EMAIL_PASS, // pulled from .env
        },
    }
);

function sendMail(to, sub, msg) {
    transporter.sendMail({
        to: to,
        subject: sub,
        html: msg,
    });
}

//sendMail('tspear1704@gmail.com', "test", "test email" );

app.get("/", (req, res) => {
    res.render("contact.ejs");
});

app.post("/send", (req, res) => {
    sendMail('tspear1704@gmail.com', "Email from " + req.body.name + ": " + req.body.subject, req.body.message + "\n\n respond to : " + req.body.email);
    res.send("Message sent successfully!");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});