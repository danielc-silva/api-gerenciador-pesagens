import express from 'express';
import cors from 'cors';
import { rotasPiquetes } from './routes/rotasPiquetes.js';
import { rotasBovinos } from './routes/rotasBovinos.js';
import { rotasPesagens } from './routes/rotasPesagens.js';

const app = express();
app.use(cors()); // autorizar que o navegador permita que o seu front-end faça requisições e receba dados da API quando eles estiverem rodando em portas ou domínios diferentes.
app.use(express.json()); // recebe o envelope com texto json bruto do front e tranforma ele em obj req.body
// o controller vai ler o conteudo desse req.body q ele cria

// montagem das rotas modulares, verifica se o que tem na rota se é /bovinos ex e encaminha para rotasBovinos
app.use('/piquetes', rotasPiquetes);
app.use('/bovinos', rotasBovinos);
app.use('/pesagens', rotasPesagens);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
// app.listen fica escutando e aguardando requisições chegar
// vai chegar o envelope com o json bruto esse envelope será 
// Express intercepta esse pacote de rede e instancia automaticamente dois objetos em memória
// req representa tudo o que o cliente mandou a url o método post get etc
// res é um objeto que contem os métodos necessários para devolver os dados pela rede ao cliente o .json