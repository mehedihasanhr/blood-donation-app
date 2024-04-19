"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_office_controller_1 = __importDefault(require("../controllers/post-office.controller"));
const router = (0, express_1.Router)();
// get
router.get('/post-office', post_office_controller_1.default.getAllPostOffice);
router.get('/post-office/:id', post_office_controller_1.default.postOfficeById);
router.get('/post-office/:slug', post_office_controller_1.default.postOfficeBySlug);
// post request
router.post('/post-office', post_office_controller_1.default.insertPostOffice);
// delete
router.delete('/post-office/:id', post_office_controller_1.default.deletePostOfficeById);
router.delete('/post-office/:slug', post_office_controller_1.default.deletePostOfficeBySlug);
exports.default = router;
