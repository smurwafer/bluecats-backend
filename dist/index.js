"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    const mongoUserName = process.env.MONGO_DB_USERNAME;
    const mongoPassword = process.env.MONGO_DB_PASSWORD;
    try {
        yield mongoose_1.default.connect(`mongodb+srv://${mongoUserName}:${mongoPassword}@cluster0.fnmec.mongodb.net/artworks`);
        console.log('Connected to mongoose');
    }
    catch (error) {
        throw new Error('Error connecting to database!');
    }
    const port = process.env.PORT || 2000;
    app_1.app.listen(port, () => {
        console.log('Listening on port:' + port);
    });
});
start();
