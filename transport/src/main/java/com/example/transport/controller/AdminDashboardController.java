package com.example.transport.controller;

import com.example.transport.entities.User;
import com.example.transport.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.transport.entities.*;

import java.util.*;

@RestController
@RequestMapping("/admin-dashboard")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminDashboardController {

    @Autowired private UserRepository userRepository;
    @Autowired private ShipmentRepository shipmentRepository;
    @Autowired private TransporterRepository transporterRepository;
    @Autowired private ReviewRepository reviewRepository;
    @Autowired private NotificationRepository notificationRepository;

    @GetMapping("/stats")
    public Map<String, Long> getDashboardStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("users", userRepository.count());
        stats.put("shipments", shipmentRepository.count());
        stats.put("pendingTransporters", transporterRepository.countByApprovedFalse());
        stats.put("reviews", reviewRepository.count());
        return stats;
    }
    @PutMapping("/approve-transporter/{userId}")
    public ResponseEntity<Map<String, String>> approveTransporter(@PathVariable Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent() && userOpt.get().getRole() == Role.TRANSPORTER) {
            Transporter transporter = userOpt.get().getTransporter();
            if (transporter != null) {
                transporter.setApproved(true);
                transporterRepository.save(transporter);
                Notification notif = new Notification(
                        userId,
                        "TRANSPORTER_APPLICATION_APPROVED",
                        "Your transporter application has been approved."
                );
                notificationRepository.save(notif);
                Map<String, String> response = new HashMap<>();
                response.put("message", "Transporter approved.");
                return ResponseEntity.ok(response);
            }
        }
        Map<String, String> error = new HashMap<>();
        error.put("error", "User not found or not a transporter.");
        return ResponseEntity.badRequest().body(error);
    }
    @DeleteMapping("/reject-transporter/{userId}")
    public ResponseEntity<String> rejectTransporter(@PathVariable Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent() && userOpt.get().getRole() == Role.TRANSPORTER) {
            Transporter transporter = userOpt.get().getTransporter();
            if (transporter != null) {
                Notification notif = new Notification(
                        userId,
                        "TRANSPORTER_APPLICATION_REJECTED",
                        "Your transporter application has been rejected."
                );
                notificationRepository.save(notif);
                transporterRepository.delete(transporter);
            }
            userRepository.delete(userOpt.get());
            return ResponseEntity.ok("Transporter rejected and user deleted.");
        }
        return ResponseEntity.badRequest().body("User not found or not a transporter.");
    }
    @GetMapping("/check-low-rated-transporters")
    public ResponseEntity<String> checkLowRatedTransporters() {
        List<Transporter> transporters = transporterRepository.findAll();
        Optional<User> adminOpt = userRepository.findFirstByRole(Role.ADMIN);
        if (adminOpt.isEmpty()) return ResponseEntity.badRequest().body("No admin found.");

        User admin = adminOpt.get();

        for (Transporter t : transporters) {
            Double avg = reviewRepository.getAverageRatingByTransporterId(t.getId());
            if (avg != null && avg < 2.5) {
                Notification notif = new Notification(
                        admin.getId(),
                        "LOW_AVG_REVIEW",
                        "Transporter " + t.getUser().getUsername() + " has an average review below 2.5."
                );
                notificationRepository.save(notif);
            }
        }

        return ResponseEntity.ok("Notifications for low-rated transporters sent.");
    }

    @GetMapping("/shipments-per-week")
    public Map<String, Integer> getShipmentsPerWeek() {
        Map<String, Integer> data = new LinkedHashMap<>();
        data.put("Week 1", 5);
        data.put("Week 2", 10);
        data.put("Week 3", 15);
        data.put("Week 4", 20);
        return data;
    }
}
