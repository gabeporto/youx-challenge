import Header from "../../components/Header";
import Title from "../../components/Title";
import ClientTable from "../../components/client/ClientTable";

export default function ClientList() {
  return (
      <>
        <Header />
        <Title title="Lista de Clientes"/>
        <ClientTable />
      </>
  );
}

