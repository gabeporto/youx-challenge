import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClientListPage from "./pages/client/ClientListPage";
import SaleListPage from "./pages/sale/SaleListPage";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ClientListPage />} />
          <Route path="/clients" element={<ClientListPage />} />
          <Route path="/sales" element={<SaleListPage />} />
        </Routes>
      </BrowserRouter>
  );
}

