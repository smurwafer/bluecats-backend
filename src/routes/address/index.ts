import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Address } from '../../models/address';

const Router = express.Router();

Router.get('/api/address', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const addresses = await Address.find();

        res.status(200).send({
            message: 'addresses retrieved successfully',
            addresses,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as AddressIndexRouter };