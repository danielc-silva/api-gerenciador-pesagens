import { pesagemUseCases } from '../usecases/pesagemUseCases.js';

export const pesagemController = {
  async listar(req, res) {
    try {
      const dados = await pesagemUseCases.listar();
      return res.status(200).json(dados);
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  },

  async cadastrar(req, res) {
    try {
      const { peso_kg, data_pesagem, brinco_aferido } = req.body;
      if (!peso_kg || !data_pesagem || !brinco_aferido) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
      }
      const pesagem = await pesagemUseCases.cadastrar(req.body);
      return res.status(201).json({ mensagem: "Pesagem cadastrada com sucesso!", pesagem });
    } catch (err) {
      return res.status(400).json({ mensagem: err.message });
    }
  },

  async atualizar(req, res) {
    try {
      const id = parseInt(req.params.id);
      const atualizado = await pesagemUseCases.atualizar(id, req.body);
      return res.status(200).json({ mensagem: "Pesagem atualizada com sucesso!", pesagem: atualizado });
    } catch (err) {
      return res.status(400).json({ mensagem: err.message });
    }
  },

  async remover(req, res) {
    try {
      const id = parseInt(req.params.id);
      await pesagemUseCases.remover(id);
      return res.status(200).json({ mensagem: "Pesagem removida com sucesso." });
    } catch (err) {
      return res.status(500).json({ erro: err.message });
    }
  }
};