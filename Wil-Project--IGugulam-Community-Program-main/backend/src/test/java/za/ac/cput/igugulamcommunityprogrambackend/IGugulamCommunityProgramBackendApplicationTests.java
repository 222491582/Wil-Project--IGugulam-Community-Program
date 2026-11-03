package za.ac.cput.igugulamcommunityprogrambackend;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Homework;
import za.ac.cput.igugulamcommunityprogrambackend.repository.HomeworkRepository;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class IGugulamCommunityProgramBackendApplicationTests {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private HomeworkRepository homeworkRepository;

    @Test
    void contextLoads() {
    }

    @Test
    void guardianSignupAndHomeworkProgressArePersistedPerAccount() throws Exception {
        String signup = """
                {
                  "username": "guardian-test",
                  "password": "testing-password-123",
                  "email": "guardian-test@example.org",
                  "fullName": "Test Guardian",
                  "phone": "0211234567",
                  "role": "GUARDIAN",
                  "learnerName": "Test Learner",
                  "learnerGrade": "7",
                  "learnerSubjects": "Maths",
                  "emergencyContact": "0217654321",
                  "guardianRelationship": "Parent"
                }
                """;
        String response = mockMvc.perform(post("/api/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(signup))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString();
        JsonNode account = objectMapper.readTree(response);
        String token = account.get("token").asText();
        String authorization = "Bearer " + token;

        mockMvc.perform(get("/api/auth/me").header("Authorization", authorization))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.role").value("GUARDIAN"));
        mockMvc.perform(get("/api/auth/learners").header("Authorization", authorization))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].fullName").value("Test Learner"));

        Homework homework = new Homework(null, "Fractions", "Maths", "Complete the worksheet", "2099-01-01");
        homework = homeworkRepository.save(homework);
        mockMvc.perform(patch("/api/homework/{id}/status", homework.getHomeworkId())
                        .header("Authorization", authorization)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"status\":\"completed\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("completed"));
        mockMvc.perform(get("/api/homework").header("Authorization", authorization))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[?(@.homeworkId == " + homework.getHomeworkId() + ")].status")
                        .value(org.hamcrest.Matchers.contains("completed")));

        mockMvc.perform(get("/api/admin/dashboard").header("Authorization", authorization))
                .andExpect(status().isForbidden());
    }

    @Test
    void studentSignupCreatesLearnerProfileAndReturnsLearnerRole() throws Exception {
        String signup = """
                {
                  "username": "student-test",
                  "password": "testing-password-123",
                  "email": "student-test@example.org",
                  "fullName": "Test Student",
                  "phone": "0211234567",
                  "role": "LEARNER",
                  "learnerName": "Test Student",
                  "learnerGrade": "8",
                  "learnerSubjects": "Science and English"
                }
                """;
        String response = mockMvc.perform(post("/api/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(signup))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.role").value("LEARNER"))
                .andReturn()
                .getResponse()
                .getContentAsString();
        String authorization = "Bearer " + objectMapper.readTree(response).get("token").asText();

        mockMvc.perform(get("/api/auth/learners").header("Authorization", authorization))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].fullName").value("Test Student"))
                .andExpect(jsonPath("$[0].grade").value("8"));
    }
}
