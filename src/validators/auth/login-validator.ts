import { body } from 'express-validator';

const validator = [
    body('emailOrPhone')
        .notEmpty()
        .withMessage('Email or Phone is required'),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
];

export { validator as LoginValidator };