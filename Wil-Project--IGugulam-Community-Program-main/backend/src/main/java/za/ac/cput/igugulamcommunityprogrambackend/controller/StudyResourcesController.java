package za.ac.cput.igugulamcommunityprogrambackend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import za.ac.cput.igugulamcommunityprogrambackend.domain.StudyResources;
import za.ac.cput.igugulamcommunityprogrambackend.repository.StudyResourcesRepository;

import java.util.List;

@RestController
@RequestMapping("/api/study-resources")
public class StudyResourcesController {
    private final StudyResourcesRepository resources;

    public StudyResourcesController(StudyResourcesRepository resources) {
        this.resources = resources;
    }

    @GetMapping
    public List<StudyResources> findAll() {
        return resources.findAll();
    }

    @GetMapping("/{id}")
    public StudyResources findById(@PathVariable Long id) {
        return resources.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Study resource not found"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public StudyResources create(@RequestBody StudyResources resource) {
        requireText(resource.getTitle(), "Title");
        requireText(resource.getSubject(), "Subject");
        requireText(resource.getDescription(), "Description");
        validateUrl(resource.getFileUrl());
        return resources.save(resource);
    }

    @PutMapping("/{id}")
    public StudyResources update(@PathVariable Long id, @RequestBody StudyResources incoming) {
        StudyResources current = findById(id);
        requireText(incoming.getTitle(), "Title");
        requireText(incoming.getSubject(), "Subject");
        requireText(incoming.getDescription(), "Description");
        validateUrl(incoming.getFileUrl());
        current.setTitle(incoming.getTitle());
        current.setSubject(incoming.getSubject());
        current.setDescription(incoming.getDescription());
        current.setFileUrl(incoming.getFileUrl());
        current.setResourceType(incoming.getResourceType());
        current.setGradeLevel(incoming.getGradeLevel());
        return resources.save(current);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        if (!resources.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Study resource not found");
        }
        resources.deleteById(id);
    }

    private static void requireText(String value, String field) {
        if (value == null || value.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, field + " is required");
        }
    }

    private static void validateUrl(String value) {
        if (value == null || value.isBlank()) {
            return;
        }
        try {
            java.net.URI uri = java.net.URI.create(value.trim());
            if (!("https".equalsIgnoreCase(uri.getScheme()) || "http".equalsIgnoreCase(uri.getScheme()))
                    || uri.getHost() == null) {
                throw new IllegalArgumentException();
            }
        } catch (IllegalArgumentException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Resource URL must be a valid HTTP or HTTPS link");
        }
    }
}
