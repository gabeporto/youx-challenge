import styled from "styled-components";

const TableContainer = styled.div`
  width: 94%;
  overflow-x: auto;
`;

const TableStyled = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 8px;
  background-color: #e0e0e0;
`;

const TableData = styled.td`
  padding: 8px;
  border: 1px solid #ccc;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f0f0f0;
  }
`;

interface TableProps {
    headers: string[];
    data: { [key: string]: string | number }[];
  }

export default function Table(props : TableProps) {
    return (
        <TableContainer>
          <TableStyled>
            <thead>
              <tr>
                {props.headers.map((header, index) => (
                  <TableHeader key={index}>{header}</TableHeader>
                ))}
              </tr>
            </thead>
            <tbody>
              {props.data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Object.values(row).map((value, columnIndex) => (
                    <TableData key={columnIndex}>{value}</TableData>
                  ))}
                </TableRow>
              ))}
            </tbody>
          </TableStyled>
        </TableContainer>
      );
    
}