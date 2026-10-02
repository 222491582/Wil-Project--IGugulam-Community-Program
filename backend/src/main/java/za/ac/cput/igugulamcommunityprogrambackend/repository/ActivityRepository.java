package za.ac.cput.igugulamcommunityprogrambackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Activity;
import za.ac.cput.igugulamcommunityprogrambackend.domain.ActivityType;

import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {

    List<Activity> findAllByOrderByCreatedAtDesc();

    List<Activity> findByType(ActivityType type);

    List<Activity> findByActorName(String actorName);
}