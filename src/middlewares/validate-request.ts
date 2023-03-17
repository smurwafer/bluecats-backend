import express, { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);
        throw new Error('Request validation failed!');
    }

    next();
}

export { validateRequest };