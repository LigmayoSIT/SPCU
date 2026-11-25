require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection failed:', err));

const BarFillOut = mongoose.model(
  'BarFillOut',
  new mongoose.Schema({
    barangayLocation: { type: String, required: true },
    issueAndConcern: { type: String, required: true },
    placeOfResidence: { type: String, required: true },
    nameOfResident: { type: String, default: '' },
  }),
);

// List all
app.get('/api/barangay', async (req, res) => {
  try {
    const items = await BarFillOut.find().sort({ _id: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create
app.post('/api/barangay', async (req, res) => {
  try {
    const created = await BarFillOut.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update
app.put('/api/barangay/:id', async (req, res) => {
  try {
    const updated = await BarFillOut.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete
app.delete('/api/barangay/:id', async (req, res) => {
  try {
    await BarFillOut.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});