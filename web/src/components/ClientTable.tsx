/* eslint-disable react-hooks/rules-of-hooks */
import styled from "styled-components";
import Button from "./Button";
import Table from "./Table";

const Container = styled.h1`
    padding-left: 5%;
    padding-top: 50px; 
`;

const PageTitle = styled.h1`
    font-weight: bold;
    font-size: 35px;
`;

const TitleBorder = styled.div`
    box-shadow: 0px 3px 6px #00000029;
    border: 3px solid #023E8A;
    width: 307px;
`

const TableTitle = styled.h1`
    font-weight: bold;
    font-size: 25px;
    color: #535353;
    opacity: 1;
    margin-top: 40px;
    margin-bottom: 10px;
`;

const SearchInput = styled.input`
    width: 75%;
    min-width: 200px;
    height: 55px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 1px solid #CCCCCC;
    border-radius: 3px;
    opacity: 1;
    margin-right: 50px;
    padding: 15px;
`

const SearchContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
    margin-top: 43px;
`;

export default function ClientTable() {
    const data = [
        {
          id: 1,
          nome: 'Comércio de Livros LTDA',
          cnpj: '85.681.832/0001-73',
          email: 'comerciodelivros@email.com',
          telefone: '(35) 92854-1548',
        },
        {
          id: 2,
          nome: 'Cliente 2',
          cnpj: '987654321',
          email: 'cliente2@example.com',
          telefone: '9876543210',
        },
        {
            id: 3,
            nome: 'Cliente 1',
            cnpj: '123456789',
            email: 'cliente1@example.com',
            telefone: '1234567890',
          },
          {
            id: 4,
            nome: 'Cliente 2',
            cnpj: '987654321',
            email: 'cliente2@example.com',
            telefone: '9876543210',
          },
          {
            id: 5,
            nome: 'Cliente 1',
            cnpj: '123456789',
            email: 'cliente1@example.com',
            telefone: '1234567890',
          },
          {
            id: 6,
            nome: 'Cliente 2',
            cnpj: '987654321',
            email: 'cliente2@example.com',
            telefone: '9876543210',
          },
          {
            id: 7,
            nome: 'Cliente 1',
            cnpj: '123456789',
            email: 'cliente1@example.com',
            telefone: '1234567890',
          },
          {
            id: 8,
            nome: 'Cliente 2',
            cnpj: '987654321',
            email: 'cliente2@example.com',
            telefone: '9876543210',
          },
          {
            id: 9,
            nome: 'Cliente 1',
            cnpj: '123456789',
            email: 'cliente1@example.com',
            telefone: '1234567890',
          },
          {
            id: 10,
            nome: 'Cliente 2',
            cnpj: '987654321',
            email: 'cliente2@example.com',
            telefone: '9876543210',
          },
          {
            id: 11,
            nome: 'Cliente 1',
            cnpj: '123456789',
            email: 'cliente1@example.com',
            telefone: '1234567890',
          },
          {
            id: 12,
            nome: 'Cliente 2',
            cnpj: '987654321',
            email: 'cliente2@example.com',
            telefone: '9876543210',
          },
          {
            id: 13,
            nome: 'Cliente 1',
            cnpj: '123456789',
            email: 'cliente1@example.com',
            telefone: '1234567890',
          },
          {
            id: 14,
            nome: 'Cliente 2',
            cnpj: '987654321',
            email: 'cliente2@example.com',
            telefone: '9876543210',
          },
          {
            id: 15,
            nome: 'Cliente 1',
            cnpj: '123456789',
            email: 'cliente1@example.com',
            telefone: '1234567890',
          },
          {
            id: 16,
            nome: 'Cliente 2',
            cnpj: '987654321',
            email: 'cliente2@example.com',
            telefone: '9876543210',
          },
          {
            id: 17,
            nome: 'Cliente 1',
            cnpj: '123456789',
            email: 'cliente1@example.com',
            telefone: '1234567890',
          },
          {
            id: 18,
            nome: 'Cliente 2',
            cnpj: '987654321',
            email: 'cliente2@example.com',
            telefone: '9876543210',
          },
          {
            id: 19,
            nome: 'Cliente 1',
            cnpj: '123456789',
            email: 'cliente1@example.com',
            telefone: '1234567890',
          },
          {
            id: 20,
            nome: 'Cliente 2',
            cnpj: '987654321',
            email: 'cliente2@example.com',
            telefone: '9876543210',
          },
      ];

      const columns = [
        { name: "Nome", dataKey: "nome" },
        { name: "CNPJ", dataKey: "cnpj" },
        { name: "E-mail", dataKey: "email" },
        { name: "Telefone", dataKey: "telefone" },
      ];

    return (
        <Container>
            <PageTitle>Lista de Clientes</PageTitle>
            <TitleBorder/>

            <SearchContainer>
                <SearchInput placeholder="Digite o nome ou CNPJ do cliente que deseja pesquisar" />
                <Button title="Cadastrar cliente" />
            </SearchContainer>

            <TableTitle>Clientes cadastrados</TableTitle>
            <Table columns={columns} data={data} />
        </Container>
    )
}