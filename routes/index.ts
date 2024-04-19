import { Router } from 'express'
import divisionRouter from './division.route'
import districtRouter from './district.route'
import thanaRouter from './thana.route'
import postOfficeRouter from './post-office.route'
import donorRouter from './donor.route'

const router = Router()

router.use(divisionRouter)
router.use(districtRouter)
router.use(thanaRouter)
router.use(postOfficeRouter)
router.use(donorRouter)

export default router
