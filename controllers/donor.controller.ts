import { prisma } from '../lib/prisma'
import { Request, Response } from 'express'

class Donor {
  async donors(req: Request, res: Response) {
    const query = req.query
    const queryKeys = Object.keys(query)

    const filter: { [key: string]: any } = {} // Specify the type of filter

    queryKeys.forEach((key) => {
      const value = query[key]
      if (value) {
        filter[`${key}_id`] = value
      }
    })

    const data = await prisma.donor.findMany({
      where: { ...filter },
      include: { thana: true, division: true, district: true },
    })
    return res.status(200).json({ data })
  }

  async insertDonor(req: Request, res: Response) {
    // Extract form data from req.body
    const {
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
    } = req.body

    // check already slug exists or not
    const isExist = await prisma.donor.findFirst({
      where: { mobile },
    })

    if (isExist) {
      return res.status(400).json({ error: 'This mobile number already used' })
    }

    const data = await prisma.donor.create({
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
    })

    return res.status(201).json({ data })
  }
}

export default new Donor()
