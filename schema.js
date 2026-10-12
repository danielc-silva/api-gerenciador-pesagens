import { pgTable, serial, varchar, integer, numeric, date } from 'drizzle-orm/pg-core';

export const piquetes = pgTable('piquetes', {
  idPiquete: serial('id_piquete').primaryKey(),
  rotulo: varchar('rotulo', { length: 50 }).notNull(),
  lotacaoMaxima: integer('lotacao_maxima').notNull(),
});

export const bovinos = pgTable('bovinos', {
  numeroBrinco: serial('numero_brinco').primaryKey(),
  nascimento: date('nascimento').notNull(),
  piqueteAlocado: integer('piquete_alocado')
    .notNull()
    .references(() => piquetes.idPiquete, { onDelete: 'cascade' }),
});

export const pesagens = pgTable('pesagens', {
  idPesagem: serial('id_pesagem').primaryKey(),
  pesoKg: numeric('peso_kg', { precision: 6, scale: 2 }).notNull(),
  dataPesagem: date('data_pesagem').notNull(),
  brincoAferido: integer('brinco_aferido')
    .notNull()
    .references(() => bovinos.numeroBrinco, { onDelete: 'cascade' }),
});