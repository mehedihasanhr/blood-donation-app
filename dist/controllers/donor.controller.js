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
class Donor {
    donors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.query;
            const queryKeys = Object.keys(query);
            const filter = {}; // Specify the type of filter
            queryKeys.forEach((key) => {
                const value = query[key];
                if (value) {
                    // if filtering by blood_type use direct field, otherwise map to relation id fields
                    if (key === 'blood_type') {
                        filter['blood_type'] = value;
                    }
                    else {
                        filter[`${key}_id`] = value;
                    }
                }
            });
            const data = yield prisma_1.prisma.donor.findMany({
                where: Object.assign({}, filter),
                include: { thana: true, division: true, district: true },
            });
            return res.status(200).json({ data });
        });
    }
    insertDonor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Extract form data from req.body
            const { name, date_of_birth, father_name, mother_name, profession, organization_name, division_id, district_id, thana_id, blood_type, last_blood_donation, mobile, } = req.body;
            // check already slug exists or not
            const isExist = yield prisma_1.prisma.donor.findFirst({
                where: { mobile },
            });
            if (isExist) {
                return res.status(400).json({ error: 'This mobile number already used' });
            }
            const data = yield prisma_1.prisma.donor.create({
                data: {
                    name,
                    date_of_birth,
                    father_name,
                    mother_name,
                    profession,
                    organization_name,
                    division_id,
                    district_id,
                    thana_id,
                    blood_type,
                    last_blood_donation,
                    mobile,
                },
            });
            return res.status(201).json({ data });
        });
    }
}
exports.default = new Donor();
