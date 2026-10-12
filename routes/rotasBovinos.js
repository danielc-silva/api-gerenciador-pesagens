import { Router } from 'express';
import { bovinoController } from '../controllers/bovinoController.js';

export const rotasBovinos = Router();

rotasBovinos.get('/', bovinoController.listar);
rotasBovinos.post('/', bovinoController.cadastrar);
rotasBovinos.put('/:brinco', bovinoController.atualizar);
rotasBovinos.delete('/:brinco', bovinoController.remover);