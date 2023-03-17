import { body } from 'express-validator';

const validator = [
    body('channel')
        .not()
        .isEmpty()
        .withMessage('Channel should not be empty'),
];

export { validator as SubscriptionValidator }