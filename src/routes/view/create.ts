import express, { Request, Response, NextFunction } from 'express';
import socket from '../../../socket';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { View } from '../../models/view';
import { ViewValidator } from '../../validators/view/view-validator';

const Router = express.Router();

Router.post('/api/view', requireAuth, ViewValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { stream } = req.body;
        const userId = req.currentUser?.id as string;

        const existingView = await View.findOne({ stream, user: userId });
        if (existingView) {
            throw new Error('Viewing already!');
        }

        const view = View.build({ stream, user: userId });
        await view.save();

        const views = await View.find({ stream });
        socket.getIo().emit('view-join', (views));

        res.status(201).send({
            message: 'View created successfully',
            view,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as ViewCreateStream };