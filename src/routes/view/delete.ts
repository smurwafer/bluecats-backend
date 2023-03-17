import express, { Request, Response, NextFunction } from 'express';
import socket from '../../../socket';
import { requireAuth } from '../../middlewares/require-auth';
import { View } from '../../models/view';

const Router = express.Router();

Router.delete('/api/view/:stream', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { stream } = req.params;
        const userId = req.currentUser?.id;

        const view = await View.findOne({ stream, user: userId });
        if (!view) {
            throw new Error('View not found!');
        }

        await View.findOneAndDelete({ stream, user: userId });

        const views = await View.find({ stream });
        socket.getIo().emit('view-leave', (views));

        res.status(202).send({
            message: 'View deleted successfully',
            view,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as ViewDeleteRouter };