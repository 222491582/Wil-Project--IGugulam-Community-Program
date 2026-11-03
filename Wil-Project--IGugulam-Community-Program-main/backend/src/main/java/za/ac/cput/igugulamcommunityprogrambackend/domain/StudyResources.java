package za.ac.cput.igugulamcommunityprogrambackend.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "study_resources")
public class StudyResources {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long resourceId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(length = 2048)
    private String fileUrl;

    @Column(nullable = false, length = 40)
    private String resourceType = "Study material";

    @Column(length = 80)
    private String gradeLevel;

    public StudyResources() {
    }

    public StudyResources(Long resourceId, String title, String subject,
                          String description, String fileUrl) {
        this.resourceId = resourceId;
        this.title = title;
        this.subject = subject;
        this.description = description;
        this.fileUrl = fileUrl;
    }

    public Long getResourceId() {
        return resourceId;
    }

    public void setResourceId(Long resourceId) {
        this.resourceId = resourceId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public String getResourceType() {
        return resourceType;
    }

    public void setResourceType(String resourceType) {
        this.resourceType = resourceType == null || resourceType.isBlank() ? "Study material" : resourceType;
    }

    public String getGradeLevel() {
        return gradeLevel;
    }

    public void setGradeLevel(String gradeLevel) {
        this.gradeLevel = gradeLevel;
    }
}
