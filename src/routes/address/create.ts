import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Address } from '../../models/address';
import { AddressValidator } from '../../validators/address/address-validator';

const Router = express.Router();

Router.post('/api/address', requireAuth, AddressValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, phone, house, street, area, district, state, country, pincode } = req.body;
    
        const address = Address.build({
            name, phone, house, street, area, district, state, country, pincode 
        });
    
        await address.save();
    
        res.status(201).send({
            message: 'address created successfully',
            address,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as AddressCreateRouter };