import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Setting, SettingDoc } from '../../models/setting';

const Router = express.Router();

Router.get('/api/setting', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.currentUser?.id as string;

        let setting : SettingDoc | null | undefined = await Setting.findOne({
            user: id,
        });

        if (!setting) {
            setting = Setting.build({
                language: "english",
                emailOnLogin: false,
                notification: true,
                showNewContent: true,
                user: id,
            });

            await setting.save();
        }

        res.status(200).send({
            message: "Settings fetched successfully!",
            setting,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as SettingShowRouter };