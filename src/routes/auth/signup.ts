import fs from 'fs';
import util from 'util';
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import { User } from '../../models/user';
import { AuthValidator } from '../../validators/auth/auth-validator';
import { validateRequest } from '../../middlewares/validate-request';
import { Profile } from '../../models/profile';
import { uploadFile } from '../../../s3';

const sendGridTransport = require('nodemailer-sendgrid-transport');

const Router = express.Router();

Router.post('/api/auth/signup', AuthValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userName, name, email, age, phone, gender, bio, photo, theme, interests, password } = req.body;

        const transporter = nodemailer.createTransport(sendGridTransport({
            auth: {
                api_key: process.env.NODEMAILER_API_KEY,
            }
        }));

        const existingUser1 = await User.findOne({ email });
    
        if (existingUser1) {
            throw new Error("Email address already exists!");
        }

        const existingUser2 = await User.findOne({ userName });
    
        if (existingUser2) {
            throw new Error("Username already exists!");
        }
    
        const passwordHash = await bcrypt.hash(password, 12);

        const profile = Profile.build({
            name, age, gender, bio, photo, theme, interests,
        });

        await profile.save();
    
        const user = User.build({
            userName, email, phone, password: passwordHash, profile: profile.id, online: false,
        });
    
        await user.save();

        const secretKey = process.env.JWT_SECRET_KEY as string;
    
        const token = jwt.sign({ email, userName, id: user.id }, secretKey, {
            expiresIn: '24h',
        });
    
        const expiryDate = Math.round(new Date().getTime() / 1000) + 24 * 3600;

        await transporter.sendMail({
            to: email,
            from: 'manaskumar2808@gmail.com',
            subject: 'Welcome to Bluecats!',
            html: '<h1>You have successfully signed up on Bluecats.</h1>',
        });

        res.status(201).send({
            message: 'User signed up successfully',
            token,
            id: user.id,
            expiryDate,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as SignupRouter };