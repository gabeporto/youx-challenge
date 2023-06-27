import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Logo from '../assets/youx-logo.png'
import { Link } from 'react-router-dom';

const LogoImage = styled.img`
    position: relative;
    top: 28px;
    left: 27px;
    height: 59px;
    width: 59px;
    cursor: pointer;
`;

const DropdownContainer = styled.div`
    position: relative
    display: inline-block;
`;

const DropdownContent = styled.div`
    display: ${props => (props.itemScope ? 'block' : 'none')};
    padding-top: 17px;
    position: absolute;
    top: 120px;
    left: 0px;
    width: 408px;
    min-height: 100vh;
    background-color: #023E8A;
    border: 1px solid #707070;
    opacity: ${props => (props.itemScope ? '1' : '0')};
    visibility: ${props => (props.itemScope ? 'visible' : 'hidden')};
    animation: ${props => (props.itemScope ? fadeIn : fadeOut)} 0.3s ease;
    transition: visibility 0.3s;

  &:hover {
    visibility: visible; /* Manter visível durante o hover */
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

const DropdownItem = styled.a`
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


export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
      <DropdownContainer>
          <LogoImage src={Logo} alt="YouX Group Logo" onClick={toggleDropdown}/>
          <DropdownContent itemScope={isOpen}>
              <DropdownItem href="#">Gestão de Clientes</DropdownItem>
              <DropdownSubItem to="/clients">Lista de clientes</DropdownSubItem>
              <DropdownSubItem to="/clients">Cadastrar cliente</DropdownSubItem>

              <DropdownItem href="#">Gestão de Vendas</DropdownItem>
              <DropdownSubItem to="/sales">Lista de vendas</DropdownSubItem>
              <DropdownSubItem to="/sales">Cadastrar venda</DropdownSubItem>

              <DropdownItem href="#">Relatórios</DropdownItem>
              <DropdownSubItem to="/report">Relatórios</DropdownSubItem>

          </DropdownContent>
      </DropdownContainer>
  );
};

