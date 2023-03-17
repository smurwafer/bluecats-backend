import { body } from 'express-validator';

const validator = [
    body('stream')
        .not()
        .isEmpty()
        .withMessage('Stream must not be empty!'),
];

export { validator as ViewValidator }; 