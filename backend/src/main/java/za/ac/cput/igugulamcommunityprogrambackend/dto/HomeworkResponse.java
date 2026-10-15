package za.ac.cput.igugulamcommunityprogrambackend.dto;

public record HomeworkResponse(
        Long homeworkId, String title, String subject, String description, String dueDate, String status
) {
}
