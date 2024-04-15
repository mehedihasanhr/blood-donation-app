"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const division_controller_1 = __importDefault(require("../controllers/division.controller"));
const express_1 = require("express");
const router = (0, express_1.Router)();
// get
// /api/divisions/23423
router.get('/divisions', division_controller_1.default.divisions);
router.get('/divisions/:id', division_controller_1.default.divisionById);
router.get('/divisions/s/:slug', division_controller_1.default.divisionBySlug);
// post request
router.post('/divisions', division_controller_1.default.insertDivision);
// delete
router.delete('/divisions/:id', division_controller_1.default.deleteDivisionById);
router.delete('/divisions/:slug', division_controller_1.default.deleteDivisionBySlug);
exports.default = router;
