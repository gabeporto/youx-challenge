import React, { useState } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #CCCCCC;
    border-radius: 3px;
    color: #686868;
    font-size: 16px;
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

const ButtonsDiv = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
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

const LabelContainer = styled.div`
    width: 100%;
`

interface ClientFormProps {
  onSubmit: (data: ClientFormData) => void;
}

interface ClientFormData {
  id?: number;
  name: string;
  cnpj: string;
  phone: string;
  uf: string;
  email: string;
}

export const AddClientForm: React.FC<ClientFormProps> = ({ onSubmit }) => {

  const [formData, setFormData] = useState<ClientFormData>({
    name: '',
    cnpj: '',
    phone: '',
    uf: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <StyledLabel>
        Nome *
      </StyledLabel>
      <StyledInput type="text" name="name" value={formData.name} onChange={handleChange} />

      <FlexDiv>
        <LabelContainer>
            <StyledLabel>
                CNPJ *
            </StyledLabel>
            <StyledInput type="text" name="cnpj" value={formData.cnpj} onChange={handleChange} />
        </LabelContainer>

        <LabelContainer>
            <StyledLabel>
                Telefone *
            </StyledLabel>
            <StyledInput type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </LabelContainer>
      </FlexDiv>  

      <FlexDiv>
        <LabelContainer>
            <StyledLabel>
                UF *
            </StyledLabel>
            <StyledInput type="text" name="uf" value={formData.uf} onChange={handleChange} />
        </LabelContainer>

        <LabelContainer>
            <StyledLabel>
                Email *
            </StyledLabel>
            <StyledInput type="text" name="email" value={formData.email} onChange={handleChange} />
        </LabelContainer>
      </FlexDiv>

      <ButtonsDiv>
        <CancelButton>Cancelar</CancelButton>
        <SaveButton type="submit">Salvar</SaveButton>
      </ButtonsDiv>
    </form>
  );
};

export const EditClientForm: React.FC<ClientFormProps> = ({ onSubmit }) => {

    const [formData, setFormData] = useState<ClientFormData>({
      id: 0,
      name: '',
      cnpj: '',
      phone: '',
      uf: '',
      email: '',
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit(formData);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <StyledLabel>
            Nome *
        </StyledLabel>
        <StyledInput type="text" name="name" value={formData.name} onChange={handleChange} />

        <FlexDiv>
            <LabelContainer>
                <StyledLabel>
                    CNPJ *
                </StyledLabel>
                <StyledInput type="text" name="cnpj" value={formData.cnpj} onChange={handleChange} />
            </LabelContainer>

            <LabelContainer>
                <StyledLabel>
                    Telefone *
                </StyledLabel>
                <StyledInput type="text" name="phone" value={formData.phone} onChange={handleChange} />
            </LabelContainer>
        </FlexDiv>  

        <FlexDiv>
            <LabelContainer>
                <StyledLabel>
                    UF *
                </StyledLabel>
                <StyledInput type="text" name="uf" value={formData.uf} onChange={handleChange} />
            </LabelContainer>

            <LabelContainer>
                <StyledLabel>
                    Email *
                </StyledLabel>
                <StyledInput type="text" name="email" value={formData.email} onChange={handleChange} />
            </LabelContainer>
        </FlexDiv>
  
        <StyledInput type="number" name="id" value={formData.id} hidden></StyledInput>
        <ButtonsDiv>
            <CancelButton>Cancelar</CancelButton>
            <SaveButton type="submit">Salvar</SaveButton>
        </ButtonsDiv>
      </form>
    );
  };


interface SaleFormProps {
    onSubmit: (data: SaleFormData) => void;
  }
  
interface SaleFormData {
    id?: number;
    client: string;
    date: string;
    status: string;
    value: number | string;
}
  
export const AddSaleForm: React.FC<SaleFormProps> = ({ onSubmit }) => {

    const [formData, setFormData] = useState<SaleFormData>({
        client: '',
        date: '',
        status: '',
        value: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
        <StyledLabel>
            Cliente *
        </StyledLabel>
        <StyledInput type="text" name="client" value={formData.client} onChange={handleChange} />

        <FlexDiv>
            <LabelContainer>
                <StyledLabel>
                    Data *
                </StyledLabel>
                <StyledInput type="text" name="date" value={formData.date} onChange={handleChange} />
            </LabelContainer>

            <LabelContainer>
                <StyledLabel>
                    Situação *
                </StyledLabel>
                <StyledInput type="text" name="status" value={formData.status} onChange={handleChange} />
            </LabelContainer>
        </FlexDiv>

        <StyledLabel>
            Valor *
            <StyledInput type="number" name="value" value={formData.value} onChange={handleChange} />
        </StyledLabel>

        <ButtonsDiv>
            <CancelButton>Cancelar</CancelButton>
            <SaveButton type="submit">Salvar</SaveButton>
        </ButtonsDiv>
        </form>
    );
};

export const EditSaleForm: React.FC<SaleFormProps> = ({ onSubmit }) => {

    const [formData, setFormData] = useState<SaleFormData>({
        id: 0,
        client: '',
        date: '',
        status: '',
        value: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
        <StyledLabel>
            Cliente *
            <StyledInput type="text" name="client" value={formData.client} onChange={handleChange} />
        </StyledLabel>

        <FlexDiv>
            <LabelContainer>
                <StyledLabel>
                    Data *
                </StyledLabel>
                <StyledInput type="text" name="date" value={formData.date} onChange={handleChange} />
            </LabelContainer>

            <LabelContainer>
                <StyledLabel>
                    Situação *
                </StyledLabel>
                <StyledInput type="text" name="status" value={formData.status} onChange={handleChange} />
            </LabelContainer>
        </FlexDiv>

        <StyledLabel>
            Valor *
            <StyledInput type="number" name="value" value={formData.value} onChange={handleChange} />
        </StyledLabel>

        <StyledInput type="number" name="id" value={formData.id} hidden />
        <ButtonsDiv>
            <CancelButton>Cancelar</CancelButton>
            <SaveButton type="submit">Salvar</SaveButton>
        </ButtonsDiv>
        </form>
    );
};

