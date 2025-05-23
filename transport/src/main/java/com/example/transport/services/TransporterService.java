package com.example.transport.services;

import com.example.transport.entities.Transporter;

import java.util.List;
import java.util.Optional;

public interface TransporterService {
    Transporter addTransporter(Transporter transporter);
    List<Transporter> getAllTransporters();
    Transporter getTransporterById(Long id);
    Transporter updateTransporter(Long id, Transporter transporter);
    boolean deleteTransporter(Long id);
    List<Transporter> getPendingTransporters();
    Optional<Transporter> getTransporterByUserId(Long userId);

}
