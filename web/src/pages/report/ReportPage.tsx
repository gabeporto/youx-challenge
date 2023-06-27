import styled from "styled-components";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Title from "../../components/Title";

const CardSection = styled.div`
    padding-left: 6%;
    margin-top: 55px;
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
                <Card title="Vendas no Ano" value="R$ 500.000,00"/>
                <Card title="Cliente com Mais Vendas no Mês" value="LIVRARIA SEU LIVRO"/>
                <Card title="Cliente com Maior Faturamento (Mês)" value="SEU BAR (R$ 5.000,00)"/>
                <Card title="Cliente com Maior Faturamento (Ano)" value="SEU BAR (R$ 50.000,00)"/>
            </CardSection>
        </>
    )
}