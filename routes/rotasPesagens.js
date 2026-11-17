import { Router } from 'express';
import { pesagemController } from '../controllers/pesagemController.js';
import { verificaJWT, verificaAdmin } from '../controllers/segurancaController.js';

// cria um roteador separado
export const rotasPesagens = Router();
// ele vai grardar o caminho relativo get post put /:brinc

rotasPesagens.get('/', verificaJWT, pesagemController.listar);
rotasPesagens.get('/:id', verificaJWT, pesagemController.buscarPorId);
rotasPesagens.post('/', verificaJWT, pesagemController.cadastrar);
rotasPesagens.put('/:id', verificaJWT, pesagemController.atualizar);
rotasPesagens.delete('/:id', verificaJWT, verificaAdmin, pesagemController.remover);