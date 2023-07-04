import styled, { keyframes } from "styled-components";
import { AddClientForm, EditClientForm, DeleteClientForm, AddSaleForm, EditSaleForm, DeleteSaleForm, ClientFormData, SaleFormData } from "./Form";
import { ClientData } from "../interface/ClientData";

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

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;

const ModalContent = styled.div`
    background-color: #fff;
    padding: 20px 25px 20px 25px;
    border-radius: 8px;
    width: 70%;
    max-width: 900px;
    max-height: 700px;
    animation: ${props => (props.itemScope ? fadeOut : fadeIn)} 0.4s ease;

    @media only screen and (max-width: 490px) {
        overflow: auto;
    }
`;

const ModalBar = styled.div`
    background-color: #023E8A;
    padding: 10px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    margin: -20px -25px 0 -25px;
`;

const ModalTitle = styled.h2`
    margin: 0;
    font-size: 20px;
    padding-left: 10px;
    color: white;
`;

const ModalDiv = styled.div`
    top: 0;
    left: 0;
    width: 964px;
    height: 847px;
    display: flex;
    justify-content: center;
    align-items: center;
`

interface ClientModalProps {
    onSubmit: (data: ClientFormData) => void;
    isOpen: boolean;
    onClose: () => void;
    data?: ClientData;
}

export const AddClientModal: React.FC<ClientModalProps> = ({ isOpen, onClose, onSubmit}) => {

    if (!isOpen) return null;

    return (
        <ModalWrapper>
            <ModalDiv>
                <ModalContent>
                    <ModalBar>
                    <ModalTitle>Cadastrar Cliente</ModalTitle>
                    </ModalBar>
                    <AddClientForm onSubmit={onSubmit} onClose={onClose}/>
                </ModalContent>
            </ModalDiv>
        </ModalWrapper>
    )
}

export const EditClientModal: React.FC<ClientModalProps> = ({ isOpen, onClose, onSubmit}) => {

    if (!isOpen) return null;

    return (
        <ModalWrapper>
            <ModalDiv>
                <ModalContent>
                    <ModalBar>
                    <ModalTitle>Editar Cliente</ModalTitle>
                    </ModalBar>
                    <EditClientForm onSubmit={onSubmit} onClose={onClose}/>
                </ModalContent>
            </ModalDiv>
        </ModalWrapper>
    )
}

export const DeleteClientModal: React.FC<ClientModalProps> = ({ isOpen, onClose, onSubmit}) => {

    if (!isOpen) return null;

    return (
        <ModalWrapper>
            <ModalDiv>
                <ModalContent>
                    <ModalBar>
                    <ModalTitle>Excluir Cliente</ModalTitle>
                    </ModalBar>
                    <DeleteClientForm onSubmit={onSubmit} onClose={onClose}/>
                </ModalContent>
            </ModalDiv>
        </ModalWrapper>
    )
}

interface SaleModalProps {
    onSubmit: (data: SaleFormData) => void;
    isOpen: boolean;
    onClose: () => void;
}

export const AddSaleModal: React.FC<SaleModalProps> = ({ isOpen, onClose, onSubmit}) => {

    if (!isOpen) return null;

    return (
        <ModalWrapper>
            <ModalDiv>
                <ModalContent>
                    <ModalBar>
                    <ModalTitle>Cadastrar Venda</ModalTitle>
                    </ModalBar>
                    <AddSaleForm onSubmit={onSubmit} onClose={onClose}/>
                </ModalContent>
            </ModalDiv>
        </ModalWrapper>
    )
}

export const EditSaleModal: React.FC<SaleModalProps> = ({ isOpen, onClose, onSubmit}) => {

    if (!isOpen) return null;

    return (
        <ModalWrapper>
            <ModalDiv>
                <ModalContent>
                    <ModalBar>
                    <ModalTitle>Editar Venda</ModalTitle>
                    </ModalBar>
                    <EditSaleForm onSubmit={onSubmit} onClose={onClose}/>
                </ModalContent>
            </ModalDiv>
        </ModalWrapper>
    )
}

export const DeleteSaleModal: React.FC<SaleModalProps> = ({ isOpen, onClose, onSubmit}) => {

    if (!isOpen) return null;

    return (
        <ModalWrapper>
            <ModalDiv>
                <ModalContent>
                    <ModalBar>
                    <ModalTitle>Excluir Cliente</ModalTitle>
                    </ModalBar>
                    <DeleteSaleForm onSubmit={onSubmit} onClose={onClose}/>
                </ModalContent>
            </ModalDiv>
        </ModalWrapper>
    )
}
