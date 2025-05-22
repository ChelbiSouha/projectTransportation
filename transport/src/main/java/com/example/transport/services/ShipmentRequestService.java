package com.example.transport.services;

import com.example.transport.entities.ShipmentRequest;
import com.example.transport.repository.ShipmentRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShipmentRequestService {

    @Autowired
    private ShipmentRequestRepository requestRepository;

    public ShipmentRequest createRequest(ShipmentRequest request) {
        return requestRepository.save(request);
    }

    public List<ShipmentRequest> getRequestsByShipment(Long shipmentId) {
        return requestRepository.findByShipmentId(shipmentId);
    }

    public List<ShipmentRequest> getRequestsByTransporter(Long transporterId) {
        return requestRepository.findByTransporterId(transporterId);
    }

    public boolean exists(Long shipmentId, Long transporterId) {
        return requestRepository.existsByShipmentIdAndTransporterId(shipmentId, transporterId);
    }
}
