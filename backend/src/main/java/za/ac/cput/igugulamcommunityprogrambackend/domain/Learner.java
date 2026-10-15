package za.ac.cput.igugulamcommunityprogrambackend.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "learners")
public class Learner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long learnerId;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    private String email;

    @Column(nullable = false, length = 100)
    private String grade;

    @Column(length = 500)
    private String subjects;

    @Column(length = 40)
    private String emergencyContact;

    @Column(length = 80)
    private String relationship;

    @ManyToOne
    @JoinColumn(name = "guardian_id")
    private Guardian guardian;

    public Learner() {}

    public Learner(Long learnerId, String firstName, String lastName, String email, String grade) {
        this.learnerId = learnerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.grade = grade;
    }

    public Long getLearnerId() { return learnerId; }
    public void setLearnerId(Long learnerId) { this.learnerId = learnerId; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }
    public String getSubjects() { return subjects; }
    public void setSubjects(String subjects) { this.subjects = subjects; }
    public String getEmergencyContact() { return emergencyContact; }
    public void setEmergencyContact(String emergencyContact) { this.emergencyContact = emergencyContact; }
    public String getRelationship() { return relationship; }
    public void setRelationship(String relationship) { this.relationship = relationship; }
    public Guardian getGuardian() { return guardian; }
    public void setGuardian(Guardian guardian) { this.guardian = guardian; }
}
