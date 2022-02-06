import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Report } from '../../models/report';
import { ReportValidator } from '../../validators/report/report-validator';

const Router = express.Router();

Router.post('/api/report', requireAuth, ReportValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, text, gallery, id } = req.body;

        const report = Report.build({
            title,
            text,
            story: id,
            gallery,
            reporter: req.currentUser?.id as string,
        });

        await report.save();

        res.status(201).send({
            message: 'Report created successfully',
            report,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as ReportCreateRouter };