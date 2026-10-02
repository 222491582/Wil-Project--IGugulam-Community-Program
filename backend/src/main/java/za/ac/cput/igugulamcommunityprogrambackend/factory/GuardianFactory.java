package za.ac.cput.igugulamcommunityprogrambackend.factory;

import za.ac.cput.igugulamcommunityprogrambackend.domain.Guardian;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Status;
import za.ac.cput.igugulamcommunityprogrambackend.util.Helper;

public class GuardianFactory {

    public static Guardian createGuardian(String username,
                                          String password,
                                          String email,
                                          String fullName,
                                          String phone,
                                          String relationshipToStudent,
                                          String address,
                                          Status status) {

        if (Helper.isNullOrEmpty(username) ||
                !Helper.isValidUsername(username) ||
                !Helper.isValidPassword(password) ||
                !Helper.isValidEmail(email) ||
                Helper.isNullOrEmpty(fullName) ||
                !Helper.isValidPhoneNumber(phone) ||
                Helper.isNullOrEmpty(relationshipToStudent)) {
            return null;
        }

        if (status == null) status = Status.ACTIVE;

        return new Guardian.Builder()
                .setUsername(username)
                .setPassword(password)
                .setEmail(email)
                .setFullName(fullName)
                .setPhone(phone)
                .setStatus(status)
                .setRelationshipToStudent(relationshipToStudent)
                .setAddress(address)
                .build();
    }
}