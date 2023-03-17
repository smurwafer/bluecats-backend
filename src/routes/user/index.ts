import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { User, UserDoc } from '../../models/user';

const Router = express.Router();

Router.get('/api/user', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        let users: UserDoc[] = [];

        if(req.currentUser && req.currentUser.isAdmin)
            users = await User.find({});

        res.status(200).json({
            message: 'Users retrieved successfully',
            users,
        });
    } catch (error) {
        next(error);
    }
});

export { Router as UserIndexRouter };