import { useState, useEffect} from "react";
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
import { ClientData } from "../../interface/ClientData";
import { Navigate } from "react-router-dom";

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

  const [data, setData] = useState<ClientData[]>([]);
  const [formData, setFormData] = useState<ClientFormData | null>(null);

  const handleAdd = (data: ClientFormData) => {
    setFormData(data);

    const newData = {
      name: formData?.name,
      cnpj: formData?.cnpj,
      phone: formData?.phone,
      email: formData?.email,
      uf: formData?.uf,
      latitude: formData?.latitude,
      longitude: formData?.longitude,
      //TODO
      personId: 1
    };

    fetch('http://localhost:8080/client', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    })
      .then(response => {
        if (response.ok) { 
          window.location.reload();
        } else {
          // Tratar o erro de acordo com a sua necessidade
        }
      })
      .catch(error => {
        console.error(error);
      });

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

  useEffect(() => {
    fetch('http://localhost:8080/client')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

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

