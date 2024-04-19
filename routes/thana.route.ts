import { Router } from 'express'
import thana from '../controllers/thana.controller'

const router = Router()

// get
router.get('/thana', thana.getAllThana)
router.get('/thana/:id', thana.thanaById)
router.get('/thana/:slug', thana.thanaBySlug)
router.get('/thana/district/:districtId', thana.thanaByDistrict)

// post request
router.post('/thana', thana.insertThana)

// delete
router.delete('/thana/:id', thana.deleteThanaById)
router.delete('/thana/:slug', thana.deleteThanaBySlug)

export default router
