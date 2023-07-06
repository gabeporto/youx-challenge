package com.example.youxchallenge.service;

import com.example.youxchallenge.client.ClientRepository;
import com.example.youxchallenge.sale.SaleRepository;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private SaleRepository saleRepository;

    int CURRENT_YEAR = LocalDate.now().getYear();
    int CURRENT_MONTH = LocalDate.now().getMonthValue();

    // Method to build all information of Report page (Cards, Client Coordinates, Invoicing).
    public JSONObject buildReportData() {

        JSONObject reportData = new JSONObject();

        JSONObject cards = buildCardsInformation();
        JSONObject clientsCoordinates = buildClientsCoordinates();
        JSONObject invoicingData = getSalesByLastTwelveMonths();

        reportData.put("cards", cards);
        reportData.put("clientsCoordinates", clientsCoordinates);
        reportData.put("invoicingData", invoicingData);

        return reportData;
    }

    // Method to build all cards information of Report page.
    public JSONObject buildCardsInformation() {

        JSONObject cards = new JSONObject();

        cards.put("salesByYear", getSalesByYearCard());
        cards.put("clientWithMostQuantityByMonth", getClientWithMostSalesByMonthCard());
        cards.put("clientWithMostValuesByMonth", getClientWithMostValuesByMonthCard());
        cards.put("clientWithMostValuesByYear", getClientWithMostValuesByYearCard());

        return cards;
    }

    // Method to get the value sold by year.
    public JSONObject getSalesByYearCard() {

        Double value = saleRepository.sumSalesByYear(CURRENT_YEAR);

        JSONObject salesPerYearCard = new JSONObject();
        salesPerYearCard.put("name", "Vendas no Ano");
        salesPerYearCard.put("value", value);

        return salesPerYearCard;
    }

    // Method to get the client name and sale quantity with most sale by month.
    public JSONObject getClientWithMostSalesByMonthCard() {

        Object[] result = saleRepository.findClientWithMostSalesByMonth(CURRENT_MONTH);
        Object client = result[0];

        JSONObject clientWithMostSalesByMonthCard = new JSONObject();

        if (client != null) {
            Long clientId = (Long) ((Object[]) client)[0];
            Long totalSales = (Long) ((Object[]) client)[1];

            String clientName = clientRepository.findById(clientId).get().getName();

            clientWithMostSalesByMonthCard.put("name", "Cliente com Mais Vendas no Mês");
            clientWithMostSalesByMonthCard.put("client", clientName);
            clientWithMostSalesByMonthCard.put("value", totalSales);
        }

        return clientWithMostSalesByMonthCard;
    }

    // Method to get the client name and value with most sale by month.
    public JSONObject getClientWithMostValuesByMonthCard() {

        Object[] result = saleRepository.findClientWithHighestSalesByMonth(CURRENT_MONTH);
        Object client = result[0];

        JSONObject clientWithMostValuesByMonthCard = new JSONObject();

        if (result != null) {
            Long clientId = (Long) ((Object[]) client)[0];
            Double totalValue = (Double) ((Object[]) client)[1];

            String clientName = clientRepository.findById(clientId).get().getName();

            clientWithMostValuesByMonthCard.put("name", "Cliente com Maior Faturamento (Mês)");
            clientWithMostValuesByMonthCard.put("client", clientName);
            clientWithMostValuesByMonthCard.put("value", totalValue);
        }

        return clientWithMostValuesByMonthCard;
    }

    // Method to get the client name and value with most sale by year.
    public JSONObject getClientWithMostValuesByYearCard() {

        Object[] result = saleRepository.findClientWithHighestSalesByYear(CURRENT_YEAR);
        Object client = result[0];

        JSONObject clientWithMostValuesByYearCard = new JSONObject();

        if (result != null) {
            Long clientId = (Long) ((Object[]) client)[0];
            Double totalSales = (Double) ((Object[]) client)[1];

            String clientName = clientRepository.findById(clientId).get().getName();

            clientWithMostValuesByYearCard.put("name", "Cliente com Maior Faturamento (Ano)");
            clientWithMostValuesByYearCard.put("client", clientName);
            clientWithMostValuesByYearCard.put("value", totalSales);
        }

        return clientWithMostValuesByYearCard;
    }

    // Method to get All clients names and coordinates.
    public JSONObject buildClientsCoordinates() {

        List<Object[]> result = clientRepository.getClientCoordinates();

        JSONObject clientsCoordinates = new JSONObject();
        List<JSONObject> clientDataList = new ArrayList<>();

        for (int i = 0; i < result.size(); i++) {
            Long id = (Long) result.get(i)[0];
            String name = (String) result.get(i)[1];
            Double latitude = (Double) result.get(i)[2];
            Double longitude = (Double) result.get(i)[3];

            JSONObject clientData = new JSONObject();
            clientData.put("id", id);
            clientData.put("client", name);
            clientData.put("latitude", latitude);
            clientData.put("longitude", longitude);

            clientDataList.add(clientData);
        }

        clientsCoordinates.put("data", clientDataList);

        return clientsCoordinates;
    }

    // Method to get the quantity and value sold on last 12 months.
    public JSONObject getSalesByLastTwelveMonths() {

        List<Object[]> salesData = saleRepository.getSalesByMonth();
        Map<String, JSONObject> salesByMonth = new LinkedHashMap<>();

        int i = 1;

        for (Object[] data : salesData) {

            String[] monthNames = {
                    "",
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
            };
            int month = ((BigDecimal) data[0]).intValue();
            int year = ((BigDecimal) data[1]).intValue();
            BigDecimal quantity = new BigDecimal(((Long) data[2]).toString());
            BigDecimal totalValue = (BigDecimal) data[3];

            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id", i);
            jsonObject.put("period", monthNames[month] + "/" + year);
            jsonObject.put("quantity", quantity);
            jsonObject.put("value", totalValue);

            String key = monthNames[month] + String.valueOf(year);
            salesByMonth.put(key, jsonObject);

            i++;
        }

        JSONArray jsonArray = new JSONArray(salesByMonth.values());
        JSONObject invoicing = new JSONObject();
        invoicing.put("months", jsonArray);

        return invoicing;
    }

}
