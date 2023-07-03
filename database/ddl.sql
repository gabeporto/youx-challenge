DROP DATABASE IF EXISTS youx;
CREATE DATABASE youx;

\c youx;

BEGIN;

-- Criação da tabela Usuário
CREATE TABLE person (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  role VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL
);

-- Criação da tabela Cliente
CREATE TABLE client (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  cnpj VARCHAR(18) UNIQUE NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  uf VARCHAR(2) NOT NULL CHECK 
  (uf IN ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO')),
  latitude DECIMAL(9, 6) NOT NULL,
  longitude DECIMAL(9, 6) NOT NULL,
  person_id INT NOT NULL,
  FOREIGN KEY (person_id) REFERENCES person(id)
);

-- Criação da tabela Venda
CREATE TABLE sale (
  id SERIAL PRIMARY KEY,
  client_id INT NOT NULL,
  data DATE NOT NULL,
  status VARCHAR(100) NOT NULL CHECK (status IN ('Aguardando pagamento', 'Pagamento aprovado', 'Aguardando envio', 'À caminho', 'Finalizado')),
  valor DECIMAL(10, 2) NOT NULL,
  person_id INT NOT NULL,
  FOREIGN KEY (client_id) REFERENCES client(id),
  FOREIGN KEY (person_id) REFERENCES person(id)
);

COMMIT;