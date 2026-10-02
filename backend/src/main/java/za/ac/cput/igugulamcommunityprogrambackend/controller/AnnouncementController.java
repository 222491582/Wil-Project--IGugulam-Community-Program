package za.ac.cput.igugulamcommunityprogrambackend.controller;


import za.ac.cput.igugulamcommunityprogrambackend.Announcement;
import za.ac.cput.igugulamcommunityprogrambackend.service.AnnouncementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/announcements")
@CrossOrigin(origins = "*")


public class AnnouncementController {
    private final AnnouncementService announcementService;

    public AnnouncementController(AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

    // GET all announcements
    @GetMapping
    public List<Announcement> getAllAnnouncements() {
        return announcementService.getAllAnnouncements();
    }

    // GET one announcement
    @GetMapping("/{id}")
    public ResponseEntity<Announcement> getAnnouncementById(@PathVariable Long id) {

        return announcementService.getAnnouncementById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // CREATE announcement
    @PostMapping
    public Announcement createAnnouncement(
            @RequestBody Announcement announcement) {

        return announcementService.createAnnouncement(announcement);
    }

    // UPDATE announcement
    @PutMapping("/{id}")
    public Announcement updateAnnouncement(
            @PathVariable Long id,
            @RequestBody Announcement announcement) {

        return announcementService.updateAnnouncement(id, announcement);
    }

    // DELETE announcement
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnnouncement(
            @PathVariable Long id) {

        announcementService.deleteAnnouncement(id);

        return ResponseEntity.noContent().build();
    }

}

