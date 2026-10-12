export class Pesagem {
  constructor({ idPesagem = null, pesoKg, dataPesagem, brincoAferido }) {
    this.idPesagem = idPesagem;
    this.pesoKg = Number(pesoKg);
    this.dataPesagem = dataPesagem;
    this.brincoAferido = Number(brincoAferido);
  }
}