import { Router } from 'express';
import { bovinoController } from '../controllers/bovinoController.js';

// cria um roteador separado só para os bovinos e o disponibiliza para o arquivo principal, evitando deixar todas as rotas misturadas no mesmo lugar
export const rotasBovinos = Router();
// ele vai grardar o caminho relativo get post put /:brinc

rotasBovinos.get('/', bovinoController.listar);
rotasBovinos.get('/:brinco', bovinoController.buscarPorBrinco);
rotasBovinos.post('/', bovinoController.cadastrar);
rotasBovinos.put('/:brinco', bovinoController.atualizar);
rotasBovinos.delete('/:brinco', bovinoController.remover);