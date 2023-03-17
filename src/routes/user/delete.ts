import express, { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../../exceptions/not-found-error';
import { requireAuth } from '../../middlewares/require-auth';
import { User } from '../../models/user';

const Router = express.Router();

Router.delete('/api/user/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            throw new NotFoundError('User not found');
        }

        res.status(204).json({
            message: 'User deleted successfully',
            user,
        });
    } catch (error) {
        next(error);
    }
});

export { Router as UserDeleteRouter };