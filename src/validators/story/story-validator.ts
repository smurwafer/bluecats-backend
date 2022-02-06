import { body } from 'express-validator';

const validator = [
    body('title')
        .not()
        .isEmpty()
        .withMessage('Title should not be empty'),
];

export { validator as StoryValidator }