import { body } from 'express-validator';

const validator = [
    body('image')
        .not()
        .isEmpty()
        .withMessage('Image should not be empty'),
    body('sketch')
        .not()
        .isEmpty()
        .withMessage('Sketch should not be empty'),
    body('cost')
        .isNumeric()
        .withMessage('Cost should be numeric'),
    body('user')
        .not()
        .isEmpty()
        .withMessage('User should not be empty'),
    body('address')
        .not()
        .isEmpty()
        .withMessage('Address should not be empty'),
    body('needVideo')
        .isBoolean()
        .withMessage('NeedVideo should be boolean'),
    body('private')
        .isBoolean()
        .withMessage('Private should be boolean'),
];

export { validator as OrderValidator };