import { Router } from 'express'
import donor from '../controllers/donor.controller'

const router = Router()

// get
router.get('/donors', donor.donors)

// post request
router.post('/donor', donor.insertDonor)

export default router
