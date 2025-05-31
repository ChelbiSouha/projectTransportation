package com.example.transport.controller;
import com.example.transport.entities.Notification;
import com.example.transport.repository.UserRepository;
import com.example.transport.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    private final NotificationService notificationService;
    @Autowired
    private UserRepository userRepository;

    private Long getUserIdFromPrincipal(Principal principal) {
        String username = principal.getName();  // extrait du JWT
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getId();
    }

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }
    @PostMapping("/notify-test")
    public void notifyTest(@RequestParam Long userId) {
        notificationService.createNotification(new Notification(userId, "TEST", "Test message"));
    }

    @GetMapping
    public List<Notification> getMyNotifications(Principal principal) {
        Long userId = getUserIdFromPrincipal(principal);  // Implement this to extract userId
        return notificationService.getUserNotifications(userId);
    }
    @PostMapping("/add")
    public Notification addNotification(@RequestBody Notification notification) {
        return notificationService.createNotification(notification);
    }

    @PutMapping("/{id}/read")
    public void markNotificationRead(@PathVariable Long id, Principal principal) {
        // Optionally check if notification belongs to user before marking read
        notificationService.markAsRead(id);
    }

}

