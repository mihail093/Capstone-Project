import express from 'express';
import User from '../models/User.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';
import cloudinaryUploader from '../config/cloudinaryConfig.js';

const router = express.Router();

// GET tutti gli utenti
router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero degli utenti', error: error.message });
  }
});

// GET singolo utente per ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Utente non trovato' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero dell\'utente', error: error.message });
  }
});

// PUT aggiorna un utente (senza modifica del ruolo)
router.patch('/:id', authMiddleware, cloudinaryUploader.single('avatar'), async (req, res) => {
  try {
    const { username, email, firstName, lastName } = req.body;
    
    const updateData = {
      username,
      email,
      firstName,
      lastName
    };

    if (req.file) {
      updateData.avatar = req.file.path;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'Utente non trovato' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Errore nell\'aggiornamento dell\'utente', error: error.message });
  }
});

// PATCH modifica il ruolo dell'utente (solo per admin)
router.patch('/:id/role', authMiddleware, isAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Ruolo non valido' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'Utente non trovato' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Errore nella modifica del ruolo', error: error.message });
  }
});

// DELETE elimina un utente
router.delete('/:id', authMiddleware, isAdmin, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Utente non trovato' });
    }
    res.json({ message: 'Utente eliminato con successo' });
  } catch (error) {
    res.status(500).json({ message: 'Errore nell\'eliminazione dell\'utente', error: error.message });
  }
});

export default router;