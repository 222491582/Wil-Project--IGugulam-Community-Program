package za.ac.cput.igugulamcommunityprogrambackend.factory;

import za.ac.cput.igugulamcommunityprogrambackend.domain.ContactRequest;

public class ContactRequestFactory {

    public static ContactRequest createContactRequest(
            String name,
            String email,
            String subject,
            String message) {

        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name is required");
        }

        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }

        if (subject == null || subject.trim().isEmpty()) {
            throw new IllegalArgumentException("Subject is required");
        }

        if (message == null || message.trim().isEmpty()) {
            throw new IllegalArgumentException("Message is required");
        }

        return new ContactRequest(
                null,
                name,
                email,
                subject,
                message,
                "Pending",
                ""
        );
    }
}