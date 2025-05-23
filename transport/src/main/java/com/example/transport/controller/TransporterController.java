package com.example.transport.controller;

import com.example.transport.entities.Transporter;
import com.example.transport.repository.TransporterRepository;
import com.example.transport.services.TransporterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/transporters")
public class TransporterController {

    @Autowired
    private TransporterService transporterService;
    @Autowired
    private TransporterRepository transporterRepository;

    // Ajouter un transporteur
    @PostMapping("/add")
    public ResponseEntity<Transporter> addTransporter(@RequestBody Transporter transporter) {
        Transporter createdTransporter = transporterService.addTransporter(transporter);
        return ResponseEntity.ok(createdTransporter);
    }

    // Obtenir tous les transporteurs
    @GetMapping("/all")
    public ResponseEntity<List<Transporter>> getAllTransporters() {
        List<Transporter> transporters = transporterService.getAllTransporters();
        return ResponseEntity.ok(transporters);
    }

    // Obtenir un transporteur par ID
    @GetMapping("/id/{id}")
    public ResponseEntity<Transporter> getTransporterById(@PathVariable Long id) {
        Transporter transporter = transporterService.getTransporterById(id);
        if (transporter != null) {
            return ResponseEntity.ok(transporter);
        }
        return ResponseEntity.notFound().build();
    }

    // Mettre à jour un transporteur
    @PutMapping("/update/{id}")
    public ResponseEntity<Transporter> updateTransporter(@PathVariable Long id, @RequestBody Transporter transporter) {
        Transporter updatedTransporter = transporterService.updateTransporter(id, transporter);
        if (updatedTransporter != null) {
            return ResponseEntity.ok(updatedTransporter);
        }
        return ResponseEntity.notFound().build();
    }

    // Supprimer un transporteur par ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTransporter(@PathVariable Long id) {
        boolean isDeleted = transporterService.deleteTransporter(id);
        if (isDeleted) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
    @GetMapping("/pending")
    public ResponseEntity<List<Transporter>> getPendingTransporters() {
        return ResponseEntity.ok(transporterService.getPendingTransporters());
    }
    @GetMapping("/by-user/{userId}")
    public ResponseEntity<Transporter> getTransporterByUserId(@PathVariable Long userId) {
        Optional<Transporter> transporter = transporterService.getTransporterByUserId(userId);
        return transporter.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }



}
