package com.example.transport.repository;

import com.example.transport.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByTransporterId(Long transporterId);
    List<Review> findByUserId(Long userId);
    Optional<Review> findByShipmentId(Long shipmentId);
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.transporter.id = :transporterId")
    Double getAverageRatingByTransporterId(Long transporterId);
}
