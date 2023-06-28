import styled from "styled-components";
import Map from "./Map";
import { SetStateAction, useEffect, useState } from "react";

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
    color: #707070;
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

interface UFsProps {
    id: number,
    sigla: string,
    nome: string,
    regiao : {
        id: number,
        sigla: string,
        nome: string,
    }
}

const Modal: React.FC<ModalProps> = ({ type, isOpen, onClose }) => {

    // API to get Brazil UFs
    const [ufsApi, setUfsApi] = useState<UFsProps[]>([]);

    useEffect(() => {
        const fecthStates = async () => {
          try {
            const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
            const data = await response.json();
            setUfsApi(data);
          } catch (error) {
            console.error('Erro ao buscar os estados:', error);
          }
        };
    
        fecthStates();
      }, []);

    // Inputs
    const [id, setId] = useState(null);
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

    let title = "";
    switch (type) {
        case "addClient":
            title = "Cadastrar Cliente";
            break;
        case "editClient":
            title = "Editar Cliente";
            break;
        case "removeClient":
            title = "Excluir Cliente";
            break;
        case "addSale":
            title = "Cadastrar Venda";
            break;
        case "editSale":
            title = "Editar Venda";
            break;
        case "removeSale":
            title = "Excluir Venda";
            break;
        default:
            title = "Modal";
    }

    const addClient = () => {
        // Rotina de Adição.
        const currentName = name;
        const currentCNPJ = cnpj;
        const currentUf = uf;
        const currentPhone = phone;
        const currentEmail = email;
        console.log(currentName, currentCNPJ, currentUf, currentPhone, currentEmail);
    }

    const editClient = () => {
        // Rotina de Edição.
        const currentId = id;
        const currentName = name;
        const currentCNPJ = cnpj;
        const currentUf = uf;
        const currentPhone = phone;
        const currentEmail = email;
        console.log(currentId, currentName, currentCNPJ, currentUf, currentPhone, currentEmail);
    }

    const removeClient = () => {
        // Rotina de exclusão.
        const currentId = id;
        console.log(currentId);
    }

    if (!isOpen) return null;

    return (
        <ModalWrapper>
            <ModalDiv>
                <ModalContent>
                <ModalBar>
                <ModalTitle>{title}</ModalTitle>
                </ModalBar>


                    {/* Add/Edit Client Modal */}
                    {type === 'addClient' || type === 'editClient' ? (
                        <>
                        <LabelComponent>
                            {type === 'editClient' && (
                                <StyledInput type="number" name="id" id="id" hidden/>
                            )}

                            <StyledLabel>Nome *</StyledLabel>
                            <StyledInput type="text" placeholder="Nome" name="name" id="name" onChange={nameInputChange} />
                        </LabelComponent>

                        <FlexDiv>
                            <LabelComponent>
                                <StyledLabel>CNPJ *</StyledLabel>
                                <StyledInput type="text" placeholder="CNPJ" name="cnpj" id="cnpj" onChange={cnpjInputChange} />
                            </LabelComponent>

                            <LabelComponent>
                                <StyledLabel>Telefone *</StyledLabel>
                                <StyledInput type="text" placeholder="Telefone" name="phone" id="phone" onChange={phoneInputChange} />
                            </LabelComponent>
                        </FlexDiv>
                            
                            <FlexDiv>
                                <LabelComponent>
                                    <StyledLabel>UF *</StyledLabel>
                                    <StyledSelect onChange={ufInputChange}>
                                        <option value="" selected disabled hidden></option>
                                        {ufsApi.map((uf) => (
                                            <option key={uf.id} value={uf.sigla}>{uf.sigla}</option>
                                        ))}
                                    </StyledSelect>
                                </LabelComponent>

                                <LabelComponent>
                                    <StyledLabel>E-mail *</StyledLabel>
                                    <StyledInput type="email" placeholder="E-mail" name="email" id="email" onChange={emailInputChange} />
                                </LabelComponent>
                            </FlexDiv>

                            <MapContainer>
                                <Map height={250} />
                            </MapContainer>

                            <ButtonsDiv>
                                <CancelButton onClick={onClose}>Cancelar</CancelButton>
                                <SaveButton onClick={addClient}>Salvar</SaveButton>
                            </ButtonsDiv>
                        </>
                    ) : (
                        <>

                        <StyledInput type="number" name="id" id="id" hidden/>

                        <LabelComponent>
                            <StyledLabel>Deseja excluir este cliente? Esta ação é irreversível e todas as vendas vinculadas ao cliente serão excluídas.</StyledLabel>
                        </LabelComponent>

                        <ButtonsDiv>
                            <CancelButton onClick={onClose}>Cancelar</CancelButton>
                            <SaveButton onClick={removeClient}>Excluir</SaveButton>
                        </ButtonsDiv>
                        </>
                    )}
                    {/* End of Client Modal */}


                </ModalContent>
            </ModalDiv>
        </ModalWrapper>
    )
}

export default Modal;