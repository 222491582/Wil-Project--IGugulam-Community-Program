package za.ac.cput.igugulamcommunityprogrambackend.domain;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "user_type", discriminatorType = DiscriminatorType.STRING)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @Column(nullable = false, unique = true)
    protected String username;

    @Column(nullable = false)
    protected String password;

    @Column(nullable = false, unique = true)
    protected String email;

    @Column(nullable = false)
    protected String fullName;

    protected String phone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    protected Role role;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    protected Status status = Status.ACTIVE;

    @CreationTimestamp
    @Column(name = "date_joined", nullable = false, updatable = false)
    protected LocalDateTime dateJoined;

    public User() {}

    public User(Builder b) {
        this.id = b.id;
        this.username = b.username;
        this.password = b.password;
        this.email = b.email;
        this.fullName = b.fullName;
        this.phone = b.phone;
        this.role = b.role;
        this.status = b.status;
        this.dateJoined = b.dateJoined;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public LocalDateTime getDateJoined() { return dateJoined; }
    public void setDateJoined(LocalDateTime dateJoined) { this.dateJoined = dateJoined; }

    public static class Builder {
        protected Long id;
        protected String username;
        protected String password;
        protected String email;
        protected String fullName;
        protected String phone;
        protected Role role;
        protected Status status = Status.ACTIVE;
        protected LocalDateTime dateJoined;

        public Builder setId(Long id) { this.id = id; return this; }
        public Builder setUsername(String username) { this.username = username; return this; }
        public Builder setPassword(String password) { this.password = password; return this; }
        public Builder setEmail(String email) { this.email = email; return this; }
        public Builder setFullName(String fullName) { this.fullName = fullName; return this; }
        public Builder setPhone(String phone) { this.phone = phone; return this; }
        public Builder setRole(Role role) { this.role = role; return this; }
        public Builder setStatus(Status status) { this.status = status; return this; }
        public Builder setDateJoined(LocalDateTime dateJoined) { this.dateJoined = dateJoined; return this; }

        public User build() { return new User(this); }
    }

    @Override
    public String toString() {
        return "User{id=" + id + ", username='" + username + "', email='" + email +
                "', fullName='" + fullName + "', role=" + role +
                ", status=" + status + ", dateJoined=" + dateJoined + "}";
    }
}