require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

app.listen(5000, () => {
    console.log('Server is runnong on port 5000');
})

const BarFillOut = mongoose.model('BarFillOut', new mongoose.Schema({
    barangayLocation: { type: String, required: true },
    issueAndConcern: { type: String, required: true },
    placeOfResidence: { type: String, required: true },
    nameOfResident: { type: String, default: '' },
}))

app.post('/api/barangay', async (req, res) => {
  try {
    const created = await Barangay.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

app.post('/api/pokemon/ :id', async (req, res) => {
    const {id} = req.params;
    const updateBarForms = await BarFillOut.findByIdAndUpdate(id, req.body, {new: true});
    res.send(updateBarForms);
})

app.get('/api/barangay/ :id', async (req, res) => {
    const list = await BarFillOut.find();
    res.send(list);
})

app.get('/api/barangay/:id', async (req, res) => {
    try{
        const items = await Barangay.find().sort({_id: -1});
        res.json(items);
    } catch (err){
        res.status(500).json({ message: err.message });
    }
})

app.delete('/api/pokemon/ :id', async (req, res) => {
    const {id} = req.params;
    await BarFillOut.findByIdAndDelete(id);
    res.status(204).send();
})

app.put('/api/pokemon/ :id', async (req, res) => {
    const updateBarForms = await BarFillOut.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.send(updateBarForms);
})