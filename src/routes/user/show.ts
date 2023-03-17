import express, { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../../exceptions/not-found-error';
import { requireAuth } from '../../middlewares/require-auth';
import { User } from '../../models/user';

const Router = express.Router();

Router.get('/api/user/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        if (!user) {
            throw new NotFoundError('User not found');
        }

        res.status(200).json({
            message: 'User retrieved successfully',
            user,
        });
    } catch (error) {
        next(error);
    }
});

Router.get('/api/current-user', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.currentUser) {
            throw new Error("Not Authorized!");
        }

        const id = req.currentUser.id;
        const currentUser = await User.findById(id);

        if (!currentUser) {
            throw new Error("No such user exists!");
        }

        res.status(200).send({
            message: 'Current user fetched',
            currentUser,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as UserShowRouter };