package za.ac.cput.igugulamcommunityprogrambackend.factory;

import za.ac.cput.igugulamcommunityprogrambackend.domain.Activity;
import za.ac.cput.igugulamcommunityprogrambackend.domain.ActivityType;
import za.ac.cput.igugulamcommunityprogrambackend.util.Helper;

public class ActivityFactory {

    public static Activity createActivity(ActivityType type,
                                          String description,
                                          String actorName) {

        if (type == null || Helper.isNullOrEmpty(description)) {
            return null;
        }

        return new Activity.Builder()
                .setType(type)
                .setDescription(description)
                .setActorName(actorName)
                .build();
    }
}