package com.example.transport.services;

import com.example.transport.entities.Review;
import com.example.transport.entities.Shipment;
import com.example.transport.entities.User;
import com.example.transport.repository.ReviewRepository;
import com.example.transport.repository.ShipmentRepository;
import com.example.transport.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ShipmentRepository shipmentRepository;

    public Review addReview(Review review, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Ensure shipment exists
        Long shipmentId = review.getShipment().getId();
        Shipment shipment = shipmentRepository.findById(shipmentId)
                .orElseThrow(() -> new IllegalArgumentException("Shipment not found"));

        // Check shipment status
        if (!"COMPLETED".equalsIgnoreCase(shipment.getStatus())) {
            throw new IllegalStateException("Review can only be submitted for a completed shipment.");
        }

        // Check if a review already exists for this shipment
        if (reviewRepository.findByShipmentId(shipmentId).isPresent()) {
            throw new IllegalArgumentException("A review already exists for this shipment.");
        }

        // Set the shipment and current date
        review.setShipment(shipment);
        review.setDate(LocalDateTime.now());

        return reviewRepository.save(review);
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public List<Review> getReviewsByTransporter(Long transporterId) {
        return reviewRepository.findByTransporterId(transporterId);
    }

    public List<Review> getReviewsByUser(Long userId) {
        return reviewRepository.findByUserId(userId);
    }

    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }
}
