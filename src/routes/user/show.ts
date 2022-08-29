import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { User } from '../../models/user';

const Router = express.Router();

Router.get('/api/user/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).populate({
            path: 'profile',
            populate: [{
                path: 'photo',
                model: 'Gallery',
            }, {
                path: 'theme',
                model: 'Gallery',
            }]
        });
    
        if (!user) {
            throw new Error('User not found!');
        }
    
        res.status(200).send({
            message: 'user fetched successfully',
            user,
        });
    } catch (err) {
        next(err);
    }
});

Router.get('/api/current-user', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.currentUser) {
            throw new Error("Not Authorized!");
        }

        const id = req.currentUser.id;
        const currentUser = await User.findById(id).populate({
            path: 'profile',
            populate: [{
                path: 'photo',
                model: 'Gallery',
            }, {
                path: 'theme',
                model: 'Gallery',
            }]
        });

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

// Router.get('/api/profile/:id', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const id = req.params.id;
//         const profile = await Profile.findOne({ user: id });
    
//         if (!profile) {
//             throw new Error('No such profile exists!');
//         }
    
//         res.status(200).send({
//             message: 'profile updated successfully',
//             profile,
//         });
//     } catch (err) {
//         next(err);
//     }
// });

export { Router as UserShowRouter };