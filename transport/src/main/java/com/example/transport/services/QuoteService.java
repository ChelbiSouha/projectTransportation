package com.example.transport.services;

import com.example.transport.entities.Quote;
import com.example.transport.entities.Shipment;
import com.example.transport.repository.QuoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class QuoteService {

    @Autowired
    private QuoteRepository quoteRepository;

    // Créer un nouveau devis avec calcul automatique du prix
    public Quote createQuote(Quote quote) {
        Shipment shipment = quote.getShipment();

        if (shipment != null) {
            double distance = calculateDistanceInKm(shipment.getPickupLocation(), shipment.getDropoffLocation());
            double weight = shipment.getWeight(); // Assure-toi que Shipment a getWeight()

            // Logique de tarification simple
            double price = (distance * 1.0) + (weight * 0.2);
            quote.setEstimatedPrice(price);
        }

        quote.setDate(LocalDateTime.now());

        return quoteRepository.save(quote);
    }

    // Exemple de méthode de calcul de distance (simulation)
    private double calculateDistanceInKm(String origin, String destination) {
        // Ici tu pourrais utiliser l’API Google Maps ou une table de distances en BD
        // Pour l'instant, une fausse logique :
        if (origin.equalsIgnoreCase(destination)) {
            return 5.0; // minimum
        }
        return 100.0; // par défaut : 100 km
    }

    public List<Quote> getAllQuotes() {
        return quoteRepository.findAll();
    }

    public List<Quote> getQuotesByShipmentId(Long shipmentId) {
        return quoteRepository.findByShipmentId(shipmentId);
    }

    public List<Quote> getQuotesByTransporterId(Long transporterId) {
        return quoteRepository.findByTransporterId(transporterId);
    }

    public Quote updateQuote(Long quoteId, Quote updatedQuote) {
        Quote existing = quoteRepository.findById(quoteId).orElse(null);
        if (existing != null) {
            existing.setEstimatedPrice(updatedQuote.getEstimatedPrice());
            existing.setClientApproved(updatedQuote.getClientApproved());
            existing.setTransporterApproved(updatedQuote.getTransporterApproved());
            return quoteRepository.save(existing);
        }
        return null;
    }
}
