package com.example.transport.controller;
import com.example.transport.entities.Shipment;
import com.example.transport.services.ShipmentServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/shipment")
public class ShipmentController {

    @Autowired
    private ShipmentServiceInterface shipmentService;

    @PostMapping("/add")
    public Shipment addShipment(@RequestBody Shipment shipment) {
        return shipmentService.addShipment(shipment);
    }

    @GetMapping("/all")
    public List<Shipment> getAllShipments() {
        return shipmentService.getAllShipments();
    }

    @GetMapping("/id/{id}")
    public Shipment getShipmentById(@PathVariable Long id) {
        return shipmentService.getShipmentById(id);
    }

    @PutMapping("/update/{id}")
    public Shipment updateShipment(@PathVariable Long id, @RequestBody Shipment shipment) {
        return shipmentService.updateShipment(id, shipment);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteShipment(@PathVariable Long id) {
        shipmentService.deleteShipment(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/{userId}")
    public List<Shipment> getShipmentsByUserId(@PathVariable Long userId) {
        return shipmentService.getShipmentsByUserId(userId);
    }
    @GetMapping("/search")
    public ResponseEntity<List<Shipment>> searchShipments(@RequestParam String location) {
        List<Shipment> results = shipmentService.searchShipmentsByLocation(location);
        return ResponseEntity.ok(results);
    }
    @PutMapping("/confirm-transporter/{shipmentId}/{transporterId}")
    public ResponseEntity<?> confirmTransporter(
            @PathVariable Long shipmentId,
            @PathVariable Long transporterId) {
        Shipment updated = shipmentService.confirmTransporterForShipment(shipmentId, transporterId);
        return ResponseEntity.ok(updated);
    }
    @GetMapping("/status/{status}")
    public List<Shipment> getShipmentsByStatus(@PathVariable String status) {
        return shipmentService.getShipmentsByStatus(status);
    }



}
