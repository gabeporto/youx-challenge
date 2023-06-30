import React, { useState } from 'react';

interface ClientFormProps {
  onSubmit: (date: ClientFormData) => void;
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
      <label>
        Nome:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>

      <label>
        CNPJ:
        <input type="text" name="cnpj" value={formData.cnpj} onChange={handleChange} />
      </label>

      <label>
        Telefone:
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
      </label>

      <label>
        UF:
        <input type="text" name="uf" value={formData.uf} onChange={handleChange} />
      </label>

      <label>
        Email:
        <input type="text" name="email" value={formData.email} onChange={handleChange} />
      </label>

      <button type="submit">Submit</button>
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
        <label>
          Nome:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
  
        <label>
          CNPJ:
          <input type="text" name="cnpj" value={formData.cnpj} onChange={handleChange} />
        </label>
  
        <label>
          Telefone:
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </label>
  
        <label>
          UF:
          <input type="text" name="uf" value={formData.uf} onChange={handleChange} />
        </label>
  
        <label>
          Email:
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
        </label>
  
        <input type="number" name="id" value={formData.id} hidden></input>
        <button type="submit">Submit</button>
      </form>
    );
  };


interface SaleFormProps {
    onSubmit: (date: SaleFormData) => void;
  }
  
interface SaleFormData {
    id?: number;
    client: string;
    date: string;
    status: string;
    value: number;
}
  
export const AddSaleForm: React.FC<SaleFormProps> = ({ onSubmit }) => {

    const [formData, setFormData] = useState<SaleFormData>({
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
        <label>
            Cliente:
            <input type="text" name="client" value={formData.client} onChange={handleChange} />
        </label>

        <label>
            Data:
            <input type="text" name="date" value={formData.date} onChange={handleChange} />
        </label>

        <label>
            Situação:
            <input type="text" name="status" value={formData.status} onChange={handleChange} />
        </label>

        <label>
            Valor:
            <input type="number" name="value" value={formData.value} onChange={handleChange} />
        </label>

        <button type="submit">Submit</button>
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
        <label>
            Cliente:
            <input type="text" name="client" value={formData.client} onChange={handleChange} />
        </label>

        <label>
            Data:
            <input type="text" name="date" value={formData.date} onChange={handleChange} />
        </label>

        <label>
            Situação:
            <input type="text" name="status" value={formData.status} onChange={handleChange} />
        </label>

        <label>
            Valor:
            <input type="number" name="value" value={formData.value} onChange={handleChange} />
        </label>

        <input type="number" name="id" value={formData.id} hidden></input>
        <button type="submit">Submit</button>
        </form>
    );
};

