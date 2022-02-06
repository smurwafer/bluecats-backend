import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Setting } from '../../models/setting';

const Router = express.Router();

Router.delete('/api/setting/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const setting = await Setting.findOne({
            user: id,
        });

        if (!setting) {
            throw new Error('Settings not found!');
        }

        await Setting.findByIdAndDelete({
            user: id,
        });

        res.status(202).send({
            message: "Settings deleted successfully!",
            setting,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as SettingDeleteRouter };