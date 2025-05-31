package com.example.transport.controller;
import com.example.transport.entities.Notification;
import com.example.transport.repository.NotificationRepository;
import org.springframework.web.multipart.MultipartFile;
import com.example.transport.entities.Role;
import com.example.transport.entities.Transporter;
import com.example.transport.entities.User;
import com.example.transport.repository.TransporterRepository;
import com.example.transport.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/auth/register")
public class TransporterAuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransporterRepository transporterRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private NotificationRepository notificationRepository;

    @PostMapping(value = "/transporter", consumes = "multipart/form-data")
    public ResponseEntity<Map<String, String>> registerTransporter(
            @RequestParam("username") String username,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("phone") String phone,
            @RequestParam("vehicleType") String vehicleType,
            @RequestParam("plateNumber") String plateNumber,
            @RequestParam("licenseImage") MultipartFile licenseImage,
            @RequestParam("vehicleRegistrationImage") MultipartFile vehicleRegistrationImage
    ) {
        Map<String, String> response = new HashMap<>();

        if (userRepository.findByEmail(email).isPresent()) {
            response.put("error", "Email already in use.");
            return ResponseEntity.badRequest().body(response);
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(Role.TRANSPORTER);
        userRepository.save(user);

        Transporter transporter = new Transporter();
        transporter.setUser(user);
        transporter.setPhone(phone);
        transporter.setVehicleType(vehicleType);
        transporter.setPlateNumber(plateNumber);
        transporter.setApproved(false);
        transporter.setAvailable(true);

        try {
            transporter.setLicenseImage(licenseImage.getBytes());
            transporter.setVehicleRegistrationImage(vehicleRegistrationImage.getBytes());
        } catch (IOException e) {
            response.put("error", "Error processing uploaded images.");
            return ResponseEntity.status(500).body(response);
        }

        transporterRepository.save(transporter);
        notifyAdmins(
                "NEW_TRANSPORTER_APPLICATION",
                "A new transporter has registered and is awaiting approval."
        );

        response.put("message", "Transporter registered successfully. Awaiting admin approval.");
        return ResponseEntity.ok(response);

    }
    private void notifyAdmins(String type, String message) {
        // Récupérer tous les admins depuis la base
        for (User admin : userRepository.findByRole(Role.ADMIN)) {
            Notification notif = new Notification(
                    admin.getId(),
                    type,
                    message
            );
            notificationRepository.save(notif);
        }
    }

}
