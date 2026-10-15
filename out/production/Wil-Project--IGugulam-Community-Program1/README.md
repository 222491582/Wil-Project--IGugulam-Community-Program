# iGugulam Community Program

iGugulam is a community learning portal with a static HTML/CSS/JavaScript frontend, a Spring Boot REST API, and MySQL persistence.

## Run with MySQL

1. Create the database: `CREATE DATABASE igugulam CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
2. In PowerShell, change to `backend` and set `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET` (at least 32 characters), `ADMIN_USERNAME`, and `ADMIN_PASSWORD` (at least 12 characters). For example:

   ```powershell
   $env:DB_USERNAME = "root"
   $env:DB_PASSWORD = "<your MySQL password>"
   $env:JWT_SECRET = "<a unique random value of at least 32 characters>"
   $env:ADMIN_USERNAME = "admin"
   $env:ADMIN_PASSWORD = "<a strong password of at least 12 characters>"
   ```

3. Start the API with `.\mvnw.cmd -Dspring-boot.run.profiles=mysql spring-boot:run`.
4. Serve the `frontend` directory from `http://localhost` (for example, using the IDE's built-in static server) and open `index.html`. Do not open the HTML files using `file://`; browser CORS requires a local HTTP origin.

The MySQL profile creates the application's tables from `backend/src/main/resources/schema-mysql.sql` and validates them against the JPA models. The first run creates an administrator from the environment credentials if that username does not already exist. Never use development credentials in production.

For tests and local backend development, the default profile uses an in-memory H2 database. Do not use it for persistent data.

## API

- `POST /api/auth/signup` and `POST /api/auth/login` issue a bearer token. Guardian sign-up also registers the student details.
- `GET /api/announcements`, `GET /api/homework`, and `GET /api/study-resources` are public.
- Administrator-only create/update/delete routes are available for announcements, homework, study resources, and contact requests. `POST /api/contact-requests` is public.
- `GET /api/admin/dashboard` and `GET /api/admin/users` provide administrator views; user status changes use `PATCH /api/admin/users/{id}/status`.

Use an `Authorization: Bearer` header with the returned access token for administrator and protected API calls.
