import { body } from 'express-validator';

const validator = [
    body('email')
        .if(body('phone').isEmpty())
        .notEmpty()
        .withMessage('Email or Phone is required'),
    body('phone')
        .if(body('email').isEmpty())
        .notEmpty()
        .withMessage('Email or Phone is required'),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    body('isAdmin')
        .notEmpty()
        .withMessage('isAdmin is required')
];

export { validator as AuthValidator };