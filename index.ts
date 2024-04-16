import express from 'express'
import router from './routes'
import multer from 'multer'
import 'dotenv/config'

const upload = multer()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Middleware to parse multipart/form-data
app.use(upload.none())

app.use('/api', router)
app.use(express.static('public'))

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`listening port ${PORT}`)
})
