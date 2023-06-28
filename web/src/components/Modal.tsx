import styled from "styled-components";
import Map from "./Map";
import { SetStateAction, useState } from "react";

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

const ButtonsDiv = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`

const SaveButton = styled.button`
    width: 150px;
    font-size: 15px;
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #407BFF;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`

const CancelButton = styled.button`
    width: 150px;
    font-size: 15px;
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #CCCCCC;
    color: #263238;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`

const StyledLabel = styled.p`
    margin-top: 15px;
    margin-bottom: 5px;
    text-align: left;
    font-size: 16px;
    letter-spacing: 0px;
    color: #444444;
    opacity: 1;
`

const StyledInput = styled.input`
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #CCCCCC;
    border-radius: 3px;
`

const StyledSelect = styled.select`
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #CCCCCC;
    border-radius: 3px;
`

const FlexDiv = styled.div`
    width: 100%;
    display: flex;
    gap: 20px;


    @media only screen and (max-width: 490px) {
        display: flex;
        flex-wrap: wrap;
    }
`

const LabelComponent = styled.div`
    width: 100%;
`

const MapContainer = styled.div`
    margin-top: 15px;
    margin-bottom: 10px;
    width: 100%;
    height: 100%;
`

interface ModalProps {
    type: string;
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ type, isOpen, onClose }) => {

    const [name, setName] = useState('');
    const [cnpj, setCNPJ] = useState('');
    const [phone, setPhone] = useState('');
    const [uf, setUf] = useState('');
    const [email, setEmail] = useState('');

    const nameInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setName(event.target.value);
    }
    const cnpjInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setCNPJ(event.target.value);
    }
    const phoneInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setPhone(event.target.value);
    }
    const ufInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setUf(event.target.value);
    }
    const emailInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setEmail(event.target.value);
    }

    if (!isOpen) return null;

    let title = "";
    switch (type) {
        case "addClient":
            title = "Cadastrar Cliente";
            break;
        case "editClient":
            title = "Editar Cliente";
            break;
        case "removeClient":
            title = "Deletar Cliente";
            break;
        case "addSale":
            title = "Cadastrar Venda";
            break;
        case "editSale":
            title = "Editar Venda";
            break;
        case "removeSale":
            title = "Deletar Venda";
            break;
        default:
            title = "Modal";
    }

    const states = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

    const addClient = () => {
        const currentName = name;
        const currentCNPJ = cnpj;
        const currentUf = uf;
        const currentPhone = phone;
        const currentEmail = email;
        console.log(currentName, currentCNPJ, currentUf, currentPhone, currentEmail);
    }

    return (
        <ModalWrapper>
            <ModalDiv>
                <ModalContent>
                <ModalBar>
                <ModalTitle>{title}</ModalTitle>
                </ModalBar>
                    <LabelComponent>
                        <StyledLabel>Nome *</StyledLabel>
                        <StyledInput type="text" placeholder="Nome" onChange={nameInputChange}/>
                    </LabelComponent>

                    <FlexDiv>
                        <LabelComponent>
                            <StyledLabel>CNPJ *</StyledLabel>
                            <StyledInput type="text" placeholder="CNPJ" onChange={cnpjInputChange}/>
                        </LabelComponent>
                        
                        <LabelComponent>
                            <StyledLabel>Telefone *</StyledLabel>
                            <StyledInput type="text" placeholder="Telefone" onChange={phoneInputChange}/>
                        </LabelComponent>
                    </FlexDiv>

                    <FlexDiv>
                        <LabelComponent>
                            <StyledLabel>UF *</StyledLabel>
                            <StyledSelect onChange={ufInputChange}>
                                <option value="" selected disabled hidden>Escolha um</option>
                                {states.map((state, index) => (
                                    <option key={index} value={state}>{state}</option>
                                ))}
                            </StyledSelect>
                        </LabelComponent>
                        
                        <LabelComponent>
                            <StyledLabel>E-mail *</StyledLabel>
                            <StyledInput type="email" placeholder="E-mail" onChange={emailInputChange}/>
                        </LabelComponent>
                    </FlexDiv>

                    <MapContainer>
                        <Map height={250}/>
                    </MapContainer>

                    <ButtonsDiv>
                        <CancelButton onClick={onClose}>Cancelar</CancelButton>
                        <SaveButton onClick={addClient}>Salvar</SaveButton>
                    </ButtonsDiv>

                </ModalContent>
            </ModalDiv>
        </ModalWrapper>
    )
}

export default Modal;