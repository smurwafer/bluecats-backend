import { body } from 'express-validator';

const validator = [
    body('newPassword')
        .isLength({ min: 7 })
        .withMessage('Password length must be atleast 8'),
];

export { validator as PasswordValidator };