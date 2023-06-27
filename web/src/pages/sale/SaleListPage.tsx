import Header from "../../components/Header";
import Title from "../../components/Title";
import SaleTable from "../../components/sale/SaleTable";

export default function SaleListPage() {
    return (
        <>
            <Header />
            <Title title="Lista de Vendas" />
            <SaleTable />
        </>
    )
}