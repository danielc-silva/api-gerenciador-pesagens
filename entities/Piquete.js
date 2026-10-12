export class Piquete {
  constructor({ idPiquete = null, rotulo, lotacaoMaxima }) {
    this.idPiquete = idPiquete;
    this.rotulo = rotulo;
    this.lotacaoMaxima = Number(lotacaoMaxima);
  }
}