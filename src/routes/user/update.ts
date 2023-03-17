import express, { Request, Response, NextFunction } from 'express';
import { User } from '../../models/user';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { AuthValidator } from '../../validators/auth/auth-validator';
import { NotFoundError } from '../../exceptions/not-found-error';
import { InvalidRequestError } from '../../exceptions/invalid-request-error';

const Router = express.Router();

Router.put('/api/user/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        if (!user)
            throw new NotFoundError('User Not Found!');

        const { email, phone, name, password, addresses, image, isAdmin } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { phone }], _id: { $ne: id } });

        if (existingUser)
            throw new InvalidRequestError('User already exists');

        user.set({
            email, phone, name, password, addresses, image, isAdmin
        });
        await user.save();

        res.status(204).send({
            message: 'User updated successfully',
            user,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as UserUpdateRouter };