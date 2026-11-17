import { eq, and } from 'drizzle-orm';
import { db } from '../db.js';
import { usuarios } from '../schema.js';
import { Usuario } from '../entities/Usuario.js';

export const segurancaUseCases = {
  // autentica usuário no Login
  async autenticaUsuarioDB({ email, senha }) {
    const resultado = await db
      .select()
      .from(usuarios)
      .where(and(eq(usuarios.email, email), eq(usuarios.senha, senha)));

    if (resultado.length === 0) {
      throw new Error("Usuário ou senha inválidos.");
    }

    const u = resultado[0];
    return new Usuario({
      email: u.email,
      tipo: u.tipo,
      telefone: u.telefone,
      nome: u.nome
    });
  },

  // cria novo login
  async cadastrarUsuarioDB({ email, senha, tipo, telefone, nome }) {
    const existente = await db
      .select()
      .from(usuarios)
      .where(eq(usuarios.email, email));

    if (existente.length > 0) {
      throw new Error("Já existe um usuário cadastrado com este e-mail.");
    }

    const tipoValido = tipo === 'A' ? 'A' : 'U';

    const inserido = await db
      .insert(usuarios)
      .values({ email, senha, tipo: tipoValido, telefone, nome })
      .returning();

    const u = inserido[0];
    return new Usuario({
      email: u.email,
      tipo: u.tipo,
      telefone: u.telefone,
      nome: u.nome
    });
  },

  // busca os dados do usuário logado
  async buscarUsuarioPorEmailDB(email) {
    const resultado = await db
      .select()
      .from(usuarios)
      .where(eq(usuarios.email, email));

    if (resultado.length === 0) {
      throw new Error("Usuário não encontrado.");
    }

    return resultado[0]; // Retorna inclusive a senha atual para ele poder ver/editar no perfil
  },

  // atualiza os dados do próprio usuário logado
  async atualizarUsuarioDB(emailLogado, { senha, telefone, nome }) {
    const atualizado = await db
      .update(usuarios)
      .set({ senha, telefone, nome })
      .where(eq(usuarios.email, emailLogado))
      .returning();

    if (atualizado.length === 0) {
      throw new Error("Usuário não encontrado para atualização.");
    }

    const u = atualizado[0];
    return new Usuario({
      email: u.email,
      tipo: u.tipo,
      telefone: u.telefone,
      nome: u.nome
    });
  }
};