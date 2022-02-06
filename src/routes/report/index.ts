import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Report } from '../../models/report';

const Router = express.Router();

Router.get('/api/report', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reports = await Report.find().populate('reporter').populate('gallery');

        res.status(200).send({
            message: 'Reports fetched successfully',
            reports,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as ReportIndexRouter };