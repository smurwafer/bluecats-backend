import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Contact } from '../../models/contact';
import { Follow } from '../../models/follow';

const Router = express.Router();

Router.delete('/api/follow/:followed', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const followed = req.params.followed;

        const existingFollow = await Follow.findOne({
            $or: [
                {
                    follower: followed,
                    followed: req.currentUser?.id
                }
            ]
        });

        let followText: string = 'follow';

        if (existingFollow) {
            const contact = await Contact.findOne({
                userA: req.currentUser?.id as string,
                userB: followed,
            });
            
            followText = 'follow back';
            
            if (!contact) {
                await Contact.findOneAndDelete({
                    userA: req.currentUser?.id as string,
                    userB: followed,
                });
            }
        }
    
    
        const follow = await Follow.findOne({
            follower: req.currentUser?.id,
            followed,
        });
        
        if (!follow) {
            throw new Error('No such follow exists!');
        }

        await Follow.findOneAndDelete({
            follower: req.currentUser?.id,
            followed,
        });

        res.status(202).send({
            message: 'follow deleted successfully',
            follow,
            followText,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as FollowDeleteRouter };