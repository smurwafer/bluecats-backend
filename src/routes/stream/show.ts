import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Stream } from '../../models/stream';

const Router = express.Router();

Router.get('/api/stream/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const stream = await Stream.findById(id)
            .populate('gallery')
            .populate('thumbnail')
            .populate({
                path: 'channel',
                populate: [{
                    path: 'photo',
                    model: 'Gallery',
                }, {
                    path: 'theme',
                    model: 'Gallery',
                }, {
                    path: 'holders',
                    model: 'User',
                    populate: {
                        path: 'profile',
                        model: 'Profile',
                        populate: [{
                            path: 'photo',
                            model: 'Gallery',
                        }, {
                            path: 'theme',
                            model: 'Gallery',
                        }],
                    }
                }]
            });

        if (!stream) {
            throw new Error('Stream not found!');
        }

        res.status(200).send({
            message: 'Stream received successfully',
            stream,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as StreamShowRouter };
