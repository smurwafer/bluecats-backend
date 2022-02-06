import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Setting } from '../../models/setting';

const Router = express.Router();

Router.post('/api/setting', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { language, emailOnLogin, notification, showNewContent } = req.body;

        const setting = Setting.build({
            language,
            emailOnLogin,
            notification,
            showNewContent,
            user: req.currentUser?.id as string,
        });

        await setting.save();

        res.status(201).send({
            message: "Settings built successfully!",
            setting,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as SettingCreateRouter };