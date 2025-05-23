package com.example.transport.serviceImplement;

import com.example.transport.entities.Transporter;
import com.example.transport.repository.TransporterRepository;
import com.example.transport.services.TransporterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransporterServiceImpl implements TransporterService {

    @Autowired
    private TransporterRepository transporterRepository;

    @Override
    public Transporter addTransporter(Transporter transporter) {
        return transporterRepository.save(transporter);
    }

    @Override
    public List<Transporter> getAllTransporters() {
        return transporterRepository.findAll();
    }

    @Override
    public Transporter getTransporterById(Long id) {
        Optional<Transporter> optional = transporterRepository.findById(id);
        return optional.orElse(null);
    }

    @Override
    public Transporter updateTransporter(Long id, Transporter transporter) {
        Optional<Transporter> optional = transporterRepository.findById(id);
        if (optional.isPresent()) {
            Transporter existing = optional.get();
            existing.setPhone(transporter.getPhone());
            existing.setVehicleType(transporter.getVehicleType());
            existing.setAvailable(transporter.isAvailable());
            existing.setPlateNumber(transporter.getPlateNumber());
            existing.setLicenseImage(transporter.getLicenseImage());
            existing.setVehicleRegistrationImage(transporter.getVehicleRegistrationImage());

            return transporterRepository.save(existing);
        }
        return null;
    }


    @Override
    public boolean deleteTransporter(Long id) {
        if (transporterRepository.existsById(id)) {
            transporterRepository.deleteById(id);
            return true;
        }
        return false;
    }
    @Override
    public List<Transporter> getPendingTransporters() {
        return transporterRepository.findByApprovedFalse();
    }
    @Override
    public Optional<Transporter> getTransporterByUserId(Long userId) {
        return transporterRepository.findById(userId); // car Transporter et User partagent le même ID
    }


}
