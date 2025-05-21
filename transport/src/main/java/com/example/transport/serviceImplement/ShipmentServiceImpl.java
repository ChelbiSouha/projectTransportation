package com.example.transport.serviceImplement;

import com.example.transport.entities.Shipment;
import com.example.transport.entities.Transporter;
import com.example.transport.exceptions.ResourceNotFoundException;
import com.example.transport.repository.ShipmentRepository;
import com.example.transport.repository.TransporterRepository;
import com.example.transport.services.ShipmentServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShipmentServiceImpl implements ShipmentServiceInterface {

    private final ShipmentRepository shipmentRepository;
    private final TransporterRepository transporterRepository;

    @Autowired
    public ShipmentServiceImpl(ShipmentRepository shipmentRepository, TransporterRepository transporterRepository) {
        this.shipmentRepository = shipmentRepository;
        this.transporterRepository = transporterRepository;
    }

    @Override
    public Shipment addShipment(Shipment shipment) {
        return shipmentRepository.save(shipment);
    }

    @Override
    public List<Shipment> getAllShipments() {
        return shipmentRepository.findAll();
    }

    @Override
    public Shipment getShipmentById(Long id) {
        return shipmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Shipment not found with ID " + id));
    }

    @Override
    public Shipment updateShipment(Long id, Shipment shipment) {
        Shipment existing = getShipmentById(id);
        shipment.setId(existing.getId()); // preserve ID
        return shipmentRepository.save(shipment);
    }

    @Override
    public void deleteShipment(Long id) {
        Shipment shipment = getShipmentById(id);
        shipmentRepository.delete(shipment);
    }

    @Override
    public Shipment confirmTransporterForShipment(Long shipmentId, Long transporterId) {
        Shipment shipment = getShipmentById(shipmentId);
        Transporter transporter = transporterRepository.findById(transporterId)
                .orElseThrow(() -> new ResourceNotFoundException("Transporter not found with ID " + transporterId));

        shipment.setConfirmedTransporter(transporter);
        shipment.setStatus("Confirmed");
        return shipmentRepository.save(shipment);
    }

    @Override
    public List<Shipment> getShipmentsByUserId(Long userId) {
        return shipmentRepository.findByUserId(userId);
    }

    @Override
    public List<Shipment> getShipmentsByStatus(String status) {
        return shipmentRepository.findByStatus(status);
    }

    @Override
    public List<Shipment> searchShipmentsByLocation(String keyword) {
        return shipmentRepository.searchByLocation(keyword);
    }
}
