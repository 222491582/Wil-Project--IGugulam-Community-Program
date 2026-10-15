package za.ac.cput.igugulamcommunityprogrambackend.dto;

import za.ac.cput.igugulamcommunityprogrambackend.domain.Role;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Status;

public record UserAdminSummary(Long id, String username, String email, String fullName, Role role, Status status) {
}
