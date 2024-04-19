import { Router } from 'express'
import postOffice from '../controllers/post-office.controller'

const router = Router()

// get
router.get('/post-office', postOffice.getAllPostOffice)
router.get('/post-office/:id', postOffice.postOfficeById)
router.get('/post-office/:slug', postOffice.postOfficeBySlug)

// post request
router.post('/post-office', postOffice.insertPostOffice)

// delete
router.delete('/post-office/:id', postOffice.deletePostOfficeById)
router.delete('/post-office/:slug', postOffice.deletePostOfficeBySlug)

export default router
