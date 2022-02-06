import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Comment } from '../../models/comment';
import { CommentValidator } from '../../validators/comment/comment-validator';

const Router = express.Router();

Router.put('/api/comment/:id', requireAuth, CommentValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const { text, stream } = req.body;

        const comment = await Comment.findById(id);

        if (!comment) {
            throw new Error('No comment found!');
        }

        const userId = req.currentUser?.id as string;

        if (comment.commentor !== userId) {
            throw new Error('Not authorized to edit this comment!');
        }
    
        comment.set({
            text, stream, commentor: userId,
        });
    
        await comment.save();
    
        res.status(204).send({
            message: 'comment updated successfully',
            comment,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as CommentUpdateRouter };