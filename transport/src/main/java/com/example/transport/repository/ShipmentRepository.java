package com.example.transport.repository;

import com.example.transport.entities.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ShipmentRepository extends JpaRepository<Shipment, Long> {
    @Query("SELECT s FROM Shipment s WHERE LOWER(s.pickupLocation) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(s.dropoffLocation) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Shipment> searchByLocation(@Param("keyword") String keyword);
    List<Shipment> findByUserId(Long userId);
    List<Shipment> findByStatus(String status);

}
