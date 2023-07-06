import { styled } from "styled-components"
import Papa from 'papaparse';

interface InvoicingExportData {
    period: string,
    quantity: number,
    value: string | number,
};

interface InvoicingTableProps {
    columns: string[],
    data: InvoicingExportData[],
    name: string,
}

interface ColumnMapping {
    [key: string]: string;
  }

const StyledButton = styled.button`
    width: 100px;
    height: 30px;
    text-align: left;
    font-size: 12px;
    font-weight: medium;
    text-align: center;
    justify-content: center; 
    letter-spacing: 0px;
    color: #FFFFFF;
    background-color: #1F78B4;
    opacity: 1;
    border-radius: 5px;
    padding: 5px;
    transition: opacity 0.3s ease;

    &:hover {
        opacity: 0.8;
    }
`

const generateCsv = (data: InvoicingExportData[], columns: string[]) => {
    const columnMapping : ColumnMapping = {
      period: 'Período',
      quantity: 'Vendas',
      value: 'Total',
    };
  
    const csvData = data.map(item => columns.map(column => (item as any)[column]));
  
    const formattedColumns = columns.map(column => columnMapping[column]);
    
    const csv = Papa.unparse({
      fields: formattedColumns,
      data: csvData,
    });
    return csv;
  };

const downloadCsv = (csv: string, filename: string) => {
    const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const csvUrl = URL.createObjectURL(csvData);
    const link = document.createElement('a');
    link.href = csvUrl;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export default function ExportButton(props : InvoicingTableProps) {

    const exportData = () => {
        const csv = generateCsv(props.data, props.columns);
        downloadCsv(csv, 'invoicing.csv');
    }

    return (
        <StyledButton onClick={exportData}>
            {props.name}
        </StyledButton>
    )
}