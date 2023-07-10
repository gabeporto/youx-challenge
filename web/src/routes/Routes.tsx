import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClientListPage from "../pages/client/ClientListPage";
import SaleListPage from "../pages/sale/SaleListPage";
import ReportPage from "../pages/report/ReportPage";
import RegisterPage from "../pages/register/RegisterPage";
import LoginPage from "../pages/login/LoginPage";
import { AuthProvider } from "../context/AuthProvider";
import { ProtectedLayout } from "../components/ProtectedLayout";

export default function AllRoutes() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    <Route path="/client" element={<ProtectedLayout><ClientListPage /></ProtectedLayout>} />
                    <Route path="/sale" element={<ProtectedLayout><SaleListPage /></ProtectedLayout>} />
                    <Route path="/report" element={<ProtectedLayout><ReportPage /></ProtectedLayout>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}
