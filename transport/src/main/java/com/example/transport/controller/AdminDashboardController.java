package com.example.transport.controller;

import com.example.transport.entities.User;
import com.example.transport.repository.ReviewRepository;
import com.example.transport.repository.ShipmentRepository;
import com.example.transport.repository.TransporterRepository;
import com.example.transport.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.transport.entities.*;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/admin-dashboard")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminDashboardController {

    @Autowired private UserRepository userRepository;
    @Autowired private ShipmentRepository shipmentRepository;
    @Autowired private TransporterRepository transporterRepository;
    @Autowired private ReviewRepository reviewRepository;

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
                transporterRepository.delete(transporter);
            }
            userRepository.delete(userOpt.get());
            return ResponseEntity.ok("Transporter rejected and user deleted.");
        }
        return ResponseEntity.badRequest().body("User not found or not a transporter.");
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
