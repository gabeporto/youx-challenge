import { useState } from "react";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Title from "../../components/Title";
import { AddClientModal } from "../../components/Modal";
import styled from "styled-components";
import Subtitle from "../../components/Subtitle";
import Table from "../../components/Table";
import { ClientFormData } from "../../components/Form";

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
    { name: "Telefone", dataKey: "phone" },
  ];

  // Examples
  const data = [
    {
      id: 1,
      name: 'Comércio de Livros LTDA',
      cnpj: '85.681.832/0001-73',
      email: 'comerciodelivros@email.com',
      uf: 'MG',
      phone: '(35) 92854-1548',
    },
    {
      id: 2,
      name: 'Cliente 2',
      cnpj: '987654321',
      email: 'cliente2@example.com',
      uf: 'MG',
      phone: '9876543210',
    },
    {
      id: 3,
      name: 'Cliente 1',
      cnpj: '123456789',
      email: 'cliente1@example.com',
      uf: 'MG',
      phone: '1234567890',
    },
    {
      id: 4,
      name: 'Cliente 2',
      cnpj: '987654321',
      email: 'cliente2@example.com',
      uf: 'MG',
      phone: '9876543210',
    },
    {
      id: 5,
      name: 'Cliente 1',
      cnpj: '123456789',
      email: 'cliente1@example.com',
      uf: 'MG',
      phone: '1234567890',
    },
    {
      id: 6,
      name: 'Cliente 2',
      cnpj: '987654321',
      email: 'cliente2@example.com',
      uf: 'MG',
      phone: '9876543210',
    },
    {
      id: 7,
      name: 'Cliente 1',
      cnpj: '123456789',
      email: 'cliente1@example.com',
      uf: 'MG',
      phone: '1234567890',
    },
    {
      id: 8,
      name: 'Cliente 2',
      cnpj: '987654321',
      email: 'cliente2@example.com',
      uf: 'MG',
      phone: '9876543210',
    },
    {
      id: 9,
      name: 'Cliente 1',
      cnpj: '123456789',
      email: 'cliente1@example.com',
      uf: 'MG',
      phone: '1234567890',
    },
    {
      id: 10,
      name: 'Cliente 2',
      cnpj: '987654321',
      email: 'cliente2@example.com',
      uf: 'MG',
      phone: '9876543210',
    },
    {
      id: 11,
      name: 'Cliente 1',
      cnpj: '123456789',
      email: 'cliente1@example.com',
      uf: 'MG',
      phone: '1234567890',
    },
    {
      id: 12,
      name: 'Cliente 2',
      cnpj: '987654321',
      email: 'cliente2@example.com',
      uf: 'MG',
      phone: '9876543210',
    },
    {
      id: 13,
      name: 'Cliente 1',
      cnpj: '123456789',
      email: 'cliente1@example.com',
      uf: 'MG',
      phone: '1234567890',
    },
    {
      id: 14,
      name: 'Cliente 2',
      cnpj: '987654321',
      email: 'cliente2@example.com',
      uf: 'MG',
      phone: '9876543210',
    },
    {
      id: 15,
      name: 'Cliente 1',
      cnpj: '123456789',
      email: 'cliente1@example.com',
      uf: 'MG',
      phone: '1234567890',
    },
    {
      id: 16,
      name: 'Cliente 2',
      cnpj: '987654321',
      email: 'cliente2@example.com',
      uf: 'MG',
      phone: '9876543210',
    },
    {
      id: 17,
      name: 'Cliente 1',
      cnpj: '123456789',
      email: 'cliente1@example.com',
      uf: 'MG',
      phone: '1234567890',
    },
    {
      id: 18,
      name: 'Cliente 2',
      cnpj: '987654321',
      email: 'cliente2@example.com',
      uf: 'MG',
      phone: '9876543210',
    },
    {
      id: 19,
      name: 'Cliente 1',
      cnpj: '123456789',
      email: 'cliente1@example.com',
      uf: 'MG',
      phone: '1234567890',
    },
    {
      id: 20,
      name: 'Cliente 2',
      cnpj: '987654321',
      email: 'cliente2@example.com',
      uf: 'MG',
      phone: '9876543210',
    },
  ];

  const [formData, setFormData] = useState<ClientFormData | null>(null);

  const handleAdd = (data: ClientFormData) => {
    setFormData(data);
    // Lógica para lidar com a ação de adição
    console.log(data);
  }

  const handleEdit = (data: ClientFormData) => {
    // Lógica para lidar com a ação de edição
    console.log('Editar:', data);
  };
  
  const handleDelete = (data: ClientFormData) => {
    // Lógica para lidar com a ação de exclusão
    console.log('Excluir:', data);
  };

  return (
      <>
        <Header />

        <Container>
          <Title title="Lista de Clientes"/>
          
          <FlexDiv>
            <Input placeholder="Digite o nome ou CNPJ do cliente que deseja pesquisar" type="search"/>
            <Button title="Cadastrar cliente" type="add" onClick={openModal}/>
            <AddClientModal isOpen={modalOpen} onClose={closeModal} onSubmit={handleAdd}/>
          </FlexDiv>

          <TableDiv>
            <Subtitle subtitle="Clientes cadastrados"/>
            <Table columns={columns} data={data} type="client" onEdit={handleEdit} onDelete={handleDelete}/>
          </TableDiv>
        </Container>
      </>
  );
}

