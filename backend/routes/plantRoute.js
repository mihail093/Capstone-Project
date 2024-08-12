import express from 'express';
import Plant from '../models/Plant.js';
import cloudinaryUploader from '../config/cloudinaryConfig.js';

const router = express.Router();

// GET tutte le piante
router.get('/', async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero delle piante', error: error.message });
  }
});

// GET una singola pianta per ID
router.get('/:id', async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({ message: 'Pianta non trovata' });
    }
    res.json(plant);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero della pianta', error: error.message });
  }
});

// POST crea una nuova pianta
router.post('/', cloudinaryUploader.single('image'), async (req, res) => {
  try {
    const plantData = req.body;
    if(req.file) {
      plantData.image = req.file.path
    }
    const newPlant = new Plant(plantData);
    const savedPlant = await newPlant.save();
    res.status(201).json(savedPlant);
  } catch (error) {
    res.status(400).json({ message: 'Errore nella creazione della pianta', error: error.message });
  }
});

// PUT aggiorna una pianta esistente
router.put('/:id', async (req, res) => {
  try {
    const updatedPlant = await Plant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPlant) {
      return res.status(404).json({ message: 'Pianta non trovata' });
    }
    res.json(updatedPlant);
  } catch (error) {
    res.status(400).json({ message: 'Errore nell\'aggiornamento della pianta', error: error.message });
  }
});

// DELETE elimina una pianta
router.delete('/:id', async (req, res) => {
  try {
    const deletedPlant = await Plant.findByIdAndDelete(req.params.id);
    if (!deletedPlant) {
      return res.status(404).json({ message: 'Pianta non trovata' });
    }
    res.json({ message: 'Pianta eliminata con successo' });
  } catch (error) {
    res.status(500).json({ message: 'Errore nell\'eliminazione della pianta', error: error.message });
  }
});

// GET piante per habitat
router.get('/habitat/:habitat', async (req, res) => {
  try {
    const plants = await Plant.find({ habitat: req.params.habitat });
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero delle piante per habitat', error: error.message });
  }
});

// POST aggiungi un commento a una pianta
router.post('/:id/comments', async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({ message: 'Pianta non trovata' });
    }
    plant.comments.push(req.body);
    await plant.save();
    res.status(201).json(plant);
  } catch (error) {
    res.status(400).json({ message: 'Errore nell\'aggiunta del commento', error: error.message });
  }
});

// GET tutti i commenti di una pianta
router.get('/:id/comments', async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({ message: 'Pianta non trovata' });
    }
    res.json(plant.comments);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero dei commenti', error: error.message });
  }
});

export default router;