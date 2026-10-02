package za.ac.cput.igugulamcommunityprogrambackend.service;



import za.ac.cput.igugulamcommunityprogrambackend.Announcement;
import za.ac.cput.igugulamcommunityprogrambackend.AnnouncementRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnnouncementService {

    private final AnnouncementRepository announcementRepository;

    public AnnouncementService(AnnouncementRepository announcementRepository) {
        this.announcementRepository = announcementRepository;
    }

    public List<Announcement> getAllAnnouncements() {
        return announcementRepository.findAll();
    }

    public Optional<Announcement> getAnnouncementById(Long id) {
        return announcementRepository.findById(id);
    }

    public Announcement createAnnouncement(Announcement announcement) {
        return announcementRepository.save(announcement);
    }

    public Announcement updateAnnouncement(Long id, Announcement updatedAnnouncement) {

        return announcementRepository.findById(id)
                .map(existing -> {

                    existing.setTitle(updatedAnnouncement.getTitle());
                    existing.setMessage(updatedAnnouncement.getMessage());
                    existing.setAuthor(updatedAnnouncement.getAuthor());

                    return announcementRepository.save(existing);
                })
                .orElseThrow(() ->
                        new RuntimeException("Announcement not found with ID: " + id));
    }

    public void deleteAnnouncement(Long id) {
        announcementRepository.deleteById(id);
    }
}
