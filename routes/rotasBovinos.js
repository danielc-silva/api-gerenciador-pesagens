import { Router } from 'express';
import { bovinoController } from '../controllers/bovinoController.js';
import { verificaJWT, verificaAdmin } from '../controllers/segurancaController.js';

// cria um roteador separado só para os bovinos e o disponibiliza para o arquivo principal, evitando deixar todas as rotas misturadas no mesmo lugar
export const rotasBovinos = Router();
// ele vai grardar o caminho relativo get post put /:brinc

rotasBovinos.get('/', verificaJWT, bovinoController.listar);
rotasBovinos.get('/:brinco', verificaJWT, bovinoController.buscarPorBrinco);
rotasBovinos.post('/', verificaJWT, bovinoController.cadastrar);
rotasBovinos.put('/:brinco', verificaJWT, bovinoController.atualizar);
rotasBovinos.delete('/:brinco', verificaJWT, verificaAdmin, bovinoController.remover);