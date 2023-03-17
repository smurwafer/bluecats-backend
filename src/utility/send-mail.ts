import nodemailer from 'nodemailer';
import { UserDoc } from '../models/user';
const sendGridTransport = require('nodemailer-sendgrid-transport');

const SENDER_MAIL = 'manaskumar2808@gmail.com';

export const sendMail = async (user: UserDoc) => { 
    const transporter = nodemailer.createTransport(sendGridTransport({
        auth: {
            api_key: process.env.NODEMAILER_API_KEY,
        }
    }));
    const mailResponse = await transporter.sendMail({
        to: user.email,
        from: SENDER_MAIL,
        subject: 'Welcome to Artworks!',
        html: `<h1>Good to see you ${user.name}.</h1>`,
    });
    return mailResponse;
}