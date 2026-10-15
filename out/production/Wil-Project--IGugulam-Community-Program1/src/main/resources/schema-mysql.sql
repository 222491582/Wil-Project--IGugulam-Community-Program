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
    file_url VARCHAR(2048)
);

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
