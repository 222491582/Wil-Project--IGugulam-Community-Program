package za.ac.cput.igugulamcommunityprogrambackend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Homework;
import za.ac.cput.igugulamcommunityprogrambackend.domain.HomeworkCompletion;
import za.ac.cput.igugulamcommunityprogrambackend.domain.User;
import za.ac.cput.igugulamcommunityprogrambackend.dto.HomeworkResponse;
import za.ac.cput.igugulamcommunityprogrambackend.dto.HomeworkStatusUpdate;
import za.ac.cput.igugulamcommunityprogrambackend.repository.HomeworkCompletionRepository;
import za.ac.cput.igugulamcommunityprogrambackend.repository.HomeworkRepository;
import za.ac.cput.igugulamcommunityprogrambackend.repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/api/homework")
public class HomeworkController {
    private final HomeworkRepository homework;
    private final HomeworkCompletionRepository completions;
    private final UserRepository users;

    public HomeworkController(
            HomeworkRepository homework,
            HomeworkCompletionRepository completions,
            UserRepository users
    ) {
        this.homework = homework;
        this.completions = completions;
        this.users = users;
    }

    @GetMapping
    public List<HomeworkResponse> findAll(@AuthenticationPrincipal String username) {
        return homework.findAll().stream().map(item -> toResponse(item, username)).toList();
    }

    @GetMapping("/{id}")
    public HomeworkResponse findById(@PathVariable Long id, @AuthenticationPrincipal String username) {
        return toResponse(findEntityById(id), username);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public HomeworkResponse create(@RequestBody Homework item) {
        requireText(item.getTitle(), "Title");
        requireText(item.getSubject(), "Subject");
        requireText(item.getDescription(), "Description");
        requireText(item.getDueDate(), "Due date");
        return toResponse(homework.save(item), null);
    }

    @PutMapping("/{id}")
    public HomeworkResponse update(@PathVariable Long id, @RequestBody Homework incoming) {
        Homework current = findEntityById(id);
        requireText(incoming.getTitle(), "Title");
        requireText(incoming.getSubject(), "Subject");
        requireText(incoming.getDescription(), "Description");
        requireText(incoming.getDueDate(), "Due date");
        current.setTitle(incoming.getTitle());
        current.setSubject(incoming.getSubject());
        current.setDescription(incoming.getDescription());
        current.setDueDate(incoming.getDueDate());
        return toResponse(homework.save(current), null);
    }

    @PatchMapping("/{id}/status")
    @Transactional
    public HomeworkResponse updateStatus(
            @PathVariable Long id,
            @RequestBody HomeworkStatusUpdate incoming,
            @AuthenticationPrincipal String username
    ) {
        requireText(incoming.status(), "Status");
        String status = incoming.status().trim().toLowerCase();
        if (!status.equals("pending") && !status.equals("completed")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Status must be pending or completed");
        }
        Homework item = findEntityById(id);
        User user = users.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        HomeworkCompletion completion = completions
                .findByHomework_HomeworkIdAndUser_Username(id, username)
                .orElseGet(HomeworkCompletion::new);
        completion.setHomework(item);
        completion.setUser(user);
        completion.setStatus(status);
        completions.save(completion);
        return toResponse(item, username);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Transactional
    public void delete(@PathVariable Long id) {
        if (!homework.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Homework not found");
        }
        completions.deleteByHomework_HomeworkId(id);
        homework.deleteById(id);
    }

    private static void requireText(String value, String field) {
        if (value == null || value.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, field + " is required");
        }
    }

    private Homework findEntityById(Long id) {
        return homework.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Homework not found"));
    }

    private HomeworkResponse toResponse(Homework item, String username) {
        String status = "pending";
        if (username != null) {
            status = completions.findByHomework_HomeworkIdAndUser_Username(item.getHomeworkId(), username)
                    .map(HomeworkCompletion::getStatus)
                    .orElse("pending");
        }
        return new HomeworkResponse(
                item.getHomeworkId(), item.getTitle(), item.getSubject(),
                item.getDescription(), item.getDueDate(), status);
    }
}
