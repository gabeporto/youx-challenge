import styled from "styled-components";
import Button from "./Button";
import Table from "./Table";

const Container = styled.h1`
    padding-left: 102px;
    padding-top: 74px; 
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
    margin-top: 50px;
    margin-bottom: 10px;
`;

const SearchInput = styled.input`
    width: 80%;
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
  align-items: center;
  margin-top: 43px;
`;

export default function ClientTable() {
    const headers = ['Nome', 'CNPJ', 'E-mail', 'Telefone', 'Ações'];
const data = [
  { nome: 'Restaurante seu mineiro', cnpj: '85.681.832/0001-73', email: 'comerciodelivros@email.com', telefone: '(35) 92854-1548', acoes: 'Teste' },
  { nome: 'Restaurante seu mineiro', cnpj: '85.681.832/0001-73', email: 'comerciodelivros@email.com', telefone: '(35) 92854-1548', acoes: 'Teste' },
  { nome: 'Restaurante seu mineiro', cnpj: '85.681.832/0001-73', email: 'comerciodelivros@email.com', telefone: '(35) 92854-1548', acoes: 'Teste' },
  { nome: 'Restaurante seu mineiro', cnpj: '85.681.832/0001-73', email: 'comerciodelivros@email.com', telefone: '(35) 92854-1548', acoes: 'Teste' },
  { nome: 'Restaurante seu mineiro', cnpj: '85.681.832/0001-73', email: 'comerciodelivros@email.com', telefone: '(35) 92854-1548', acoes: 'Teste' },
  { nome: 'Restaurante seu mineiro', cnpj: '85.681.832/0001-73', email: 'comerciodelivros@email.com', telefone: '(35) 92854-1548', acoes: 'Teste' },
  { nome: 'Restaurante seu mineiro', cnpj: '85.681.832/0001-73', email: 'comerciodelivros@email.com', telefone: '(35) 92854-1548', acoes: 'Teste' },
  { nome: 'Restaurante seu mineiro', cnpj: '85.681.832/0001-73', email: 'comerciodelivros@email.com', telefone: '(35) 92854-1548', acoes: 'Teste' },
  { nome: 'Restaurante seu mineiro', cnpj: '85.681.832/0001-73', email: 'comerciodelivros@email.com', telefone: '(35) 92854-1548', acoes: 'Teste' },
  { nome: 'Restaurante seu mineiro', cnpj: '85.681.832/0001-73', email: 'comerciodelivros@email.com', telefone: '(35) 92854-1548', acoes: 'Teste' },
  { nome: 'Restaurante seu mineiro', cnpj: '85.681.832/0001-73', email: 'comerciodelivros@email.com', telefone: '(35) 92854-1548', acoes: 'Teste' },
];
    return (
        <Container>
            <PageTitle>Lista de Clientes</PageTitle>
            <TitleBorder/>

            <SearchContainer>
                <SearchInput placeholder="Digite o nome ou CNPJ do cliente que deseja pesquisar" />
                <Button title="Cadastrar cliente" />
            </SearchContainer>

            <TableTitle>Clientes Cadastrados</TableTitle>
            <Table headers={headers} data={data} />
        </Container>
    )
}