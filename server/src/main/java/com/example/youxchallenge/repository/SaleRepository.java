package com.example.youxchallenge.repository;

import com.example.youxchallenge.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {


    @Query("SELECT SUM(s.value) FROM sale s INNER JOIN s.client c WHERE c.person.id = :personId AND YEAR(s.date) = :year")
    Double sumSalesByYear(@Param("year") int year, @Param("personId") Long personId);

    @Query("SELECT s.client.person.id, COUNT(s.id) FROM sale s WHERE s.client.person.id = :personId AND MONTH(s.date) = :month GROUP BY s.client.person.id ORDER BY COUNT(s.id) DESC LIMIT 1")
    Object[] findClientWithMostSalesByMonth(@Param("month") int month, @Param("personId") Long personId);

    @Query("SELECT s.client.person.id, SUM(s.value) FROM sale s WHERE s.client.person.id = :personId AND MONTH(s.date) = :month GROUP BY s.client.person.id ORDER BY SUM(s.value) DESC LIMIT 1")
    Object[] findClientWithHighestSalesByMonth(@Param("month") int month, @Param("personId") Long personId);

    @Query("SELECT s.client.person.id, SUM(s.value) FROM sale s WHERE s.client.person.id = :personId AND YEAR(s.date) = :year GROUP BY s.client.person.id ORDER BY SUM(s.value) DESC LIMIT 1")
    Object[] findClientWithHighestSalesByYear(@Param("year") int year, @Param("personId") Long personId);

    @Query(value = "SELECT EXTRACT(MONTH FROM gs.month) AS month, EXTRACT(YEAR FROM gs.month) AS year, COUNT(s) AS quantity, COALESCE(SUM(s.value), 0) AS totalValue " +
            "FROM generate_series(CURRENT_DATE - INTERVAL '11 months', CURRENT_DATE, '1 month') AS gs(month) " +
            "LEFT JOIN sale s ON EXTRACT(MONTH FROM s.date) = EXTRACT(MONTH FROM gs.month) AND EXTRACT(YEAR FROM s.date) = EXTRACT(YEAR FROM gs.month) " +
            "INNER JOIN client c ON s.client_id = c.id " +
            "INNER JOIN person p ON c.person_id = p.id AND p.id = :personId " +
            "GROUP BY EXTRACT(MONTH FROM gs.month), EXTRACT(YEAR FROM gs.month) " +
            "ORDER BY EXTRACT(YEAR FROM gs.month), EXTRACT(MONTH FROM gs.month)", nativeQuery = true)
    List<Object[]> getSalesByMonth(@Param("personId") Long personId);

    @Query("SELECT s FROM sale s INNER JOIN s.client c WHERE c.person.id = :personId")
    List<Sale> findAllByPersonId(@Param("personId") Long personId);

}
