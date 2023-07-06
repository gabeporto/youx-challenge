package com.example.youxchallenge.sale;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {


    @Query("SELECT SUM(e.value) FROM sale e")
    Double sumSales();

    @Query("SELECT s.client.id, SUM(s.value) FROM sale s WHERE CAST(s.date AS text) LIKE CONCAT(:year, '%') GROUP BY s.client.id ORDER BY SUM(s.value) DESC LIMIT 1")
    Object[] findClientWithHighestSales(@Param("year") String year);


}
