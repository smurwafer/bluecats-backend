import { body } from 'express-validator';

const validator = [
    body('userName')
        .isLength({
            min: 2,
            max: 20,
        })
        .withMessage('Username length must be between 2 and 20'),
    body('email')
        .isEmail()
        .withMessage('Must be a valid email address'),
    body('password')
        .isLength({ min: 7 })
        .withMessage('Password length must be atleast 8'),
];

export { validator as AuthValidator };