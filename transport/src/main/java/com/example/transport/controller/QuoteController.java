package com.example.transport.controller;

import com.example.transport.entities.Quote;
import com.example.transport.services.QuoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/quote")
public class QuoteController {

    @Autowired
    private QuoteService quoteService;

    @PostMapping("/add")
    public ResponseEntity<Quote> createQuote(@RequestBody Quote quote) {
        Quote createdQuote = quoteService.createQuote(quote);
        return ResponseEntity.ok(createdQuote);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Quote>> getAllQuotes() {
        return ResponseEntity.ok(quoteService.getAllQuotes());
    }

    @GetMapping("/shipment/{shipmentId}")
    public ResponseEntity<List<Quote>> getQuotesByShipmentId(@PathVariable Long shipmentId) {
        return ResponseEntity.ok(quoteService.getQuotesByShipmentId(shipmentId));
    }

    @GetMapping("/transporter/{transporterId}")
    public ResponseEntity<List<Quote>> getQuotesByTransporterId(@PathVariable Long transporterId) {
        return ResponseEntity.ok(quoteService.getQuotesByTransporterId(transporterId));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Quote> updateQuote(@PathVariable Long id, @RequestBody Quote updatedQuote) {
        Quote quote = quoteService.updateQuote(id, updatedQuote);
        return ResponseEntity.ok(quote);
    }
}
