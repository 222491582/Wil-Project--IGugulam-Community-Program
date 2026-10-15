package za.ac.cput.igugulamcommunityprogrambackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Announcements;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcements, Long> {
}
