import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import { User } from '../../models/user';
import { Profile } from '../../models/profile';

const sendGridTransport = require('nodemailer-sendgrid-transport');

const Router = express.Router();

Router.post('/api/auth/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, userName, password } = req.body;
    
        const transporter = nodemailer.createTransport(sendGridTransport({
            auth: {
                api_key: process.env.NODEMAILER_API_KEY,
            }
        }));

        const existingUser = await User.findOne({
            $or: [{
                email,
            }, {
                userName,
            }]
        });
    
        if (!existingUser) {
            throw new Error("No such user exists!");
        }

        const existingProfile = await Profile.findById(existingUser.profile);

        if (!existingProfile) {
            throw new Error("No such profile exists!");
        }
    
        const isValid = await bcrypt.compare(password, existingUser.password);
    
        if (!isValid) {
            throw new Error("Password not valid!");
        }

        const secretKey = process.env.JWT_SECRET_KEY as string;
    
        const token = jwt.sign({ email, userName, id: existingUser.id }, secretKey, {
            expiresIn: '24h',
        });

        const expiryDate = (Math.round(new Date().getTime() / 1000) + 24 * 3600) * 1000;

        transporter.sendMail({
            to: email,
            from: 'manaskumar2808@gmail.com',
            subject: 'Welcome to Bluecats!',
            html: `<h1>Good to see you ${existingProfile.name}.</h1>`,
        });
    
        res.status(200).send({
            message: 'User logged in successfully',
            token,
            id: existingUser.id,
            expiryDate,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as LoginRouter };