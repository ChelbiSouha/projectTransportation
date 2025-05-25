package com.example.transport.controller;

import java.util.Map;

import com.example.transport.entities.CarLocationConsumer;
import com.example.transport.entities.CarLocationUpdate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * <H3>
 * ApiCarController
 * </H3>
 *
 * @author manhvud
 * @since 2023/11/16
 */
@RestController
@RequestMapping("/api")
public class ApiCarController {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper                  objectMapper;

    @Autowired
    private CarLocationConsumer carLocationConsumer;

    @Autowired
    public ApiCarController(KafkaTemplate<String, String> kafkaTemplate, ObjectMapper objectMapper) {
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = objectMapper;
    }

    @PostMapping("/updateLocation")
    @ResponseBody
    public String updateLocation(@RequestBody CarLocationUpdate locationUpdate) throws JsonProcessingException {
        // Process the received location update (e.g., save to a database, kafka)
        kafkaTemplate.send("car-tracking-topic", locationUpdate.getCarId(), objectMapper.writeValueAsString(locationUpdate));
        return "Location update sent to Kafka: " + locationUpdate.toString();
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
