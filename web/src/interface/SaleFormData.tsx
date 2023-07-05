export interface SaleFormData {
    id?: number;
    client?: string;
    date: Date | string;
    status: string;
    value: number | string;
    isClientValid?: boolean;
    isStatusValid?: boolean;
    isValueValid?: boolean;
    clientId?: number;
}
