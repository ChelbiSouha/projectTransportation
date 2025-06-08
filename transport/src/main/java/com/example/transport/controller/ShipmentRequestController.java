package com.example.transport.controller;

import com.example.transport.entities.Notification;
import com.example.transport.entities.Shipment;
import com.example.transport.entities.ShipmentRequest;
import com.example.transport.repository.NotificationRepository;
import com.example.transport.services.ShipmentRequestService;
import com.example.transport.services.ShipmentServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/shipment-requests")
public class ShipmentRequestController {
    @Autowired
    private ShipmentServiceInterface shipmentService;

    @Autowired
    private ShipmentRequestService requestService;
    @Autowired
    private NotificationRepository notificationRepository;

    @PostMapping("/create")
    public ResponseEntity<ShipmentRequest> createRequest(@RequestBody ShipmentRequest request) {
        Long shipmentId = request.getShipment().getId();
        Long transporterId = request.getTransporter().getId();

        if (requestService.exists(shipmentId, transporterId)) {
            return ResponseEntity.badRequest().build();
        }

        Shipment shipment = shipmentService.getShipmentById(shipmentId);
        if (shipment == null) {
            return ResponseEntity.badRequest().body(null);
        }

        request.setShipment(shipment);

        ShipmentRequest createdRequest = requestService.createRequest(request);

        Long clientUserId = shipment.getUser().getId();

        Notification notif = new Notification(
                clientUserId,
                "NEW_SHIPMENT_REQUEST",
                "A transporter has sent a request for your shipment #" + shipmentId
        );

        notificationRepository.save(notif);

        return ResponseEntity.ok(createdRequest);
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
