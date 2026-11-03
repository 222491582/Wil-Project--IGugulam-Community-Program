package za.ac.cput.igugulamcommunityprogrambackend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Role;
import za.ac.cput.igugulamcommunityprogrambackend.domain.User;
import za.ac.cput.igugulamcommunityprogrambackend.repository.UserRepository;

@Component
@Profile("mysql")
public class AdminAccountInitializer implements ApplicationRunner {
    private final UserRepository users;
    private final PasswordEncoder passwordEncoder;
    private final String username;
    private final String password;

    public AdminAccountInitializer(
            UserRepository users,
            PasswordEncoder passwordEncoder,
            @Value("${app.bootstrap-admin.username:}") String username,
            @Value("${app.bootstrap-admin.password:}") String password
    ) {
        this.users = users;
        this.passwordEncoder = passwordEncoder;
        this.username = username;
        this.password = password;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (username.isBlank() && password.isBlank()) {
            return;
        }
        if (username.isBlank() || password.length() < 12) {
            throw new IllegalStateException("Set both ADMIN_USERNAME and an ADMIN_PASSWORD of at least 12 characters");
        }
        var existing = users.findByUsername(username);
        if (existing.isPresent()) {
            if (existing.get().getRole() != Role.ADMIN) {
                throw new IllegalStateException("ADMIN_USERNAME is already assigned to a non-administrator account");
            }
            return;
        }
        User admin = new User.Builder()
                .setUsername(username.trim())
                .setPassword(passwordEncoder.encode(password))
                .setEmail(username.trim() + "@igugulam.local")
                .setFullName("iGugulam Administrator")
                .setRole(Role.ADMIN)
                .build();
        users.save(admin);
    }
}
