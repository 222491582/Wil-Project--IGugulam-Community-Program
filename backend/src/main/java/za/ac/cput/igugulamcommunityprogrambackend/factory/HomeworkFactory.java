package za.ac.cput.igugulamcommunityprogrambackend.factory;

import za.ac.cput.igugulamcommunityprogrambackend.domain.Homework;

public class HomeworkFactory {

    public static Homework createHomework(
            String title,
            String subject,
            String description,
            String dueDate) {

        if (title == null || title.trim().isEmpty()) {
            throw new IllegalArgumentException("Title is required");
        }

        if (subject == null || subject.trim().isEmpty()) {
            throw new IllegalArgumentException("Subject is required");
        }

        if (description == null || description.trim().isEmpty()) {
            throw new IllegalArgumentException("Description is required");
        }

        if (dueDate == null || dueDate.trim().isEmpty()) {
            throw new IllegalArgumentException("Due date is required");
        }

        return new Homework(
                null,
                title,
                subject,
                description,
                dueDate
        );
    }
}
