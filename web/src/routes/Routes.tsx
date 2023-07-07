import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClientListPage from "../pages/client/ClientListPage";
import SaleListPage from "../pages/sale/SaleListPage";
import ReportPage from "../pages/report/ReportPage";
import RegisterPage from "../pages/register/RegisterPage";
import LoginPage from "../pages/login/LoginPage";


export default function AllRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ClientListPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/client" element={<ClientListPage />} />
                <Route path="/sale" element={<SaleListPage />} />
                <Route path="/report" element={<ReportPage />} />
            </Routes>
        </BrowserRouter>
    )
}
