package za.ac.cput.igugulamcommunityprogrambackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Activity;
import za.ac.cput.igugulamcommunityprogrambackend.domain.ActivityType;
import za.ac.cput.igugulamcommunityprogrambackend.factory.ActivityFactory;
import za.ac.cput.igugulamcommunityprogrambackend.repository.ActivityRepository;

import java.util.List;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;

    @Autowired
    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    /* Convenience method that both saves and validates via the factory */
    public Activity log(ActivityType type, String description, String actorName) {
        Activity activity = ActivityFactory.createActivity(type, description, actorName);
        if (activity == null) {
            throw new IllegalArgumentException("Invalid activity data");
        }
        return activityRepository.save(activity);
    }

    public List<Activity> findAllRecent() {
        return activityRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<Activity> findByType(ActivityType type) {
        return activityRepository.findByType(type);
    }

    public List<Activity> findByActor(String actorName) {
        return activityRepository.findByActorName(actorName);
    }
/*
    public void deleteById(Long id) {
        activityRepository.deleteById(id);
    }
    */

}