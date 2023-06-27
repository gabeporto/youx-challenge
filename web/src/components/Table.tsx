import React, { useState } from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  margin-bottom: 16px;
  width: 94%;

  th,
  td {
    padding: 8px;
    text-align: left;
  }

  th {
    font-weight: bold;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;


const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 8px;
  text-align: left;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
`;

const TableRow = styled.tr`
    height: 50px;
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 8px;
`;

const ActionButton = styled.button`
    width: 93px;
    height: 34px;
    font-size: 15px;
    color: #FFFFFF;
    background-color: #023E8A;
    border-radius: 3px;
    opacity: 1;
    border: none;
    cursor: pointer;
    justify-content: center;
    transition: opacity 0.3s ease;

    &:hover {
    opacity: 0.8;
    }
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled(ActionButton)`
  display: flex;
  align-items: center;
`;

const DropdownList = styled.ul<{ open: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  display: ${({ open }) => (open ? 'flex' : 'none')};
  flex-direction: column;
  padding: 8px;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  list-style: none;
`;

const DropdownItem = styled.li`
  padding: 4px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const TableBorder = styled.div`
    margin-top: 15px;
    margin-bottom: 5px;
    border: 1px solid #AAA;
    width: 1709px;
`

interface Column {
    name: string;
    dataKey: string;
  }
  
interface TableProps {
    columns: Column[];
    data: {
    id: number;
    nome: string;
    cnpj: string;
    email: string;
    telefone: string;
    }[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderActionsDropdown = (itemId: number) => {
    setOpenDropdownId(itemId === openDropdownId ? null : itemId);
  };

  const handleEdit = (id: number) => {
    console.log(`Editar item com ID ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Deletar item com ID ${id}`);
  };

  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            {columns.map((column) => (
                <TableHeader key={column.dataKey}>{column.name}</TableHeader>
             ))}
            <TableHeader>Ações</TableHeader>
             
          {/* Restante do código... */}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.nome}</TableCell>
              <TableCell>{item.cnpj}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.telefone}</TableCell>
              <TableCell>
                <DropdownContainer>
                  <DropdownButton onClick={() => renderActionsDropdown(item.id)}>
                    Ações
                  </DropdownButton>
                  <DropdownList open={openDropdownId === item.id}>
                    <DropdownItem onClick={() => handleEdit(item.id)}>Editar</DropdownItem>
                    <DropdownItem onClick={() => handleDelete(item.id)}>Deletar</DropdownItem>
                  </DropdownList>
                </DropdownContainer>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>

      <TableBorder/>

      <div className="flex justify-between">

        <div>
            Exibindo de {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, data.length)} de {data.length} registros
        </div>

        <div>
            <button className="mr-2" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
            {'<<'}
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
            <button
                className="mr-2"
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                style={{ fontWeight: index + 1 === currentPage ? 'bold' : 'normal' }}
            >
                {index + 1}
            </button>
            ))}
            <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
            {'>>'}
            </button>
        </div>

      </div>
    </TableContainer>
  );
};

export default Table;
