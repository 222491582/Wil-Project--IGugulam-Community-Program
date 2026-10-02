package za.ac.cput.igugulamcommunityprogrambackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Role;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Status;
import za.ac.cput.igugulamcommunityprogrambackend.domain.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    List<User> findByFullName(String fullName);

    List<User> findByRole(Role role);

    List<User> findByStatus(Status status);

    List<User> findByRoleAndStatus(Role role, Status status);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}