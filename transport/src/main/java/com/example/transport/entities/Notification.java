package com.example.transport.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; // who receives the notification

    private String type; // e.g., NEW_TRANSPORTER_APPLICATION, SHIPMENT_DELIVERED

    @Column(length = 500)
    private String message;

    private boolean isRead = false;

    private LocalDateTime timestamp = LocalDateTime.now();

    // Constructors
    public Notification() {}

    public Notification(Long userId, String type, String message) {
        this.userId = userId;
        this.type = type;
        this.message = message;
        this.isRead = false;
        this.timestamp = LocalDateTime.now();
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        isRead = read;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
