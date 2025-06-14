import express from 'express';
import routes from './routes';
import cors from 'cors';

export const app = express();
app.use(cors()); // Enable CORS for all origins
app.use(express.json());

// All API routes under /api
app.use('/api', routes);

