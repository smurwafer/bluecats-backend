import express, { Request, Response, NextFunction } from 'express';
import { Gamble } from '../../models/gamble';
import { Story } from '../../models/story';

const Router = express.Router();

Router.delete('/api/story/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const story = await Story.findById(id);
        
        if (!story) {
            throw new Error('No such story exists!');
        }
        
        await Story.findByIdAndDelete(id);

        const gamble = await Gamble.findOne({
            story: id,
        });

        if (!gamble) {
            throw new Error('No such gamble exists!');
        }

        await Gamble.findOneAndDelete({
            story: id,
        });
        
        res.status(202).send({
            message: 'stories deleted successfully',
            story,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as StoryDeleteRouter };