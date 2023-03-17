import express, { Request, Response, NextFunction } from 'express';
import { Story } from '../../models/story';

const Router = express.Router();

Router.get('/api/story/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const story = await Story.findById(id).populate('author').populate('gallery').sort({ 'createdAt': -1 });
    
        if (!story) {
            throw new Error('Story not found!');
        }
    
        res.status(200).send({
            message: 'story fetched successfully',
            story,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as StoryShowRouter };