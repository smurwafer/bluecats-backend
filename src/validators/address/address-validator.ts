import { body } from 'express-validator';

const validator = [
    body('name')
        .not()
        .isEmpty()
        .withMessage('Name should not be empty'),
    body('phone')
        .not()
        .isEmpty()
        .withMessage('Phone number should not be empty'),
    body('state')
        .not()
        .isEmpty()
        .withMessage('State should not be empty'),
    body('country')
        .not()
        .isEmpty()
        .withMessage('Country should not be empty'),
    body('pincode')
        .not()
        .isEmpty()
        .withMessage('Pincode should not be empty'),
];

export { validator as AddressValidator }