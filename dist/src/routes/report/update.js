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
exports.ReportUpdateRouter = void 0;
const express_1 = __importDefault(require("express"));
const require_auth_1 = require("../../middlewares/require-auth");
const validate_request_1 = require("../../middlewares/validate-request");
const report_1 = require("../../models/report");
const report_validator_1 = require("../../validators/report/report-validator");
const Router = express_1.default.Router();
exports.ReportUpdateRouter = Router;
Router.put('/api/report/:id', require_auth_1.requireAuth, report_validator_1.ReportValidator, validate_request_1.validateRequest, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ID = req.params.id;
        const { title, text, gallery, id } = req.body;
        const report = yield report_1.Report.findById(ID);
        if (!report) {
            throw new Error('Report not found!');
        }
        report.set({
            title,
            text,
            gallery,
            story: id,
        });
        yield report.save();
        res.status(204).send({
            message: 'Report updated successfully',
            report,
        });
    }
    catch (err) {
        next(err);
    }
}));
