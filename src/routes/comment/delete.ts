import express, { Request, Response, NextFunction } from 'express';
import { Comment } from '../../models/comment';

const Router = express.Router();

Router.delete('/api/comment/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const comment = await Comment.findById(id);
        
        if (!comment) {
            throw new Error('No such comment exists!');
        }

        if (comment.commentor !== req.currentUser?.id) {
            throw new Error('You are not authorized to delete this comment!');
        }
        
        await Comment.findByIdAndDelete(id);
        
        res.status(202).send({
            message: 'comment deleted successfully',
            comment,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as CommentDeleteRouter };