import { verifyJWT } from "../utils/jwt.js";
import User from "../models/User.js";

// Middleware per l'autenticazione
export const authMiddleware = async (req, res, next) => {
    try {
        // Ottiene il token dall'header e lo decodifica
        const token = req.headers.authorization?.replace('Bearer ', '');
        
        // Controlla se il token è presente
        if (!token) {
            return res.status(401).send('Token mancante');
        }

        // Decodifica il token e cerca l'utente nel database
        const decoded = await verifyJWT(token);
        const user = await User.findById(decoded.id).select('-password');
        
        // Controlla se l'utente esiste
        if (!user) {
            return res.status(401).send('Utente non trovato');
        }

        // Aggiorna l'ultimo accesso dell'utente nel database
        user.lastLogin = new Date();
        await user.save();

        // Imposta l'utente nella richiesta e passa al prossimo middleware
        req.user = user;
        next();
    } catch (error) {
        // Gestisce gli errori legati al token
        res.status(401).send('Token non valido');
    }
};