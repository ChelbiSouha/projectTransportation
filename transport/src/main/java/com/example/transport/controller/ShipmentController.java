package com.example.transport.controller;

import com.example.transport.entities.*;
import com.example.transport.repository.NotificationRepository;
import com.example.transport.repository.UserRepository;
import com.example.transport.services.ShipmentServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/shipment")
public class ShipmentController {

    @Autowired
    private ShipmentServiceInterface shipmentService;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository; // 🔧 Ajouté

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
    @GetMapping("/confirmed-transporter/{transporterId}")
    public List<Shipment> getConfirmedShipmentsForTransporter(@PathVariable Long transporterId) {
        return shipmentService.getShipmentsByConfirmedTransporterId(transporterId);
    }
    @PutMapping("/confirm-transporter/{shipmentId}/{transporterId}")
    public ResponseEntity<?> confirmTransporter(
            @PathVariable Long shipmentId,
            @PathVariable Long transporterId) {
        Shipment updated = shipmentService.confirmTransporterForShipment(shipmentId, transporterId);
        Long transporterUserId = updated.getConfirmedTransporter().getUser().getId();
        Notification notif = new Notification(
                transporterUserId,
                "SHIPMENT_CONFIRMED",
                "User " + updated.getUser().getUsername() + " confirmed the shipment with you."
        );
        notificationRepository.save(notif);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/status/{status}")
    public List<Shipment> getShipmentsByStatus(@PathVariable String status) {
        return shipmentService.getShipmentsByStatus(status);
    }
    @PutMapping("/complete/{shipmentId}")
    public ResponseEntity<?> markShipmentAsCompleted(@PathVariable Long shipmentId) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();

            Shipment shipment = shipmentService.markAsCompletedByTransporter(shipmentId, username);

            // ✅ Notification pour le client
            Notification notifClient = new Notification(
                    shipment.getUser().getId(),
                    "SHIPMENT_COMPLETED",
                    "Your shipment has been marked as completed by the transporter."
            );
            notificationRepository.save(notifClient);

            return ResponseEntity.ok(shipment);
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/mark-delivered/{shipmentId}")
    public ResponseEntity<?> markShipmentAsDelivered(@PathVariable Long shipmentId) {
        Shipment shipment = shipmentService.markAsDelivered(shipmentId);

        // ✅ Notification pour l’utilisateur
        Notification notifUser = new Notification(
                shipment.getUser().getId(),
                "SHIPMENT_DELIVERED",
                "Your shipment has been delivered successfully."
        );
        notificationRepository.save(notifUser);

        // ✅ Notification pour l’administrateur
        Optional<User> admin = userRepository.findFirstByRole(Role.ADMIN);
        admin.ifPresent(a -> {
            Notification notifAdmin = new Notification(
                    a.getId(),
                    "SHIPMENT_DELIVERED",
                    "Shipment #" + shipment.getId() + " has been delivered."
            );
            notificationRepository.save(notifAdmin);
        });

        return ResponseEntity.ok("Shipment marked as delivered.");
    }
}
