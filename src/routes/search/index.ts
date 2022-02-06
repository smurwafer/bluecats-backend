import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import Fuse from 'fuse.js';
import { User } from '../../models/user';
import { Stream } from '../../models/stream';
import { Channel } from '../../models/channel';
import { Profile } from '../../models/profile';

const Router = express.Router();

Router.get('/api/search', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        // api/search/?type=stream&input=text
        const type = req.query.type as string;
        const input = req.query.input as string;

        let fuse;

        if (type === 'stream') {
            const streams = await Stream.find().populate('channel').populate('gallery');
    
            fuse = new Fuse(streams, {
                includeScore: true,
                keys: ['title', 'hashtags', 'type'],
            });

        } else if (type === 'channel') { 
            const channels = await Channel.find().populate('holders').populate('gallery');
    
            fuse = new Fuse(channels, {
                includeScore: true,
                keys: ['name', 'hashtags', 'type'],
            });
    
        } else if(type === 'user') {
            const users = await User.find();
            const profiles = await Profile.find();

            fuse = new Fuse([...users, ...profiles], {
                includeScore: true,
                keys: ['userName', 'email', 'name']
            });
        }
        
        const results = fuse ? fuse.search(input) : [];

        res.status(200).send({
            message: 'Search results fetched succesfully',
            results,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as SearchIndexRouter };