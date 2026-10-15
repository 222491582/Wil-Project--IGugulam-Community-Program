package za.ac.cput.igugulamcommunityprogrambackend.dto;

import za.ac.cput.igugulamcommunityprogrambackend.domain.Role;

public record AuthResponse(String token, Long id, String username, String fullName, Role role) {
}
