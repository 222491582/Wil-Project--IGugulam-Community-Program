package za.ac.cput.igugulamcommunityprogrambackend.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "announcements")
public class Announcements {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long announcementId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false, length = 80)
    private String category = "general";

    @Column(nullable = false, length = 40)
    private String createdDate;

    public Announcements() {}

    public Announcements(Long announcementId, String title, String content, String createdDate) {
        this.announcementId = announcementId;
        this.title = title;
        this.content = content;
        this.createdDate = createdDate;
    }

    public Long getAnnouncementId() { return announcementId; }
    public void setAnnouncementId(Long announcementId) { this.announcementId = announcementId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getCreatedDate() { return createdDate; }
    public void setCreatedDate(String createdDate) { this.createdDate = createdDate; }
}
