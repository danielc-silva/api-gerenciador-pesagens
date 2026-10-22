import 'dotenv/config';
import pg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

// cria o pull de conexões com o banco, evitando abrir e fechar conexão a cada requisição
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  // obrigatória para bancos em núvem onde criptografa os dados na rede
  ssl: {
    rejectUnauthorized: false, // permite conectar mesmo se o certificado não for da mesma autoridade local
  },
});

// o drizzle se conecta com o postgres e exporta a conexão na constante db pronta para rodar select, insert,
export const db = drizzle(pool);