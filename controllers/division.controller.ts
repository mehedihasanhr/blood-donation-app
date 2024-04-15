import { prisma } from '../lib/prisma'
import { Request, Response } from 'express'

class Division {
  // fetch all divisions
  async divisions(_req: Request, res: Response) {
    const data = await prisma.division.findMany({
      include: { district: true },
    })
    return res.status(200).json({ data })
  }

  // fetch all divisions

  async divisionById(req: Request, res: Response) {
    const id = req.params.id
    const data = await prisma.division.findFirst({
      where: { id },
      include: { district: true },
    })
    return res.status(200).json({ data })
  }

  // fetch division by slug
  async divisionBySlug(req: Request, res: Response) {
    const slug = req.params.slug

    const data = await prisma.division.findFirst({
      where: { slug },
      include: { district: true },
    })
    return res.status(200).json({ data })
  }

  // insert new division
  async insertDivision(req: Request, res: Response) {
    const body = req.body

    // validate body data
    if (!body.slug || !body.en_name || !body.bn_name) {
      return res.status(400).json({ error: 'Provide all required fields.' })
    }

    if (!body) {
      return res.status(400).json({ error: 'Request body is empty' })
    }

    // check already slug axios or not
    const isExist = await prisma.division.findFirst({
      where: { slug: body.slug },
    })

    if (isExist) {
      return res
        .status(400)
        .json({ error: 'A division with these slug already exist.' })
    }

    const data = await prisma.division.create({
      data: {
        slug: body.slug,
        en_name: body.en_name,
        bn_name: body.bn_name,
      },
    })

    return res.status(201).json({ data })
  }

  // delete division
  async deleteDivisionById(req: Request, res: Response) {
    const { id } = req.params
    await prisma.division.delete({ where: { id } })
    return res.status(200).json({ message: 'Delete successfully.' })
  }

  // delete division by slug
  async deleteDivisionBySlug(req: Request, res: Response) {
    const { slug } = req.params
    await prisma.division.delete({ where: { slug } })
    return res.status(200).json({ message: 'Delete successfully.' })
  }
}

export default new Division()
