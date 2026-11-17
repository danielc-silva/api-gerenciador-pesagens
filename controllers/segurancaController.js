import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { segurancaUseCases } from '../usecases/segurancaUseCases.js';

export const segurancaController = {
  // POST /login esse gera o token JWT
  async login(req, res) {
    try {
      const { email, senha } = req.body;
      if (!email || !senha) {
        return res.status(400).json({ auth: false, message: "Informe e-mail e senha." });
      }

      const usuario = await segurancaUseCases.autenticaUsuarioDB({ email, senha });

      const token = jwt.sign({ usuario }, process.env.SECRET, {
        expiresIn: 1800 // Expira em 30 min (1800 seg)
      });

      return res.status(200).json({ auth: true, token });
    } catch (err) {
      return res.status(401).json({ auth: false, message: err.message });
    }
  },

  // POST /usuarios essa cria a conta do usuário
  async cadastrar(req, res) {
    try {
      const { email, senha, tipo, telefone, nome } = req.body;
      if (!email || !senha || !telefone || !nome) {
        return res.status(400).json({ mensagem: "Preencha todos os campos obrigatórios." });
      }

      const novoUsuario = await segurancaUseCases.cadastrarUsuarioDB({
        email,
        senha,
        tipo: tipo || 'U',
        telefone,
        nome
      });

      return res.status(201).json({
        mensagem: "Usuário cadastrado com sucesso!",
        usuario: novoUsuario
      });
    } catch (err) {
      return res.status(400).json({ mensagem: err.message });
    }
  },

  // GET /usuarios/me essa retorna apenas os dados do próprio usuário autenticado
  async obterPerfil(req, res) {
    try {
      const dados = await segurancaUseCases.buscarUsuarioPorEmailDB(req.usuario.email);
      return res.status(200).json(dados);
    } catch (err) {
      return res.status(404).json({ mensagem: err.message });
    }
  },

  // PUT /usuarios/me essa atualiza apenas os dados do próprio usuário autenticado
  async atualizarPerfil(req, res) {
    try {
      const { senha, telefone, nome } = req.body;
      if (!senha || !telefone || !nome) {
        return res.status(400).json({ mensagem: "Nome, telefone e senha são obrigatórios." });
      }

      const usuarioAtualizado = await segurancaUseCases.atualizarUsuarioDB(req.usuario.email, {
        senha,
        telefone,
        nome
      });

      // Gera um novo token atualizado caso o usuário tenha mudado o próprio nome/telefone
      const novoToken = jwt.sign({ usuario: usuarioAtualizado }, process.env.SECRET, {
        expiresIn: 1800
      });

      return res.status(200).json({
        mensagem: "Dados atualizados com sucesso!",
        auth: true,
        token: novoToken,
        usuario: usuarioAtualizado
      });
    } catch (err) {
      return res.status(400).json({ mensagem: err.message });
    }
  }
};

// Middleware q verifica se o token JWT é válido
export function verificaJWT(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ auth: false, message: 'Nenhum token recebido.' });
  }

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      return res.status(401).json({ auth: false, message: 'Erro ao autenticar o token.' });
    }
    req.usuario = decoded.usuario;
    next();
  });
}

// Middleware q verifica se o usuário logado é Administrador 'A' (Requisito 5)
export function verificaAdmin(req, res, next) {
  if (!req.usuario || req.usuario.tipo !== 'A') {
    return res.status(403).json({
      mensagem: 'Acesso negado: apenas usuários administradores podem remover registros.'
    });
  }
  next();
}