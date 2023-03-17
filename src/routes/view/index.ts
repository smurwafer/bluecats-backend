import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { View } from '../../models/view';

const Router = express.Router();

Router.get('/api/view', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        // /api/view?stream=streamId
        const views = await View.find({ ...req.query }).populate({
            path: 'user',
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
        res.status(200).send({
            message: 'Views received successfully',
            views,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as ViewIndexRouter };