import styled from "styled-components";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Title from "../../components/Title";
import Tabbed from "../../components/Tabbed";
import Container from "../../components/Container";
import Map from "../../components/Map";
import InvoicingChart from '../../components/chart/InvoicingChart';
import InvoicingTable from '../../components/report/InvoicingTable';
import SecondaryButton from '../../components/SecondaryButton';

const CardSection = styled.div`
    margin-top: 40px;
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
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

export default function ReportPage() {

    // Graph
    const monthsChart = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"];
    const monthValuesChart = [200, 300, 100, 500, 230, 400, 230, 300, 100, 200, 300, 250];

    // Table
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

    const tabs = [
        {
            id: 1,
            title: "Localização de Clientes",
            children: [<Map height={556}/>],
        },
        {
            id: 2,
            title: "Faturamento por Mês",
            children: [
                <InvoicingChartDiv>
                    <InvoicingChart columns={monthsChart} values={monthValuesChart} />
                </InvoicingChartDiv>, 
                <InvoicingTableDiv>
                    <InvoicingTable columns={tableColumns} data={dataTable}/>
                </InvoicingTableDiv>, 
                <ExportButtonDiv>
                    <SecondaryButton name="Exportar CSV" columns={tableColumns} data={dataTable} />
                </ExportButtonDiv> 
            ]
        }
    ]

    return (
        <>
            <Header />

            <Container>
                <Title title="Relatórios" />

                <CardSection>
                    <Card key={0} title="Vendas no Ano" value="R$ 500.000,00" iconType="money"/>
                    <Card key={1} title="Cliente com Mais Vendas no Mês" value="LIVRARIA SEU LIVRO" iconType="graph"/>
                    <Card key={2} title="Cliente com Maior Faturamento (Mês)" value="SEU BAR (R$ 5.000,00)" iconType="money"/>
                    <Card key={3} title="Cliente com Maior Faturamento (Ano)" value="SEU BAR (R$ 50.000,00)" iconType="money"/>
                </CardSection>
            </Container>
            
            <Tabbed tabs={tabs} />
        </>
    )
}