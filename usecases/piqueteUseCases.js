import { eq } from 'drizzle-orm';
import { db } from '../db.js';
import { piquetes } from '../schema.js';
import { Piquete } from '../entities/Piquete.js';

export const piqueteUseCases = {
  async listar() {
    return await db.select().from(piquetes);
  },

  async buscarPorId(id) {
    const resultado = await db
      .select()
      .from(piquetes)
      .where(eq(piquetes.idPiquete, id));

    return resultado[0] || null;
  },

  async cadastrar({ rotulo, lotacao_maxima }) {
    const entidade = new Piquete({ rotulo, lotacaoMaxima: lotacao_maxima });
    const res = await db.insert(piquetes).values({
      rotulo: entidade.rotulo,
      lotacaoMaxima: entidade.lotacaoMaxima,
    }).returning();
    return res[0];
  },

  async atualizar(id, { rotulo, lotacao_maxima }) {
    const res = await db.update(piquetes)
      .set({ rotulo, lotacaoMaxima: Number(lotacao_maxima) })
      .where(eq(piquetes.idPiquete, id))
      .returning();
    return res[0];
  },

  async remover(id) {
    await db.delete(piquetes).where(eq(piquetes.idPiquete, id));
  }
};