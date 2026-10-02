package za.ac.cput.igugulamcommunityprogrambackend.domain;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "activities")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ActivityType type;

    @Column(nullable = false, length = 500)
    private String description;

    @Column(name = "actor_name")
    private String actorName;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Activity() {}

    public Activity(Builder b) {
        this.id = b.id;
        this.type = b.type;
        this.description = b.description;
        this.actorName = b.actorName;
        this.createdAt = b.createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public ActivityType getType() { return type; }
    public void setType(ActivityType type) { this.type = type; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getActorName() { return actorName; }
    public void setActorName(String actorName) { this.actorName = actorName; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static class Builder {
        private Long id;
        private ActivityType type;
        private String description;
        private String actorName;
        private LocalDateTime createdAt;

        public Builder setId(Long id) { this.id = id; return this; }
        public Builder setType(ActivityType type) { this.type = type; return this; }
        public Builder setDescription(String description) { this.description = description; return this; }
        public Builder setActorName(String actorName) { this.actorName = actorName; return this; }
        public Builder setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Activity build() { return new Activity(this); }
    }

    @Override
    public String toString() {
        return "Activity{" +
                "id=" + id +
                ", type=" + type +
                ", description='" + description + '\'' +
                ", actorName='" + actorName + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}