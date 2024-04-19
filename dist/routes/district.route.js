"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const district_controller_1 = __importDefault(require("../controllers/district.controller"));
const router = (0, express_1.Router)();
// get
router.get('/districts', district_controller_1.default.districts);
router.get('/district/:id', district_controller_1.default.districtById);
router.get('/district/:slug', district_controller_1.default.districtBySlug);
router.get('/district/division/:divisionId', district_controller_1.default.districtByDivisionName);
// post request
router.post('/districts', district_controller_1.default.insertDistrict);
// delete
router.delete('/district/:id', district_controller_1.default.deleteDistrictById);
router.delete('/district/:slug', district_controller_1.default.deleteDistrictBySlug);
exports.default = router;
