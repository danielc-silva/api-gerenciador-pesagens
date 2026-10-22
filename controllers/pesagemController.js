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

  async buscarPorId(req, res) {
    try {
      const id = parseInt(req.params.id);
      const pesagem = await pesagemUseCases.buscarPorId(id);

      if (!pesagem) {
        return res.status(404).json({ mensagem: "Pesagem não encontrada." });
      }

      return res.status(200).json(pesagem);
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

      const peso = Number(peso_kg);

      if (peso < 1 || peso > 9999.99) {
        return res.status(400).json({ mensagem: "O peso do animal deve estar entre 1 kg e 9999.99 kg." });
      }

      const hoje = new Date().toISOString().split("T")[0];
      if (data_pesagem > hoje) {
        return res.status(400).json({ mensagem: "A data da pesagem não pode ser no futuro." });
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

      const { peso_kg, data_pesagem } = req.body;

      if (peso_kg !== undefined) {
        const peso = Number(peso_kg);
        if (peso < 1 || peso > 9999.99) {
          return res.status(400).json({ mensagem: "O peso do animal deve estar entre 1 kg e 9999.99 kg." });
        }
      }

      const hoje = new Date().toISOString().split("T")[0];
      if (data_pesagem > hoje) {
        return res.status(400).json({ mensagem: "A data da pesagem não pode ser no futuro." });
      }

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