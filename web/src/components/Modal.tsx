import styled from "styled-components";
import Map from "./Map";

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
    width: 100px;
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
    width: 100px;
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
    width: 100%;
    height: 100%;
`

interface ModalProps {
    type: string;
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ type, isOpen, onClose }) => {

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

    return (
        <ModalWrapper>
            <ModalDiv>
                <ModalContent>
                <ModalBar>
                <ModalTitle>{title}</ModalTitle>
                </ModalBar>
                    <LabelComponent>
                        <StyledLabel>Nome *</StyledLabel>
                        <StyledInput type="text" placeholder="Nome" />
                    </LabelComponent>

                    <FlexDiv>
                        <LabelComponent>
                            <StyledLabel>CNPJ *</StyledLabel>
                            <StyledInput type="text" placeholder="CNPJ" />
                        </LabelComponent>
                        
                        <LabelComponent>
                            <StyledLabel>Telefone *</StyledLabel>
                            <StyledInput type="text" placeholder="Telefone" />
                        </LabelComponent>
                    </FlexDiv>

                    <FlexDiv>
                        <LabelComponent>
                            <StyledLabel>UF *</StyledLabel>
                            <StyledInput>
                                {/* Opções para o select de UF */}
                            </StyledInput>
                        </LabelComponent>
                        
                        <LabelComponent>
                            <StyledLabel>E-mail *</StyledLabel>
                            <StyledInput type="email" placeholder="E-mail" />
                        </LabelComponent>
                    </FlexDiv>

                    <MapContainer>
                        <Map />
                    </MapContainer>

                    <ButtonsDiv>
                        <CancelButton onClick={onClose}>Cancelar</CancelButton>
                        <SaveButton>Salvar</SaveButton>
                    </ButtonsDiv>

                </ModalContent>
            </ModalDiv>
        </ModalWrapper>
    )
}

export default Modal;