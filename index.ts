import express from 'express'
import router from './routes'
import multer from 'multer'
import 'dotenv/config'
import path from 'path'

const upload = multer()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Middleware to parse multipart/form-data
app.use(upload.none())

const publicPath = path.join('public')
app.use(express.static(publicPath))

app.use('/api', router)
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`listening port ${PORT}`)
})

export default app
