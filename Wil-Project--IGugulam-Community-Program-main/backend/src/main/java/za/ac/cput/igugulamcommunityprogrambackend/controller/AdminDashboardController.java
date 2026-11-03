package za.ac.cput.igugulamcommunityprogrambackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Status;
import za.ac.cput.igugulamcommunityprogrambackend.domain.User;
import za.ac.cput.igugulamcommunityprogrambackend.dto.UserAdminSummary;
import za.ac.cput.igugulamcommunityprogrambackend.repository.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminDashboardController {
    private final UserRepository users;
    private final HomeworkRepository homework;
    private final AnnouncementRepository announcements;
    private final StudyResourcesRepository resources;
    private final ContactRequestRepository contactRequests;

    public AdminDashboardController(
            UserRepository users,
            HomeworkRepository homework,
            AnnouncementRepository announcements,
            StudyResourcesRepository resources,
            ContactRequestRepository contactRequests
    ) {
        this.users = users;
        this.homework = homework;
        this.announcements = announcements;
        this.resources = resources;
        this.contactRequests = contactRequests;
    }

    @GetMapping("/dashboard")
    public Map<String, Long> dashboard() {
        return Map.of(
                "users", users.count(),
                "homework", homework.count(),
                "announcements", announcements.count(),
                "studyResources", resources.count(),
                "contactRequests", contactRequests.count()
        );
    }

    @GetMapping("/users")
    public List<UserAdminSummary> users() {
        return users.findAll().stream()
                .map(user -> new UserAdminSummary(
                        user.getId(), user.getUsername(), user.getEmail(), user.getFullName(),
                        user.getRole(), user.getStatus()))
                .toList();
    }

    @PatchMapping("/users/{id}/status")
    public UserAdminSummary updateUserStatus(
            @PathVariable Long id,
            @RequestBody StatusUpdate update,
            @AuthenticationPrincipal String adminUsername
    ) {
        User user = users.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        if (update.status() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Status is required");
        }
        if (user.getUsername().equals(adminUsername) && update.status() == Status.SUSPENDED) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You cannot suspend your own account");
        }
        user.setStatus(update.status());
        user = users.save(user);
        return new UserAdminSummary(
                user.getId(), user.getUsername(), user.getEmail(), user.getFullName(),
                user.getRole(), user.getStatus());
    }

    public record StatusUpdate(Status status) {
    }
}
