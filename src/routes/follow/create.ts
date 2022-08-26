import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Contact } from '../../models/contact';
import { Follow } from '../../models/follow';

const Router = express.Router();

Router.post('/api/follow', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { followed } = req.body;

        const userId = req.currentUser?.id as string;

        const existingFollow = await Follow.findOne({
            $or: [
                {
                    follower: followed,
                    followed: userId
                }
            ]
        });

        let followText: string = 'following';

        if (existingFollow) {
            const contact = Contact.build({
                userA: userId,
                userB: followed,
            });

            followText = 'contact';

            await contact.save();
        }
    
        const follow = Follow.build({
            follower: userId,
            followed,
        });
    
        await follow.save();

        res.status(201).send({
            message: 'follow created successfully',
            followText,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as FollowCreateRouter };