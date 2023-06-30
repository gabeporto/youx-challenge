import React, { useState } from 'react';
import styled from 'styled-components';
import Map from "../Map";
import InvoicingChart from '../chart/InvoicingChart';
import InvoicingTable from './InvoicingTable';
import SecondaryButton from '../SecondaryButton';

const Container = styled.div`
    padding-left: 6%;
`

const TabContainer = styled.div`
    width: 93%;
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TabButtonContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    background-color: #e0e0e0;
    border-radius: 5px 5px 0 0;
`;

const TabButton = styled.button<{ active: boolean }>`
    width: 335px; 
    height: 70px;
    background-color: ${({ active }) => (active ? '#ffffff' : '#e0e0e0')};
    border: none;
    border-radius: 3px 3px 0 0;
    color: #333;
    cursor: pointer;
    padding: 10px;
    margin-right: 10px;
`;

const TabContent = styled.div`
    height: 100%;
    min-height: 565px;
    width: 100%;
    border: none;
    border-radius: 0 0 3px 3p;
    margin-bottom: 50px;
    padding: 12px;
`

const TabTitle = styled.label`
    text-align: left;
    font: normal normal normal 20px/25px Helvetica Neue;
    letter-spacing: 0px;
    color: #5C4444;
    opacity: 1;
`

const InvoicingContainer = styled.div`
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`

const ContentDiv = styled.div`
    width: 100%;
`

const InvoicingChartDiv = styled.div`
    width: 65%;
    min-width: 250px;

    @media only screen and (max-width: 888px) {
        width: 100%;
        height: 100%;
    }
`

const InvoicingTableDiv = styled.div`
    width: 25%;

    @media only screen and (max-width: 950px) {
        width: 100%;
        height: 100%;
        overflow: auto;
    }
`

const ExportButtonDiv = styled.div`
    width: 3%;

    @media only screen and (max-width: 1460px) {
        width: 100%;
        height: 100%;
    }
`

const ReportTabbed: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"];
  const monthValues = [200, 300, 100, 500, 230, 400, 230, 300, 100, 200, 300, 250];

  const tableColumns = ["Mês", "Vendas", "Total"];
  const dataTable = [
    {
        id: 1,
        type: "report",
        month: "Janeiro",
        salesQuantity: 34,
        total: "1.245,00",
    },
    {
        id: 2,
        month: "Fevereiro",
        type: "report",
        salesQuantity: 34,
        total: "1.245,00",
    },
    {
        id: 3,
        month: "Março",
        type: "report",
        salesQuantity: 34,
        total: "1.245,00",
    },
    {
        id: 4,
        month: "Abril",
        type: "report",
        salesQuantity: 34,
        total: "1.245,00",
    },
    {
        id: 5,
        month: "Maio",
        type: "report",
        salesQuantity: 34,
        total: "1.245,00",
    },
    {
        id: 6,
        month: "Junho",
        type: "report",
        salesQuantity: 34,
        total: "1.245,00",
    },
    {
        id: 7,
        month: "Julho",
        type: "report",
        salesQuantity: 34,
        total: "1.245,00",
    },
    {
        id: 8,
        month: "Agosto",
        type: "report",
        salesQuantity: 34,
        total: "1.245,00",
    },
    {
        id: 9,
        month: "Setembro",
        type: "report",
        salesQuantity: 34,
        total: "1.245,00",
    },
    {
        id: 10,
        month: "Outubro",
        type: "report",
        salesQuantity: 34,
        total: "1.245,00",
    },
    {
        id: 11,
        month: "Novembro",
        type: "report",
        salesQuantity: 34,
        total: "1.245,00",
    },
    {
        id: 12,
        month: "Dezembro",
        type: "report",
        salesQuantity: 34,
        total: "1.245,00",
    },
    ];

  return (
    <Container>
        <TabContainer>
            <TabButtonContainer>
                <TabButton active={activeTab === 'tab1'} onClick={() => handleTabClick('tab1')}>
                    <TabTitle>Localização de Clientes</TabTitle>
                </TabButton>
                <TabButton active={activeTab === 'tab2'} onClick={() => handleTabClick('tab2')}>
                    <TabTitle>Faturamento por mês</TabTitle>
                </TabButton>
            </TabButtonContainer>
            <TabContent>
                {activeTab === 'tab1' && 
                    <Map height={576}/>
                }
                {activeTab === 'tab2' && 
                    <ContentDiv>
                        <InvoicingContainer>
                            <InvoicingChartDiv>
                                <InvoicingChart columns={months} values={monthValues} />
                            </InvoicingChartDiv>

                            <InvoicingTableDiv>
                                <InvoicingTable columns={tableColumns} data={dataTable}/>
                            </InvoicingTableDiv>

                            <ExportButtonDiv>
                                <SecondaryButton name="Exportar CSV" columns={tableColumns} data={dataTable} /> 
                            </ExportButtonDiv>
                        </InvoicingContainer>
                    </ContentDiv>
                }
            </TabContent>
        </TabContainer>
    </Container>
  );
};

export default ReportTabbed;
