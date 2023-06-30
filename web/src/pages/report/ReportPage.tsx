import styled from "styled-components";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Title from "../../components/Title";
import ReportTabbed from "../../components/report/ReportTabbed";
import Container from "../../components/Container";

const FlexDiv = styled.div`
  display: flex;
  margin-top: 42px;
  gap: 22px;

  @media only screen and (max-width: 785px) {
    flex-wrap: wrap;
  }
`

const CardSection = styled.div`
    margin-top: 40px;
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
`

export default function ReportPage() {
    return (
        <>
            <Header />

            <Container>
                <Title title="Relatórios" />

                <CardSection>
                    <Card title="Vendas no Ano" value="R$ 500.000,00" iconType="money"/>
                    <Card title="Cliente com Mais Vendas no Mês" value="LIVRARIA SEU LIVRO" iconType="graph"/>
                    <Card title="Cliente com Maior Faturamento (Mês)" value="SEU BAR (R$ 5.000,00)" iconType="money"/>
                    <Card title="Cliente com Maior Faturamento (Ano)" value="SEU BAR (R$ 50.000,00)" iconType="money"/>
                </CardSection>
            </Container>

            
            <ReportTabbed />
        </>
    )
}