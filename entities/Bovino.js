export class Bovino {
  constructor({ numeroBrinco = null, nascimento, piqueteAlocado }) {
    this.numeroBrinco = numeroBrinco;
    this.nascimento = nascimento;
    this.piqueteAlocado = Number(piqueteAlocado);
  }
}