package za.ac.cput.igugulamcommunityprogrambackend.domain;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "learners")
public class Learner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "guardian_id", nullable = false)
    private Guardian guardian;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String grade;

    @Column(length = 500)
    private String subjectsNeedingSupport;

    @Column(nullable = false)
    private String emergencyContact;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.ACTIVE;

    @CreationTimestamp
    @Column(name = "date_registered", nullable = false, updatable = false)
    private LocalDateTime dateRegistered;

    public Learner() {}

    public Learner(Builder b) {
        this.id = b.id;
        this.guardian = b.guardian;
        this.fullName = b.fullName;
        this.grade = b.grade;
        this.subjectsNeedingSupport = b.subjectsNeedingSupport;
        this.emergencyContact = b.emergencyContact;
        this.status = b.status;
        this.dateRegistered = b.dateRegistered;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Guardian getGuardian() { return guardian; }
    public void setGuardian(Guardian guardian) { this.guardian = guardian; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }

    public String getSubjectsNeedingSupport() { return subjectsNeedingSupport; }
    public void setSubjectsNeedingSupport(String s) { this.subjectsNeedingSupport = s; }

    public String getEmergencyContact() { return emergencyContact; }
    public void setEmergencyContact(String e) { this.emergencyContact = e; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public LocalDateTime getDateRegistered() { return dateRegistered; }
    public void setDateRegistered(LocalDateTime d) { this.dateRegistered = d; }

    public static class Builder {
        private Long id;
        private Guardian guardian;
        private String fullName;
        private String grade;
        private String subjectsNeedingSupport;
        private String emergencyContact;
        private Status status = Status.ACTIVE;
        private LocalDateTime dateRegistered;

        public Builder setId(Long id) { this.id = id; return this; }
        public Builder setGuardian(Guardian g) { this.guardian = g; return this; }
        public Builder setFullName(String fullName) { this.fullName = fullName; return this; }
        public Builder setGrade(String grade) { this.grade = grade; return this; }
        public Builder setSubjectsNeedingSupport(String s) { this.subjectsNeedingSupport = s; return this; }
        public Builder setEmergencyContact(String e) { this.emergencyContact = e; return this; }
        public Builder setStatus(Status status) { this.status = status; return this; }
        public Builder setDateRegistered(LocalDateTime d) { this.dateRegistered = d; return this; }

        public Learner build() { return new Learner(this); }
    }

    @Override
    public String toString() {
        return "Learner{id=" + id + ", fullName='" + fullName + "', grade='" + grade +
                "', subjectsNeedingSupport='" + subjectsNeedingSupport +
                "', emergencyContact='" + emergencyContact +
                "', status=" + status + "}";
    }
}