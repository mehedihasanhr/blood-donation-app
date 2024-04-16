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
class District {
    // fetch all districts
    districts(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield prisma_1.prisma.district.findMany({
                include: { division: true, thana: true },
            });
            return res.status(200).json({ data });
        });
    }
    // get district by id
    districtById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield prisma_1.prisma.district.findUnique({
                where: { id },
                include: { division: true, thana: true },
            });
            return res.status(200).json({ data });
        });
    }
    // get district by slug
    districtBySlug(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { slug } = req.params;
            const data = yield prisma_1.prisma.district.findUnique({
                where: { slug },
                include: { division: true, thana: true },
            });
            return res.status(200).json({ data });
        });
    }
    // insert district
    insertDistrict(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            // validate body data
            if (!body.slug || !body.en_name || !body.bn_name || !body.division_id) {
                return res.status(400).json({ error: 'Provide all required fields.' });
            }
            // check already slug axios or not
            const isExist = yield prisma_1.prisma.district.findFirst({
                where: { slug: body.slug },
            });
            if (isExist) {
                return res
                    .status(400)
                    .json({ error: 'A district with these slug already exist.' });
            }
            const data = yield prisma_1.prisma.district.create({
                data: body,
                include: {
                    division: true,
                    thana: true,
                },
            });
            return res.status(201).json({ data });
        });
    }
    // delete district by id
    deleteDistrictById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield prisma_1.prisma.district.delete({ where: { id } });
            return res.status(200).json({ data, message: 'Data delete successfully.' });
        });
    }
    // delete district by slug
    deleteDistrictBySlug(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { slug } = req.params;
            const data = yield prisma_1.prisma.district.delete({ where: { slug } });
            return res.status(200).json({ data, message: 'Data delete successfully.' });
        });
    }
}
exports.default = new District();
