import React, { useState } from 'react';
import styled from 'styled-components';
import { EditClientModal, EditSaleModal, DeleteClientModal, DeleteSaleModal } from './Modal';
import EditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ClientData } from "../interface/ClientData"
import { SaleData } from "../interface/SaleData"
import { SaleFormData } from '../interface/SaleFormData';
import { ClientFormData } from '../interface/ClientFormData';

const TableContainer = styled.div`
  width: 100%;

  @media only screen and (max-width: 567px) {
    overflow: auto;
}
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 8px;
  text-align: left;
  font-weight: light;
  font-size: 18px;
  color: #6E6E6E;
`;

const TableHeaderActions = styled.th`
  padding: 8px;
  text-align: left;
  font-weight: regular;
  font-size: 18px;
  color: #6E6E6E;
  right: 0;
  width: 120px;
`;

const TableRow = styled.tr`
  height: 50px;

  &:nth-child(even) {
    background-color: #FFF;
  }

  &:nth-child(odd) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 8px;
  color: #686868;
  font-weight: regular;
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
  justify-conent: center;
`;

const DropdownList = styled.ul<{ open: boolean }>`
  position: absolute;
  top: 110%;
  left: -86px;
  z-index: 1;
  display: ${({ open }) => (open ? 'flex' : 'none')};
  flex-direction: column;
  padding: 8px;
  background-color: #fff;
  border: 2px solid #aaa;
  border-radius: 5px;
  list-style: none;
  width: 179px;
  height: 99px;
`;

const DropdownItem = styled.button`
  padding: 4px;
  cursor: pointer;
  display: flex;
  gap: 15px;
  align-items: center;
  font-size: 20px;
  color: #707070;
  padding-left: 20px;

  &:hover {
    background-color: #f5f5f5;
    border-radius: 5px;
  }
`;

const TableBorder = styled.div`
  margin-top: 12px;
  margin-bottom: 5px;
  border-bottom: 1px solid #ccc;
  width: 100%;
`

const TableInfo = styled.div`
  color: #686868;
  margin-top: 5px;
`

const TableInfoDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const ButtonNextPage = styled.button`
  margin-right: 10px;
  color: #686868;
`

const ButtonName = styled.label`
  margin-left: 6px;
  cursor: pointer;
`

interface Column {
  name: string;
  dataKey: string;
}

interface TableProps {
  columns: Column[];
  data: (ClientData | SaleData)[];
  type: string;
  onEdit: any;
  onDelete: any;
}
  
const Table: React.FC<TableProps> = ({ columns, data, type, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const totalPages = data && Array.isArray(data) ? Math.ceil(data.length / itemsPerPage) : 0;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Actions (Edit and Delete)
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dropdownOpen, setDropdownOpen] = useState(true);

  const renderActionsDropdown = (itemId: number) => {
    setOpenDropdownId(itemId === openDropdownId ? null : itemId);
  };

  const openEditModal = () => {
    setEditModalOpen(true);
    setDropdownOpen(false);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setOpenDropdownId(null);
  };

  const openRemoveModal = () => {
    setRemoveModalOpen(true);
    setDropdownOpen(false);
  };

  const closeRemoveModal = () => {
    setRemoveModalOpen(false);
    setOpenDropdownId(null);
  };

  const handleEditClick = (data: ClientFormData | SaleFormData) => {
    onEdit(data);
  };

  const handleDeleteClick = (data: ClientFormData | SaleFormData) => {
    onDelete(data);
  };

  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            {columns.map((column) => (
                <TableHeader key={column.dataKey}>{column.name}
                <ArrowDownIcon />
                </TableHeader>
             ))}
            <TableHeaderActions>Ações</TableHeaderActions>
            
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (

            <TableRow key={item.id}>
            {type === 'client' ? (
              <>
                {('name' in item) && (
                  <TableCell>{item.name}</TableCell>
                )}
                {('cnpj' in item) && (
                  <TableCell>{item.cnpj}</TableCell>
                )}
                {('email' in item) && (
                  <TableCell>{item.email}</TableCell>
                )}
                {('phone' in item) && (
                  <TableCell>{item.phone}</TableCell>
                )}
              </>
            ) : null}
            {type === 'sale' ? (
              <>
                {('client' in item) && (
                  <TableCell>{item.client}</TableCell>
                )}
                {('date' in item) && (
                  <TableCell>{String(item.date)}</TableCell>
                )}
                {('status' in item) && (
                  <TableCell>{item.status}</TableCell>
                )}
                {('value' in item) && (
                  <TableCell>{item.value}</TableCell>
                )}
              </>
            ) : null}
            <TableCell>
              <DropdownContainer>
                <DropdownButton onClick={() => {
                  if (typeof item.id === 'number') {
                    renderActionsDropdown(item.id);
                  }}}>
                  <ButtonName>Ações</ButtonName>
                  <ArrowDownIcon  fontSize='small'/>
                </DropdownButton>
                
                <DropdownList open={openDropdownId === item.id}>

                  <DropdownItem onClick={openEditModal}>
                    <EditIcon />
                    Editar
                  </DropdownItem>
                  {type === 'client' && <EditClientModal data={item as ClientData} onSubmit={handleEditClick} isOpen={editModalOpen} onClose={closeEditModal} />}
                  {type === 'sale' && <EditSaleModal data={item as SaleData} onSubmit={handleEditClick} isOpen={editModalOpen} onClose={closeEditModal} />}

                  <DropdownItem onClick={openRemoveModal}>
                    <DeleteIcon />
                    Deletar
                  </DropdownItem>
                  {type === 'client' && <DeleteClientModal data={item as ClientData} onSubmit={handleDeleteClick} isOpen={removeModalOpen} onClose={closeRemoveModal} />}
                  {type === 'sale' && <DeleteSaleModal data={item as SaleData} onSubmit={handleDeleteClick} isOpen={removeModalOpen} onClose={closeRemoveModal} />}

                </DropdownList>

              </DropdownContainer>
            </TableCell>
            </TableRow>
          ))}
        </tbody>
        </StyledTable>

        <TableBorder/>

        <TableInfoDiv>

          <TableInfo>
              Exibindo de {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, data.length)} de {data.length} registros
          </TableInfo>

          <div>
              <ButtonNextPage disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
              {'<<'}
              </ButtonNextPage>
              {Array.from({ length: totalPages }).map((_, index) => (
              <ButtonNextPage
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  style={{ fontWeight: index + 1 === currentPage ? 'bold' : 'normal' }}
              >
                  {index + 1}
              </ButtonNextPage>
              ))}
              <ButtonNextPage disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
              {'>>'}
              </ButtonNextPage>
          </div>

        </TableInfoDiv>
    </TableContainer>
  );
};

export default Table;
