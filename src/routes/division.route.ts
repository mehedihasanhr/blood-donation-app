import division from '../controllers/division.controller'
import { Router } from 'express'

const router = Router()

// get

// /api/divisions/23423
router.get('/divisions', division.divisions)
router.get('/divisions/:id', division.divisionById)
router.get('/divisions/s/:slug', division.divisionBySlug)

// post request
router.post('/divisions', division.insertDivision)

// delete
router.delete('/divisions/:id', division.deleteDivisionById)
router.delete('/divisions/s/:slug', division.deleteDivisionBySlug)

export default router
