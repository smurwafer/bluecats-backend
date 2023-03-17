import express, { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../../exceptions/not-found-error';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Address } from '../../models/address';
import { AddressValidator } from '../../validators/address/address-validator';

const Router = express.Router();

Router.put('/api/address/:id', requireAuth, AddressValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const address = await Address.findById(id);

        if (!address)
            throw new NotFoundError('Address Not Found!');

        const { name, phone, house, street, area, district, state, country, pincode } = req.body;
        
        address.set({
            name, phone, house, street, area, district, state, country, pincode
        });
        await address.save();
    
        res.status(204).send({
            message: 'address updated successfully',
            address,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as AddressUpdateRouter };