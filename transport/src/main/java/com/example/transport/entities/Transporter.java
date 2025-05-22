package com.example.transport.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "transporters")
public class Transporter {

    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private User user;

    private String phone;
    private String vehicleType;
    private boolean available;
    @Lob
    @Column(name = "license_image", columnDefinition = "LONGBLOB")
    private byte[] licenseImage;
    @Lob
    @Column(name = "vehicle_registration_image", columnDefinition = "LONGBLOB")
    private byte[] vehicleRegistrationImage;
    private String plateNumber;
    private boolean approved;

    @OneToMany(mappedBy = "transporter")
    private List<Quote> quotes;

    // Optional: constructor
    public Transporter() {
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public byte[] getLicenseImage() {
        return licenseImage;
    }

    public void setLicenseImage(byte[] licenseImage) {
        this.licenseImage = licenseImage;
    }

    public byte[] getVehicleRegistrationImage() {
        return vehicleRegistrationImage;
    }

    public void setVehicleRegistrationImage(byte[] vehicleRegistrationImage) {
        this.vehicleRegistrationImage = vehicleRegistrationImage;
    }

    public String getPlateNumber() {
        return plateNumber;
    }

    public void setPlateNumber(String plateNumber) {
        this.plateNumber = plateNumber;
    }
    public boolean isApproved() {
        return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }
}
