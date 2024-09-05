import express from 'express';
import Plant from '../models/Plant.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
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
    const { name, scientificName, description, price, habitat, inStock, category } = req.body;
    
    // Gestisci careInstructions
    const careInstructions = {
      light: req.body['careInstructions.light'],
      water: req.body['careInstructions.water'],
      soil: req.body['careInstructions.soil'],
      temperature: req.body['careInstructions.temperature'],
      difficulty: req.body['careInstructions.difficulty'] || 'medium'
    };

    if (!req.file) {
      return res.status(400).json({ message: 'L\'immagine è obbligatoria' });
    }

    const plantData = {
      name,
      scientificName,
      description,
      price: Number(price),
      careInstructions,
      habitat,
      inStock: Number(inStock),
      category,
      image: req.file.path
    };

    const newPlant = new Plant(plantData);
    const savedPlant = await newPlant.save();
    res.status(201).json(savedPlant);
  } catch (error) {
    console.error('Errore nella creazione della pianta:', error);
    res.status(400).json({ message: 'Errore nella creazione della pianta', error: error.message });
  }
});

// PUT aggiorna una pianta esistente
router.put('/:id', cloudinaryUploader.single('image'), async (req, res) => {
  try {
    console.log('Received update data:', req.body);
    const { id } = req.params;
    const { name, scientificName, description, price, habitat, inStock, category } = req.body;
    
    // Gestisci careInstructions
    const careInstructions = {
      light: req.body['careInstructions.light'],
      water: req.body['careInstructions.water'],
      soil: req.body['careInstructions.soil'],
      temperature: req.body['careInstructions.temperature'],
      difficulty: req.body['careInstructions.difficulty']
    };

    const updateData = {
      name,
      scientificName,
      description,
      price: Number(price),
      careInstructions,
      habitat,
      inStock: Number(inStock),
      category
    };
    
    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedPlant = await Plant.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    
    if (!updatedPlant) {
      return res.status(404).json({ message: 'Pianta non trovata' });
    }

    console.log('Updated plant:', updatedPlant);
    res.json(updatedPlant);
  } catch (error) {
    console.error('Error updating plant:', error);
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

// GET piante per categoria
router.get('/category/:category', async (req, res) => {
  try {
    const plants = await Plant.find({ category: req.params.category });
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero delle piante per categoria', error: error.message });
  }
});

// POST aggiungi un commento a una pianta
router.post('/:id/comments', authMiddleware, async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({ message: 'Pianta non trovata' });
    }
    const newComment = {
      text: req.body.text,
      rating: req.body.rating,
      user: req.user._id  // Associa l'ID dell'utente autenticato al commento
    };
    plant.comments.push(newComment);
    await plant.save();
    res.status(201).json(plant);
  } catch (error) {
    res.status(400).json({ message: 'Errore nell\'aggiunta del commento', error: error.message });
  }
});

// GET tutti i commenti di una pianta
router.get('/:id/comments', async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id).populate('comments.user', 'username');
    if (!plant) {
      return res.status(404).json({ message: 'Pianta non trovata' });
    }
    res.json(plant.comments);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero dei commenti', error: error.message });
  }
});

export default router;