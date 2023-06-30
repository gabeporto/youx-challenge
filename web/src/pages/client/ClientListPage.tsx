import { useState } from "react";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Title from "../../components/Title";
import Modal from "../../components/Modal";
import styled from "styled-components";
import Subtitle from "../../components/Subtitle";
import Table from "../../components/Table";

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

export default function ClientListPage() {

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const columns = [
    { name: "Nome", dataKey: "nome" },
    { name: "CNPJ", dataKey: "cnpj" },
    { name: "E-mail", dataKey: "email" },
    { name: "Telefone", dataKey: "telefone" },
  ];

  // Examples
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

  return (
      <>
        <Header />

        <Container>
          <Title title="Lista de Clientes"/>
          
          <FlexDiv>
            <Input placeholder="Digite o nome ou CNPJ do cliente que deseja pesquisar" type="search"/>
            <Button title="Cadastrar cliente" type="add" onClick={openModal}/>
            <Modal isOpen={modalOpen} onClose={closeModal} type="addClient"/>
          </FlexDiv>

          <TableDiv>
            <Subtitle subtitle="Clientes cadastrados"/>
            <Table columns={columns} data={data} type="client"/>
          </TableDiv>
        </Container>
      </>
  );
}

