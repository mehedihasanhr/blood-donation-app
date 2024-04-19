import { Response, Request } from 'express'
import { prisma } from '../lib/prisma'

class PostOffice {
  // find all
  async getAllPostOffice(req: Request, res: Response) {
    const data = await prisma.postOffice.findMany({
      include: { thana: true },
    })
    return res.status(200).json({ data })
  }

  // find by id
  async postOfficeById(req: Request, res: Response) {
    const { id } = req.params
    const data = await prisma.postOffice.findUnique({
      where: { id },
      include: { thana: true },
    })

    return res.status(200).json({ data })
  }
  // find by slug
  async postOfficeBySlug(req: Request, res: Response) {
    const { slug } = req.params
    const data = await prisma.postOffice.findUnique({
      where: { slug },
      include: { thana: true },
    })

    return res.status(200).json({ data })
  }
  // insert new
  async insertPostOffice(req: Request, res: Response) {
    const body = req.body

    // validate body data
    if (!body.slug || !body.en_name || !body.bn_name || !body.thana_id) {
      return res.status(400).json({ message: 'Provide all required fields.' })
    }

    const data = await prisma.postOffice.create({
      data: body,
      include: { thana: true },
    })

    return res.status(201).json({ data })
  }
  // delete by id
  async deletePostOfficeById(req: Request, res: Response) {
    const { id } = req.params
    const data = await prisma.postOffice.delete({
      where: { id },
    })

    return res.status(200).json({ data })
  }
  // delete by slug
  async deletePostOfficeBySlug(req: Request, res: Response) {
    const { slug } = req.params
    const data = await prisma.postOffice.delete({
      where: { slug },
    })

    return res.status(200).json({ data })
  }
}

export default new PostOffice()
