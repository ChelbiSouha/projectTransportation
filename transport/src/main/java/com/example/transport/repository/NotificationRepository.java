package com.example.transport.repository;
import com.example.transport.entities.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserIdOrderByTimestampDesc(Long userId);
    List<Notification> findByUserIdAndIsReadFalse(Long userId);
}

