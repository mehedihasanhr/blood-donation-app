import { prisma } from '../lib/prisma'
import { Request, Response } from 'express'

class District {
  // fetch all districts
  async districts(_req: Request, res: Response) {
    const data = await prisma.district.findMany({
      include: { division: true, thana: true },
    })
    return res.status(200).json({ data })
  }

  // get district by id
  async districtById(req: Request, res: Response) {
    const { id } = req.params
    const data = await prisma.district.findUnique({
      where: { id },
      include: { division: true, thana: true },
    })
    return res.status(200).json({ data })
  }
  // get district by slug
  async districtBySlug(req: Request, res: Response) {
    const { slug } = req.params
    const data = await prisma.district.findUnique({
      where: { slug },
      include: { division: true, thana: true },
    })
    return res.status(200).json({ data })
  }

  // insert district
  async insertDistrict(req: Request, res: Response) {
    const body = req.body

    // validate body data
    if (!body.slug || !body.en_name || !body.bn_name || !body.division_id) {
      return res.status(400).json({ error: 'Provide all required fields.' })
    }

    // check already slug axios or not
    const isExist = await prisma.district.findFirst({
      where: { slug: body.slug },
    })

    if (isExist) {
      return res
        .status(400)
        .json({ error: 'A district with these slug already exist.' })
    }

    const data = await prisma.district.create({
      data: body,
      include: {
        division: true,
        thana: true,
      },
    })
    return res.status(201).json({ data })
  }

  // delete district by id
  async deleteDistrictById(req: Request, res: Response) {
    const { id } = req.params
    const data = await prisma.district.delete({ where: { id } })
    return res.status(200).json({ data, message: 'Data delete successfully.' })
  }
  // delete district by slug
  async deleteDistrictBySlug(req: Request, res: Response) {
    const { slug } = req.params
    const data = await prisma.district.delete({ where: { slug } })
    return res.status(200).json({ data, message: 'Data delete successfully.' })
  }
}

export default new District()
