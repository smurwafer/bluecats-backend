import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Story } from '../../models/story';

const Router = express.Router();

Router.put('/api/story/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const { title, text, gallery, hashtags } = req.body;
    
        const story = await Story.findById(id);
    
        if(!story) {
            throw new Error('No such story exists!');
        }
    
        story.set({
            title, text, gallery, hashtags,
        });
    
        await story.save();
    
        res.status(204).send({
            message: 'story updated successfully',
            story,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as StoryUpdateRouter };