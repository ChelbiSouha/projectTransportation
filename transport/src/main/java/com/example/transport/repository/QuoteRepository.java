package com.example.transport.repository;

import com.example.transport.entities.Quote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuoteRepository extends JpaRepository<Quote, Long> {
    List<Quote> findByShipmentId(Long shipmentId);
    List<Quote> findByTransporterId(Long transporterId);
}
