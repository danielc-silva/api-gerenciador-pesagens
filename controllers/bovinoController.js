import { bovinoUseCases } from '../usecases/bovinoUseCases.js';

export const bovinoController = {
  async listar(req, res) {
    try {
      const dados = await bovinoUseCases.listar();
      return res.status(200).json(dados);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  async cadastrar(req, res) {
    try {
      const { nascimento, piquete_alocado } = req.body;
      if (!nascimento || !piquete_alocado) {
        return res.status(400).json({ mensagem: "Nascimento e piquete_alocado são obrigatórios." });
      }
      const animal = await bovinoUseCases.cadastrar(req.body);
      return res.status(201).json({ mensagem: "Bovino cadastrado com sucesso!", animal });
    } catch (err) {
      return res.status(400).json({ mensagem: err.message });
    }
  },

  async atualizar(req, res) {
    try {
      const brinco = parseInt(req.params.brinco);
      const { nascimento, piquete_alocado } = req.body;
      if (!nascimento || !piquete_alocado) {
        return res.status(400).json({ mensagem: "Campos obrigatórios faltando." });
      }
      const atualizado = await bovinoUseCases.atualizar(brinco, req.body);
      return res.status(200).json({ mensagem: "Bovino atualizado com sucesso!", bovino: atualizado });
    } catch (err) {
      return res.status(400).json({ mensagem: err.message });
    }
  },

  async remover(req, res) {
    try {
      const brinco = parseInt(req.params.brinco);
      await bovinoUseCases.remover(brinco);
      return res.status(200).json({ mensagem: "Bovino removido com sucesso." });
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  }
};