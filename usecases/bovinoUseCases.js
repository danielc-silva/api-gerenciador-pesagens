import { eq, count } from 'drizzle-orm';
import { db } from '../db.js';
import { bovinos, piquetes } from '../schema.js';
import { Bovino } from '../entities/Bovino.js';

export const bovinoUseCases = {
  async listar() {
    return await db.select().from(bovinos);
  },

  async buscarPorBrinco(brinco) {
    const resultado = await db
      .select()
      .from(bovinos)
      .where(eq(bovinos.numeroBrinco, brinco));

    return resultado[0] || null;
  },

  async cadastrar({ nascimento, piquete_alocado }) {
    const idPiquete = Number(piquete_alocado);

    // verifica se o piquete existe
    const pasto = await db.select().from(piquetes).where(eq(piquetes.idPiquete, idPiquete));
    if (pasto.length === 0) {
      throw new Error("Piquete informado não existe.");
    }

    // valida lotação máxima
    const total = await db.select({ qtd: count() }).from(bovinos).where(eq(bovinos.piqueteAlocado, idPiquete));
    if (total[0].qtd >= pasto[0].lotacaoMaxima) {
      throw new Error(`O piquete atingiu a lotação máxima de ${pasto[0].lotacaoMaxima} animais.`);
    }

    const entidade = new Bovino({ nascimento, piqueteAlocado: idPiquete });
    const res = await db.insert(bovinos).values({
      nascimento: entidade.nascimento,
      piqueteAlocado: entidade.piqueteAlocado,
    }).returning();

    return res[0];
  },

  async atualizar(brinco, { nascimento, piquete_alocado }) {
    const idPiquete = Number(piquete_alocado);

    // verifica se o animal existe
    const bovinoAtual = await db.select().from(bovinos).where(eq(bovinos.numeroBrinco, brinco));
    if (bovinoAtual.length === 0) {
      throw new Error("Bovino não encontrado.");
    }

    // verifica se o piquete de destino existe
    const pasto = await db.select().from(piquetes).where(eq(piquetes.idPiquete, idPiquete));
    if (pasto.length === 0) {
      throw new Error("Piquete informado não existe.");
    }

    // checa lotação se for transferência de piquete
    if (bovinoAtual[0].piqueteAlocado !== idPiquete) {
      const total = await db.select({ qtd: count() }).from(bovinos).where(eq(bovinos.piqueteAlocado, idPiquete));
      if (total[0].qtd >= pasto[0].lotacaoMaxima) {
        throw new Error(`Não é possível transferir: o piquete de destino atingiu a lotação máxima de ${pasto[0].lotacaoMaxima} animais.`);
      }
    }

    const res = await db.update(bovinos)
      .set({ nascimento, piqueteAlocado: idPiquete })
      .where(eq(bovinos.numeroBrinco, brinco))
      .returning();

    return res[0];
  },

  async remover(brinco) {
    await db.delete(bovinos).where(eq(bovinos.numeroBrinco, brinco));
  }
};