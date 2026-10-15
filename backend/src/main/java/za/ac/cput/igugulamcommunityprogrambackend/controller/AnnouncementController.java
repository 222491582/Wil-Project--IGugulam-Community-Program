package za.ac.cput.igugulamcommunityprogrambackend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Announcements;
import za.ac.cput.igugulamcommunityprogrambackend.repository.AnnouncementRepository;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/announcements")
public class AnnouncementController {
    private final AnnouncementRepository announcements;

    public AnnouncementController(AnnouncementRepository announcements) {
        this.announcements = announcements;
    }

    @GetMapping
    public List<Announcements> findAll() {
        return announcements.findAll();
    }

    @GetMapping("/{id}")
    public Announcements findById(@PathVariable Long id) {
        return announcements.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Announcement not found"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Announcements create(@RequestBody Announcements announcement) {
        requireText(announcement.getTitle(), "Title");
        requireText(announcement.getContent(), "Content");
        if (announcement.getCategory() == null || announcement.getCategory().isBlank()) {
            announcement.setCategory("general");
        }
        if (announcement.getCreatedDate() == null || announcement.getCreatedDate().isBlank()) {
            announcement.setCreatedDate(LocalDate.now().toString());
        }
        return announcements.save(announcement);
    }

    @PutMapping("/{id}")
    public Announcements update(@PathVariable Long id, @RequestBody Announcements incoming) {
        Announcements current = findById(id);
        requireText(incoming.getTitle(), "Title");
        requireText(incoming.getContent(), "Content");
        current.setTitle(incoming.getTitle());
        current.setContent(incoming.getContent());
        current.setCategory(incoming.getCategory());
        if (incoming.getCreatedDate() != null && !incoming.getCreatedDate().isBlank()) {
            current.setCreatedDate(incoming.getCreatedDate());
        }
        return announcements.save(current);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        if (!announcements.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Announcement not found");
        }
        announcements.deleteById(id);
    }

    private static void requireText(String value, String field) {
        if (value == null || value.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, field + " is required");
        }
    }
}
