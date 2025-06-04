package com.example.transport.services;

import com.example.transport.entities.Shipment;

import java.util.List;

public interface ShipmentServiceInterface {

    Shipment addShipment(Shipment shipment);

    List<Shipment> getAllShipments();

    Shipment getShipmentById(Long id);

    Shipment updateShipment(Long id, Shipment shipment);

    void deleteShipment(Long id);
    Shipment confirmTransporterForShipment(Long shipmentId, Long transporterId);

    List<Shipment> getShipmentsByUserId(Long userId);
    List<Shipment> searchShipmentsByLocation(String keyword);
    List<Shipment> getShipmentsByStatus(String status);
    Shipment markAsDelivered(Long shipmentId);
    Shipment markAsCompletedByTransporter(Long shipmentId, String username);
    List<Shipment> getShipmentsByConfirmedTransporterId(Long transporterId);



}
