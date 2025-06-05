package com.example.transport.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "shipments")
public class Shipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String pickupLocation;
    private String dropoffLocation;
    private String status;
    private String receiverPhone;
    private Double weight;
    private String type;
    private Double proposedPrice;
    @Column
    private Double distance;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "quote_id", referencedColumnName = "id")
    private Quote quote;
    @Column(nullable = false)
    private boolean reviewGiven = false;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    @ElementCollection
    @CollectionTable(name = "shipment_images", joinColumns = @JoinColumn(name = "shipment_id"))
    @Column(name = "image_url")
    private List<String> images;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "confirmed_transporter_id")
    private Transporter confirmedTransporter;

    public void setImages(List<String> images) {
        if (images != null && images.size() > 7) {
            throw new IllegalArgumentException("You can upload a maximum of 7 images.");
        }
        this.images = images;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getPickupLocation() { return pickupLocation; }
    public void setPickupLocation(String pickupLocation) { this.pickupLocation = pickupLocation; }

    public String getDropoffLocation() { return dropoffLocation; }
    public void setDropoffLocation(String dropoffLocation) { this.dropoffLocation = dropoffLocation; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getReceiverPhone() { return receiverPhone; }
    public void setReceiverPhone(String receiverPhone) { this.receiverPhone = receiverPhone; }

    public Double getWeight() { return weight; }
    public void setWeight(Double weight) { this.weight = weight; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Double getProposedPrice() { return proposedPrice; }
    public void setProposedPrice(Double proposedPrice) { this.proposedPrice = proposedPrice; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public List<String> getImages() { return images; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Transporter getConfirmedTransporter() { return confirmedTransporter; }
    public void setConfirmedTransporter(Transporter confirmedTransporter) {
        this.confirmedTransporter = confirmedTransporter;
    }
    public Double getDistance() {
        return distance;
    }

    public void setDistance(Double distance) {
        this.distance = distance;
    }
    public boolean isReviewGiven() {
        return reviewGiven;
    }

    public void setReviewGiven(boolean reviewGiven) {
        this.reviewGiven = reviewGiven;
    }

}
