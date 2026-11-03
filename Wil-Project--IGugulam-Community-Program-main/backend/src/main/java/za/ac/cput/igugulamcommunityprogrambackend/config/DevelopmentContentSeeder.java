package za.ac.cput.igugulamcommunityprogrambackend.config;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Announcements;
import za.ac.cput.igugulamcommunityprogrambackend.domain.Homework;
import za.ac.cput.igugulamcommunityprogrambackend.domain.StudyResources;
import za.ac.cput.igugulamcommunityprogrambackend.repository.AnnouncementRepository;
import za.ac.cput.igugulamcommunityprogrambackend.repository.HomeworkRepository;
import za.ac.cput.igugulamcommunityprogrambackend.repository.StudyResourcesRepository;

import java.time.LocalDate;
import java.util.List;

@Component
@Profile("!mysql & !test")
public class DevelopmentContentSeeder implements ApplicationRunner {
    private final AnnouncementRepository announcements;
    private final HomeworkRepository homework;
    private final StudyResourcesRepository resources;

    public DevelopmentContentSeeder(
            AnnouncementRepository announcements,
            HomeworkRepository homework,
            StudyResourcesRepository resources
    ) {
        this.announcements = announcements;
        this.homework = homework;
        this.resources = resources;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (announcements.count() == 0) {
            String today = LocalDate.now().toString();
            announcements.saveAll(List.of(
                    new Announcements(null, "Welcome to iGugulam", "Your learning dashboard is ready. Explore your assignments and study resources.", today),
                    new Announcements(null, "Study skills week", "Try setting aside a short, regular time each day to practise a subject you find challenging.", today),
                    new Announcements(null, "New learning materials", "Open the study library to browse free books, workbooks and interactive lessons.", today)
            ));
        }

        if (homework.count() == 0) {
            String dueDate = LocalDate.now().plusDays(7).toString();
            homework.saveAll(List.of(
                    new Homework(null, "Number skills practice", "Mathematics", "Practise fractions, decimals and percentages at your current school level.", dueDate),
                    new Homework(null, "Reading and vocabulary", "English", "Read a short story and write down five new words with their meanings.", dueDate),
                    new Homework(null, "Observe and explain", "Natural Sciences", "Choose a plant or animal nearby and write three facts about how it grows or survives.", dueDate)
            ));
        }

        if (resources.count() == 0) {
            resources.saveAll(List.of(
                    resource("Siyavula Open Textbooks", "Mathematics and Science",
                            "Free South African curriculum-aligned textbooks and practice exercises.",
                            "https://www.siyavula.com/read", "Digital textbook", "Grades 7-12"),
                    resource("DBE Learner Workbooks", "Core school subjects",
                            "Official Department of Basic Education workbooks for school and home practice.",
                            "https://www.education.gov.za/Programmes/GET/LTSM/Workbooks.aspx",
                            "Workbook", "Grades R-9"),
                    resource("Khan Academy Lessons", "Mathematics, Science and more",
                            "Free video lessons, practice questions and self-paced learning.",
                            "https://www.khanacademy.org/", "Lessons and practice", "All levels"),
                    resource("African Storybook", "Reading and languages",
                            "Illustrated storybooks in African languages for reading practice.",
                            "https://www.africanstorybook.org/", "Digital storybooks", "All levels"),
                    resource("OpenStax Free Textbooks", "Mathematics and Science",
                            "Free textbooks and supplementary learning materials.",
                            "https://openstax.org/subjects", "Digital textbook", "Grades 9-12"),
                    resource("PhET Interactive Simulations", "Science and Mathematics",
                            "Interactive simulations that help explain concepts through exploration.",
                            "https://phet.colorado.edu/", "Interactive activities", "All levels")
            ));
        }
    }

    private static StudyResources resource(
            String title,
            String subject,
            String description,
            String url,
            String type,
            String grades
    ) {
        StudyResources resource = new StudyResources(null, title, subject, description, url);
        resource.setResourceType(type);
        resource.setGradeLevel(grades);
        return resource;
    }
}
