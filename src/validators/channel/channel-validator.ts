import { body } from 'express-validator';

const validator = [
    body('name')
        .not()
        .isEmpty()
        .withMessage('Name should not be empty'),
    body('type')
        .not()
        .isEmpty()
        .withMessage('Type should not be empty'),
    body('holders')
        .isLength({ min: 1 })
        .withMessage('Atleast 1 holder must be added'),
];

export { validator as ChannelValidator }