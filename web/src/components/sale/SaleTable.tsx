/* eslint-disable react-hooks/rules-of-hooks */
import styled from "styled-components";
import Button from "../Button";
import Table from "../Table";
import { useState } from "react";
import Modal from "../Modal";
import SearchInput from "../SearchInput";

const Container = styled.h1`
    padding-left: 6%;
`;

const TableTitle = styled.h1`
    font-weight: bold;
    font-size: 25px;
    color: #535353;
    opacity: 1;
    margin-top: 40px;
    margin-bottom: 10px;
`;

const SearchContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
    margin-top: 43px;
`;

export default function SaleTable() {
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

    const columns = [
      { name: "Cliente", dataKey: "client" },
      { name: "Data", dataKey: "date" },
      { name: "Status", dataKey: "status" },
      { name: "Valor", dataKey: "value" },
    ];
    
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
      setModalOpen(true);
    };

    const closeModal = () => {
      setModalOpen(false);
    };

    return (
        <Container>
            <SearchContainer>
                <SearchInput placeholder="Digite o nome do cliente que deseja pesquisar" />
                <Button title="Cadastrar vendas" onClick={openModal}/>
                <Modal isOpen={modalOpen} onClose={closeModal} type="addSale"/>
            </SearchContainer>

            <TableTitle>Vendas cadastradas</TableTitle>
            <Table columns={columns} data={data} type="sale"/>
        </Container>
    )
}