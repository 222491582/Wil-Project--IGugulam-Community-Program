package za.ac.cput.igugulamcommunityprogrambackend.factory;

import za.ac.cput.igugulamcommunityprogrambackend.domain.Guardian;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Learner;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Status;
import za.ac.cput.igugulamcommunityprogrambackend.util.Helper;

public class LearnerFactory {

    public static Learner createLearner(Guardian guardian,
                                        String fullName,
                                        String grade,
                                        String subjectsNeedingSupport,
                                        String emergencyContact,
                                        Status status) {

        if (guardian == null ||
                Helper.isNullOrEmpty(fullName) ||
                !Helper.isValidGrade(grade) ||
                Helper.isNullOrEmpty(subjectsNeedingSupport) ||
                !Helper.isValidPhoneNumber(emergencyContact)) {
            return null;
        }

        if (status == null) status = Status.ACTIVE;

        return new Learner.Builder()
                .setGuardian(guardian)
                .setFullName(fullName)
                .setGrade(grade)
                .setSubjectsNeedingSupport(subjectsNeedingSupport)
                .setEmergencyContact(emergencyContact)
                .setStatus(status)
                .build();
    }
}