package za.ac.cput.igugulamcommunityprogrambackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.igugulamcommunityprogrambackend.domain.*;
import za.ac.cput.igugulamcommunityprogrambackend.factory.GuardianFactory;
import za.ac.cput.igugulamcommunityprogrambackend.factory.LearnerFactory;
import za.ac.cput.igugulamcommunityprogrambackend.service.ActivityService;
import za.ac.cput.igugulamcommunityprogrambackend.service.GuardianService;
import za.ac.cput.igugulamcommunityprogrambackend.service.LearnerService;
import za.ac.cput.igugulamcommunityprogrambackend.service.UserService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired private GuardianService guardianService;
    @Autowired private LearnerService learnerService;
    @Autowired private UserService userService;
    @Autowired private ActivityService activityService;

    /**
     * Handles the full signup flow.
     * Creates a Guardian (who is also a User) and one Learner in one request.
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, Object> body) {

        try {
            /* -------- Guardian / User fields -------- */
            String username = (String) body.get("username");
            String password = (String) body.get("password");
            String email    = (String) body.get("email");
            String fullName = (String) body.get("fullName");
            String phone    = (String) body.get("phone");
            String relationshipToStudent = (String) body.get("relationshipToStudent");
            String address  = (String) body.get("address");

            /* -------- Learner fields -------- */
            @SuppressWarnings("unchecked")
            Map<String, Object> learnerBody = (Map<String, Object>) body.get("learner");

            if (learnerBody == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Learner details are required"));
            }

            String learnerName      = (String) learnerBody.get("fullName");
            String learnerGrade     = (String) learnerBody.get("grade");
            String learnerSubjects  = (String) learnerBody.get("subjectsNeedingSupport");
            String learnerEmergency = (String) learnerBody.get("emergencyContact");

            /* -------- Build the Guardian (which IS a User) -------- */
            Guardian guardian = GuardianFactory.createGuardian(
                    username, password, email, fullName, phone,
                    relationshipToStudent, address, Status.ACTIVE
            );

            if (guardian == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Invalid guardian data"));
            }

            /* Save the guardian first (which saves the user row too, due to inheritance) */
            Guardian savedGuardian = guardianService.save(guardian);

            /* -------- Build the Learner -------- */
            Learner learner = LearnerFactory.createLearner(
                    savedGuardian, learnerName, learnerGrade,
                    learnerSubjects, learnerEmergency, Status.ACTIVE
            );

            if (learner == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Invalid learner data"));
            }

            Learner savedLearner = learnerService.save(learner);

            /* -------- Log the activity for admin dashboard -------- */
            activityService.log(
                    ActivityType.USER_REGISTERED,
                    savedGuardian.getFullName() + " registered as a guardian",
                    savedGuardian.getFullName()
            );
            activityService.log(
                    ActivityType.LEARNER_ADDED,
                    savedLearner.getFullName() + " added as a learner",
                    savedGuardian.getFullName()
            );

            /* -------- Return success -------- */
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Registration successful");
            response.put("userId", savedGuardian.getId());
            response.put("username", savedGuardian.getUsername());
            response.put("role", savedGuardian.getRole().name());
            response.put("learnerId", savedLearner.getId());

            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Registration failed: " + e.getMessage()));
        }
    }

    /**
     * Login for both users and admins.
     * Returns the user's info (id, username, role, fullName, email).
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        if (username == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Username and password required"));
        }

        try {
            User user = userService.login(username, password);

            Map<String, Object> response = new HashMap<>();
            response.put("userId", user.getId());
            response.put("username", user.getUsername());
            response.put("role", user.getRole().name());
            response.put("fullName", user.getFullName());
            response.put("email", user.getEmail());

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }
}