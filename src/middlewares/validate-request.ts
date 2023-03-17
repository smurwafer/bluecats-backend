import express, { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { InvalidRequestError } from '../exceptions/invalid-request-error';

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) 
            throw new InvalidRequestError('Invalid request parameters', errors.array());
    
        next();
    } catch (err) {
        next(err);
    }
}

export { validateRequest };