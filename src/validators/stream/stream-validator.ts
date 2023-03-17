import { body } from 'express-validator';

const validator = [
    body('title')
        .not()
        .isEmpty()
        .withMessage('Title should not be empty'),
    body('type')
        .not()
        .isEmpty()
        .withMessage('Type should not be empty'),
    body('gallery')
        .isLength({ min: 1 })
        .withMessage('Atleast 1 gallery item must be added'),
    body('channel')
        .not()
        .isEmpty()
        .withMessage('Channel should not be empty'),
];

export { validator as StreamValidator }