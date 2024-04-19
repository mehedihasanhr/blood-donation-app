import express from 'express'
import router from './routes'
import multer from 'multer'
import path from 'path'
import 'dotenv/config'

const upload = multer()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Middleware to parse multipart/form-data
app.use(upload.none())

// Serve static files from the 'public' folder
const publicPath = path.join(__dirname, 'public') // Get the absolute path to the 'public' folder
app.use(express.static(publicPath))

app.use('/api', router)
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`listening port ${PORT}`)
})

export default app
