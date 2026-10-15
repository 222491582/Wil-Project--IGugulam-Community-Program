# iGugulam Community Program

iGugulam is a community learning portal with a static HTML/CSS/JavaScript frontend, a Spring Boot REST API, and MySQL persistence.

## Run with MySQL

Open the repository root `pom.xml` as a Maven project in IntelliJ (or reload Maven projects) so the IDE loads the backend's Spring, Servlet, and JWT dependencies. The root POM aggregates the backend module.

1. The app can create the `igugulam` database automatically when the MySQL account has permission to create databases. To create it manually in MySQL Workbench instead, connect to your local MySQL server and run:

   ```sql
   CREATE DATABASE IF NOT EXISTS igugulam
     CHARACTER SET utf8mb4
     COLLATE utf8mb4_unicode_ci;
   ```

2. In PowerShell, change to `backend` and set `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET` (at least 32 characters), `ADMIN_USERNAME`, and `ADMIN_PASSWORD` (at least 12 characters). Keep passwords out of source files and replace the placeholders with your own local values:

   ```powershell
   $env:DB_USERNAME = "root"
   $env:DB_PASSWORD = "<your MySQL password>"
   $env:JWT_SECRET = "<a unique random value of at least 32 characters>"
   $env:ADMIN_USERNAME = "admin"
   $env:ADMIN_PASSWORD = "<a strong password of at least 12 characters>"
   ```

   If starting from IntelliJ, set these same names and values in **Run → Edit Configurations → IGugulamCommunityProgramBackendApplication → Environment variables**. PowerShell variables are not automatically passed to an application launched separately by IntelliJ. Generate a private signing secret in PowerShell with `[Convert]::ToBase64String([Security.Cryptography.RandomNumberGenerator]::GetBytes(32))`, then paste it into the `JWT_SECRET` value in the run configuration.

3. Start the API with `.\mvnw.cmd spring-boot:run`, or run `IGugulamCommunityProgramBackendApplication` from IntelliJ. MySQL is the default profile; the API connects to `localhost:3306/igugulam` and creates the database if it is missing and the configured MySQL user has permission.
4. Serve the `frontend` directory from `http://localhost` (for example, using the IDE's built-in static server) and open `index.html`. Do not open the HTML files using `file://`; browser CORS requires a local HTTP origin.

The MySQL profile creates the application's tables from `backend/src/main/resources/schema-mysql.sql` and validates them against the JPA models. The schema adds starter announcements, homework and free study resources when they are missing. The first run creates an administrator from the environment credentials if that username does not already exist. Never use development credentials in production.

Automated tests explicitly use an in-memory H2 database. Normal application runs use MySQL.

## API

- `POST /api/auth/signup` and `POST /api/auth/login` issue a bearer token. Guardian sign-up also registers the student details.
- `GET /api/announcements`, `GET /api/homework`, and `GET /api/study-resources` are public.
- Administrator-only create/update/delete routes are available for announcements, homework, study resources, and contact requests. `POST /api/contact-requests` is public.
- `GET /api/admin/dashboard` and `GET /api/admin/users` provide administrator views; user status changes use `PATCH /api/admin/users/{id}/status`.

Use an `Authorization: Bearer` header with the returned access token for administrator and protected API calls.
