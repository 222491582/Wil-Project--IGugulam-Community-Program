package za.ac.cput.igugulamcommunityprogrambackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.igugulamcommunityprogrambackend.domain.HomeworkCompletion;

import java.util.Optional;

@Repository
public interface HomeworkCompletionRepository extends JpaRepository<HomeworkCompletion, Long> {
    Optional<HomeworkCompletion> findByHomework_HomeworkIdAndUser_Username(Long homeworkId, String username);
    void deleteByHomework_HomeworkId(Long homeworkId);
}
