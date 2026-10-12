import express from 'express';
import cors from 'cors';
import { rotasPiquetes } from './routes/rotasPiquetes.js';
import { rotasBovinos } from './routes/rotasBovinos.js';
import { rotasPesagens } from './routes/rotasPesagens.js';

const app = express();
app.use(cors());
app.use(express.json());

// montagem das rotas modulares
app.use('/piquetes', rotasPiquetes);
app.use('/bovinos', rotasBovinos);
app.use('/pesagens', rotasPesagens);

const PORT = 3001;
app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));