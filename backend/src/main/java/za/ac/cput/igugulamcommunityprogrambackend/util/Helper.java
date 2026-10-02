package za.ac.cput.igugulamcommunityprogrambackend.util;

import java.time.LocalDateTime;
import java.util.regex.Pattern;

public class Helper {

    public static boolean isNullOrEmpty(String str) {
        return str == null || str.trim().isEmpty();
    }

    public static boolean isValidDateTime(LocalDateTime dt) {
        return dt != null && !dt.isAfter(LocalDateTime.now());
    }

    public static boolean isValidEmail(String email) {
        if (isNullOrEmpty(email)) return false;
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        return Pattern.matches(emailRegex, email);
    }

    public static boolean isValidPassword(String password) {
        if (isNullOrEmpty(password)) return false;
        String passwordRegex = "^(?=.*[A-Za-z])(?=.*\\d).{6,}$";
        return Pattern.matches(passwordRegex, password);
    }

    public static boolean isValidPhoneNumber(String phoneNumber) {
        if (isNullOrEmpty(phoneNumber)) return false;
        String phoneRegex = "^\\+?[0-9]{10,15}$";
        return Pattern.matches(phoneRegex, phoneNumber);
    }

    public static boolean isValidUsername(String username) {
        if (isNullOrEmpty(username)) return false;
        /* letters, numbers, underscore, 3–20 chars */
        String usernameRegex = "^[A-Za-z0-9_]{3,20}$";
        return Pattern.matches(usernameRegex, username);
    }

    public static boolean isValidGrade(String grade) {
        if (isNullOrEmpty(grade)) return false;
        /* accepts "7", "Grade 7", "grade 12", etc. */
        String gradeRegex = "^(?i)(grade\\s*)?([1-9]|1[0-2])$";
        return Pattern.matches(gradeRegex, grade.trim());
    }
}