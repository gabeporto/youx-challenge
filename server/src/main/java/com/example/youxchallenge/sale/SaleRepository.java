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
    Double sumSales(@Param("year") int year);

    @Query("SELECT s.client.id, COUNT(s.id) FROM sale s WHERE MONTH(s.date) = :month GROUP BY s.client.id ORDER BY COUNT(s.id) DESC LIMIT 1")
    Object[] findClientWithMostSalesByMonth(@Param("month") int month);

    @Query("SELECT s.client.id, SUM(s.value) FROM sale s WHERE MONTH(s.date) = :month GROUP BY s.client.id ORDER BY SUM(s.value) DESC LIMIT 1")
    Object[] findClientWithHighestSalesByMonth(@Param("month") int month);

    @Query("SELECT s.client.id, SUM(s.value) FROM sale s WHERE YEAR(s.date) = :year GROUP BY s.client.id ORDER BY SUM(s.value) DESC LIMIT 1")
    Object[] findClientWithHighestSalesByYear(@Param("year") int year);

}
