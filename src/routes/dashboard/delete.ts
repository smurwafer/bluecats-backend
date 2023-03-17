import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Dashboard } from '../../models/dashboard';

const Router = express.Router();

Router.delete('/api/dashboard/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
    
        const dashboard = await Dashboard.findOne({ user: id });
    
        if (!dashboard) {
            throw new Error('Dashboard does not exist!');
        }
    
        res.status(202).send({
            message: 'dashboard deleted successfully',
        });
    } catch (err) {
        next(err);
    }
});

export { Router as DashboardDeleteRouter };