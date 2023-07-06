package com.example.youxchallenge.service;

import com.example.youxchallenge.client.ClientRepository;
import com.example.youxchallenge.sale.SaleRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class ReportService {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private SaleRepository saleRepository;

    public JSONObject buildCardsInformation() {

        JSONObject cards = new JSONObject();

        cards.put("salesPerYear", buildSalesPerYearCard());
        cards.put("bestClientPerYear", buildBestClientPerYearCard());

        return cards;
    }

    public JSONObject buildSalesPerYearCard() {

        Double value = saleRepository.sumSales();

        JSONObject salesPerYear = new JSONObject();
        salesPerYear.put("name", "Vendas no Ano");
        salesPerYear.put("value", value);

        return salesPerYear;
    }

    public JSONObject buildBestClientPerYearCard() {

        JSONObject bestClientPerYearCard = new JSONObject();

        String currentYear = String.valueOf(LocalDate.now().getYear());
        Object[] result = saleRepository.findClientWithHighestSales(currentYear);

        if (result != null && result.length >= 2) {
            Long clientId = (Long) result[0];
            Double totalSales = (Double) result[1];

            String clientName = clientRepository.findById(clientId).get().getName();

            bestClientPerYearCard.put("client", clientName);
            bestClientPerYearCard.put("value", totalSales);
        }

        return bestClientPerYearCard;
    }




}
