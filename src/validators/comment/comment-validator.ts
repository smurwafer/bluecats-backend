import { body } from 'express-validator';

const validator = [
    body('text')
        .not()
        .isEmpty()
        .withMessage('Text should not be empty'),
];

export { validator as CommentValidator }