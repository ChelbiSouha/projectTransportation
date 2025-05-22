package com.example.transport.repository;

import com.example.transport.entities.Transporter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransporterRepository extends JpaRepository<Transporter, Long> {
    long countByApprovedFalse();
    List<Transporter> findByApprovedFalse();


}
