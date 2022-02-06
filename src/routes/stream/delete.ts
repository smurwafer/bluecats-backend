import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Stream } from '../../models/stream';

const Router = express.Router();

Router.delete('/api/stream/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const stream = await Stream.findById(id);

        if (!stream) {
            throw new Error('Stream not found!');
        }

        await Stream.findByIdAndDelete(id);

        res.status(202).send({
            message: 'Stream deleted successfully',
            stream,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as StreamDeleteRouter };
