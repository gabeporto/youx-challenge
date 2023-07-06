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

    int CURRENT_YEAR = LocalDate.now().getYear();
    int CURRENT_MONTH = LocalDate.now().getMonthValue();

    public JSONObject buildCardsInformation() {

        JSONObject cards = new JSONObject();

        cards.put("salesByYear", buildSalesByYearCard());
        cards.put("clientWithMostQuantityByMonth", buildClientWithMostSalesByMonthCard());
        cards.put("clientWithMostValuesByMonth", buildClientWithMostValuesByMonthCard());
        cards.put("clientWithMostValuesByYear", buildClientWithMostValuesByYearCard());

        return cards;
    }

    public JSONObject buildSalesByYearCard() {

        Double value = saleRepository.sumSales(CURRENT_YEAR);

        JSONObject salesPerYearCard = new JSONObject();
        salesPerYearCard.put("name", "Vendas no Ano");
        salesPerYearCard.put("value", value);

        return salesPerYearCard;
    }

    public JSONObject buildClientWithMostSalesByMonthCard() {

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

    public JSONObject buildClientWithMostValuesByMonthCard() {

        JSONObject clientWithMostValuesByMonthCard = new JSONObject();

        Object[] result = saleRepository.findClientWithHighestSalesByMonth(CURRENT_MONTH);
        Object client = result[0];

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

    public JSONObject buildClientWithMostValuesByYearCard() {

        JSONObject clientWithMostValuesByYearCard = new JSONObject();

        Object[] result = saleRepository.findClientWithHighestSalesByYear(CURRENT_YEAR);
        Object client = result[0];

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
}
