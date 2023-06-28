import { styled } from "styled-components"

interface InvoicingData {
    id: number,
    month: string,
    type: string,
    salesQuantity: number,
    total: string
};

interface InvoicingTableProps {
    columns: string[],
    data: InvoicingData[],
}


const StyledButton = styled.button`
    width: 100px;
    height: 30px;
    text-align: left;
    font-size: 12px;
    font-weight: medium;
    text-align: center;
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

export default function CSVButton(props : InvoicingTableProps) {

    const exportCSV = () => {
        // Exportar CSV
        console.log(props.columns, props.data);
    }
    return (
        <StyledButton onClick={exportCSV}>
            Exportar CSV
        </StyledButton>
    )
}