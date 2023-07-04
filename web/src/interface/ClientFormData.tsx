export interface ClientFormData {
    id?: number;
    name: string;
    cnpj: string;
    phone: string;
    uf: string;
    email: string;
    latitude: number;
    longitude: number;
    isNameValid?: boolean,
    isCnpjValid?: boolean,
    isPhoneValid?: boolean,
    isUfValid?: boolean,
    isEmailValid?: boolean,
    isMarkValid?: boolean,
    personId?: number
}