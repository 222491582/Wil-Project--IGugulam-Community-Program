package za.ac.cput.igugulamcommunityprogrambackend.repository;

import za.ac.cput.igugulamcommunityprogrambackend.domain.ContactRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRequestRepository extends JpaRepository<ContactRequest, Long> {
}
