package za.ac.cput.igugulamcommunityprogrambackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Learner;

import java.util.List;

@Repository
public interface LearnerRepository extends JpaRepository<Learner, Long> {
    List<Learner> findByGuardianGuardianId(Long guardianId);
    List<Learner> findByEmailIgnoreCase(String email);
}
