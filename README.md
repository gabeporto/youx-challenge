# 🚀 YouX Challenge

Este projeto é parte do desafio proposto pela empresa YouX Group e consiste em um aplicativo web desenvolvido com Java Spring Boot no Back-end e React.js com TypeScript no Front-end. O objetivo do desafio é criar um sistema completo com funcionalidades de cadastro de clientes e vendas, exibição de relatórios e visualização de dados geográficos.

## Tecnologias Utilizadas

- **Back-end**:
  - Java Spring Boot
  - Spring Data JPA
  - PostgreSQL
  - Lombok
  - JSON
  - JSON Web Token (JWT)
  - JUnit

- **Front-end**:
  - React.js
  - TypeScript
  - React Router
  - Context API
  - Material-UI
  - Styled Components
  - Leaflet.js
  - Chart.js
  - Jest

## Pré-requisitos

- Java JDK 17 ou superior
- Maven
- Node.js
- npm

## Instalação

1. Faça um clone deste repositório:

git clone https://github.com/gabeporto/youxchallenge.git

2. **Back-end**:
- Importe o projeto Back-end (localizado na pasta `server`) em sua IDE de preferência.
- Aguarde as dependências serem baixadas.
- Configure o banco de dados PostgreSQL de acordo com as configurações em `application.properties`.
- Execute o projeto.

3. **Front-end**:
- Abra o terminal e navegue até a pasta `web`.
- Execute o comando `npm install` para instalar as dependências.
- Após a instalação, execute o comando `npm start` para iniciar o aplicativo em modo de desenvolvimento.
- O aplicativo será aberto em seu navegador padrão.

## Testes

### Front-end

Para executar os testes do Front-end, execute o seguinte comando na pasta `web`:

- npm test


Isso iniciará a execução dos testes utilizando o framework Jest e exibirá os resultados no console.

### Back-end

Para executar os testes do Back-end, utilize a sua IDE de preferência ou execute o seguinte comando na pasta `server`:

- mvn test

Isso iniciará a execução dos testes utilizando o framework JUnit e exibirá os resultados no console.

## Adicionais

- Autenticação com JWT e Context API.
- Responsividade.
