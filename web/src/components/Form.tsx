import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Map from "./Map";
import { SelectOption, Select } from './Select';
import { DateInput } from './DatePicker';
import InputMask from 'react-input-mask'; 
import { NumericFormat } from 'react-number-format';

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

interface ClientFormProps {
  onSubmit: (data: ClientFormData) => void;
  onClose: () => void;
}

export interface ClientFormData {
    id?: number;
    name: string;
    cnpj: string;
    phone: string;
    uf: string;
    email: string;
    lat: number;
    lng: number;
}

export const AddClientForm: React.FC<ClientFormProps> = ({ onSubmit, onClose }) => {

  const [formData, setFormData] = useState<ClientFormData>({
    name: '',
    cnpj: '',
    phone: '',
    uf: '',
    email: '',
    lat: 0,
    lng: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleMapPositionChange = (lat: number, lng: number ) => {
    setFormData((prevData) => ({ ...prevData, lat, lng }));
  };
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // API to get Brazil UFs
  const [ufsApi, setUfsApi] = useState<SelectOption[]>([]);

  useEffect(() => {
      const fecthStates = async () => {
        try {
          const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
          const data = await response.json();
          const formattedOptions = data.map((state: any) => ({
            value: state.sigla,
            label: state.sigla,
          }));
          setUfsApi(formattedOptions);
        } catch (error) {
          console.error('Erro ao buscar os estados:', error);
        }
      };
  
      fecthStates();
    }, []);

  return (
    <>
    <form onSubmit={handleSubmit}>
      <StyledLabel>
        Nome *
      </StyledLabel>
      <StyledInput type="text" name="name" defaultValue={formData.name} onChange={handleChange} />

      <FlexDiv>
        <LabelContainer>
            <StyledLabel>
                CNPJ *
            </StyledLabel>
            <StyledInputMask type="text" name="cnpj" mask="99.999.999/9999-99" onChange={handleChange} />
        </LabelContainer>

        <LabelContainer>
            <StyledLabel>
                Telefone *
            </StyledLabel>
            <StyledInputMask type="text" name="phone" mask="(99) 99999-9999" onChange={handleChange} />
        </LabelContainer>
      </FlexDiv>  
    
      <FlexDiv>
        <LabelContainer>
            <StyledLabel>
                UF *
            </StyledLabel>
            <Select name="uf" defaultValue={formData.uf} options={ufsApi} onChange={handleChange}/>
        </LabelContainer>
        
        <LabelContainer>
            <StyledLabel>
                Email *
            </StyledLabel>
            <StyledInput type="text" name="email" defaultValue={formData.email} onChange={handleChange} />
        </LabelContainer>
      </FlexDiv>

        <MapContainer>
            <Map height={250} onPositionChange={(lat : number, lng : number) => handleMapPositionChange(lat, lng)} />
        </MapContainer>

      <ButtonsDiv>
        <CancelButton onClick={onClose}>Cancelar</CancelButton>
        <SaveButton type="submit">Salvar</SaveButton>
      </ButtonsDiv>
    </form>
  </>
  );
};

export const EditClientForm: React.FC<ClientFormProps> = ({ onSubmit, onClose }) => {

    const [formData, setFormData] = useState<ClientFormData>({
      id: 0,
      name: '',
      cnpj: '',
      phone: '',
      uf: '',
      email: '',
      lat: 0,
      lng: 0,
    });

    // API to get Brazil UFs
    const [ufsApi, setUfsApi] = useState<SelectOption[]>([]);

    useEffect(() => {
        const fecthStates = async () => {
            try {
            const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
            const data = await response.json();
            const formattedOptions = data.map((state: any) => ({
                value: state.sigla,
                label: state.sigla,
            }));
            setUfsApi(formattedOptions);
            } catch (error) {
            console.error('Erro ao buscar os estados:', error);
            }
        };
    
        fecthStates();
        }, []);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleMapPositionChange = (lat: number, lng: number ) => {
        setFormData((prevData) => ({ ...prevData, lat, lng }));
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
        <StyledInput type="text" name="name" defaultValue={formData.name} onChange={handleChange} />

        <FlexDiv>
            <LabelContainer>
                <StyledLabel>
                    CNPJ *
                </StyledLabel>
                <StyledInputMask type="text" name="cnpj" mask="99.999.999/9999-99" onChange={handleChange} />
            </LabelContainer>

            <LabelContainer>
                <StyledLabel>
                    Telefone *
                </StyledLabel>
                <StyledInputMask type="text" name="phone" mask="(99) 99999-9999" onChange={handleChange} />
            </LabelContainer>
        </FlexDiv>  

        <FlexDiv>
            <LabelContainer>
                <StyledLabel>
                    UF *
                </StyledLabel>
                <Select name="uf" defaultValue={formData.uf} options={ufsApi} onChange={handleChange}/>
            </LabelContainer>

            <LabelContainer>
                <StyledLabel>
                    Email *
                </StyledLabel>
                <StyledInput type="text" name="email" defaultValue={formData.email} onChange={handleChange} />
            </LabelContainer>
        </FlexDiv>

        <MapContainer>
        <Map height={250} onPositionChange={(lat : number, lng : number) => handleMapPositionChange(lat, lng)} />
        </MapContainer>
  
        <StyledInput type="number" name="id" defaultValue={formData.id} hidden></StyledInput>
        <ButtonsDiv>
            <CancelButton onClick={onClose}>Cancelar</CancelButton>
            <SaveButton type="submit">Salvar</SaveButton>
        </ButtonsDiv>
      </form>
    );
  };

export const DeleteClientForm: React.FC<ClientFormProps> = ({ onSubmit, onClose }) => {

    const [formData, setFormData] = useState<ClientFormData>({
        id: 0,
        name: '',
        cnpj: '',
        phone: '',
        uf: '',
        email: '',
        lat: 0,
        lng: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>

        <LabelContainer>
            <StyledLabel>Deseja excluir este cliente? Esta ação é irreversível e todas as vendas vinculadas ao cliente serão excluídas.</StyledLabel>
        </LabelContainer>

        <StyledInput type="number" name="id" defaultValue={formData.id} hidden></StyledInput>
        <ButtonsDiv>
            <CancelButton onClick={onClose}>Cancelar</CancelButton>
            <SaveButton type="submit">Salvar</SaveButton>
        </ButtonsDiv>
        </form>
    );
};

interface SaleFormProps {
    onSubmit: (data: SaleFormData) => void;
    onClose: () => void;
  }
  
export interface SaleFormData {
    id: number;
    client: string;
    date: Date;
    status: string;
    value: number | string;
}
  
export const AddSaleForm: React.FC<SaleFormProps> = ({ onSubmit, onClose }) => {

    const [formData, setFormData] = useState<SaleFormData>({
        id: 0,
        client: '',
        date: new Date(),
        status: '',
        value: '',
    });

    const clientsOptions = [{
        value: "Cliente X",
        label: "Madeireira Arm",
    },
    {
        value: "Cliente Y",
        label: "Trusce Company",
    }
    ];

    const statusOptions = [{
        value: "Aguardando pagamento",
        label: "Aguardando pagamento",
    },
    {
        value: "Pagamento aprovado",
        label: "Pagamento aprovado",
    },
    {
        value: "Aguardando envio",
        label: "Aguardando envio",
    },
    {
        value: "À caminho",
        label: "À caminho",
    },
    {
        value: "Finalizado",
        label: "Finalizado",
    },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | Date ) => {
        if (e instanceof Date) {
            setFormData((prevData) => ({ ...prevData, date: e }));
          } else {
            const { name, value } = e.target;
            setFormData((prevData) => ({ ...prevData, [name]: value }));
          }
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
        <Select name="client" defaultValue={formData.client} options={clientsOptions} onChange={handleChange}/>

        <FlexDiv>
            <LabelContainer>
                <StyledLabel>
                    Data da venda *
                </StyledLabel>
                <DateInput selectedDate={formData.date} onChange={handleChange}/>
            </LabelContainer>

            <LabelContainer>
                <StyledLabel>
                    Situação *
                </StyledLabel>
                <Select name="status" defaultValue={formData.status} options={statusOptions} onChange={handleChange}/>
            </LabelContainer>
        </FlexDiv>

        <StyledLabel>
            Valor da venda *
        </StyledLabel>
        <StyledMoneyMask 
            thousandSeparator={true} allowNegative={false} prefix="R$ " decimalScale={2} fixedDecimalScale={true}
            name="value" onValueChange={(values: { floatValue: any; }) => {
                const { floatValue } = values;
        }}/>

        <ButtonsDiv>
            <CancelButton onClick={onClose}>Cancelar</CancelButton>
            <SaveButton type="submit">Salvar</SaveButton>
        </ButtonsDiv>
        </form>
    );
};

export const EditSaleForm: React.FC<SaleFormProps> = ({ onSubmit, onClose }) => {

    const [formData, setFormData] = useState<SaleFormData>({
        id: 0,
        client: '',
        date: new Date(),
        status: '',
        value: '',
    });

    const clientsOptions = [{
        value: "Cliente X",
        label: "Madeireira Arm",
    },
    {
        value: "Cliente Y",
        label: "Trusce Company",
    }
    ];
    
    const statusOptions = [{
        value: "Aguardando pagamento",
        label: "Aguardando pagamento",
    },
    {
        value: "Pagamento aprovado",
        label: "Pagamento aprovado",
    },
    {
        value: "Aguardando envio",
        label: "Aguardando envio",
    },
    {
        value: "À caminho",
        label: "À caminho",
    },
    {
        value: "Finalizado",
        label: "Finalizado",
    },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | Date ) => {
        if (e instanceof Date) {
            setFormData((prevData) => ({ ...prevData, date: e }));
          } else {
            const { name, value } = e.target;
            setFormData((prevData) => ({ ...prevData, [name]: value }));
          }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <LabelContainer>
                {/* Example */}
                <StyledSubtitle>Venda #15 - Comércio de Livros LTDA - 16/10/2022</StyledSubtitle>
            </LabelContainer>

            <StyledLabel>
                Cliente * 
            </StyledLabel>
            <Select name="client" defaultValue={formData.client} options={clientsOptions} onChange={handleChange}/>

            <FlexDiv>
                <LabelContainer>
                    <StyledLabel>
                        Data da venda *
                    </StyledLabel>
                    <DateInput selectedDate={formData.date} onChange={handleChange}/>
                </LabelContainer>

                <LabelContainer>
                    <StyledLabel>
                        Situação *
                    </StyledLabel>
                    <Select name="status" defaultValue={formData.status} options={statusOptions} onChange={handleChange}/>
                </LabelContainer>
            </FlexDiv>

            <StyledLabel>
                Valor da venda *
            </StyledLabel>
            <StyledMoneyMask 
                thousandSeparator={true} allowNegative={false} prefix="R$ " decimalScale={2} fixedDecimalScale={true}
                name="value" onValueChange={(values: { floatValue: any; }) => {
                    const { floatValue } = values;
            }}/>

            <StyledInput type="number" name="id" defaultValue={formData.id} hidden />
            <ButtonsDiv>
                <CancelButton onClick={onClose}>Cancelar</CancelButton>
                <SaveButton type="submit">Salvar</SaveButton>
            </ButtonsDiv>
        </form>
    );
};

export const DeleteSaleForm: React.FC<ClientFormProps> = ({ onSubmit, onClose }) => {

    const [formData, setFormData] = useState<ClientFormData>({
        id: 0,
        name: '',
        cnpj: '',
        phone: '',
        uf: '',
        email: '',
        lat: 0,
        lng: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>

        <LabelContainer>
            <StyledLabel>Deseja excluir esta venda? Esta ação é irreversível e não poderá ser desfeita.</StyledLabel>
        </LabelContainer>

        <StyledInput type="number" name="id" defaultValue={formData.id} hidden></StyledInput>
        <ButtonsDiv>
            <CancelButton onClick={onClose}>Cancelar</CancelButton>
            <SaveButton type="submit">Salvar</SaveButton>
        </ButtonsDiv>
        </form>
    );
};
