package za.ac.cput.igugulamcommunityprogrambackend.repository;


import za.ac.cput.igugulamcommunityprogrambackend.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
}

