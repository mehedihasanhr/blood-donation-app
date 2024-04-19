"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const division_route_1 = __importDefault(require("./division.route"));
const district_route_1 = __importDefault(require("./district.route"));
const thana_route_1 = __importDefault(require("./thana.route"));
const post_office_route_1 = __importDefault(require("./post-office.route"));
const donor_route_1 = __importDefault(require("./donor.route"));
const router = (0, express_1.Router)();
router.use(division_route_1.default);
router.use(district_route_1.default);
router.use(thana_route_1.default);
router.use(post_office_route_1.default);
router.use(donor_route_1.default);
exports.default = router;
