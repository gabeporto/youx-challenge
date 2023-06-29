import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClientListPage from "../pages/client/ClientListPage";
import SaleListPage from "../pages/sale/SaleListPage";
import ReportPage from "../pages/report/ReportPage";
import RegisterPage from "../pages/access/RegisterPage";
import React from "react";

export default function AllRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ClientListPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/client" element={<ClientListPage />} />
                <Route path="/sale" element={<SaleListPage />} />
                <Route path="/report" element={<ReportPage />} />
            </Routes>
        </BrowserRouter>
    )
}
