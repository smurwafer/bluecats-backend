import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Report } from '../../models/report';

const Router = express.Router();

Router.get('/api/report/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const report = await Report.findById(id).populate('reporter').populate('gallery');

        if (!report) {
            throw new Error('Report not found!');
        }

        res.status(200).send({
            message: 'Report fetched successfully',
            report,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as ReportShowRouter };