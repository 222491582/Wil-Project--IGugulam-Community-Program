package za.ac.cput.igugulamcommunityprogrambackend.factory;

import za.ac.cput.igugulamcommunityprogrambackend.domain.Role;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Status;
import za.ac.cput.igugulamcommunityprogrambackend.domain.User;
import za.ac.cput.igugulamcommunityprogrambackend.util.Helper;

public class UserFactory {

    public static User createUser(String username,
                                  String password,
                                  String email,
                                  String fullName,
                                  String phone,
                                  Role role,
                                  Status status) {

        if (Helper.isNullOrEmpty(username) ||
                !Helper.isValidUsername(username) ||
                !Helper.isValidPassword(password) ||
                !Helper.isValidEmail(email) ||
                Helper.isNullOrEmpty(fullName) ||
                !Helper.isValidPhoneNumber(phone) ||
                role == null) {
            return null;
        }

        if (status == null) status = Status.ACTIVE;

        return new User.Builder()
                .setUsername(username)
                .setPassword(password)
                .setEmail(email)
                .setFullName(fullName)
                .setPhone(phone)
                .setRole(role)
                .setStatus(status)
                .build();
    }
}