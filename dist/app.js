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
const story_1 = require("./src/routes/story");
const create_2 = require("./src/routes/story/create");
const show_2 = require("./src/routes/story/show");
const update_2 = require("./src/routes/story/update");
const user_1 = require("./src/routes/user");
const delete_2 = require("./src/routes/user/delete");
const show_3 = require("./src/routes/user/show");
const update_3 = require("./src/routes/user/update");
const update_4 = require("./src/routes/dashboard/update");
const show_4 = require("./src/routes/dashboard/show");
const delete_3 = require("./src/routes/dashboard/delete");
const create_3 = require("./src/routes/vote/create");
const delete_4 = require("./src/routes/vote/delete");
const show_5 = require("./src/routes/vote/show");
const create_4 = require("./src/routes/comment/create");
const delete_5 = require("./src/routes/comment/delete");
const show_6 = require("./src/routes/comment/show");
const dashboard_1 = require("./src/routes/dashboard");
const create_5 = require("./src/routes/follow/create");
const follow_1 = require("./src/routes/follow");
const delete_6 = require("./src/routes/follow/delete");
const show_7 = require("./src/routes/follow/show");
const create_6 = require("./src/routes/bookmark/create");
const bookmark_1 = require("./src/routes/bookmark");
const show_8 = require("./src/routes/bookmark/show");
const update_5 = require("./src/routes/bookmark/update");
const delete_7 = require("./src/routes/bookmark/delete");
const create_7 = require("./src/routes/report/create");
const report_1 = require("./src/routes/report");
const show_9 = require("./src/routes/report/show");
const update_6 = require("./src/routes/report/update");
const delete_8 = require("./src/routes/report/delete");
const search_1 = require("./src/routes/search");
const create_8 = require("./src/routes/setting/create");
const show_10 = require("./src/routes/setting/show");
const update_7 = require("./src/routes/setting/update");
const delete_9 = require("./src/routes/setting/delete");
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
app.use(create_2.StoryCreateRouter);
app.use(update_2.StoryUpdateRouter);
app.use(story_1.StoryIndexRouter);
app.use(show_2.StoryShowRouter);
app.use(update_2.StoryUpdateRouter);
app.use(user_1.UserIndexRouter);
app.use(show_3.UserShowRouter);
app.use(update_3.UserUpdateRouter);
app.use(delete_2.UserDeleteRouter);
app.use(create_1.GalleryCreateRouter);
app.use(gallery_1.GalleryIndexRouter);
app.use(show_1.GalleryShowRouter);
app.use(update_1.GalleryUpdateRouter);
app.use(delete_1.GalleryDeleteRouter);
app.use(dashboard_1.DashboardIndexRouter);
app.use(update_4.DashboardUpdateRouter);
app.use(show_4.DashboardShowRouter);
app.use(delete_3.DashboardDeleteRouter);
app.use(create_3.VoteCreateRouter);
app.use(delete_4.VoteDeleteRouter);
app.use(show_5.VoteShowRouter);
app.use(create_4.CommentCreateRouter);
app.use(delete_5.CommentDeleteRouter);
app.use(show_6.CommentShowRouter);
app.use(create_5.FollowCreateRouter);
app.use(follow_1.FollowIndexRouter);
app.use(show_7.FollowShowRouter);
app.use(delete_6.FollowDeleteRouter);
app.use(create_6.BookmarkCreateRouter);
app.use(bookmark_1.BookmarkIndexRouter);
app.use(show_8.BookmarkShowRouter);
app.use(update_5.BookmarkUpdateRouter);
app.use(delete_7.BookmarkDeleteRouter);
app.use(create_7.ReportCreateRouter);
app.use(report_1.ReportIndexRouter);
app.use(show_9.ReportShowRouter);
app.use(update_6.ReportUpdateRouter);
app.use(delete_8.ReportDeleteRouter);
app.use(search_1.SearchIndexRouter);
app.use(create_8.SettingCreateRouter);
app.use(show_10.SettingShowRouter);
app.use(update_7.SettingUpdateRouter);
app.use(delete_9.SettingDeleteRouter);
app.all('*', (req, res) => {
    console.log(req.path);
    throw new Error('API route not found!');
});
app.use((err, req, res, next) => {
    console.log('Something went wrong!');
    if (err) {
        console.log(err.message);
        return res.status(400).send({
            message: err.message,
        });
    }
    res.status(400).send({
        message: 'Something went wrong!',
    });
});
