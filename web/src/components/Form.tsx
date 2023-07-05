/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import "../styles/styles.css"
import Map from "./Map";
import { SelectOption, Select } from './Select';
import { DateInput } from './DatePicker';
import InputMask from 'react-input-mask'; 
import { NumericFormat } from 'react-number-format';
import { ClientData } from "../interface/ClientData";
import { ClientFormData } from '../interface/ClientFormData';
import { SaleFormData } from '../interface/SaleFormData';
import { SaleData } from '../interface/SaleData';
import formatMoneyValue from '../utils/formatMoneyValue';

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
  data?: ClientData;
}


export const AddClientForm: React.FC<ClientFormProps> = ({ onSubmit, onClose }) => {

  const [formData, setFormData] = useState<ClientFormData>({
    name: '',
    cnpj: '',
    phone: '',
    uf: '',
    email: '',
    latitude: 0,
    longitude: 0,
    isNameValid: false,
    isCnpjValid: false,
    isPhoneValid: false,
    isUfValid: false,
    isEmailValid: false,
    isMarkValid: false,
    personId: 1
  });

  const [touchedFields, setTouchedFields] = useState({
        name: false,
        cnpj: false,
        phone: false,
        uf: false,
        email: false,
  });

  const handleFieldBlur = (fieldName: string) => {
    setTouchedFields((prevFields) => ({ ...prevFields, [fieldName]: true }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    const isNameValid = formData.name.length > 3;
    const isCnpjValid = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/.test(formData.cnpj);
    const isPhoneValid = formData.phone.replace(/[^0-9]/g, '').length === 11;
    const isUfValid = formData.uf !== '';

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && formData.email.length >= 5;

    setFormData((prevData) => ({
        ...prevData,
        isNameValid,
        isCnpjValid,
        isUfValid,
        isPhoneValid,
        isEmailValid,
      }));
  };

  const handleMapPositionChange = (latitude: number, longitude: number ) => {
    const isMarkValid = true;
    setFormData((prevData) => ({ ...prevData, latitude, longitude, isMarkValid}));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isNameValid = formData.name.length > 3;
    const isCnpjValid = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/.test(formData.cnpj);
    const isPhoneValid = formData.phone.replace(/[^0-9]/g, '').length === 11;
    const isUfValid = formData.uf !== '0';
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && formData.email.length >= 5;
    const isMarkValid = formData.latitude != 0 && formData.longitude != 0;

    setFormData((prevData) => ({
        ...prevData,
        isNameValid,
        isCnpjValid,
        isPhoneValid,
        isUfValid,
        isEmailValid,
      }));

      if (isNameValid && isCnpjValid && isPhoneValid && isUfValid && isEmailValid && isMarkValid) {
        onSubmit(formData);
      }

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
      <StyledLabel className={touchedFields.name && !formData.isNameValid ? 'invalid-label' : ''}>
        Nome *
      </StyledLabel>
      <StyledInput type="text" name="name" defaultValue={formData.name} onChange={handleChange} onBlur={() => handleFieldBlur('name')} 
      className={touchedFields.name && !formData.isNameValid ? 'invalid-input' : ''}/>

      <FlexDiv>
        <LabelContainer>
            <StyledLabel className={touchedFields.cnpj && !formData.isCnpjValid ? 'invalid-label' : ''}>
                CNPJ *
            </StyledLabel>
            <StyledInputMask type="text" name="cnpj" mask="99.999.999/9999-99" onChange={handleChange} onBlur={() => handleFieldBlur('cnpj')} 
            className={touchedFields.cnpj && !formData.isCnpjValid ? 'invalid-input' : ''}/>
        </LabelContainer>

        <LabelContainer>
            <StyledLabel className={touchedFields.phone && !formData.isPhoneValid ? 'invalid-label' : ''}>
                Telefone *
            </StyledLabel>
            <StyledInputMask type="text" name="phone" mask="(99) 99999-9999" onChange={handleChange} onBlur={() => handleFieldBlur('phone')} 
            className={touchedFields.phone && !formData.isPhoneValid ? 'invalid-input' : ''}/>
        </LabelContainer>
      </FlexDiv>  
    
      <FlexDiv>
        <LabelContainer>
            <StyledLabel className={touchedFields.uf && !formData.isUfValid ? 'invalid-label' : ''}>
                UF *
            </StyledLabel>
            <Select name="uf" defaultValue={formData.uf} options={[{ value: 0, label: 'Selecione' }, ...ufsApi]} onChange={handleChange} />
        </LabelContainer>
        
        <LabelContainer>
            <StyledLabel className={touchedFields.email && !formData.isEmailValid ? 'invalid-label' : ''}>
                Email *
            </StyledLabel>
            <StyledInput type="text" name="email" defaultValue={formData.email} onChange={handleChange} onBlur={() => handleFieldBlur('email')} 
            className={touchedFields.email && !formData.isEmailValid ? 'invalid-input' : ''}/>
        </LabelContainer>
      </FlexDiv>

        <MapContainer>
            <Map height={250} onPositionChange={(latitude : number, longitude : number) => handleMapPositionChange(latitude, longitude)} />
        </MapContainer>

      <ButtonsDiv>
        <CancelButton onClick={onClose}>Cancelar</CancelButton>
        <SaveButton type="submit">Salvar</SaveButton>
      </ButtonsDiv>
    </form>
  </>
  );
};

export const EditClientForm: React.FC<ClientFormProps> = ({ data, onSubmit, onClose }) => {

    const [formData, setFormData] = useState<ClientFormData>({
        id: data!.id,
        name: data!.name,
        cnpj: data!.cnpj,
        phone: data!.phone,
        uf: data!.uf,
        email: data!.email,
        latitude: data!.latitude,
        longitude: data!.longitude,
        isNameValid: true,
        isCnpjValid: true,
        isPhoneValid: true,
        isUfValid: true,
        isEmailValid: true,
        isMarkValid: true,
        personId: 1
    });

    const [touchedFields, setTouchedFields] = useState({
        name: false,
        cnpj: false,
        phone: false,
        email: false,
    });

    const handleFieldBlur = (fieldName: string) => {
        setTouchedFields((prevFields) => ({ ...prevFields, [fieldName]: true }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

        const isNameValid = formData.name.length > 3;
        const isCnpjValid = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/.test(formData.cnpj);
        const isPhoneValid = formData.phone.replace(/[^0-9]/g, '').length === 11;
        const isUfValid = formData.uf != "";
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && formData.email.length >= 5;

        setFormData((prevData) => ({
            ...prevData,
            isNameValid,
            isCnpjValid,
            isUfValid,
            isPhoneValid,
            isEmailValid,
        }));
    };

    const handleMapPositionChange = (latitude: number, longitude: number ) => {
        const isMarkValid = true;
        setFormData((prevData) => ({ ...prevData, latitude, longitude, isMarkValid}));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isNameValid = formData.name.length > 3;
            const isCnpjValid = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/.test(formData.cnpj);
            const isPhoneValid = formData.phone.replace(/[^0-9]/g, '').length === 11;
            const isUfValid = formData.uf != "";
            const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && formData.email.length >= 5;
            const isMarkValid = formData.latitude != 0 && formData.longitude != 0;

        setFormData((prevData) => ({
            ...prevData,
            isNameValid,
            isCnpjValid,
            isPhoneValid,
            isUfValid,
            isEmailValid,
            }));

        if (isNameValid && isCnpjValid && isPhoneValid && isUfValid && isEmailValid && isMarkValid) {
            onSubmit(formData);
            onClose();
        }

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
      <form onSubmit={handleSubmit}>
        <StyledLabel className={touchedFields.name && !formData.isNameValid ? 'invalid-label' : ''}>
            Nome *
        </StyledLabel>
        <StyledInput type="text" name="name" defaultValue={data?.name} onChange={handleChange} onBlur={() => handleFieldBlur('name')} 
        className={touchedFields.name && !formData.isNameValid ? 'invalid-input' : ''}/>

        <FlexDiv>
            <LabelContainer>
                <StyledLabel className={touchedFields.cnpj && !formData.isCnpjValid ? 'invalid-label' : ''}>
                    CNPJ *
                </StyledLabel>
                <StyledInputMask type="text" name="cnpj" mask="99.999.999/9999-99" defaultValue={data?.cnpj} onChange={handleChange} onBlur={() => handleFieldBlur('cnpj')} 
                className={touchedFields.cnpj && !formData.isCnpjValid ? 'invalid-input' : ''}/>
            </LabelContainer>

            <LabelContainer>
                <StyledLabel className={touchedFields.phone && !formData.isPhoneValid ? 'invalid-label' : ''}>
                    Telefone *
                </StyledLabel>
                <StyledInputMask type="text" name="phone" mask="(99) 99999-9999" defaultValue={data?.phone} onChange={handleChange} onBlur={() => handleFieldBlur('phone')} 
                className={touchedFields.phone && !formData.isPhoneValid ? 'invalid-input' : ''}/>
            </LabelContainer>
        </FlexDiv>  
        
        <FlexDiv>
            <LabelContainer>
                <StyledLabel>
                    UF *
                </StyledLabel>
                <Select name="uf" defaultValue={data!.uf || ''} options={[{ value: 0, label: 'Selecione' }, ...ufsApi]} onChange={handleChange}/>
            </LabelContainer>
            
            <LabelContainer>
                <StyledLabel className={touchedFields.email && !formData.isEmailValid ? 'invalid-label' : ''}>
                    Email *
                </StyledLabel>
                <StyledInput type="text" name="email" defaultValue={data?.email} onChange={handleChange} onBlur={() => handleFieldBlur('email')} 
                className={touchedFields.email && !formData.isEmailValid ? 'invalid-input' : ''}/>
            </LabelContainer>
        </FlexDiv>

        <MapContainer>
            <Map height={250} currentPosition={{latitude: data?.latitude ? data.latitude : 0, longitude: data?.longitude ? data.longitude : 0}} 
            onPositionChange={(latitude : number, longitude : number) => handleMapPositionChange(latitude, longitude)} />
        </MapContainer>
  
        <StyledInput type="number" name="id" defaultValue={data?.id} hidden></StyledInput>
        <ButtonsDiv>
            <CancelButton onClick={onClose}>Cancelar</CancelButton>
            <SaveButton type="submit">Salvar</SaveButton>
        </ButtonsDiv>
      </form>
    );
  };

export const DeleteClientForm: React.FC<ClientFormProps> = ({data, onSubmit, onClose }) => {

    const [formData, setFormData] = useState<ClientFormData>({
        id: data?.id,
        name: '',
        cnpj: '',
        phone: '',
        uf: '',
        email: '',
        latitude: 0,
        longitude: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>

        <LabelContainer>
            <StyledLabel>Deseja excluir este cliente? Esta ação é irreversível e todas as vendas vinculadas ao cliente serão excluídas.</StyledLabel>
        </LabelContainer>

        <StyledInput type="number" name="id" defaultValue={data?.id} hidden></StyledInput>
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
    data?: SaleData;
  }
    
export const AddSaleForm: React.FC<SaleFormProps> = ({ onSubmit, onClose }) => {

    const [formData, setFormData] = useState<SaleFormData>({
        clientId: 0,
        date: new Date(),
        status: '',
        value: '',
        isClientValid: false,
        isStatusValid: false,
        isValueValid: false,
    });
    
    const [touchedFields, setTouchedFields] = useState({
        client: false,
        status: false,
        value: false,
    });

    const handleFieldBlur = (fieldName: string) => {
        setTouchedFields((prevFields) => ({ ...prevFields, [fieldName]: true }));
    };

    // Fetch to get clients
    const [clients, setClients] = useState<{value: number, label: string}[]>([]);

    useEffect(() => {
      const fetchClients = async () => {
        try {
          const response = await fetch('http://localhost:8080/client');
          const data = await response.json();
          const formattedOptions = data.map((client: any) => ({
            value: client.id,
            label: client.name,
          }));
          setClients(formattedOptions);
        } catch (error) {
          console.error('Erro ao buscar os clientes:', error);
        }
      };
  
      fetchClients();
    }, []);

    const statusOptions = [
    {
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
        if (e !== null && e instanceof Date) {
            setFormData((prevData) => ({ ...prevData, date: e }));
          } else if (e && e.target) {
            const { name, value } = e.target;
            setFormData((prevData) => ({ ...prevData, [name]: value }));
          }

        const isClientValid = formData.client != "";
        const isStatusValid = formData.status != "";

        setFormData((prevData) => ({
            ...prevData,
            isClientValid,
            isStatusValid,
        }));
    };

    const handleChangeValue = (value : number) => {
        setFormData((prevData) => ({ ...prevData, value}));

        const isValueValid = typeof formData.value === 'number';

        setFormData((prevData) => ({
            ...prevData,
            isValueValid,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const isClientValid = formData.client != "";
        const isStatusValid = formData.status != "";
        const isValueValid = typeof formData.value === 'number';

        setFormData((prevData) => ({
            ...prevData,
            isClientValid,
            isStatusValid,
            isValueValid,
        }));

        if (isClientValid && isStatusValid && isValueValid) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <StyledLabel className={touchedFields.client && !formData.isClientValid ? 'invalid-label' : ''}>
            Cliente *
        </StyledLabel>
        <Select name="clientId" defaultValue={formData.clientId !== undefined ? formData.clientId : ''} options={[{value: 0, label: 'Selecione um cliente'}, ...clients]} onChange={handleChange}
        className={touchedFields.client && !formData.isClientValid ? 'invalid-input' : ''}/>

        <FlexDiv>
            <LabelContainer>
                <StyledLabel>
                    Data da venda *
                </StyledLabel>
                <DateInput selectedDate={formData.date ? new Date(formData.date) : new Date()} onChange={handleChange}/>
            </LabelContainer>

            <LabelContainer className={touchedFields.status && !formData.isStatusValid ? 'invalid-label' : ''}>
                <StyledLabel>
                    Situação *
                </StyledLabel>
                <Select name="status" defaultValue={formData.status}  options={[{ value: '', label: 'Selecione uma opção' }, ...statusOptions]} onChange={handleChange}
                className={touchedFields.status && !formData.isStatusValid ? 'invalid-input' : ''}/>
            </LabelContainer>
        </FlexDiv>

        <StyledLabel className={touchedFields.value && !formData.isValueValid ? 'invalid-label' : ''}>
            Valor da venda *
        </StyledLabel>
        <StyledMoneyMask 
            thousandSeparator={true} allowNegative={false} prefix="R$ " decimalScale={2} fixedDecimalScale={true} placeholder="R$ 0.00"
            className={touchedFields.value && !formData.isValueValid ? 'invalid-input' : ''}
            name="value" onValueChange={(values: { floatValue: any; }) => {
                const { floatValue } = values;
                handleChangeValue(floatValue);
        }}/>

        <ButtonsDiv>
            <CancelButton onClick={onClose}>Cancelar</CancelButton>
            <SaveButton type="submit">Salvar</SaveButton>
        </ButtonsDiv>
        </form>
    );
};

export const EditSaleForm: React.FC<SaleFormProps> = ({data, onSubmit, onClose }) => {

    const [formData, setFormData] = useState<SaleFormData>({
        id: data!.id,
        client: data!.client,
        clientId: data!.clientId,
        date: data!.date,
        status: data!.status,
        value: data!.value,
        isClientValid: false,
        isStatusValid: false,
        isValueValid: false,
    });

    const [touchedFields, setTouchedFields] = useState({
        client: false,
        status: false,
        value: false,
    });

    const handleFieldBlur = (fieldName: string) => {
        setTouchedFields((prevFields) => ({ ...prevFields, [fieldName]: true }));
    };

    // Fetch to get clients
    const [clients, setClients] = useState<{value: number, label: string}[]>([]);

    useEffect(() => {
      const fetchClients = async () => {
        try {
          const response = await fetch('http://localhost:8080/client');
          const data = await response.json();
          const formattedOptions = data.map((client: any) => ({
            value: client.id,
            label: client.name,
          }));
          setClients(formattedOptions);
        } catch (error) {
          console.error('Erro ao buscar os clientes:', error);
        }
      };
  
      fetchClients();
    }, []);

    const statusOptions = [
    {
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

    // Format Date
    const currentDate = data?.date ? new Date(data.date) : null;
    const formattedDate = currentDate?.toLocaleDateString("pt-BR");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | Date ) => {
        if (e !== null && e instanceof Date) {
            setFormData((prevData) => ({ ...prevData, date: e }));
          } else if (e && e.target) {
            const { name, value } = e.target;
            setFormData((prevData) => ({ ...prevData, [name]: value }));
          }

        const isClientValid = formData.client != "";
        const isStatusValid = formData.status != "";

        setFormData((prevData) => ({
            ...prevData,
            isClientValid,
            isStatusValid,
        }));
    };

    const handleChangeValue = (value : number) => {
        setFormData((prevData) => ({ ...prevData, value}));

        const isValueValid = typeof formData.value === 'number';

        setFormData((prevData) => ({
            ...prevData,
            isValueValid,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const isClientValid = formData.client != "";
        const isStatusValid = formData.status != "";
        const isValueValid = typeof formData.value === 'number';

        setFormData((prevData) => ({
            ...prevData,
            isClientValid,
            isStatusValid,
            isValueValid,
        }));

        if (isClientValid && isStatusValid && isValueValid) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <LabelContainer>
                {/* Example */}
                <StyledSubtitle>Venda #{data?.id} - {data?.client} - {data?.date ? new Date(data?.date).toLocaleDateString() : ''}</StyledSubtitle>
            </LabelContainer>

            <StyledLabel className={touchedFields.client && !formData.isClientValid ? 'invalid-label' : ''}>
                Cliente *
            </StyledLabel>
            <Select name="clientId" defaultValue={data?.clientId !== undefined ? data.clientId : ''} 
            options={[{value: 0, label: 'Selecione um cliente'}, ...clients]} onChange={handleChange}
            className={touchedFields.client && !formData.isClientValid ? 'invalid-input' : ''}/>

                <FlexDiv>
                <LabelContainer>
                    <StyledLabel>
                        Data da venda *
                    </StyledLabel>
                    <DateInput selectedDate={formattedDate ? new Date(formattedDate) : new Date()} onChange={handleChange}/>
                </LabelContainer>

                <LabelContainer className={touchedFields.status && !formData.isStatusValid ? 'invalid-label' : ''}>
                    <StyledLabel>
                        Situação *
                    </StyledLabel>
                    <Select name="status" defaultValue={data?.status !== undefined ? data?.status : 0}  options={[{ value: 0, label: 'Selecione uma opção' }, ...statusOptions]} onChange={handleChange}
                    className={touchedFields.status && !formData.isStatusValid ? 'invalid-input' : ''}/>
                </LabelContainer>
            </FlexDiv>

            <StyledLabel className={touchedFields.value && !formData.isValueValid ? 'invalid-label' : ''}>
                Valor da venda *
            </StyledLabel>
            <StyledMoneyMask 
                thousandSeparator={true} allowNegative={false} prefix="R$ " decimalScale={2} fixedDecimalScale={true} placeholder="R$ 0.00"
                className={touchedFields.value && !formData.isValueValid ? 'invalid-input' : ''} defaultValue={formatMoneyValue(data?.value)}
                name="value" onValueChange={(values: { floatValue: any; }) => {
                    const { floatValue } = values;
                    handleChangeValue(floatValue);
            }}/>
            <StyledInput type="number" name="id" defaultValue={data?.id} hidden />
            <ButtonsDiv>
                <CancelButton onClick={onClose}>Cancelar</CancelButton>
                <SaveButton type="submit">Salvar</SaveButton>
            </ButtonsDiv>
        </form>
    );
};

export const DeleteSaleForm: React.FC<SaleFormProps> = ({ onSubmit, onClose }) => {

    const [formData, setFormData] = useState<SaleFormData>({
        id: 0,
        client: '',
        date: new Date(),
        status: '',
        value: '',
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
