import { Router } from 'express';
import { pesagemController } from '../controllers/pesagemController.js';

export const rotasPesagens = Router();

rotasPesagens.get('/', pesagemController.listar);
rotasPesagens.post('/', pesagemController.cadastrar);
rotasPesagens.put('/:id', pesagemController.atualizar);
rotasPesagens.delete('/:id', pesagemController.remover);