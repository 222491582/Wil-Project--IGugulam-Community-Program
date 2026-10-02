package za.ac.cput.igugulamcommunityprogrambackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Guardian;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Learner;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Status;
import za.ac.cput.igugulamcommunityprogrambackend.repository.LearnerRepository;

import java.util.List;
import java.util.Optional;

@Service
public class LearnerService {

    private final LearnerRepository learnerRepository;

    @Autowired
    public LearnerService(LearnerRepository learnerRepository) {
        this.learnerRepository = learnerRepository;
    }

    public Learner save(Learner learner) {
        if (learner.getGuardian() == null) {
            throw new IllegalArgumentException("Learner must have a guardian");
        }
        return learnerRepository.save(learner);
    }

    public List<Learner> findAll() {
        return learnerRepository.findAll();
    }

    public Optional<Learner> findById(Long id) {
        return learnerRepository.findById(id);
    }

    public List<Learner> findByGuardian(Guardian guardian) {
        return learnerRepository.findByGuardian(guardian);
    }

    public List<Learner> findByGuardianId(Long guardianId) {
        return learnerRepository.findByGuardianId(guardianId);
    }

    public List<Learner> findByGrade(String grade) {
        return learnerRepository.findByGrade(grade);
    }

    public List<Learner> findByStatus(Status status) {
        return learnerRepository.findByStatus(status);
    }

    public Learner update(Learner learner) {
        Learner existing = learnerRepository.findById(learner.getId())
                .orElseThrow(() -> new RuntimeException("Learner not found"));

        existing.setFullName(learner.getFullName());
        existing.setGrade(learner.getGrade());
        existing.setSubjectsNeedingSupport(learner.getSubjectsNeedingSupport());
        existing.setEmergencyContact(learner.getEmergencyContact());
        existing.setStatus(learner.getStatus());

        return learnerRepository.save(existing);
    }

    public void deleteById(Long id) {
        if (!learnerRepository.existsById(id)) {
            throw new RuntimeException("Learner not found");
        }
        learnerRepository.deleteById(id);
    }
}