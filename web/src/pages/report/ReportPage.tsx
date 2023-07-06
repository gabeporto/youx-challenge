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
import { useEffect, useState } from "react";

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

interface ReportData {
    cards: {
        salesByYear: {
            name: string,
            value: string | number,
        },
        clientWithMostQuantityByMonth: { 
            name: string, 
            client: string, 
            value: string | number,
        },
        clientWithMostValuesByMonth: {
            name: string,
            client: string,
            value: string | number,
        },
        clientWithMostValuesByYear: {
            name: string,
            client: string,
            value: string | number,
        },
    },
    clientsCoordinates : {
        data : {
            id: number,
            client: string,
            latitude: number,
            longitude: number,
        },
    }
}

interface ClientsCoordinates {
    id: number,
    client: string,
    latitude: string,
    longitude: string,
}

interface Mark {
    id: number;
    popUp: string;
    geocode: [number, number];
}

export default function ReportPage() {

    const [data, setData] = useState<ReportData | null>(null);
    const [ clientMarkers, setClientMarkers ] = useState<Mark[]>([]);

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

    const fetchData = () => {
        fetch('http://localhost:8080/report')
            .then(response => response.json())
            .then(data => {
                setData(data);
                setClientMarkers(
                    data?.clientsCoordinates.data.map((dataClient : ClientsCoordinates) => ({
                        id: dataClient.id,
                        geocode: [dataClient.latitude, dataClient.longitude],
                        popUp: dataClient.client,
                })))
            })
            .catch(error => {
                console.error(error);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Tabs Section (Clients Location and Invoicing by Month)
    const tabs = [
        {
            id: 1,
            title: "Localização de Clientes",
            children: [<Map height={556} markers={clientMarkers}/>],
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
                    <Card key={0} title={data?.cards?.salesByYear?.name || 'Card 1'} 
                    value={data?.cards?.salesByYear.value ? 'R$ ' + data.cards.salesByYear.value.toLocaleString() : 'R$ 0.00'} iconType="money"/>

                    <Card key={1} title={data?.cards?.clientWithMostQuantityByMonth?.name || 'Card 2'} 
                    value={data?.cards?.clientWithMostQuantityByMonth.client ? data.cards.clientWithMostQuantityByMonth.client : 'R$ 0.00'} iconType="graph"/>

                    <Card key={2} title={data?.cards?.clientWithMostValuesByMonth?.name || 'Card 3'} 
                    value={data?.cards?.clientWithMostValuesByMonth.value ? data.cards.clientWithMostValuesByMonth.client + " (R$ " + data.cards.clientWithMostValuesByMonth.value.toLocaleString() + ")" : 'R$ 0.00'} iconType="money"/>

                    <Card key={3} title={data?.cards?.clientWithMostValuesByYear?.name || 'Card 4'} value={data?.cards.clientWithMostValuesByYear.value ? data.cards.clientWithMostValuesByYear.client + " (R$ " + data.cards.clientWithMostValuesByYear.value.toLocaleString() + ")" : 'R$ 0.00'} iconType="money"/>
                </CardSection>
            </Container>
            
            <Tabbed tabs={tabs} />
        </>
    )
}