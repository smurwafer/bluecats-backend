import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../../models/user';
import { AuthValidator } from '../../validators/auth/auth-validator';
import { validateRequest } from '../../middlewares/validate-request';
import { sendMail } from '../../utility/send-mail';
import { InvalidRequestError } from '../../exceptions/invalid-request-error';

const Router = express.Router();

Router.post('/api/auth/signup', AuthValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, phone, name, password, addresses, image, isAdmin } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

        if (existingUser)
            throw new InvalidRequestError('User already exists');
        
        const passwordHash = await bcrypt.hash(password, 12);

        const user = new User({
            email, phone, name, password : passwordHash, addresses, image, isAdmin
        });

        await user.save();

        const secretKey = process.env.JWT_SECRET_KEY as string;
    
        const token = jwt.sign({ email, phone, id: user.id, isAdmin }, secretKey, {
            expiresIn: '24h',
        });
    
        const expiryDate = Math.round(new Date().getTime() / 1000) + 24 * 3600;

        await sendMail(user);

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