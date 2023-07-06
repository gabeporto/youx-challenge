package com.example.youxchallenge.sale;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {


    @Query("SELECT SUM(s.value) FROM sale s WHERE YEAR(s.date) = :year")
    Double sumSalesByYear(@Param("year") int year);

    @Query("SELECT s.client.id, COUNT(s.id) FROM sale s WHERE MONTH(s.date) = :month GROUP BY s.client.id ORDER BY COUNT(s.id) DESC LIMIT 1")
    Object[] findClientWithMostSalesByMonth(@Param("month") int month);

    @Query("SELECT s.client.id, SUM(s.value) FROM sale s WHERE MONTH(s.date) = :month GROUP BY s.client.id ORDER BY SUM(s.value) DESC LIMIT 1")
    Object[] findClientWithHighestSalesByMonth(@Param("month") int month);

    @Query("SELECT s.client.id, SUM(s.value) FROM sale s WHERE YEAR(s.date) = :year GROUP BY s.client.id ORDER BY SUM(s.value) DESC LIMIT 1")
    Object[] findClientWithHighestSalesByYear(@Param("year") int year);

    @Query(value = "SELECT EXTRACT(MONTH FROM gs.month) AS month, EXTRACT(YEAR FROM gs.month) AS year, COUNT(s) AS quantity, COALESCE(SUM(s.value), 0) AS totalValue " +
            "FROM generate_series(CURRENT_DATE - INTERVAL '11 months', CURRENT_DATE, '1 month') AS gs(month) " +
            "LEFT JOIN sale s ON EXTRACT(MONTH FROM s.date) = EXTRACT(MONTH FROM gs.month) AND EXTRACT(YEAR FROM s.date) = EXTRACT(YEAR FROM gs.month) " +
            "GROUP BY EXTRACT(MONTH FROM gs.month), EXTRACT(YEAR FROM gs.month) " +
            "ORDER BY EXTRACT(YEAR FROM gs.month), EXTRACT(MONTH FROM gs.month)", nativeQuery = true)
    List<Object[]> getSalesByMonth();
}
