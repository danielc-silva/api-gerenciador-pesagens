import { Router } from 'express';
import { pesagemController } from '../controllers/pesagemController.js';

// cria um roteador separado
export const rotasPesagens = Router();
// ele vai grardar o caminho relativo get post put /:brinc

rotasPesagens.get('/', pesagemController.listar);
rotasPesagens.post('/', pesagemController.cadastrar);
rotasPesagens.put('/:id', pesagemController.atualizar);
rotasPesagens.delete('/:id', pesagemController.remover);