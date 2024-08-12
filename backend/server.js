import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import endpoints from 'express-list-endpoints';

// Importo le rotte
import authRoutes from './routes/authRoute.js';
import plantRoutes from './routes/plantRoute.js';
import productRoutes from './routes/productRoute.js';
import userRoutes from './routes/userRoute.js';

// Importo i middlewares per la gestione degli errori
import { badRequestHandler, unauthorizedHandler, notFoundHandler, genericErrorHandler } from "./middlewares/errorHandlers.js";

// Configurazione
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connessione al database
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connesso al database MongoDB'))
.catch((err) => console.error('Errore di connessione al database:', err));

// Rotte
app.use('/api/auth', authRoutes);
app.use('/api/plants', plantRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Middleware per la gestione degli errori
app.use(notFoundHandler);
app.use(badRequestHandler);
app.use(unauthorizedHandler);
app.use(genericErrorHandler);

// Avvio del server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server in esecuzione sulla porta ${PORT}`);
  console.table(endpoints(app))
});