package za.ac.cput.igugulamcommunityprogrambackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Role;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Status;
import za.ac.cput.igugulamcommunityprogrambackend.domain.User;
import za.ac.cput.igugulamcommunityprogrambackend.factory.UserFactory;
import za.ac.cput.igugulamcommunityprogrambackend.service.UserService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    /* ---------- READ ---------- */

    @GetMapping
    public ResponseEntity<List<User>> getAll() {
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return userService.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).body(Map.of("error", "User not found")));
    }

    @GetMapping("/role/{role}")
    public ResponseEntity<List<User>> getByRole(@PathVariable Role role) {
        return ResponseEntity.ok(userService.findByRole(role));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<User>> getByStatus(@PathVariable Status status) {
        return ResponseEntity.ok(userService.findByStatus(status));
    }

    /* ---------- CREATE ---------- */

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Map<String, Object> body) {
        String username = (String) body.get("username");
        String password = (String) body.get("password");
        String email    = (String) body.get("email");
        String fullName = (String) body.get("fullName");
        String phone    = (String) body.get("phone");
        String roleStr  = (String) body.get("role");
        String statusStr = (String) body.get("status");

        try {
            Role role = roleStr != null ? Role.valueOf(roleStr.toUpperCase()) : Role.LEARNER;
            Status status = statusStr != null ? Status.valueOf(statusStr.toUpperCase()) : Status.ACTIVE;

            User user = UserFactory.createUser(username, password, email, fullName, phone, role, status);
            if (user == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Invalid user data"));
            }

            User saved = userService.save(user);
            return ResponseEntity.ok(saved);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /* ---------- UPDATE ---------- */

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        try {
            User existing = userService.findById(id)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (body.get("fullName") != null) existing.setFullName((String) body.get("fullName"));
            if (body.get("email")    != null) existing.setEmail((String) body.get("email"));
            if (body.get("phone")    != null) existing.setPhone((String) body.get("phone"));
            if (body.get("role")     != null) existing.setRole(Role.valueOf(((String) body.get("role")).toUpperCase()));
            if (body.get("status")   != null) existing.setStatus(Status.valueOf(((String) body.get("status")).toUpperCase()));
            if (body.get("password") != null) existing.setPassword((String) body.get("password"));

            return ResponseEntity.ok(userService.update(existing));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /* ---------- DELETE ---------- */

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            userService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        }
    }
}