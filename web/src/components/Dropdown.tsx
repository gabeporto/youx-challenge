import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Logo from '../assets/youx-logo.png'
import { Link } from 'react-router-dom';
import { AddClientModal, AddSaleModal } from './Modal';
import { ClientFormData } from '../interface/ClientFormData';
import { SaleFormData } from '../interface/SaleFormData';

const LogoImage = styled.img`
    position: relative;
    top: 28px;
    left: 27px;
    height: 59px;
    width: 59px;
    cursor: pointer;
    user-select: none;
`;

const DropdownContainer = styled.div`
    position: relative;
    display: inline-block;
    z-index: 2000;

    @media only screen and (max-width: 600px) {
      z-index: 1;
  }
`;

const DropdownContent = styled.div`
    display: ${props => (props.itemScope ? 'block' : 'none')};
    padding-top: 17px;
    position: absolute;
    top: 120px;
    left: 0px;
    width: 408px;
    min-height: 110vh;
    background-color: #023E8A;
    border: 1px solid #707070;
    opacity: ${props => (props.itemScope ? '1' : '0')};
    visibility: ${props => (props.itemScope ? 'visible' : 'hidden')};
    animation: ${props => (props.itemScope ? fadeIn : fadeOut)} 0.3s ease;
    transition: visibility 0.3s;

  &:hover {
    visibility: visible; 
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

const DropdownItem = styled(Link)`
  display: block;
  padding-top: 40px;
  padding-left: 52px;
  color: #FFFFFF;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: medium;
  font-size: 25px;
  opacity: 1;
`;

const DropdownSubItem = styled(Link)`
  display: block;
  margin-top: 10px;
  padding-left: 52px;
  color: #FFFFFF;
  opacity: 0.5;
  text-decoration: none;
  font-size: 25px;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
      opacity: 1;
  }
`;

const DropdownModal = styled.button`
  display: block;
  margin-top: 10px;
  padding-left: 52px;
  color: #FFFFFF;
  opacity: 0.5;
  text-decoration: none;
  font-size: 25px;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
      opacity: 1;
  }
`;

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [saleModalOpen, setSaleModalOpen] = useState(false);

  const openClientModal = () => {
    setClientModalOpen(true);
  };

  const openSaleModal = () => {
    setSaleModalOpen(true);
  };

  const closeModal = () => {
    setClientModalOpen(false);
    setSaleModalOpen(false);
  };

  const [clientFormData, setClientFormData] = useState<ClientFormData | null>(null);
  const [saleFormData, setSaleFormData] = useState<SaleFormData | null>(null);

  const addClient = (data: ClientFormData) => {

    fetch('http://localhost:8080/client', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) { 
          window.location.reload();
        } else {
          console.log(response);
        }
        closeModal();
      })
      .catch(error => {
        console.error(error);
      });

  }

  const addSale = (data: SaleFormData) => {

    fetch('http://localhost:8080/sale', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) { 
          window.location.reload();
        } else {
          console.log(response);
        }
        closeModal();
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
      <DropdownContainer>
          <LogoImage src={Logo} alt="YouX Group Logo" onClick={toggleDropdown}/>
          <DropdownContent itemScope={isOpen}>
              <DropdownItem to="/client">Gestão de Clientes</DropdownItem>
              <DropdownSubItem to="/client">Lista de clientes</DropdownSubItem>
              <DropdownModal onClick={openClientModal}>Cadastrar cliente</DropdownModal>
              <AddClientModal isOpen={clientModalOpen} onClose={closeModal} onSubmit={addClient}/>

              <DropdownItem to="/sale">Gestão de Vendas</DropdownItem>
              <DropdownSubItem to="/sale">Lista de vendas</DropdownSubItem>
              <DropdownModal onClick={openSaleModal}>Cadastrar venda</DropdownModal>
              <AddSaleModal isOpen={saleModalOpen} onClose={closeModal} onSubmit={addSale}/>

              <DropdownItem to="/report">Relatórios</DropdownItem>
              <DropdownSubItem to="/report">Relatórios</DropdownSubItem>

          </DropdownContent>
      </DropdownContainer>
  );
};

