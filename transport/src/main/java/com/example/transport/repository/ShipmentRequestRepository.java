package com.example.transport.repository;

import com.example.transport.entities.ShipmentRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShipmentRequestRepository extends JpaRepository<ShipmentRequest, Long> {
    List<ShipmentRequest> findByShipmentId(Long shipmentId);
    List<ShipmentRequest> findByTransporterId(Long transporterId);
    boolean existsByShipmentIdAndTransporterId(Long shipmentId, Long transporterId);
}
