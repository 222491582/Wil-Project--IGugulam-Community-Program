package za.ac.cput.igugulamcommunityprogrambackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Guardian;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Status;
import za.ac.cput.igugulamcommunityprogrambackend.repository.GuardianRepository;

import java.util.List;
import java.util.Optional;

@Service
public class GuardianService {

    private final GuardianRepository guardianRepository;

    @Autowired
    public GuardianService(GuardianRepository guardianRepository) {
        this.guardianRepository = guardianRepository;
    }

    public Guardian save(Guardian guardian) {
        if (guardianRepository.existsByUsername(guardian.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }
        if (guardianRepository.existsByEmail(guardian.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        return guardianRepository.save(guardian);
    }

    public List<Guardian> findAll() {
        return guardianRepository.findAll();
    }

    public Optional<Guardian> findById(Long id) {
        return guardianRepository.findById(id);
    }

    public Optional<Guardian> findByUsername(String username) {
        return guardianRepository.findByUsername(username);
    }

    public List<Guardian> findByStatus(Status status) {
        return guardianRepository.findByStatus(status);
    }

    public Guardian update(Guardian guardian) {
        Guardian existing = guardianRepository.findById(guardian.getId())
                .orElseThrow(() -> new RuntimeException("Guardian not found"));

        existing.setFullName(guardian.getFullName());
        existing.setEmail(guardian.getEmail());
        existing.setPhone(guardian.getPhone());
        existing.setRelationshipToStudent(guardian.getRelationshipToStudent());
        existing.setAddress(guardian.getAddress());
        existing.setStatus(guardian.getStatus());

        return guardianRepository.save(existing);
    }

    public void deleteById(Long id) {
        if (!guardianRepository.existsById(id)) {
            throw new RuntimeException("Guardian not found");
        }
        guardianRepository.deleteById(id);
    }
}