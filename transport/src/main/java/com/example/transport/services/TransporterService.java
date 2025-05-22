package com.example.transport.services;

import com.example.transport.entities.Transporter;

import java.util.List;

public interface TransporterService {
    Transporter addTransporter(Transporter transporter);
    List<Transporter> getAllTransporters();
    Transporter getTransporterById(Long id);
    Transporter updateTransporter(Long id, Transporter transporter);
    boolean deleteTransporter(Long id);
    List<Transporter> getPendingTransporters();

}
