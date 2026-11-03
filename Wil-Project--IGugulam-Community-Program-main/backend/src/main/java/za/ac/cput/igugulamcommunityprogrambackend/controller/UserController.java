package za.ac.cput.igugulamcommunityprogrambackend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Role;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Guardian;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Learner;
import za.ac.cput.igugulamcommunityprogrambackend.domain.User;
import za.ac.cput.igugulamcommunityprogrambackend.dto.AuthResponse;
import za.ac.cput.igugulamcommunityprogrambackend.dto.LoginRequest;
import za.ac.cput.igugulamcommunityprogrambackend.dto.LearnerSummary;
import za.ac.cput.igugulamcommunityprogrambackend.dto.SignupRequest;
import za.ac.cput.igugulamcommunityprogrambackend.dto.UserProfileResponse;
import za.ac.cput.igugulamcommunityprogrambackend.dto.UserProfileUpdate;
import za.ac.cput.igugulamcommunityprogrambackend.repository.UserRepository;
import za.ac.cput.igugulamcommunityprogrambackend.repository.GuardianRepository;
import za.ac.cput.igugulamcommunityprogrambackend.repository.LearnerRepository;
import za.ac.cput.igugulamcommunityprogrambackend.security.JwtService;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class UserController {
    private final UserRepository users;
    private final GuardianRepository guardians;
    private final LearnerRepository learners;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserController(UserRepository users, GuardianRepository guardians, LearnerRepository learners,
                          PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.users = users;
        this.guardians = guardians;
        this.learners = learners;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional
    public AuthResponse signup(@RequestBody SignupRequest request) {
        requireText(request.username(), "Username");
        requireText(request.password(), "Password");
        requireText(request.email(), "Email");
        requireEmail(request.email());
        requireText(request.fullName(), "Full name");
        requireText(request.phone(), "Phone number");
        if (request.password().length() < 8) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password must be at least 8 characters");
        }
        if (users.existsByUsername(request.username().trim())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username is already registered");
        }
        if (users.existsByEmail(request.email().trim())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already registered");
        }
        Role role = parseRole(request.role());
        if (role == Role.ADMIN) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Administrator accounts cannot self-register");
        }
        if (role == Role.GUARDIAN) {
            requireText(request.learnerName(), "Student name");
            requireText(request.learnerGrade(), "Student grade");
            requireText(request.emergencyContact(), "Emergency contact");
        } else if (role == Role.LEARNER) {
            requireText(request.learnerName(), "Student name");
            requireText(request.learnerGrade(), "Student grade");
        }
        User user = new User.Builder()
                .setUsername(request.username().trim())
                .setPassword(passwordEncoder.encode(request.password()))
                .setEmail(request.email().trim().toLowerCase())
                .setFullName(request.fullName().trim())
                .setPhone(request.phone())
                .setRole(role)
                .build();
        user = users.save(user);
        if (role == Role.GUARDIAN) {
            Guardian guardian = new Guardian();
            String[] guardianName = request.fullName().trim().split("\\s+", 2);
            guardian.setFirstName(guardianName[0]);
            guardian.setLastName(guardianName.length > 1 ? guardianName[1] : "");
            guardian.setEmail(request.email().trim().toLowerCase());
            guardian.setPhone(request.phone());
            guardian.setUser(user);
            guardian = guardians.save(guardian);

            Learner learner = new Learner();
            String[] learnerName = request.learnerName().trim().split("\\s+", 2);
            learner.setFirstName(learnerName[0]);
            learner.setLastName(learnerName.length > 1 ? learnerName[1] : "");
            learner.setGrade(request.learnerGrade().trim());
            learner.setSubjects(request.learnerSubjects());
            learner.setEmergencyContact(request.emergencyContact().trim());
            learner.setRelationship(request.guardianRelationship());
            learner.setGuardian(guardian);
            learners.save(learner);
        } else {
            Learner learner = new Learner();
            String[] learnerName = request.learnerName().trim().split("\\s+", 2);
            learner.setFirstName(learnerName[0]);
            learner.setLastName(learnerName.length > 1 ? learnerName[1] : "");
            learner.setEmail(user.getEmail());
            learner.setGrade(request.learnerGrade().trim());
            learner.setSubjects(request.learnerSubjects());
            learner.setEmergencyContact(request.phone().trim());
            learners.save(learner);
        }
        return toResponse(user);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        if (request.username() == null || request.password() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username and password are required");
        }
        User user = users.findByUsername(request.username().trim())
                .filter(candidate -> passwordEncoder.matches(request.password(), candidate.getPassword()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password"));
        if (user.getStatus() != null && user.getStatus().name().equals("SUSPENDED")) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "This account is suspended");
        }
        return toResponse(user);
    }

    @GetMapping("/me")
    public UserProfileResponse profile(@AuthenticationPrincipal String username) {
        return toProfile(findUser(username));
    }

    @PutMapping("/me")
    public UserProfileResponse updateProfile(
            @AuthenticationPrincipal String username,
            @RequestBody UserProfileUpdate update
    ) {
        User user = findUser(username);
        requireText(update.fullName(), "Full name");
        requireText(update.email(), "Email");
        requireEmail(update.email());
        String email = update.email().trim().toLowerCase();
        if (!user.getEmail().equalsIgnoreCase(email) && users.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already registered");
        }
        user.setFullName(update.fullName().trim());
        user.setEmail(email);
        user.setPhone(update.phone());
        user.setAddress(update.address());
        return toProfile(users.save(user));
    }

    @GetMapping("/learners")
    public List<LearnerSummary> learners(@AuthenticationPrincipal String username) {
        User user = findUser(username);
        if (user.getRole() != Role.GUARDIAN) {
            if (user.getRole() == Role.LEARNER) {
                return learners.findByEmailIgnoreCase(user.getEmail()).stream()
                        .map(learner -> new LearnerSummary(
                                learner.getLearnerId(),
                                (learner.getFirstName() + " " + learner.getLastName()).trim(),
                                learner.getGrade(), learner.getSubjects(), learner.getRelationship()))
                        .toList();
            }
            return List.of();
        }
        Guardian guardian = guardians.findByUserUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Guardian profile not found"));
        return learners.findByGuardianGuardianId(guardian.getGuardianId()).stream()
                .map(learner -> new LearnerSummary(
                        learner.getLearnerId(),
                        (learner.getFirstName() + " " + learner.getLastName()).trim(),
                        learner.getGrade(), learner.getSubjects(), learner.getRelationship()))
                .toList();
    }

    private AuthResponse toResponse(User user) {
        return new AuthResponse(jwtService.issue(user), user.getId(), user.getUsername(), user.getFullName(), user.getRole());
    }

    private User findUser(String username) {
        return users.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    private static UserProfileResponse toProfile(User user) {
        return new UserProfileResponse(
                user.getId(), user.getUsername(), user.getFullName(), user.getEmail(),
                user.getPhone(), user.getAddress(), user.getRole());
    }

    private static Role parseRole(String role) {
        if (role == null || role.isBlank()) {
            return Role.LEARNER;
        }
        try {
            return Role.valueOf(role.trim().toUpperCase());
        } catch (IllegalArgumentException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Role must be LEARNER or GUARDIAN");
        }
    }

    private static void requireText(String value, String field) {
        if (value == null || value.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, field + " is required");
        }
    }

    private static void requireEmail(String email) {
        if (!EmailValidator.getInstance().isValid(email.trim())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Enter a valid email address");
        }
    }
}
