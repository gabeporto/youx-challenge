/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import Container from "../../components/Container";
import Header from "../../components/Header";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { AddSaleModal } from "../../components/Modal";
import Input from "../../components/Input";
import Subtitle from "../../components/Subtitle";
import Table from "../../components/Table";
import { useEffect, useState } from "react";
import { SaleFormData } from "../../interface/SaleFormData";
import { SaleData } from "../../interface/SaleData";
import { useAuth } from '../../context/AuthProvider/useAuth';

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

  const auth = useAuth();

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

    const [data, setData] = useState<SaleData[]>([]);
    const [filteredData, setFilteredData] = useState<SaleData[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchValue, setSearchValue] = useState('');

    const handleAdd = (data: SaleFormData) => {

        fetch('http://localhost:8080/sale', {
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
    
    const handleEdit = (data: SaleFormData) => {

        fetch(`http://localhost:8080/sale/${data.id}`, {
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
          console.error(error);
        });
    
    };
      
    const handleDelete = (data: SaleFormData) => {
        fetch(`http://localhost:8080/sale/${data.id}`, {
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
      
        fetch(`http://localhost:8080/sale?personId=${auth.id}`)
          .then(response => response.json())
          .then(data => {
            const formattedData = data.map((item: 
              { date: string | number | Date; value: { toLocaleString: (arg0: string, arg1: { style: string; currency: string; }) => any; }; }) => {
                const date = new Date(item.date);
                const formattedDate = date.toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                });
          
                const formattedValue = item.value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                });
          
                return {
                  ...item,
                  date: formattedDate,
                  value: formattedValue
                };
            });
            setData(formattedData)
            setFilteredData(formattedData);
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
                <Title title="Lista de Vendas"/>
                
                <FlexDiv>
                    <Input onChange={handleSearch} placeholder="Digite o nome ou CNPJ do cliente que deseja pesquisar" type="search"/>
                    <Button title="Cadastrar venda" type="add" onClick={openModal}/>
                    <AddSaleModal isOpen={modalOpen} onClose={closeModal} onSubmit={handleAdd}/>
                </FlexDiv>

                <TableDiv>
                    <Subtitle subtitle="Vendas cadastradas"/>
                    <Table columns={columns} data={filteredData} type="sale" onEdit={handleEdit} onDelete={handleDelete}/>
                </TableDiv>
            </Container>
        </>
    )
}