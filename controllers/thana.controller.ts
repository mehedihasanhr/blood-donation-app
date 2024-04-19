import { Response, Request } from 'express'
import { prisma } from '../lib/prisma'

class Thana {
  // thana
  async getAllThana(req: Request, res: Response) {
    const data = await prisma.thana.findMany({
      include: { district: true, post_office: true },
    })
    return res.status(200).json({ data })
  }

  // get thana by id
  async thanaById(req: Request, res: Response) {
    const { id } = req.params
    const data = await prisma.thana.findUnique({
      where: { id },
      include: { district: true, post_office: true },
    })

    return res.status(200).json({ data })
  }
  // get thana by slug
  async thanaBySlug(req: Request, res: Response) {
    const { slug } = req.params
    const data = await prisma.thana.findUnique({
      where: { slug },
      include: { district: true, post_office: true },
    })

    return res.status(200).json({ data })
  }
  // get thana by district
  async thanaByDistrict(req: Request, res: Response) {
    const district_id = req.params.districtId
    const data = await prisma.thana.findMany({
      where: { district_id: district_id },
      include: { district: true, post_office: true },
    })

    return res.status(200).json({ data })
  }

  // insert thana
  async insertThana(req: Request, res: Response) {
    const body = req.body

    // validate body data
    if (!body.slug || !body.en_name || !body.bn_name || !body.district_id) {
      return res.status(400).json({ error: 'Provide all required fields.' })
    }

    const isAlreadyExist = await prisma.thana.findUnique({
      where: { slug: body.slug },
    })

    if (isAlreadyExist) {
      return res.status(400).json({ error: 'Data already exist.' })
    }

    const data = await prisma.thana.create({
      data: body,
      include: { district: true, post_office: true },
    })

    return res.status(201).json({ data })
  }
  // delete thana by id
  async deleteThanaById(req: Request, res: Response) {
    const { id } = req.params
    const data = await prisma.thana.delete({ where: { id } })
    return res.status(200).json({ data })
  }
  // delete thana by slug
  async deleteThanaBySlug(req: Request, res: Response) {
    const { slug } = req.params
    const data = await prisma.thana.findUnique({ where: { slug } })
    return res.status(200).json({ data })
  }
}

export default new Thana()
