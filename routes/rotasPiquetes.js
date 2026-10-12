import { Router } from 'express';
import { piqueteController } from '../controllers/piqueteController.js';

export const rotasPiquetes = Router();

rotasPiquetes.get('/', piqueteController.listar);
rotasPiquetes.post('/', piqueteController.cadastrar);
rotasPiquetes.put('/:id', piqueteController.atualizar);
rotasPiquetes.delete('/:id', piqueteController.remover);