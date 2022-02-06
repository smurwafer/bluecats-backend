import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Report } from '../../models/report';
import { ReportValidator } from '../../validators/report/report-validator';

const Router = express.Router();

Router.put('/api/report/:id', requireAuth, ReportValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ID = req.params.id;

        const { title, text, gallery, id } = req.body;

        const report = await Report.findById(ID);

        if (!report) {
            throw new Error('Report not found!');
        }

        report.set({
            title,
            text,
            gallery,
            story: id,
        });

        await report.save();

        res.status(204).send({
            message: 'Report updated successfully',
            report,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as ReportUpdateRouter };