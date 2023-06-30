import styled, { keyframes } from "styled-components";
import Map from "./Map";
import { SetStateAction, useEffect, useState } from "react";
import InputMask from 'react-input-mask'; 
import { NumericFormat } from 'react-number-format';

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

    @media only screen and (max-width: 425px) {
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

    @media only screen and (max-width: 425px) {
        width: 100px;
    }
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

    @media only screen and (max-width: 425px) {
        width: 100px;
    }
`

const StyledLabel = styled.p`
    margin-top: 15px;
    margin-bottom: 5px;
    text-align: left;
    font-size: 16px;
    letter-spacing: 0px;
    color: #707070;
    opacity: 1;

    @media only screen and (max-width: 490px) {
        margin-top: 5px;
    }
`

const StyledInput = styled.input`
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #CCCCCC;
    border-radius: 3px;
    color: #686868;
    font-size: 16px;
`

const StyledInputMask = styled(InputMask)`
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #CCCCCC;
    border-radius: 3px;
    color: #686868;
    font-size: 16px;
`

const StyledMoneyMask = styled(NumericFormat)`
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #CCCCCC;
    border-radius: 3px;
    color: #686868;
    font-size: 16px;
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
        gap: 0px;
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

const StyledSubtitle = styled.p`
    text-align: left;
    font-size: 22px;
    letter-spacing: 0px;
    color: #707070;
    opacity: 1;
    margin-top: 20px;
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

    
    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [cnpj, setCNPJ] = useState('');
    const [phone, setPhone] = useState('');
    const [uf, setUf] = useState('');
    const [email, setEmail] = useState('');

    const [client, setClient] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');
    const [value, setValue] = useState<number>(0.00);

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

    const clientInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setClient(event.target.value);
    }

    const dateInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setDate(event.target.value);
    }

    const statusInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setStatus(event.target.value);
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

    const addSale = () => {
        // Rotina de Adição.
        const currentClient = client;
        const currentDate = date;
        const currentStatus = status;
        const currentValue = value;
        console.log(currentClient, currentDate, currentStatus, currentValue);
    }

    const editSale = () => {
        // Rotina de Edição.
        const currentId = id;
        const currentClient = client;
        const currentDate = date;
        const currentStatus = status;
        const currentValue = value;
        console.log(currentId, currentClient, currentDate, currentStatus, currentValue);
    }

    const removeSale = () => {
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


                    {/* Add/Edit/Remove Client Modal */}
                    {type === 'addClient' || type === 'editClient' ? (
                        <>
                        {type === 'editClient' && (
                                <StyledInput type="number" name="id" id="id" hidden/>
                        )}

                        <LabelComponent>
                            <StyledLabel>Nome *</StyledLabel>
                            <StyledInput type="text" placeholder="Nome" name="name" id="name" onChange={nameInputChange} />
                        </LabelComponent>

                        <FlexDiv>
                            <LabelComponent>
                                <StyledLabel>CNPJ *</StyledLabel>
                                <StyledInputMask type="text" placeholder="CNPJ" name="cnpj" id="cnpj" mask="99.999.999/9999-99" onChange={cnpjInputChange} />
                            </LabelComponent>

                            <LabelComponent>
                                <StyledLabel>Telefone *</StyledLabel>
                                <StyledInputMask type="text" placeholder="Telefone" name="phone" id="phone" mask="(99) 99999-9999" onChange={phoneInputChange} />
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
                                {type === 'addClient' && (<SaveButton onClick={addClient}>Salvar</SaveButton>)}
                                {type === 'editClient' && (<SaveButton onClick={editClient}>Salvar</SaveButton>)}
                            </ButtonsDiv>
                        </>
                    ) : null}

                    {type === 'removeClient' && (
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

                    {/* Add/Edit/Remove Sale Modal */}
                    {type === 'addSale' || type === 'editSale' ? (
                        <>
                            {type === 'editSale' && (
                                <>
                                <StyledInput type="number" name="id" id="id" hidden/>
                                <LabelComponent>
                                    <StyledSubtitle>Venda #15 - Comércio de Livros LTDA - 16/10/2022</StyledSubtitle>
                                </LabelComponent>
                                </>
                            )}
                        
                            <LabelComponent>
                                <StyledLabel>Cliente *</StyledLabel>
                                <StyledSelect name="client" id="client" onChange={clientInputChange}>
                                    <option value="" selected disabled hidden></option>
                                    <option key={1} value={1}>Comércio de Livros LTDA</option>
                                    <option key={2} value={2}>Loja 1</option>
                                    <option key={3} value={3}>Loja 2</option>
                                    <option key={4} value={4}>Loja 3</option>
                                </StyledSelect>
                            </LabelComponent>

                            <FlexDiv>
                                <LabelComponent>
                                    <StyledLabel>Data da venda *</StyledLabel>
                                    <StyledInput placeholder='22/06/2023' name="date" id="date" onChange={dateInputChange}/>
                                </LabelComponent>

                                <LabelComponent>
                                    <StyledLabel>Situação</StyledLabel>
                                    <StyledSelect name="status" id="status" onChange={statusInputChange}>
                                        <option value="" selected disabled hidden></option>
                                        <option key={1} value={1}>Aguardando pagamento</option>
                                        <option key={2} value={2}>Pagamento aprovado</option>
                                        <option key={3} value={3}>Aguardando envio</option>
                                        <option key={4} value={4}>À caminho</option>
                                        <option key={5} value={5}>Finalizado</option>
                                </StyledSelect>
                                </LabelComponent>
                            </FlexDiv>

                            <LabelComponent>
                                <StyledLabel>Valor da Venda</StyledLabel>
                                <StyledMoneyMask 
                                thousandSeparator={true} allowNegative={false} prefix="R$ " decimalScale={2} fixedDecimalScale={true}
                                name="value" id="value" onValueChange={(values: { floatValue: any; }) => {
                                    const { floatValue } = values;
                                    setValue(floatValue);
                                  }}/>
                            </LabelComponent>

                            <ButtonsDiv>
                                <CancelButton onClick={onClose}>Cancelar</CancelButton>
                                {type === 'addSale' && (<SaveButton onClick={addSale}>Salvar</SaveButton>)}
                                {type === 'editSale' && (<SaveButton onClick={editSale}>Salvar</SaveButton>)}
                            </ButtonsDiv>
                            
                        </>
                    ) : null}

                    {type === 'removeSale' && (
                        <>
                        <StyledInput type="number" name="id" id="id" hidden/>

                        <LabelComponent>
                            <StyledLabel>Deseja excluir esta venda? Esta ação é irreversível e não poderá ser desfeita.</StyledLabel>
                        </LabelComponent>

                        <ButtonsDiv>
                            <CancelButton onClick={onClose}>Cancelar</CancelButton>
                            <SaveButton onClick={removeSale}>Excluir</SaveButton>
                        </ButtonsDiv>
                        </>
                    )}
                    {/* End of Sale Modal */}

                </ModalContent>
            </ModalDiv>
        </ModalWrapper>
    )
}

export default Modal;