import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Setting } from '../../models/setting';

const Router = express.Router();

Router.put('/api/setting', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { language, emailOnLogin, notification, showNewContent } = req.body;

        const setting = await Setting.findOne({
            user: req.currentUser?.id,
        });

        if (!setting) {
            throw new Error('Settings not found!');
        }

        setting.set({
            language,
            emailOnLogin,
            notification,
            showNewContent,
        });

        await setting.save();

        res.status(204).send({
            message: "Settings updated successfully!",
            setting,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as SettingUpdateRouter };