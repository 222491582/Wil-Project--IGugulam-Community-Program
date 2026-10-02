package za.ac.cput.igugulamcommunityprogrambackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Guardian;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Status;

import java.util.List;
import java.util.Optional;

@Repository
public interface GuardianRepository extends JpaRepository<Guardian, Long> {

    Optional<Guardian> findByUsername(String username);

    Optional<Guardian> findByEmail(String email);

    List<Guardian> findByStatus(Status status);

    List<Guardian> findByRelationshipToStudent(String relationshipToStudent);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}