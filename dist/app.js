"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const path_1 = __importDefault(require("path"));
const body_parser_1 = require("body-parser");
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const current_user_1 = require("./src/middlewares/current-user");
const login_1 = require("./src/routes/auth/login");
const signup_1 = require("./src/routes/auth/signup");
const gallery_1 = require("./src/routes/gallery");
const create_1 = require("./src/routes/gallery/create");
const delete_1 = require("./src/routes/gallery/delete");
const show_1 = require("./src/routes/gallery/show");
const update_1 = require("./src/routes/gallery/update");
const user_1 = require("./src/routes/user");
const delete_2 = require("./src/routes/user/delete");
const show_2 = require("./src/routes/user/show");
const update_2 = require("./src/routes/user/update");
const create_2 = require("./src/routes/comment/create");
const update_3 = require("./src/routes/comment/update");
const delete_3 = require("./src/routes/comment/delete");
const show_3 = require("./src/routes/comment/show");
const create_3 = require("./src/routes/bookmark/create");
const bookmark_1 = require("./src/routes/bookmark");
const show_4 = require("./src/routes/bookmark/show");
const update_4 = require("./src/routes/bookmark/update");
const delete_4 = require("./src/routes/bookmark/delete");
const create_4 = require("./src/routes/report/create");
const report_1 = require("./src/routes/report");
const show_5 = require("./src/routes/report/show");
const update_5 = require("./src/routes/report/update");
const delete_5 = require("./src/routes/report/delete");
const create_5 = require("./src/routes/setting/create");
const show_6 = require("./src/routes/setting/show");
const update_6 = require("./src/routes/setting/update");
const delete_6 = require("./src/routes/setting/delete");
const create_6 = require("./src/routes/address/create");
const update_7 = require("./src/routes/address/update");
const address_1 = require("./src/routes/address");
const show_7 = require("./src/routes/address/show");
const delete_7 = require("./src/routes/address/delete");
const create_7 = require("./src/routes/order/create");
const update_8 = require("./src/routes/order/update");
const order_1 = require("./src/routes/order");
const show_8 = require("./src/routes/order/show");
const delete_8 = require("./src/routes/order/delete");
const custom_error_1 = require("./src/exceptions/custom-error");
const app = (0, express_1.default)();
exports.app = app;
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            cb(null, 'images');
        }
        else if (file.mimetype === 'video/mp4' || file.mimetype === 'video/x-flv') {
            cb(null, 'videos');
        }
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'video/mp4' || file.mimetype === 'video/x-flv') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
app.use((0, multer_1.default)({ storage: storage, fileFilter: fileFilter }).any());
app.use('/images', express_1.default.static(path_1.default.join(__dirname, 'images')));
app.use('/videos', express_1.default.static(path_1.default.join(__dirname, 'videos')));
app.use((0, body_parser_1.json)());
app.set('trust proxy', true);
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(current_user_1.currentUser);
app.use(login_1.LoginRouter);
app.use(signup_1.SignupRouter);
app.use(user_1.UserIndexRouter);
app.use(show_2.UserShowRouter);
app.use(update_2.UserUpdateRouter);
app.use(delete_2.UserDeleteRouter);
app.use(create_6.AddressCreateRouter);
app.use(update_7.AddressUpdateRouter);
app.use(address_1.AddressIndexRouter);
app.use(show_7.AddressShowRouter);
app.use(delete_7.AddressDeleteRouter);
app.use(create_7.OrderCreateRouter);
app.use(update_8.OrderUpdateRouter);
app.use(order_1.OrderIndexRouter);
app.use(show_8.OrderShowRouter);
app.use(delete_8.OrderDeleteRouter);
app.use(create_1.GalleryCreateRouter);
app.use(gallery_1.GalleryIndexRouter);
app.use(show_1.GalleryShowRouter);
app.use(update_1.GalleryUpdateRouter);
app.use(delete_1.GalleryDeleteRouter);
app.use(create_2.CommentCreateRouter);
app.use(update_3.CommentUpdateRouter);
app.use(delete_3.CommentDeleteRouter);
app.use(show_3.CommentShowRouter);
app.use(create_3.BookmarkCreateRouter);
app.use(bookmark_1.BookmarkIndexRouter);
app.use(show_4.BookmarkShowRouter);
app.use(update_4.BookmarkUpdateRouter);
app.use(delete_4.BookmarkDeleteRouter);
app.use(create_4.ReportCreateRouter);
app.use(report_1.ReportIndexRouter);
app.use(show_5.ReportShowRouter);
app.use(update_5.ReportUpdateRouter);
app.use(delete_5.ReportDeleteRouter);
app.use(create_5.SettingCreateRouter);
app.use(show_6.SettingShowRouter);
app.use(update_6.SettingUpdateRouter);
app.use(delete_6.SettingDeleteRouter);
app.all('*', (req, res) => {
    console.log(req.path);
    throw new Error('API route not found!');
});
app.use((err, req, res, next) => {
    if (err instanceof custom_error_1.CustomError) {
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
