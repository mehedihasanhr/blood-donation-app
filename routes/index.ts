import { Router } from 'express'
import divisionRouter from './division.route'
import districtRouter from './district.route'
import thanaRouter from './thana.route'
import postOfficeRouter from './post-office.route'

const router = Router()

router.use(divisionRouter)
router.use(districtRouter)
router.use(thanaRouter)
router.use(postOfficeRouter)

export default router
