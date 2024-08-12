import express from 'express';
import User from '../models/User.js';
import { generateJWT } from '../utils/jwt.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Registrazione utente
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username o email già in uso' });
    }

    const user = new User({ username, email, password, firstName, lastName });
    await user.save();

    const token = await generateJWT({ id: user._id });
    res.status(201).json({ token, message: "Registrazione effettuata con successo" });
  } catch (error) {
    res.status(500).json({ message: 'Errore durante la registrazione', error: error.message });
  }
});

// Login utente
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenziali non valide' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenziali non valide' });
    }

    const token = await generateJWT({ id: user._id });

    user.lastLogin = new Date();
    await user.save();

    res.json({ token, message: "Login effettuato con successo" });
  } catch (error) {
    console.error('Errore nel login:', error);
    res.status(500).json({ message: 'Errore del server' });
  }
});

// GET /me => restituisce l'utente collegato al token di accesso
router.get('/me', authMiddleware, (req, res) => {
  const userData = req.user.toObject();
  delete userData.password;
  res.json(userData);
});

// Richiesta di reset password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Utente non trovato' });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordToken = verificationCode;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 ora
    await user.save();

    res.json({ 
      message: 'Codice di verifica generato',
      verificationCode: verificationCode // Nota: non fare mai questo in produzione!
    });
  } catch (error) {
    res.status(500).json({ message: 'Errore durante la richiesta di reset password', error: error.message });
  }
});

// Verifica codice e reset password
router.post('/reset-password', async (req, res) => {
  try {
    const { email, verificationCode, newPassword } = req.body;
    const user = await User.findOne({
      email: email,
      resetPasswordToken: verificationCode,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Codice non valido o scaduto' });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password reimpostata con successo' });
  } catch (error) {
    res.status(500).json({ message: 'Errore durante il reset della password', error: error.message });
  }
});

export default router;