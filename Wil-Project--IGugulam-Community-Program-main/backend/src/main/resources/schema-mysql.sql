CREATE TABLE IF NOT EXISTS users (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(40),
    address VARCHAR(255),
    role VARCHAR(30) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
    date_joined TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS announcements (
    announcement_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(80) NOT NULL DEFAULT 'general',
    created_date VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS homework (
    homework_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    due_date VARCHAR(40) NOT NULL
);

INSERT INTO announcements (title, content, category, created_date)
SELECT 'Welcome to iGugulam',
       'Your learning dashboard is ready. Explore your assignments and study resources.',
       'general', DATE_FORMAT(CURRENT_DATE, '%Y-%m-%d')
WHERE NOT EXISTS (SELECT 1 FROM announcements WHERE title = 'Welcome to iGugulam');

INSERT INTO announcements (title, content, category, created_date)
SELECT 'Study skills week',
       'Try setting aside a short, regular time each day to practise a subject you find challenging.',
       'academic', DATE_FORMAT(CURRENT_DATE, '%Y-%m-%d')
WHERE NOT EXISTS (SELECT 1 FROM announcements WHERE title = 'Study skills week');

INSERT INTO announcements (title, content, category, created_date)
SELECT 'New learning materials',
       'Open the study library to browse free books, workbooks and interactive lessons.',
       'resources', DATE_FORMAT(CURRENT_DATE, '%Y-%m-%d')
WHERE NOT EXISTS (SELECT 1 FROM announcements WHERE title = 'New learning materials');

INSERT INTO homework (title, subject, description, due_date)
SELECT 'Number skills practice', 'Mathematics',
       'Practise fractions, decimals and percentages at your current school level.',
       DATE_FORMAT(DATE_ADD(CURRENT_DATE, INTERVAL 7 DAY), '%Y-%m-%d')
WHERE NOT EXISTS (SELECT 1 FROM homework WHERE title = 'Number skills practice');

INSERT INTO homework (title, subject, description, due_date)
SELECT 'Reading and vocabulary', 'English',
       'Read a short story and write down five new words with their meanings.',
       DATE_FORMAT(DATE_ADD(CURRENT_DATE, INTERVAL 7 DAY), '%Y-%m-%d')
WHERE NOT EXISTS (SELECT 1 FROM homework WHERE title = 'Reading and vocabulary');

INSERT INTO homework (title, subject, description, due_date)
SELECT 'Observe and explain', 'Natural Sciences',
       'Choose a plant or animal nearby and write three facts about how it grows or survives.',
       DATE_FORMAT(DATE_ADD(CURRENT_DATE, INTERVAL 7 DAY), '%Y-%m-%d')
WHERE NOT EXISTS (SELECT 1 FROM homework WHERE title = 'Observe and explain');

CREATE TABLE IF NOT EXISTS homework_completions (
    completion_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    homework_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'pending',
    CONSTRAINT uq_homework_user UNIQUE (homework_id, user_id),
    CONSTRAINT fk_homework_completion_homework FOREIGN KEY (homework_id) REFERENCES homework(homework_id),
    CONSTRAINT fk_homework_completion_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS study_resources (
    resource_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    file_url VARCHAR(2048),
    resource_type VARCHAR(40) NOT NULL DEFAULT 'Study material',
    grade_level VARCHAR(80)
);

INSERT INTO study_resources (title, subject, description, file_url, resource_type, grade_level)
SELECT 'Siyavula Open Textbooks', 'Mathematics and Science',
       'Free South African curriculum-aligned textbooks and practice exercises for independent study.',
       'https://www.siyavula.com/read', 'Digital textbook', 'Grades 7-12'
WHERE NOT EXISTS (SELECT 1 FROM study_resources WHERE title = 'Siyavula Open Textbooks');

INSERT INTO study_resources (title, subject, description, file_url, resource_type, grade_level)
SELECT 'DBE Learner Workbooks', 'Core school subjects',
       'Official Department of Basic Education learner workbooks for classroom and home practice.',
       'https://www.education.gov.za/Programmes/GET/LTSM/Workbooks.aspx', 'Workbook', 'Grades R-9'
WHERE NOT EXISTS (SELECT 1 FROM study_resources WHERE title = 'DBE Learner Workbooks');

INSERT INTO study_resources (title, subject, description, file_url, resource_type, grade_level)
SELECT 'Khan Academy Lessons', 'Mathematics, Science and more',
       'Free video lessons, practice questions and progress tools for self-paced learning.',
       'https://www.khanacademy.org/', 'Lessons and practice', 'All levels'
WHERE NOT EXISTS (SELECT 1 FROM study_resources WHERE title = 'Khan Academy Lessons');

INSERT INTO study_resources (title, subject, description, file_url, resource_type, grade_level)
SELECT 'African Storybook', 'Reading and languages',
       'A free collection of illustrated storybooks in African languages for reading practice.',
       'https://www.africanstorybook.org/', 'Digital storybooks', 'Early and developing readers'
WHERE NOT EXISTS (SELECT 1 FROM study_resources WHERE title = 'African Storybook');

INSERT INTO study_resources (title, subject, description, file_url, resource_type, grade_level)
SELECT 'OpenStax Free Textbooks', 'Mathematics and Science',
       'Peer-reviewed, openly licensed textbooks and supplementary learning materials.',
       'https://openstax.org/subjects', 'Digital textbook', 'Senior and introductory levels'
WHERE NOT EXISTS (SELECT 1 FROM study_resources WHERE title = 'OpenStax Free Textbooks');

INSERT INTO study_resources (title, subject, description, file_url, resource_type, grade_level)
SELECT 'PhET Interactive Simulations', 'Science and Mathematics',
       'Free interactive simulations that help explain concepts through guided exploration.',
       'https://phet.colorado.edu/', 'Interactive activities', 'All levels'
WHERE NOT EXISTS (SELECT 1 FROM study_resources WHERE title = 'PhET Interactive Simulations');

CREATE TABLE IF NOT EXISTS contact_requests (
    request_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(80) NOT NULL DEFAULT 'New',
    reply TEXT
);

CREATE TABLE IF NOT EXISTS guardians (
    guardian_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(40) NOT NULL,
    user_id BIGINT NOT NULL UNIQUE,
    CONSTRAINT fk_guardian_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS learners (
    learner_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    grade VARCHAR(100) NOT NULL,
    subjects VARCHAR(500),
    emergency_contact VARCHAR(40),
    relationship VARCHAR(80),
    guardian_id BIGINT,
    CONSTRAINT fk_learner_guardian FOREIGN KEY (guardian_id) REFERENCES guardians(guardian_id)
);
