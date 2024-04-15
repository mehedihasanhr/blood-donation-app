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
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../lib/prisma");
class PostOffice {
    // find all
    getAllPostOffice(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield prisma_1.prisma.postOffice.findMany({
                include: { thana: true },
            });
            return res.status(200).json({ data });
        });
    }
    // find by id
    postOfficeById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield prisma_1.prisma.postOffice.findUnique({
                where: { id },
                include: { thana: true },
            });
            return res.status(200).json({ data });
        });
    }
    // find by slug
    postOfficeBySlug(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { slug } = req.params;
            const data = yield prisma_1.prisma.postOffice.findUnique({
                where: { slug },
                include: { thana: true },
            });
            return res.status(200).json({ data });
        });
    }
    // insert new
    insertPostOffice(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            // validate body data
            if (!body.slug || !body.en_name || !body.bn_name || !body.thana_id) {
                return res.status(400).json({ message: 'Provide all required fields.' });
            }
            const data = yield prisma_1.prisma.postOffice.create({
                data: body,
                include: { thana: true },
            });
            return res.status(201).json({ data });
        });
    }
    // delete by id
    deletePostOfficeById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield prisma_1.prisma.postOffice.delete({
                where: { id },
            });
            return res.status(200).json({ data });
        });
    }
    // delete by slug
    deletePostOfficeBySlug(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { slug } = req.params;
            const data = yield prisma_1.prisma.postOffice.delete({
                where: { slug },
            });
            return res.status(200).json({ data });
        });
    }
}
exports.default = new PostOffice();
