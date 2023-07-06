import styled from "styled-components";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Title from "../../components/Title";
import Tabbed from "../../components/Tabbed";
import Container from "../../components/Container";
import Map from "../../components/Map";
import InvoicingChart from '../../components/chart/InvoicingChart';
import InvoicingTable from '../../components/report/InvoicingTable';
import ExportButton from '../../components/ExportButton';
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

interface InvoicingExportData {
    period: string,
    quantity: number,
    value: string | number,
};

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

interface TableData {
    id: number;
    period: string;
    quantity: number;
    value: number;
  }

export default function ReportPage() {

    const [ data, setData ] = useState<ReportData | null>(null);
    const [ clientMarkers, setClientMarkers ] = useState<Mark[]>([]);
    const [ tableData, setTableData ] = useState<TableData[]>([]);
    const [ invoicingExportData, setInvoicingExportData ] = useState<InvoicingExportData[]>([]);
    const [ periods, setPeriods ] = useState<string[]>([]);
    const [ values, setValues ] = useState<number[]>([]);
    const tableColumns = ["Mês", "Vendas", "Total"];
    const nameColumnsToExport = ["period", "quantity", "value"];

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
                })));

                setTableData(data?.invoicingData.months.map((item: TableData) => ({
                    id: item.id,
                    period: item.period,
                    quantity: item.quantity,
                    value: item.value,
                })));

                setInvoicingExportData(data?.invoicingData.months.map((item: TableData) => ({
                    period: item.period,
                    quantity: item.quantity,
                    value: 'R$ ' + item.value.toLocaleString(),
                })));

                setPeriods(data?.invoicingData.months.map((item: TableData) => item.period));
                setValues(data?.invoicingData.months.map((item: TableData) => item.value));
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
                    <InvoicingChart columns={periods} values={values} />
                </InvoicingChartDiv>, 
                <InvoicingTableDiv>
                    <InvoicingTable columns={tableColumns} data={tableData}/>
                </InvoicingTableDiv>, 
                <ExportButtonDiv>
                    <ExportButton name="Exportar CSV" columns={nameColumnsToExport} data={invoicingExportData} />
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
                    <Card key={0} title={data?.cards?.salesByYear?.name || 'VENDAS NO ANO'} 
                    value={data?.cards?.salesByYear.value ? 'R$ ' + data.cards.salesByYear.value.toLocaleString() : 'R$ 0.00'} iconType="money"/>

                    <Card key={1} title={data?.cards?.clientWithMostQuantityByMonth?.name || 'CLIENTE COM MAIS VENDAS NO MÊS'} 
                    value={data?.cards?.clientWithMostQuantityByMonth.client ? data.cards.clientWithMostQuantityByMonth.client : 'Cliente'} iconType="graph"/>

                    <Card key={2} title={data?.cards?.clientWithMostValuesByMonth?.name || 'CLIENTE COM MAIOR FATURAMENTO (MÊS)'} 
                    value={data?.cards?.clientWithMostValuesByMonth.value ? data.cards.clientWithMostValuesByMonth.client + " (R$ " + data.cards.clientWithMostValuesByMonth.value.toLocaleString() + ")" : 'R$ 0.00'} iconType="money"/>

                    <Card key={3} title={data?.cards?.clientWithMostValuesByYear?.name || 'CLIENTE COM MAIOR FATURAMENTO (ANO)'} value={data?.cards.clientWithMostValuesByYear.value ? data.cards.clientWithMostValuesByYear.client + " (R$ " + data.cards.clientWithMostValuesByYear.value.toLocaleString() + ")" : 'R$ 0.00'} iconType="money"/>
                </CardSection>
            </Container>
            
            <Tabbed tabs={tabs} />
        </>
    )
}