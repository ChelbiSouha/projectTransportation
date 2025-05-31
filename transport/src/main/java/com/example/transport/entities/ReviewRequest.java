package com.example.transport.entities;

import jakarta.validation.constraints.*;

public class ReviewRequest {

    @Min(1)
    @Max(5)
    private int rating;

    @NotBlank
    @Size(max = 500)
    private String comment;

    @NotNull
    private Long transporterId;

    @NotNull
    private Long shipmentId;

    // Getters et Setters
    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }


    public Long getTransporterId() {
        return transporterId;
    }

    public void setTransporterId(Long transporterId) {
        this.transporterId = transporterId;
    }

    public Long getShipmentId() {
        return shipmentId;
    }

    public void setShipmentId(Long shipmentId) {
        this.shipmentId = shipmentId;
    }
}
