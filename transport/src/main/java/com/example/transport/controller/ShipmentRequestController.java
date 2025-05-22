package com.example.transport.controller;

import com.example.transport.entities.ShipmentRequest;
import com.example.transport.services.ShipmentRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/shipment-requests")
public class ShipmentRequestController {

    @Autowired
    private ShipmentRequestService requestService;

    @PostMapping("/create")
    public ResponseEntity<ShipmentRequest> createRequest(@RequestBody ShipmentRequest request) {
        if (requestService.exists(request.getShipment().getId(), request.getTransporter().getId())) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(requestService.createRequest(request));
    }

    @GetMapping("/shipment/{shipmentId}")
    public ResponseEntity<List<ShipmentRequest>> getByShipment(@PathVariable Long shipmentId) {
        return ResponseEntity.ok(requestService.getRequestsByShipment(shipmentId));
    }

    @GetMapping("/transporter/{transporterId}")
    public ResponseEntity<List<ShipmentRequest>> getByTransporter(@PathVariable Long transporterId) {
        return ResponseEntity.ok(requestService.getRequestsByTransporter(transporterId));
    }
}
