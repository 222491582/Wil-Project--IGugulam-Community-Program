package za.ac.cput.igugulamcommunityprogrambackend.controller;

import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import za.ac.cput.igugulamcommunityprogrambackend.domain.ContactRequest;
import za.ac.cput.igugulamcommunityprogrambackend.repository.ContactRequestRepository;

import java.util.List;

@RestController
@RequestMapping("/api/contact-requests")
public class ContactRequestController {
    private final ContactRequestRepository requests;

    public ContactRequestController(ContactRequestRepository requests) {
        this.requests = requests;
    }

    @GetMapping
    public List<ContactRequest> findAll() {
        return requests.findAll();
    }

    @GetMapping("/{id}")
    public ContactRequest findById(@PathVariable Long id) {
        return requests.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Contact request not found"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ContactRequest create(@RequestBody ContactRequest request) {
        requireText(request.getName(), "Name");
        requireText(request.getEmail(), "Email");
        if (!EmailValidator.getInstance().isValid(request.getEmail().trim())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Enter a valid email address");
        }
        requireText(request.getSubject(), "Subject");
        requireText(request.getMessage(), "Message");
        request.setStatus("New");
        return requests.save(request);
    }

    @PatchMapping("/{id}")
    public ContactRequest reply(@PathVariable Long id, @RequestBody ContactRequest update) {
        ContactRequest current = findById(id);
        requireText(update.getStatus(), "Status");
        current.setStatus(update.getStatus());
        current.setReply(update.getReply());
        return requests.save(current);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        if (!requests.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Contact request not found");
        }
        requests.deleteById(id);
    }

    private static void requireText(String value, String field) {
        if (value == null || value.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, field + " is required");
        }
    }
}
