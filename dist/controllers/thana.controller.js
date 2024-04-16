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
class Thana {
    // thana
    getAllThana(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield prisma_1.prisma.thana.findMany({
                include: { district: true, post_office: true },
            });
            return res.status(200).json({ data });
        });
    }
    // get thana by id
    thanaById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield prisma_1.prisma.thana.findUnique({
                where: { id },
                include: { district: true, post_office: true },
            });
            return res.status(200).json({ data });
        });
    }
    // get thana by slug
    thanaBySlug(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { slug } = req.params;
            const data = yield prisma_1.prisma.thana.findUnique({
                where: { slug },
                include: { district: true, post_office: true },
            });
            return res.status(200).json({ data });
        });
    }
    // insert thana
    insertThana(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            // validate body data
            if (!body.slug || !body.en_name || !body.bn_name || !body.district_id) {
                return res.status(400).json({ error: 'Provide all required fields.' });
            }
            const isAlreadyExist = yield prisma_1.prisma.thana.findUnique({
                where: { slug: body.slug },
            });
            if (isAlreadyExist) {
                return res.status(400).json({ error: 'Data already exist.' });
            }
            const data = yield prisma_1.prisma.thana.create({
                data: body,
                include: { district: true, post_office: true },
            });
            return res.status(201).json({ data });
        });
    }
    // delete thana by id
    deleteThanaById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield prisma_1.prisma.thana.delete({ where: { id } });
            return res.status(200).json({ data });
        });
    }
    // delete thana by slug
    deleteThanaBySlug(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { slug } = req.params;
            const data = yield prisma_1.prisma.thana.findUnique({ where: { slug } });
            return res.status(200).json({ data });
        });
    }
}
exports.default = new Thana();
