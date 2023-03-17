import { Request, Response, NextFunction } from 'express';
import { ForbiddenRequestError } from '../exceptions/forbidden-request-error';
import { UnauthorizedError } from '../exceptions/unauthorized-error';

const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.currentUser || !req.currentUser.isAdmin)
            throw new ForbiddenRequestError('Forbidden request, only admin allowed!');
    
        next();
    } catch (err) {
        next(err);
    }
}

export { requireAdmin };