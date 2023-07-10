# YouX Challenge

Este projeto é parte do desafio proposto pela empresa YouX Group e consiste em um aplicativo web desenvolvido com Java Spring Boot no backend e React.js com TypeScript no frontend. O objetivo do desafio é criar um sistema completo com funcionalidades de cadastro de clientes e vendas, exibição de relatórios e visualização de dados geográficos.

## Tecnologias Utilizadas

- **Backend**:
  - Java Spring Boot
  - Spring Data JPA
  - PostgreSQL
  - Lombok
  - JSON
  - JUnit

- **Frontend**:
  - React.js
  - TypeScript
  - React Router
  - Material-UI
  - Styled Components
  - Leaflet.js
  - Chart.js

## Pré-requisitos

- Java JDK 17 ou superior
- Maven
- Node.js
- npm

## Instalação

1. Faça um clone deste repositório:

git clone https://github.com/gabeporto/youxchallenge.git

2. **Backend**:
- Importe o projeto backend (localizado na pasta `server`) em sua IDE de preferência.
- Aguarde as dependências serem baixadas.
- Configure o banco de dados PostgreSQL de acordo com as configurações em `application.properties`.
- Execute o projeto.

3. **Frontend**:
- Abra o terminal e navegue até a pasta `web`.
- Execute o comando `npm install` para instalar as dependências.
- Após a instalação, execute o comando `npm start` para iniciar o aplicativo em modo de desenvolvimento.
- O aplicativo será aberto em seu navegador padrão.

## Testes

### Frontend

Para executar os testes do frontend, execute o seguinte comando na pasta `web`:

- npm test


Isso iniciará a execução dos testes utilizando o framework Jest e exibirá os resultados no console.

### Backend

Para executar os testes do backend, utilize a sua IDE de preferência ou execute o seguinte comando na pasta `server`:

- mvn test

Isso iniciará a execução dos testes utilizando o framework JUnit e exibirá os resultados no console.

buições são sempre bem-vindas! Se você encontrar algum problema, bug ou tiver sugestões de melhorias, sinta-se à vontade para abrir uma *issue* ou enviar um *pull request*.
