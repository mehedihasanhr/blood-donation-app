"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const thana_controller_1 = __importDefault(require("../controllers/thana.controller"));
const router = (0, express_1.Router)();
// get
router.get('/thana', thana_controller_1.default.getAllThana);
router.get('/thana/:id', thana_controller_1.default.thanaById);
router.get('/thana/:slug', thana_controller_1.default.thanaBySlug);
// post request
router.post('/thana', thana_controller_1.default.insertThana);
// delete
router.delete('/thana/:id', thana_controller_1.default.deleteThanaById);
router.delete('/thana/:slug', thana_controller_1.default.deleteThanaBySlug);
exports.default = router;
