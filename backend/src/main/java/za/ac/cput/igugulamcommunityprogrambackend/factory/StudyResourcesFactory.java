package za.ac.cput.igugulamcommunityprogrambackend.factory;

import za.ac.cput.igugulamcommunityprogrambackend.domain.StudyResources;

public class StudyResourcesFactory {

    public static StudyResources createStudyResources(
            String title,
            String subject,
            String description,
            String fileUrl) {

        if (title == null || title.trim().isEmpty()) {
            throw new IllegalArgumentException("Title is required");
        }

        if (subject == null || subject.trim().isEmpty()) {
            throw new IllegalArgumentException("Subject is required");
        }

        if (description == null || description.trim().isEmpty()) {
            throw new IllegalArgumentException("Description is required");
        }

        if (fileUrl == null || fileUrl.trim().isEmpty()) {
            throw new IllegalArgumentException("File URL is required");
        }

        return new StudyResources(
                null,
                title,
                subject,
                description,
                fileUrl
        );
    }
}