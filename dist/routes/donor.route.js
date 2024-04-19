"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const donor_controller_1 = __importDefault(require("../controllers/donor.controller"));
const router = (0, express_1.Router)();
// get
router.get('/donors', donor_controller_1.default.donors);
// post request
router.post('/donor', donor_controller_1.default.insertDonor);
exports.default = router;
