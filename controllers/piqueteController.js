import { piqueteUseCases } from '../usecases/piqueteUseCases.js';

export const piqueteController = {
  async listar(req, res) {
    try {
      const dados = await piqueteUseCases.listar();
      return res.status(200).json(dados);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const id = parseInt(req.params.id);
      const piquete = await piqueteUseCases.buscarPorId(id);

      if (!piquete) {
        return res.status(404).json({ mensagem: "Piquete não encontrado." });
      }

      return res.status(200).json(piquete);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  async cadastrar(req, res) {
    try {
      const { rotulo, lotacao_maxima } = req.body;
      if (!rotulo || !lotacao_maxima) {
        return res.status(400).json({ mensagem: "Rótulo e lotação máxima são obrigatórios." });
      }

      if (Number(lotacao_maxima) < 1) {
        return res.status(400).json({ mensagem: "A lotação máxima do piquete deve ser de no mínimo 1 animal." });
      }

      const piquete = await piqueteUseCases.cadastrar(req.body);
      return res.status(201).json({ mensagem: "Piquete cadastrado com sucesso!", piquete });
    } catch (err) {
      return res.status(400).json({ mensagem: err.message });
    }
  },

  async atualizar(req, res) {
    try {
      const id = parseInt(req.params.id);
      const { rotulo, lotacao_maxima } = req.body;
      if (!rotulo || !lotacao_maxima) {
        return res.status(400).json({ mensagem: "Campos obrigatórios faltando." });
      }

      if (Number(lotacao_maxima) < 1) {
        return res.status(400).json({ mensagem: "A lotação máxima do piquete deve ser de no mínimo 1 animal." });
      }
      
      const atualizado = await piqueteUseCases.atualizar(id, req.body);
      return res.status(200).json({ mensagem: "Piquete atualizado com sucesso!", piquete: atualizado });
    } catch (err) {
      return res.status(400).json({ mensagem: err.message });
    }
  },

  async remover(req, res) {
    try {
      const id = parseInt(req.params.id);
      await piqueteUseCases.remover(id);
      return res.status(200).json({ mensagem: "Piquete removido com sucesso." });
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  }
};