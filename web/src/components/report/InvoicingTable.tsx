import { styled } from "styled-components"

interface InvoicingData {
    id: number,
    period: string,
    quantity: number,
    value: string | number,
};

interface InvoicingTableProps {
    columns: string[],
    data: InvoicingData[],
}

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHeader = styled.th`
    padding: 8px;
    text-align: left;
    font: normal normal normal 20px/24px Helvetica Neue;
    letter-spacing: 0px;
    color: #6E6E6E;
    opacity: 1;
`;

const TableRow = styled.tr`
    &:nth-child(even) {
    background-color: #f9f9f9;
    }
`;

const TableCell = styled.td`
    padding: 8px;
    font: normal normal normal Helvetica Neue;
    font-size: 18px;
    letter-spacing: 0px;
    color: #6E6E6E; 
    opacity: 1;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
`;

export default function InvoicingTable(props : InvoicingTableProps) {
    return (
        <StyledTable>
            <thead>
                <TableRow>
                {props.columns.map((column) => (
                    <TableHeader key={column}>{column}</TableHeader>
                ))}
                </TableRow>
            </thead>
            <tbody>
                {props.data.map((item, index) => (
                <TableRow key={index}>
                    <TableCell>{item.period}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>R$ {item.value.toLocaleString()}</TableCell>
                </TableRow>
                ))}
            </tbody>
        </StyledTable>
    )
}