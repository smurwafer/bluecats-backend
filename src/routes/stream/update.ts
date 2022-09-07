import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Stream } from '../../models/stream';
import { StreamValidator } from '../../validators/stream/stream-validator';

const Router = express.Router();

Router.put('/api/stream/:id', requireAuth, StreamValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const stream = await Stream.findById(id);

        if (!stream) {
            throw new Error('Stream not found!');
        }

        const { title, description, hashtags, thumbnail, gallery, channel, live } = req.body;

        stream.set({
            title, description, hashtags, thumbnail, gallery, channel, live
        });

        await stream.save();

        res.status(200).send({
            message: 'Stream updated successfully',
            stream,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as StreamUpdateRouter };
