package com.example.transport.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Quote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double estimatedPrice; // system-generated estimated price
    private LocalDateTime date;

    private Boolean clientApproved = false;
    private Boolean transporterApproved = false;

    @ManyToOne
    @JoinColumn(name = "shipment_id")
    private Shipment shipment;

    @ManyToOne
    @JoinColumn(name = "transporter_id")
    private Transporter transporter;

    public Quote() {}

    public Quote(Double estimatedPrice, LocalDateTime date, Shipment shipment, Transporter transporter) {
        this.estimatedPrice = estimatedPrice;
        this.date = date;
        this.shipment = shipment;
        this.transporter = transporter;
    }

    public Long getId() {
        return id;
    }

    public Double getEstimatedPrice() {
        return estimatedPrice;
    }

    public void setEstimatedPrice(Double estimatedPrice) {
        this.estimatedPrice = estimatedPrice;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public Boolean getClientApproved() {
        return clientApproved;
    }

    public void setClientApproved(Boolean clientApproved) {
        this.clientApproved = clientApproved;
    }

    public Boolean getTransporterApproved() {
        return transporterApproved;
    }

    public void setTransporterApproved(Boolean transporterApproved) {
        this.transporterApproved = transporterApproved;
    }

    public Shipment getShipment() {
        return shipment;
    }

    public void setShipment(Shipment shipment) {
        this.shipment = shipment;
    }

    public Transporter getTransporter() {
        return transporter;
    }

    public void setTransporter(Transporter transporter) {
        this.transporter = transporter;
    }

    @Override
    public String toString() {
        return "Quote{" +
                "id=" + id +
                ", estimatedPrice=" + estimatedPrice +
                ", date=" + date +
                ", clientApproved=" + clientApproved +
                ", transporterApproved=" + transporterApproved +
                ", shipment=" + (shipment != null ? shipment.getId() : null) +
                ", transporter=" + (transporter != null ? transporter.getId() : null) +
                '}';
    }
}
