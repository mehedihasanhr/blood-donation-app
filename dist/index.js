"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
require("dotenv/config");
const upload = (0, multer_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Middleware to parse multipart/form-data
app.use(upload.none());
// Serve static files from the 'public' folder
const publicPath = path_1.default.join(__dirname, 'public'); // Get the absolute path to the 'public' folder
app.use(express_1.default.static(publicPath));
app.use('/api', routes_1.default);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`listening port ${PORT}`);
});
exports.default = app;
