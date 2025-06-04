package com.example.transport.controller;

import java.util.Map;

import com.example.transport.entities.CarLocationConsumer;
import com.example.transport.entities.CarLocationUpdate;
import com.example.transport.entities.Transporter;
import com.example.transport.repository.TransporterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class ApiCarController {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;

    @Autowired
    private CarLocationConsumer carLocationConsumer;
    @Autowired
    private TransporterRepository transporterRepository;

    @Autowired
    public ApiCarController(KafkaTemplate<String, String> kafkaTemplate, ObjectMapper objectMapper) {
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = objectMapper;
    }

    @PostMapping("/updateLocation")
    @ResponseBody
    public ResponseEntity<String> updateLocation(@RequestBody CarLocationUpdate locationUpdate, Principal principal)
            throws JsonProcessingException {

        String username = principal.getName();

        Transporter transporter = transporterRepository.findByUserUsername(username)
                .orElse(null);

        if (transporter == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Transporter not found");
        }

        locationUpdate.setCarId(transporter.getPlateNumber());

        kafkaTemplate.send("car-tracking-topic", locationUpdate.getCarId(),
                objectMapper.writeValueAsString(locationUpdate));

        return ResponseEntity.ok("Location update sent to Kafka: " + locationUpdate.toString());
    }

    @GetMapping("/all-locations")
    @ResponseBody
    public Map<String, CarLocationUpdate> getAllLocations() {
        return carLocationConsumer.getAllLocations();
    }

    @GetMapping("/online-status")
    @ResponseBody
    public Map<String, Boolean> getOnlineStatus() {
        return carLocationConsumer.getOnlineStatus();
    }

    @GetMapping("/ping")
    public String ping() {
        return "API is alive";
    }
}
