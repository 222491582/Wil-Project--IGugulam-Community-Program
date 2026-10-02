package za.ac.cput.igugulamcommunityprogrambackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Guardian;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Learner;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Status;

import java.util.List;

@Repository
public interface LearnerRepository extends JpaRepository<Learner, Long> {

    List<Learner> findByGuardian(Guardian guardian);

    List<Learner> findByGuardianId(Long guardianId);

    List<Learner> findByGrade(String grade);

    List<Learner> findByStatus(Status status);

    List<Learner> findByFullName(String fullName);
}