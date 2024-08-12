import express from 'express';
import Product from '../models/Product.js';
import cloudinaryUploader from '../config/cloudinaryConfig.js';

const router = express.Router();

// GET tutti i prodotti
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero dei prodotti', error: error.message });
  }
});

// GET un singolo prodotto per ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Prodotto non trovato' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero del prodotto', error: error.message });
  }
});

// POST crea un nuovo prodotto
router.post('/', cloudinaryUploader.single('image'), async (req, res) => {
  try {
    const productData = req.body;
    if(req.file) {
      productData.image = req.file.path
    }
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Errore nella creazione del prodotto', error: error.message });
  }
});

// PUT aggiorna un prodotto esistente
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Prodotto non trovato' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Errore nell\'aggiornamento del prodotto', error: error.message });
  }
});

// DELETE elimina un prodotto
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Prodotto non trovato' });
    }
    res.json({ message: 'Prodotto eliminato con successo' });
  } catch (error) {
    res.status(500).json({ message: 'Errore nell\'eliminazione del prodotto', error: error.message });
  }
});

// GET prodotti per categoria
router.get('/category/:category', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero dei prodotti per categoria', error: error.message });
  }
});

// GET ricerca prodotti
router.get('/search/:query', async (req, res) => {
  try {
    const products = await Product.find({ $text: { $search: req.params.query } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Errore nella ricerca dei prodotti', error: error.message });
  }
});

export default router;