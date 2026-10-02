package za.ac.cput.igugulamcommunityprogrambackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Activity;
import za.ac.cput.igugulamcommunityprogrambackend.domain.ActivityType;
import za.ac.cput.igugulamcommunityprogrambackend.service.ActivityService;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin(origins = "*")
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    @GetMapping
    public ResponseEntity<List<Activity>> getAll() {
        return ResponseEntity.ok(activityService.findAllRecent());
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Activity>> getByType(@PathVariable ActivityType type) {
        return ResponseEntity.ok(activityService.findByType(type));
    }

    @GetMapping("/actor/{actorName}")
    public ResponseEntity<List<Activity>> getByActor(@PathVariable String actorName) {
        return ResponseEntity.ok(activityService.findByActor(actorName));
    }
}