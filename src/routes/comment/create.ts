import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Comment } from '../../models/comment';
import { CommentValidator } from '../../validators/comment/comment-validator';

const Router = express.Router();

Router.post('/api/comment', requireAuth, CommentValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { text, stream } = req.body;
    
        const comment = Comment.build({
            text, stream, commentor: req.currentUser?.id as string,
        });
    
        await comment.save();
    
        res.status(201).send({
            message: 'comment created successfully',
            comment,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as CommentCreateRouter };