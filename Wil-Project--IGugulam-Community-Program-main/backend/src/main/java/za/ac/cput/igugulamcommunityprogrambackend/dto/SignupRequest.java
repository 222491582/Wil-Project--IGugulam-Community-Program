package za.ac.cput.igugulamcommunityprogrambackend.dto;

public record SignupRequest(
        String username,
        String password,
        String email,
        String fullName,
        String phone,
        String role,
        String learnerName,
        String learnerGrade,
        String learnerSubjects,
        String emergencyContact,
        String guardianRelationship
) {
}
