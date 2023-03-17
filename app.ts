import path from 'path';
import { json } from 'body-parser';
import express, { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { currentUser } from './src/middlewares/current-user';

import { LoginRouter } from './src/routes/auth/login';
import { SignupRouter } from './src/routes/auth/signup';

import { GalleryIndexRouter } from './src/routes/gallery';
import { GalleryCreateRouter } from './src/routes/gallery/create';
import { GalleryDeleteRouter } from './src/routes/gallery/delete';
import { GalleryShowRouter } from './src/routes/gallery/show';
import { GalleryUpdateRouter } from './src/routes/gallery/update';

import { UserIndexRouter } from './src/routes/user';
import { UserDeleteRouter } from './src/routes/user/delete';
import { UserShowRouter } from './src/routes/user/show';
import { UserUpdateRouter } from './src/routes/user/update';

import { CommentCreateRouter } from './src/routes/comment/create';
import { CommentUpdateRouter } from './src/routes/comment/update';
import { CommentDeleteRouter } from './src/routes/comment/delete';
import { CommentShowRouter } from './src/routes/comment/show';

import { BookmarkCreateRouter } from './src/routes/bookmark/create';
import { BookmarkIndexRouter } from './src/routes/bookmark';
import { BookmarkShowRouter } from './src/routes/bookmark/show';
import { BookmarkUpdateRouter } from './src/routes/bookmark/update';
import { BookmarkDeleteRouter } from './src/routes/bookmark/delete';

import { ReportCreateRouter } from './src/routes/report/create';
import { ReportIndexRouter } from './src/routes/report';
import { ReportShowRouter } from './src/routes/report/show';
import { ReportUpdateRouter } from './src/routes/report/update';
import { ReportDeleteRouter } from './src/routes/report/delete';

import { SettingCreateRouter } from './src/routes/setting/create';
import { SettingShowRouter } from './src/routes/setting/show';
import { SettingUpdateRouter } from './src/routes/setting/update';
import { SettingDeleteRouter } from './src/routes/setting/delete';

import { AddressCreateRouter } from './src/routes/address/create';
import { AddressUpdateRouter } from './src/routes/address/update';
import { AddressIndexRouter } from './src/routes/address';
import { AddressShowRouter } from './src/routes/address/show';
import { AddressDeleteRouter } from './src/routes/address/delete';

import { OrderCreateRouter } from './src/routes/order/create';
import { OrderUpdateRouter } from './src/routes/order/update';
import { OrderIndexRouter } from './src/routes/order';
import { OrderShowRouter } from './src/routes/order/show';
import { OrderDeleteRouter } from './src/routes/order/delete';
import { NotFoundError } from './src/exceptions/not-found-error';
import { CustomError } from './src/exceptions/custom-error';

const app = express();

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            cb(null, 'images');
        } else if(file.mimetype === 'video/mp4' || file.mimetype === 'video/x-flv') {
            cb(null, 'videos');
        }
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'video/mp4' || file.mimetype === 'video/x-flv') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(multer({storage: storage, fileFilter: fileFilter}).any());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/videos', express.static(path.join(__dirname, 'videos')));

app.use(json());
app.set('trust proxy', true);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(currentUser);

app.use(LoginRouter);
app.use(SignupRouter);

app.use(UserIndexRouter);
app.use(UserShowRouter);
app.use(UserUpdateRouter);
app.use(UserDeleteRouter);

app.use(AddressCreateRouter);
app.use(AddressUpdateRouter);
app.use(AddressIndexRouter);
app.use(AddressShowRouter);
app.use(AddressDeleteRouter);

app.use(OrderCreateRouter);
app.use(OrderUpdateRouter);
app.use(OrderIndexRouter);
app.use(OrderShowRouter);
app.use(OrderDeleteRouter);

app.use(GalleryCreateRouter);
app.use(GalleryIndexRouter);
app.use(GalleryShowRouter);
app.use(GalleryUpdateRouter);
app.use(GalleryDeleteRouter);

app.use(CommentCreateRouter);
app.use(CommentUpdateRouter);
app.use(CommentDeleteRouter);
app.use(CommentShowRouter);

app.use(BookmarkCreateRouter);
app.use(BookmarkIndexRouter);
app.use(BookmarkShowRouter);
app.use(BookmarkUpdateRouter);
app.use(BookmarkDeleteRouter);

app.use(ReportCreateRouter);
app.use(ReportIndexRouter);
app.use(ReportShowRouter);
app.use(ReportUpdateRouter);
app.use(ReportDeleteRouter);

app.use(SettingCreateRouter);
app.use(SettingShowRouter);
app.use(SettingUpdateRouter);
app.use(SettingDeleteRouter);

app.all('*', (req: Request, res: Response) => {
    console.log(req.path);
    throw new Error('API route not found!');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({
            errors: err.serializeErrors(),
        });
    }
    if (err) {
        return res.status(400).send({
            message: err.message,
        });
    }
    res.status(400).send({
        message: 'Something went wrong!',
    });
});

export { app };