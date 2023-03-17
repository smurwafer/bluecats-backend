import express, { Request, Response, NextFunction } from 'express';
import socket from '../../../socket';
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

        await (await comment.populate('stream')).populate({
            path: 'commentor',
            populate: {
                path: 'profile',
                model: 'Profile',
                populate: [{
                    path: 'photo',
                    model: 'Gallery',
                }, {
                    path: 'theme',
                    model: 'Gallery',
                }]
            }
        });

        socket.getIo().emit('comment', (comment));
    
        res.status(201).send({
            message: 'comment created successfully',
            comment,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as CommentCreateRouter };