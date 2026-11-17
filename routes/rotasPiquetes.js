import { Router } from 'express';
import { piqueteController } from '../controllers/piqueteController.js';
import { verificaJWT, verificaAdmin } from '../controllers/segurancaController.js';

// cria um roteador separado
export const rotasPiquetes = Router();
// ele vai grardar o caminho relativo get post put /:brinc

rotasPiquetes.get('/', verificaJWT, piqueteController.listar);
rotasPiquetes.get('/:id', verificaJWT, piqueteController.buscarPorId);
rotasPiquetes.post('/', verificaJWT, piqueteController.cadastrar);
rotasPiquetes.put('/:id', verificaJWT, piqueteController.atualizar);
rotasPiquetes.delete('/:id', verificaJWT, verificaAdmin, piqueteController.remover);