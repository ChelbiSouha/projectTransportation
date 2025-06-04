package com.example.transport.services;

import com.example.transport.entities.Review;
import com.example.transport.entities.ReviewRequest;
import com.example.transport.entities.Shipment;
import com.example.transport.entities.User;
import com.example.transport.entities.Transporter;
import com.example.transport.repository.ReviewRepository;
import com.example.transport.repository.ShipmentRepository;
import com.example.transport.repository.TransporterRepository;
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
    private TransporterRepository transporterRepository;
    @Autowired
    private ShipmentRepository shipmentRepository;

    public Review addReview(ReviewRequest reviewDTO, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        // 2. Récupérer le transporteur
        Transporter transporter = transporterRepository.findById(reviewDTO.getTransporterId())
                .orElseThrow(() -> new IllegalArgumentException("Transporter not found"));

        // 3. Récupérer l’expédition
        Shipment shipment = shipmentRepository.findById(reviewDTO.getShipmentId())
                .orElseThrow(() -> new IllegalArgumentException("Shipment not found"));

        // 4. Vérifier que l’expédition est terminée
        if (!"COMPLETED".equalsIgnoreCase(shipment.getStatus())) {
            throw new IllegalStateException("Review can only be submitted for a completed shipment.");
        }

        // 5. Vérifier qu’il n’existe pas déjà une review pour cette expédition
        if (reviewRepository.findByShipmentId(reviewDTO.getShipmentId()).isPresent()) {
            throw new IllegalArgumentException("A review already exists for this shipment.");
        }

        // 6. Créer la review
        Review review = new Review();
        review.setRating(reviewDTO.getRating());
        review.setComment(reviewDTO.getComment());
        review.setDate(LocalDateTime.now());
        review.setUser(user);
        review.setTransporter(transporter);
        review.setShipment(shipment);

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
