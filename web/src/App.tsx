import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClientListPage from "./pages/client/ClientListPage";
import SaleListPage from "./pages/sale/SaleListPage";
import ReportPage from "./pages/report/ReportPage";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ClientListPage />} />
          <Route path="/client" element={<ClientListPage />} />
          <Route path="/sale" element={<SaleListPage />} />
          <Route path="/report" element={<ReportPage />} />
        </Routes>
      </BrowserRouter>
  );
}

