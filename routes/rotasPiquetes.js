import { Router } from 'express';
import { piqueteController } from '../controllers/piqueteController.js';

// cria um roteador separado
export const rotasPiquetes = Router();
// ele vai grardar o caminho relativo get post put /:brinc

rotasPiquetes.get('/', piqueteController.listar);
rotasPiquetes.get('/:id', piqueteController.buscarPorId);
rotasPiquetes.post('/', piqueteController.cadastrar);
rotasPiquetes.put('/:id', piqueteController.atualizar);
rotasPiquetes.delete('/:id', piqueteController.remover);