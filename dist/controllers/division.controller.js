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
class Division {
    // fetch all divisions
    divisions(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield prisma_1.prisma.division.findMany({
                include: { district: true },
            });
            return res.status(200).json({ data });
        });
    }
    // fetch all divisions
    divisionById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = yield prisma_1.prisma.division.findFirst({
                where: { id },
                include: { district: true },
            });
            return res.status(200).json({ data });
        });
    }
    // fetch division by slug
    divisionBySlug(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const slug = req.params.slug;
            const data = yield prisma_1.prisma.division.findFirst({
                where: { slug },
                include: { district: true },
            });
            return res.status(200).json({ data });
        });
    }
    // insert new division
    insertDivision(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            console.log({ body });
            // validate body data
            if (!body.slug || !body.en_name || !body.bn_name) {
                return res.status(400).json({ message: 'Provide all required fields.' });
            }
            if (!body) {
                return res.status(400).json({ error: 'Request body is empty' });
            }
            // check already slug axios or not
            const isExist = yield prisma_1.prisma.division.findFirst({
                where: { slug: body.slug },
            });
            if (isExist) {
                return res
                    .status(400)
                    .json({ error: 'A division with these slug already exist.' });
            }
            const data = yield prisma_1.prisma.division.create({
                data: {
                    slug: body.slug,
                    en_name: body.en_name,
                    bn_name: body.bn_name,
                },
            });
            return res.status(201).json({ data });
        });
    }
    // delete division
    deleteDivisionById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield prisma_1.prisma.division.delete({ where: { id } });
            return res.status(200).json({ message: 'Delete successfully.' });
        });
    }
    // delete division by slug
    deleteDivisionBySlug(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { slug } = req.params;
            yield prisma_1.prisma.division.delete({ where: { slug } });
            return res.status(200).json({ message: 'Delete successfully.' });
        });
    }
}
exports.default = new Division();
