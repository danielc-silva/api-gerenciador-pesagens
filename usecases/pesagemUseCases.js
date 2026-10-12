import { eq } from 'drizzle-orm';
import { db } from '../db.js';
import { pesagens, bovinos } from '../schema.js';
import { Pesagem } from '../entities/Pesagem.js';

export const pesagemUseCases = {
  async listar() {
    return await db.select().from(pesagens);
  },

  async cadastrar({ peso_kg, data_pesagem, brinco_aferido }) {
    const animal = await db.select().from(bovinos).where(eq(bovinos.numeroBrinco, Number(brinco_aferido)));
    if (animal.length === 0) {
      throw new Error("Bovino informado não existe.");
    }

    const entidade = new Pesagem({ pesoKg: peso_kg, dataPesagem: data_pesagem, brincoAferido: brinco_aferido });
    const res = await db.insert(pesagens).values({
      pesoKg: String(entidade.pesoKg),
      dataPesagem: entidade.dataPesagem,
      brincoAferido: entidade.brincoAferido,
    }).returning();
    return res[0];
  },

  async atualizar(id, { peso_kg, data_pesagem, brinco_aferido }) {
    const res = await db.update(pesagens)
      .set({
        pesoKg: String(peso_kg),
        dataPesagem: data_pesagem,
        brincoAferido: Number(brinco_aferido),
      })
      .where(eq(pesagens.idPesagem, id))
      .returning();
    return res[0];
  },

  async remover(id) {
    await db.delete(pesagens).where(eq(pesagens.idPesagem, id));
  }
};