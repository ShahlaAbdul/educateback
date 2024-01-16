
import express from 'express'
const app = express()
const port = 7000
import mongoose, { Schema } from 'mongoose';
import cors from "cors";

app.use(cors())
app.use(express.json())

const educateSchema = new Schema({
  image: String,
  name:String,
  description: String,
 
});
const EducateModel = mongoose.model('Educate', educateSchema);

app.get('/', async (req, res) => {
    try {
         const educate=await EducateModel.find({})
         res.send(educate)
    } catch (error) {
        res.send(error.message)
    }
  })

  app.get('/:id', async (req, res) => {
    try {
        const {id}= req.params
         const educate=await EducateModel.findById(id)
         res.send(educate)
    } catch (error) {
        res.send(error.message)
    }
  })
  
  app.post('/', async (req, res) => {
    try {
        const {image,name,description}= req.body
        const neweducate= new EducateModel({image,name,description}) 
        await neweducate.save()
        res.send(neweducate)
    } catch (error) {
        res.send(error.message)
    }
  })
  
  app.put('/:id', async (req, res) => {
    try {
        const {id}= req.params
        const {image,name,description}= req.body
        const neweducate= await EducateModel.findByIdAndUpdate(id)
        res.send(neweducate)
    } catch (error) {
        res.send(error.message)
    }
  })
  
  app.put('/:id', async (req, res) => {
    try {
        const {id}= req.params
        const neweducate= await EducateModel.findByIdAndDelete(id)
        res.send(neweducate)
    } catch (error) {
        res.send(error.message)
    }
  })

  mongoose
  .connect('mongodb+srv://Shahla:sehla200415@mycluster.vpdzf3b.mongodb.net/')
  .then(()=>console.log("connected"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})