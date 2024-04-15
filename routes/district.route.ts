import { Router } from 'express'
import district from '../controllers/district.controller'

const router = Router()

// get
router.get('/districts', district.districts)
router.get('/district/:id', district.districtById)
router.get('/district/:slug', district.districtBySlug)

// post request
router.post('/districts', district.insertDistrict)

// delete
router.delete('/district/:id', district.deleteDistrictById)
router.delete('/district/:slug', district.deleteDistrictBySlug)

export default router
