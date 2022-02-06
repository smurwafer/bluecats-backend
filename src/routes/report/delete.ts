import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Report } from '../../models/report';

const Router = express.Router();

Router.delete('/api/report/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const report = await Report.findById(id);

        if (!report) {
            throw new Error('Report not found!');
        }

        await Report.findByIdAndDelete(id);

        res.status(202).send({
            message: 'Report deleted successfully',
            report,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as ReportDeleteRouter };