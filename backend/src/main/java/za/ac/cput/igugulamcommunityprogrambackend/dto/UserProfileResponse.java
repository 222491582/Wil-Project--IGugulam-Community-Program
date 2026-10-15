package za.ac.cput.igugulamcommunityprogrambackend.dto;

import za.ac.cput.igugulamcommunityprogrambackend.domain.Role;

public record UserProfileResponse(
        Long id, String username, String fullName, String email, String phone, String address, Role role
) {
}
