
-- piquetes
CREATE TABLE IF NOT EXISTS piquetes (
    id_piquete SERIAL NOT NULL PRIMARY KEY,
    rotulo VARCHAR(50) NOT NULL,
    lotacao_maxima INTEGER NOT NULL,
    CHECK (lotacao_maxima > 0)
);

-- bovinos onde o brinco é a chave primaria
CREATE TABLE IF NOT EXISTS bovinos (
    numero_brinco SERIAL NOT NULL PRIMARY KEY,
    nascimento DATE NOT NULL,
    piquete_alocado INTEGER NOT NULL,
    FOREIGN KEY (piquete_alocado) REFERENCES piquetes (id_piquete) ON DELETE CASCADE
);

-- pesagens
CREATE TABLE IF NOT EXISTS pesagens (
    id_pesagem SERIAL NOT NULL PRIMARY KEY,
    peso_kg NUMERIC(6, 2) NOT NULL,
    data_pesagem DATE NOT NULL,
    brinco_aferido INTEGER NOT NULL,
    CHECK (peso_kg > 0),
    FOREIGN KEY (brinco_aferido) REFERENCES bovinos (numero_brinco) ON DELETE CASCADE
);

-- popular tabelas para testes

-- popular piquetes
INSERT INTO piquetes (rotulo, lotacao_maxima) VALUES 
('Pasto Norte - Setor 1', 15),
('Pasto Sul - Confinamento', 25),
('Piquete de Quarentena', 5);

-- popular bovinos
INSERT INTO bovinos (nascimento, piquete_alocado) VALUES 
('2023-04-10', 1),
('2022-11-20', 1),
('2024-01-15', 2);

-- inserindo pesagens teste
INSERT INTO pesagens (peso_kg, data_pesagem, brinco_aferido) VALUES 
(482.50, '2026-10-01', 1),
(510.00, '2026-10-05', 2);

--  verificando insercoes nas tabelas
SELECT * FROM piquetes;
SELECT * FROM bovinos;
SELECT * FROM pesagens;

