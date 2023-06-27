import styled from "styled-components";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Title from "../../components/Title";
import Tabbed from "../../components/Tabbed";

const CardSection = styled.div`
    padding-left: 6%;
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
`

export default function ReportPage() {
    return (
        <>
            <Header />
            <Title title="Relatórios" />
            <CardSection>
                <Card title="Vendas no Ano" value="R$ 500.000,00" iconType="money"/>
                <Card title="Cliente com Mais Vendas no Mês" value="LIVRARIA SEU LIVRO" iconType="graph"/>
                <Card title="Cliente com Maior Faturamento (Mês)" value="SEU BAR (R$ 5.000,00)" iconType="money"/>
                <Card title="Cliente com Maior Faturamento (Ano)" value="SEU BAR (R$ 50.000,00)" iconType="money"/>
            </CardSection>
            <Tabbed />
        </>
    )
}