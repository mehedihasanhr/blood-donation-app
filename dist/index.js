"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Middleware to parse multipart/form-data
app.use(upload.none());
app.use(express_1.default.static('public'));
app.use('/dashboard', express_1.default.static('dashboard'));
app.use('/api', routes_1.default);
app.listen(5000, () => {
    console.log(`listening port ${5000}`);
});
