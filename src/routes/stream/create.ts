import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Stream } from '../../models/stream';
import { StreamValidator } from '../../validators/stream/stream-validator';

const Router = express.Router();

Router.post('/api/stream', requireAuth, StreamValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, description, type, hashtags, thumbnail, gallery, channel } = req.body;

        if (thumbnail >= gallery.length) {
            throw new Error("Invalid thumbnail!");
        }

        const stream = Stream.build({
            title, description, type, hashtags, thumbnail, gallery, channel,
        });

        await stream.save();

        res.status(201).send({
            message: 'Stream created successfully',
            stream,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as StreamCreateRouter };
