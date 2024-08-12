// Middleware per verificare se l'utente è amministratore
export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Accesso negato: richiesti privilegi di amministratore' });
    }
};