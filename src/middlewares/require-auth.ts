import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../exceptions/unauthorized-error';

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.currentUser)
            throw new UnauthorizedError('Unauthorized user!');
    
        next();
    } catch (err) {
        next(err);
    }
}

export { requireAuth };