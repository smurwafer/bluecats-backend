import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../../models/user';
import { validateRequest } from '../../middlewares/validate-request';
import { LoginValidator } from '../../validators/auth/login-validator';
import { NotFoundError } from '../../exceptions/not-found-error';
import { BadRequestError } from '../../exceptions/bad-request-error';
import { sendMail } from '../../utility/send-mail';

const Router = express.Router();

Router.post('/api/auth/login', LoginValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { emailOrPhone, password } = req.body;

        const existingUser = await User.findOne({
            $or: [{
                email: emailOrPhone,
            }, {
                phone: emailOrPhone,
            }]
        });
    
        if (!existingUser)
            throw new NotFoundError("No such user exists!");
    
        const isValid = await bcrypt.compare(password, existingUser.password);
    
        if (!isValid)
            throw new BadRequestError("Password not valid!");

        const secretKey = process.env.JWT_SECRET_KEY as string;
    
        const token = jwt.sign({
            email: existingUser.email,
            phone: existingUser.phone,
            isAdmin: existingUser.isAdmin,
            id: existingUser.id
        }, secretKey, {
            expiresIn: '24h',
        });

        const expiryDate = (Math.round(new Date().getTime() / 1000) + 24 * 3600) * 1000;

        await sendMail(existingUser);

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