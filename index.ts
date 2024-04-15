import express from 'express'
import router from './routes'
import multer from 'multer'

const upload = multer()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Middleware to parse multipart/form-data
app.use(upload.none())

app.use(express.static('public'))
app.use('/dashboard', express.static('dashboard'))
app.use('/api', router)

app.listen(5000, () => {
  console.log(`listening port ${5000}`)
})
