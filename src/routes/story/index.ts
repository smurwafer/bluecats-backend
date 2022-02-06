import express, { Request, Response, NextFunction } from 'express';
import { Story, StoryAttr } from '../../models/story';
import { Vote } from '../../models/vote';

const Router = express.Router();

interface Trending {
    story: StoryAttr;
    upvotes: number;
    downvotes: number;
};

Router.get('/api/story', async (req: Request, res: Response, next: NextFunction) => {
    // /api/story?page=1
    // /api/story?author=fweofiqqp

    const page:number = parseInt(req.query.page as string);
    const perPage:number = 10;
    const offset: number = (page - 1) * perPage;
    
    const author: string = req.query.author as string;

    // /api/story?hashtag=horror
    const hashtag: string = req.query.hashtag as string;

    if (author) {
        const stories = await Story.find({ author }).sort({
            'createdAt': -1,
        }).populate('author').populate('gallery').skip(offset).limit(perPage);

        return res.status(200).send({
            message: 'user stories fetched successfully',
            stories,
        });
    }

    if (hashtag) {
        const stories = await Story.find({ hashtags: hashtag }).sort({
            'createdAt': -1,
        }).populate('author').populate('gallery').skip(offset).limit(perPage);

        return res.status(200).send({
            message: 'hashtag stories fetched successfully',
            stories,
        });
    }

    const stories = await Story.find().sort({
        'createdAt': -1,
    }).populate('author').populate('gallery').skip(offset).limit(perPage);

    res.status(200).send({
        message: 'stories fetched successfully',
        stories,
    });
});


Router.get('/api/trending', async (req: Request, res: Response, next: NextFunction) => {
    // /api/trending?page=1
    // /api/trending?author=fweofiqqp

    const page:number = parseInt(req.query.page as string);
    const perPage:number = 10;
    const offset: number = (page - 1) * perPage;

    // /api/trending?hashtag=horror
    const hashtag: string = req.query.hashtag as string;

    if (hashtag) {
        const stories = await Story.find({ hashtags: hashtag }).sort({
            'createdAt': -1,
        }).populate('author').populate('gallery').skip(offset).limit(perPage);

        const promisedTrending: Promise<Trending>[] = stories.map(async s => {
            const upvotes = await Vote.find({ story: s.id, type: 'up' }).countDocuments();
            const downvotes = await Vote.find({ story: s.id, type: 'down' }).countDocuments();

            const story = await (await s.populate('author')).populate('gallery');

            const t: Trending = {
                    story,
                    upvotes,
                    downvotes,
                };

            return t;
        });

        let trending: Trending[] = [];

        await (async () => {
            trending = await Promise.all(promisedTrending);
        })();

        trending.sort((t1: Trending, t2: Trending) => {
            return (t1.upvotes + t1.downvotes) - (t2.upvotes + t2.downvotes);
        });
        
        trending.length = Math.min(trending.length, 10);

        return res.status(200).send({
            message: 'trending fetched successfully',
            trending,
        });
    }

    

    const stories = await Story.find().sort({
        'createdAt': -1,
    }).populate('author').populate('gallery').skip(offset).limit(perPage);

    const promisedTrending: Promise<Trending>[] = stories.map(async s => {
        const upvotes = await Vote.find({ story: s.id, type: 'up' }).countDocuments();
        const downvotes = await Vote.find({ story: s.id, type: 'down' }).countDocuments();

        const story = await (await s.populate('author')).populate('gallery');

        const t: Trending = {
            story,
            upvotes,
            downvotes,
        };

        return t;
    });

    let trending: Trending[] = [];

    await (async () => {
        trending = await Promise.all(promisedTrending);
    })();

    trending.sort((t1: Trending, t2: Trending) => {
        return (t1.upvotes + t1.downvotes) - (t2.upvotes + t2.downvotes);
    });
    
    trending.length = Math.min(trending.length, 10);

    res.status(200).send({
        message: 'trending fetched successfully',
        trending,
    });
});

export { Router as StoryIndexRouter };