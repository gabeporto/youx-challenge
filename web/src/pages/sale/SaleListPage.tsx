import styled from "styled-components";
import Container from "../../components/Container";
import Header from "../../components/Header";
import Title from "../../components/Title";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import Subtitle from "../../components/Subtitle";
import Table from "../../components/Table";
import { useState } from "react";

const FlexDiv = styled.div`
  display: flex;
  margin-top: 42px;
  gap: 22px;

  @media only screen and (max-width: 785px) {
    flex-wrap: wrap;
  }
`

const TableDiv = styled.div`
  margin-top: 42px;
`

export default function SaleListPage() {

    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
      setModalOpen(true);
    };

    const closeModal = () => {
      setModalOpen(false);
    };

    const columns = [
        { name: "Cliente", dataKey: "client" },
        { name: "Data", dataKey: "date" },
        { name: "Status", dataKey: "status" },
        { name: "Valor", dataKey: "value" },
    ];

    // Examples
    const data = [
        {
            id: 1,
            client: 'Comércio de Livros LTDA',
            date: '26/08/2022',
            status: 'À caminho',
            value: 'R$ 350,00',
        },
        {
            id: 2,
            client: 'Comércio de Livros LTDA',
            date: '26/08/2022',
            status: 'À caminho',
            value: 'R$ 350,00',
        },
        {
            id: 3,
            client: 'Comércio de Livros LTDA',
            date: '26/08/2022',
            status: 'À caminho',
            value: 'R$ 350,00',
        },
        {
            id: 4,
            client: 'Comércio de Livros LTDA',
            date: '26/08/2022',
            status: 'À caminho',
            value: 'R$ 350,00',
        },
        {
            id: 5,
            client: 'Comércio de Livros LTDA',
            date: '26/08/2022',
            status: 'À caminho',
            value: 'R$ 350,00',
        },
        {
            id: 6,
            client: 'Comércio de Livros LTDA',
            date: '26/08/2022',
            status: 'À caminho',
            value: 'R$ 350,00',
        },
        {
            id: 7,
            client: 'Comércio de Livros LTDA',
            date: '26/08/2022',
            status: 'À caminho',
            value: 'R$ 350,00',
        },
        {
            id: 8,
            client: 'Comércio de Livros LTDA',
            date: '26/08/2022',
            status: 'À caminho',
            value: 'R$ 350,00',
        },
        {
            id: 9,
            client: 'Comércio de Livros LTDA',
            date: '26/08/2022',
            status: 'À caminho',
            value: 'R$ 350,00',
        },
        {
            id: 10,
            client: 'Comércio de Livros LTDA',
            date: '26/08/2022',
            status: 'À caminho',
            value: 'R$ 350,00',
        },
        {
            id: 11,
            client: 'Comércio de Livros LTDA',
            date: '26/08/2022',
            status: 'À caminho',
            value: 'R$ 350,00',
        },
        {
            id: 12,
            client: 'Comércio de Livros LTDA',
            date: '26/08/2022',
            status: 'À caminho',
            value: 'R$ 350,00',
        },
        {
            id: 13,
            client: 'Comércio de Livros LTDA',
            date: '26/08/2022',
            status: 'À caminho',
            value: 'R$ 350,00',
        },
        {
            id: 14,
            client: 'Comércio de Livros LTDA',
            date: '26/08/2022',
            status: 'À caminho',
            value: 'R$ 350,00',
        },
        {
            id: 15,
            client: 'Comércio de Livros LTDA',
            date: '26/08/2022',
            status: 'À caminho',
            value: 'R$ 350,00',
        },
        {
            id: 16,
            client: 'Comércio de Livros LTDA',
            date: '26/08/2022',
            status: 'À caminho',
            value: 'R$ 350,00',
        },
        {
            id: 17,
            client: 'Comércio de Livros LTDA',
            date: '26/08/2022',
            status: 'À caminho',
            value: 'R$ 350,00',
        },
        {
            id: 18,
            client: 'Comércio de Livros LTDA',
            date: '26/08/2022',
            status: 'À caminho',
            value: 'R$ 350,00',
        },
        {
            id: 19,
            client: 'Comércio de Livros LTDA',
            date: '26/08/2022',
            status: 'À caminho',
            value: 'R$ 350,00',
        },
        {
            id: 20,
            client: 'Comércio de Livros LTDA',
            date: '26/08/2022',
            status: 'À caminho',
            value: 'R$ 350,00',
        },
    ];

    return (
        <>
            <Header />

            <Container>      
                <Title title="Lista de Vendas"/>
                
                <FlexDiv>
                    <Input placeholder="Digite o nome ou CNPJ do cliente que deseja pesquisar" type="search"/>
                    <Button title="Cadastrar venda" type="add" onClick={openModal}/>
                    <Modal isOpen={modalOpen} onClose={closeModal} type="addSale"/>
                </FlexDiv>

                <TableDiv>
                    <Subtitle subtitle="Vendas cadastradas"/>
                    <Table columns={columns} data={data} type="sale"/>
                </TableDiv>
            </Container>
        </>
    )
}