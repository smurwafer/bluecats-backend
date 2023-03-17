import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string;
    userName: string;
    email: string;
};

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

const currentUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.get('Authorization');

        
        if (!authHeader) {
            // console.log('No authorization header');
            return next();
        }
        
        const token = authHeader.split(' ')[1];
        
        const secretKey = process.env.JWT_SECRET_KEY as string;
        const decodedToken = jwt.verify(token, secretKey) as UserPayload;
        
        console.log(token);

        if (!decodedToken) {
            // console.log('No token found!');
            return next();
        }

        console.log(decodedToken);
    
        req.currentUser = decodedToken;
        next();
    } catch (err) {
        // console.log('current user middle error : ', err);
        next(err);
    }
}

export { currentUser };