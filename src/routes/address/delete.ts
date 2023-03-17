import express, { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../../exceptions/not-found-error';
import { requireAuth } from '../../middlewares/require-auth';
import { Address } from '../../models/address';

const Router = express.Router();

Router.delete('/api/address/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const address = await Address.findById(id);

        if (!address)
            throw new NotFoundError('Address Not Found!');

        await address.remove();

        res.status(204).send({
            message: 'address deleted successfully',
        });
    } catch (err) {
        next(err);
    }
});

export { Router as AddressDeleteRouter };