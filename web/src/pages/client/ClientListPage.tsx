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
import { ClientFormData } from "../../interface/ClientFormData"
import { ClientData } from "../../interface/ClientData";

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
  const [filteredData, setFilteredData] = useState<ClientData[]>([]);
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchValue, setSearchValue] = useState('');

  const handleAdd = (data: ClientFormData) => {

    fetch('http://localhost:8080/client', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) { 
          fetchData();
        } else {
          console.log(response);
        }
        closeModal();
      })
      .catch(error => {
        console.error(error);
      });

  }

  const handleEdit = (data: ClientFormData) => {

    fetch(`http://localhost:8080/client/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      if (response.ok) {
        fetchData();
      } else {
        console.log(response);
      }
    })
    .catch(error => {
      // Tratar o erro de requisição
      console.error(error);
    });

  };
  
  const handleDelete = (data: ClientFormData) => {
    fetch(`http://localhost:8080/client/${data.id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          fetchData();
        } else {
          console.error('Erro ao excluir o item');
        }
      })
      .catch((error) => {
        console.error('Erro na requisição de exclusão', error);
      });
      
  };

  const fetchData = () => {
    fetch('http://localhost:8080/client')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setFilteredData(data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    const filteredData = data.filter((item) => {
      const searchValueLower = typeof value === 'string' ? value.toLowerCase() : '';
      return Object.values(item).some((prop: string) =>
        typeof prop === 'string' ? prop.toLowerCase().includes(searchValueLower) : false
      );
  });
    setFilteredData(filteredData);
  };

  return (
      <>
        <Header />

        <Container>
          <Title title="Lista de Clientes"/>
          
          <FlexDiv>
            <Input onChange={handleSearch} placeholder="Digite o nome ou CNPJ do cliente que deseja pesquisar" type="search"/>
            <Button title="Cadastrar cliente" type="add" onClick={openModal}/>
            <AddClientModal isOpen={modalOpen} onClose={closeModal} onSubmit={handleAdd}/>
          </FlexDiv>

          <TableDiv>
            <Subtitle subtitle="Clientes cadastrados"/>
            <Table columns={columns} data={filteredData} type="client" onEdit={handleEdit} onDelete={handleDelete} />
          </TableDiv>
        </Container>
      </>
  );
}

