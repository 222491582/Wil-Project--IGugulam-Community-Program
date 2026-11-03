/* =================================
   iGUGULAM JAVASCRIPT
   ================================= */


/* =================================
   HOMEWORK SEARCH
   ================================= */

const homeworkSearch = document.getElementById("homeworkSearch");

if (homeworkSearch) {

    homeworkSearch.addEventListener("input", function () {

        const searchValue = this.value.toLowerCase();

        const homeworkCards =
            document.querySelectorAll(".homework-card");

        homeworkCards.forEach(function (card) {

            const homeworkText =
                card.innerText.toLowerCase();

            if (homeworkText.includes(searchValue)) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

}


/* =================================
   HOMEWORK FILTER
   ================================= */

const homeworkFilter = document.getElementById("homeworkFilter");

if (homeworkFilter) {

    homeworkFilter.addEventListener("change", function () {

        const selectedStatus = this.value;

        const homeworkCards =
            document.querySelectorAll(".homework-card");


        homeworkCards.forEach(function (card) {

            const cardStatus =
                card.getAttribute("data-status");


            if (
                selectedStatus === "all" ||
                cardStatus === selectedStatus
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

}


/* =================================
   VIEW HOMEWORK DETAILS
   ================================= */

function viewHomework(title, description, date) {

    const modal =
        document.getElementById("homeworkModal");

    const modalTitle =
        document.getElementById("modalHomeworkTitle");

    const modalDescription =
        document.getElementById("modalHomeworkDescription");

    const modalDate =
        document.getElementById("modalHomeworkDate");


    modalTitle.textContent = title;

    modalDescription.textContent = description;

    modalDate.textContent = date;


    modal.classList.add("show");

}


/* =================================
   CLOSE HOMEWORK MODAL
   ================================= */

function closeHomeworkModal() {

    const modal =
        document.getElementById("homeworkModal");

    modal.classList.remove("show");

}


/* =================================
   MARK HOMEWORK AS COMPLETE
   ================================= */

function markComplete(button) {

    const homeworkCard =
        button.closest(".homework-card");


    /* Change status */

    const status =
        homeworkCard.querySelector(".status");

    status.textContent = "Completed";

    status.classList.remove("pending");

    status.classList.add("completed");


    /* Update card status */

    homeworkCard.setAttribute(
        "data-status",
        "completed"
    );


    /* Change button */

    button.textContent = "✓ Completed";

    button.classList.remove("primary-small-btn");

    button.classList.add("completed-btn");

    button.disabled = true;


    /* Small confirmation */

    alert("Homework marked as completed! ✅");

}


/* =================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
   ================================= */

const homeworkModal =
    document.getElementById("homeworkModal");

if (homeworkModal) {

    homeworkModal.addEventListener("click", function (event) {

        if (event.target === homeworkModal) {

            closeHomeworkModal();

        }

    });

}
/* =================================
   ANNOUNCEMENTS SEARCH
   ================================= */

const announcementSearch =
    document.getElementById("announcementSearch");

if (announcementSearch) {

    announcementSearch.addEventListener("input", function () {

        const searchValue =
            this.value.toLowerCase();

        const announcementCards =
            document.querySelectorAll(".announcement-card");


        announcementCards.forEach(function (card) {

            const announcementText =
                card.innerText.toLowerCase();


            if (announcementText.includes(searchValue)) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

}


/* =================================
   ANNOUNCEMENT CATEGORY FILTER
   ================================= */

const announcementFilter =
    document.getElementById("announcementFilter");

if (announcementFilter) {

    announcementFilter.addEventListener("change", function () {

        const selectedCategory =
            this.value;

        const announcementCards =
            document.querySelectorAll(".announcement-card");


        announcementCards.forEach(function (card) {

            const cardCategory =
                card.getAttribute("data-category");


            if (
                selectedCategory === "all" ||
                cardCategory === selectedCategory
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

}


/* =================================
   VIEW ANNOUNCEMENT
   ================================= */

function viewAnnouncement(
    title,
    description,
    date,
    category
) {

    const modal =
        document.getElementById("announcementModal");


    const modalTitle =
        document.getElementById(
            "modalAnnouncementTitle"
        );


    const modalDescription =
        document.getElementById(
            "modalAnnouncementDescription"
        );


    const modalDate =
        document.getElementById(
            "modalAnnouncementDate"
        );


    const modalCategory =
        document.getElementById(
            "modalAnnouncementCategory"
        );


    modalTitle.textContent = title;

    modalDescription.textContent = description;

    modalDate.textContent = date;

    modalCategory.textContent = category;


    modal.classList.add("show");

}


/* =================================
   CLOSE ANNOUNCEMENT MODAL
   ================================= */

function closeAnnouncementModal() {

    const modal =
        document.getElementById(
            "announcementModal"
        );


    modal.classList.remove("show");

}


/* =================================
   CLOSE ANNOUNCEMENT MODAL
   WHEN CLICKING OUTSIDE
   ================================= */

const announcementModal =
    document.getElementById(
        "announcementModal"
    );


if (announcementModal) {

    announcementModal.addEventListener(
        "click",
        function (event) {

            if (event.target === announcementModal) {

                closeAnnouncementModal();

            }

        }
    );

}
/* =========================================
   MANAGE ANNOUNCEMENTS
========================================= */

let editingRow = null;


/* Open Add Announcement Form */
function openAnnouncementForm() {

    const modal = document.getElementById("announcementFormModal");

    if (!modal) return;

    editingRow = null;

    /* Clear all fields (no <form> wrapper, so clear manually) */
    document.getElementById("announcementTitle").value       = "";
    document.getElementById("announcementCategory").value    = "General";
    document.getElementById("announcementDate").value        = "";
    document.getElementById("announcementDescription").value = "";

    document.getElementById("announcementFormTitle").textContent =
        "Add Announcement";

    modal.style.display = "flex";
}


/* Close Announcement Form */
function closeAnnouncementForm() {
    const modal = document.getElementById("announcementFormModal");

    if (!modal) return;

    modal.style.display = "none";
    editingRow = null;
}


/* Save Announcement */
function saveAnnouncement() {

    const title = document.getElementById("announcementTitle").value.trim();
    const category = document.getElementById("announcementCategory").value;
    const date = document.getElementById("announcementDate").value;
    const description = document.getElementById("announcementDescription").value.trim();

    /* Check required fields */
    if (title === "" || category === "" || date === "" || description === "") {
        alert("Please complete all fields before saving.");
        return;
    }

    const tableBody = document.getElementById("announcementTableBody");

    /* EDIT EXISTING ANNOUNCEMENT */
    if (editingRow) {

        const cells = editingRow.querySelectorAll("td");

        cells[0].textContent = title;
        cells[1].textContent = category;
        cells[2].textContent = formatAnnouncementDate(date);

        editingRow.dataset.title = title.toLowerCase();
        editingRow.dataset.category = category.toLowerCase();

        closeAnnouncementForm();

        alert("Announcement updated successfully.");

        return;
    }


    /* ADD NEW ANNOUNCEMENT */

    const newRow = document.createElement("tr");

    newRow.dataset.title = title.toLowerCase();
    newRow.dataset.category = category.toLowerCase();

    newRow.innerHTML = `
        <td>${title}</td>

        <td>${category}</td>

        <td>${formatAnnouncementDate(date)}</td>

        <td>
            <span class="table-status published">
                Published
            </span>
        </td>

        <td>
            <div class="table-actions">

                <button
                    class="edit-btn"
                    onclick="editAnnouncement(this)">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteAnnouncement(this)">
                    Delete
                </button>

            </div>
        </td>
    `;

    tableBody.appendChild(newRow);

    closeAnnouncementForm();

    alert("Announcement added successfully.");
}


/* Edit Announcement */
function editAnnouncement(button) {

    editingRow = button.closest("tr");

    if (!editingRow) return;

    const cells = editingRow.querySelectorAll("td");

    const title = cells[0].textContent.trim();
    const category = cells[1].textContent.trim();

    const dateText = cells[2].textContent.trim();

    document.getElementById("announcementTitle").value = title;
    document.getElementById("announcementCategory").value = category;

    /*
       Convert the displayed date back into
       YYYY-MM-DD format for the date input.
    */
    const dateParts = dateText.split("/");

    if (dateParts.length === 3) {

        const day = dateParts[0];
        const month = dateParts[1];
        const year = dateParts[2];

        document.getElementById("announcementDate").value =
            `${year}-${month}-${day}`;
    }

    document.getElementById("announcementDescription").value =
        "Edit the announcement description here.";

    document.getElementById("announcementFormTitle").textContent =
        "Edit Announcement";

    document.getElementById("announcementFormModal").style.display = "flex";
}


/* Delete Announcement */
function deleteAnnouncement(button) {

    const row = button.closest("tr");

    if (!row) return;

    const title = row.querySelector("td").textContent.trim();

    const confirmDelete = confirm(
        `Are you sure you want to delete "${title}"?`
    );

    if (confirmDelete) {

        row.remove();

        alert("Announcement deleted successfully.");
    }
}


/* Format Date */
function formatAnnouncementDate(date) {

    if (!date) return "";

    const parts = date.split("-");

    if (parts.length !== 3) {
        return date;
    }

    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    return `${day}/${month}/${year}`;
}


/* =========================================
   SEARCH MANAGE ANNOUNCEMENTS
========================================= */

const manageAnnouncementSearch =
    document.getElementById("manageAnnouncementSearch");

if (manageAnnouncementSearch) {

    manageAnnouncementSearch.addEventListener("input", function () {

        const searchValue = this.value.toLowerCase().trim();

        const rows =
            document.querySelectorAll("#announcementTableBody tr");

        rows.forEach(function (row) {

            const title =
                row.querySelector("td")?.textContent.toLowerCase() || "";

            const category =
                row.querySelectorAll("td")[1]?.textContent.toLowerCase() || "";

            if (
                title.includes(searchValue) ||
                category.includes(searchValue)
            ) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }

        });

    });
}


/* =========================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
========================================= */

window.addEventListener("click", function (event) {

    const modal =
        document.getElementById("announcementFormModal");

    if (event.target === modal) {
        closeAnnouncementForm();
    }

});

/* ================================
   AUTH PAGES (Sign Up / Login)
   ================================ */

/* Sign up step 1 -> step 2 */
function goToSignup2() {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Please enter a username and password.");
        return;
    }

    /* Store for later steps (temporary — backend will replace this) */
    localStorage.setItem("signupUsername", username);

    window.location.href = "signup-2.html";
}


/* Sign up step 2 -> step 3 */
function goToSignup3() {

    const name  = document.getElementById("guardianName").value.trim();
    const email = document.getElementById("guardianEmail").value.trim();
    const phone = document.getElementById("guardianPhone").value.trim();
    const rel   = document.getElementById("guardianRelationship").value.trim();

    if (!name || !email || !phone || !rel) {
        alert("Please fill in all guardian details.");
        return;
    }

    localStorage.setItem("guardianName", name);
    localStorage.setItem("guardianEmail", email);
    localStorage.setItem("guardianPhone", phone);
    localStorage.setItem("guardianRelationship", rel);

    window.location.href = "signup-3.html";
}


/* Back button (from inside the card) */
function goBack(page) {
    window.location.href = page;
}


/* Login */
function handleLogin() {

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!username || !password) {
        alert("Please enter your username and password.");
        return;
    }

    /* Placeholder redirect.
       Later this will authenticate against the backend and redirect
       based on the user's role. */
    window.location.href = "Dashboard.html";
}


/* ================================
   ADMIN LOGIN
   ================================ */

function handleAdminLogin() {

    const username = document
        .getElementById("adminLoginUsername")
        .value
        .trim();

    const password = document
        .getElementById("adminLoginPassword")
        .value
        .trim();


    if (!username || !password) {
        alert("Please enter your username and password.");
        return;
    }

    /* Placeholder redirect.
       Later this will authenticate against the backend. */
    window.location.href = "admin-dashboard.html";
}


/* ================================
   USER PROFILE — EDIT MODAL
   ================================ */

function openEditProfileForm() {

    /* Read current values from the profile card */
    const fields = document.querySelectorAll(
        ".profile-card .profile-field"
    );

    const name    = fields[0].querySelector("p").textContent.trim();
    const email   = fields[1].querySelector("p").textContent.trim();
    const phone   = fields[2].querySelector("p").textContent.trim();
    const address = fields[3].querySelector("p").textContent.trim();


    /* Pre-fill the modal inputs */
    document.getElementById("editProfileName").value    = name;
    document.getElementById("editProfileEmail").value   = email;
    document.getElementById("editProfilePhone").value   = phone;
    document.getElementById("editProfileAddress").value = address;


    /* Show the modal */
    document
        .getElementById("editProfileModal")
        .classList
        .add("show");
}


function closeEditProfileForm() {

    document
        .getElementById("editProfileModal")
        .classList
        .remove("show");
}


function saveEditProfile() {

    const name    = document.getElementById("editProfileName").value.trim();
    const email   = document.getElementById("editProfileEmail").value.trim();
    const phone   = document.getElementById("editProfilePhone").value.trim();
    const address = document.getElementById("editProfileAddress").value.trim();


    /* Basic validation */
    if (!name || !email || !phone || !address) {
        alert("Please fill in all fields.");
        return;
    }


    /* Write the new values back into the profile card */
    const fields = document.querySelectorAll(
        ".profile-card .profile-field"
    );

    fields[0].querySelector("p").textContent = name;
    fields[1].querySelector("p").textContent = email;
    fields[2].querySelector("p").textContent = phone;
    fields[3].querySelector("p").textContent = address;


    /* Close the modal */
    closeEditProfileForm();
}


/* ================================
   VIEW LEARNER MODAL
   ================================ */

function openViewLearnerModal() {

    document
        .getElementById("viewLearnerModal")
        .classList
        .add("show");
}


function closeViewLearnerModal() {

    document
        .getElementById("viewLearnerModal")
        .classList
        .remove("show");
}



/* ================================
   MANAGE USERS
   ================================ */

let editingUserRow = null;


/* ---------- Open Add User modal ---------- */

function openUserForm() {

    editingUserRow = null;

    document.getElementById("userFormTitle").textContent = "Add User";

    document.getElementById("userName").value    = "";
    document.getElementById("userEmail").value   = "";
    document.getElementById("userRole").value    = "learner";
    document.getElementById("userStatus").value  = "active";

    document
        .getElementById("userFormModal")
        .classList
        .add("show");
}


/* ---------- Close modal ---------- */

function closeUserForm() {

    document
        .getElementById("userFormModal")
        .classList
        .remove("show");

    editingUserRow = null;
}


/* ---------- Save (add or edit) ---------- */

function saveUser() {

    const name   = document.getElementById("userName").value.trim();
    const email  = document.getElementById("userEmail").value.trim();
    const role   = document.getElementById("userRole").value;
    const status = document.getElementById("userStatus").value;

    if (!name || !email) {
        alert("Please enter both name and email.");
        return;
    }

    /* EDITING an existing row */
    if (editingUserRow) {

        const cells = editingUserRow.querySelectorAll("td");

        cells[0].textContent = name;
        cells[1].textContent = email;

        cells[2].innerHTML =
            `<span class="role-badge ${role}">${capitalize(role)}</span>`;

        cells[3].innerHTML =
            `<span class="table-status status-${status}">${capitalize(status)}</span>`;

        editingUserRow.dataset.role   = role;
        editingUserRow.dataset.status = status;
    }

    /* ADDING a new row */
    else {

        const tbody = document.getElementById("userTableBody");
        const row = document.createElement("tr");

        row.dataset.role   = role;
        row.dataset.status = status;

        row.innerHTML = `
            <td>${name}</td>
            <td>${email}</td>
            <td><span class="role-badge ${role}">${capitalize(role)}</span></td>
            <td><span class="table-status status-${status}">${capitalize(status)}</span></td>
            <td>
                <div class="table-actions">
                    <button class="edit-btn" onclick="editUser(this)">✏️ Edit</button>
                    <button class="delete-btn" onclick="deleteUser(this)">🗑️ Delete</button>
                </div>
            </td>
        `;

        tbody.appendChild(row);
    }

    closeUserForm();
}


/* ---------- Edit a user ---------- */

function editUser(button) {

    editingUserRow = button.closest("tr");

    const cells = editingUserRow.querySelectorAll("td");

    document.getElementById("userFormTitle").textContent = "Edit User";

    document.getElementById("userName").value   = cells[0].textContent.trim();
    document.getElementById("userEmail").value  = cells[1].textContent.trim();
    document.getElementById("userRole").value   = editingUserRow.dataset.role;
    document.getElementById("userStatus").value = editingUserRow.dataset.status;

    document
        .getElementById("userFormModal")
        .classList
        .add("show");
}


/* ---------- Delete a user ---------- */

function deleteUser(button) {

    if (!confirm("Delete this user?")) {
        return;
    }

    button.closest("tr").remove();
}


/* ---------- Search + Filters ---------- */

document.addEventListener("DOMContentLoaded", function () {

    const search = document.getElementById("userSearch");
    const role   = document.getElementById("userRoleFilter");
    const status = document.getElementById("userStatusFilter");

    /* Not on this page — skip */
    if (!search || !role || !status) return;


    function filterUsers() {

        const query     = search.value.toLowerCase();
        const roleValue = role.value;
        const statValue = status.value;

        document
            .querySelectorAll("#userTableBody tr")
            .forEach(function (row) {

                const text = row.textContent.toLowerCase();

                const matchesSearch = text.includes(query);
                const matchesRole   = !roleValue || row.dataset.role === roleValue;
                const matchesStatus = !statValue || row.dataset.status === statValue;

                row.style.display =
                    (matchesSearch && matchesRole && matchesStatus)
                        ? ""
                        : "none";
            });
    }


    search.addEventListener("input", filterUsers);
    role.addEventListener("change", filterUsers);
    status.addEventListener("change", filterUsers);

});

/* =========================================
   API INTEGRATION
========================================= */

const IGUGULAM_API = window.IGUGULAM_API_URL || localStorage.getItem("igugulamApiUrl") || "http://localhost:8080";
let apiEditingId = null;
let cachedProfile = null;

async function apiRequest(path, options = {}) {
    const headers = new Headers(options.headers || {});
    const token = sessionStorage.getItem("igugulamToken");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    if (options.body !== undefined) headers.set("Content-Type", "application/json");

    const response = await fetch(`${IGUGULAM_API}${path}`, {
        ...options,
        headers,
        body: options.body === undefined ? undefined : JSON.stringify(options.body)
    });
    if (response.status === 204) return null;

    const contentType = response.headers.get("content-type") || "";
    const result = contentType.includes("json") ? await response.json() : await response.text();
    if (!response.ok) {
        const detail = typeof result === "string" ? result : (result.detail || result.message || "Request failed");
        throw new Error(detail);
    }
    return result;
}

function currentAccount() {
    const serialized = sessionStorage.getItem("igugulamUser");
    return serialized ? JSON.parse(serialized) : null;
}

function storeAccount(account) {
    sessionStorage.setItem("igugulamToken", account.token);
    sessionStorage.setItem("igugulamUser", JSON.stringify(account));
}

function showApiError(error) {
    window.alert(error instanceof Error ? error.message : "The server request failed.");
}

function makeElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
}

function displayDate(value) {
    if (!value) return "";
    const date = new Date(`${value}T00:00:00`);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
}

function clearAuthAndNavigate(event) {
    const link = event.target.closest("a");
    if (link && /(?:index|user-login|admin-login)\.html$/i.test(link.getAttribute("href") || "")) {
        sessionStorage.removeItem("igugulamToken");
        sessionStorage.removeItem("igugulamUser");
    }
}

document.addEventListener("click", clearAuthAndNavigate);

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactRequestForm");
    if (!form) return;
    form.addEventListener("submit", async event => {
        event.preventDefault();
        const status = document.getElementById("contactRequestStatus");
        const body = {
            name: document.getElementById("contactName").value.trim(),
            email: document.getElementById("contactEmail").value.trim(),
            subject: document.getElementById("contactSubject").value.trim(),
            message: document.getElementById("contactMessage").value.trim()
        };
        try {
            await apiRequest("/api/contact-requests", { method: "POST", body });
            form.reset();
            status.textContent = "Your message has been sent.";
        } catch (error) {
            status.textContent = error.message;
        }
    });
});

async function goToSignup2() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    if (!username || password.length < 8) {
        alert("Enter a username and a password with at least 8 characters.");
        return;
    }
    sessionStorage.setItem("signupUsername", username);
    sessionStorage.setItem("signupPassword", password);
    window.location.href = "signup-2.html";
}

async function goToSignup3() {
    const name = document.getElementById("guardianName").value.trim();
    const email = document.getElementById("guardianEmail").value.trim();
    const phone = document.getElementById("guardianPhone").value.trim();
    const relationship = document.getElementById("guardianRelationship").value.trim();
    if (!name || !email || !phone || !relationship) {
        alert("Please fill in all guardian details.");
        return;
    }
    sessionStorage.setItem("guardianName", name);
    sessionStorage.setItem("guardianEmail", email);
    sessionStorage.setItem("guardianPhone", phone);
    sessionStorage.setItem("guardianRelationship", relationship);
    window.location.href = "signup-3.html";
}

async function completeSignup() {
    const learnerName = document.getElementById("studentName").value.trim();
    const learnerGrade = document.getElementById("studentGrade").value.trim();
    const learnerSubjects = getSelectedSubjectNames("legacySignupSubjectChoices").join(", ");
    const emergencyContact = document.getElementById("studentEmergency").value.trim();
    const username = sessionStorage.getItem("signupUsername");
    const password = sessionStorage.getItem("signupPassword");
    const fullName = sessionStorage.getItem("guardianName");
    const email = sessionStorage.getItem("guardianEmail");
    const phone = sessionStorage.getItem("guardianPhone");
    if (!username || !password || !fullName || !email || !phone ||
        !learnerName || !learnerGrade || !learnerSubjects || !emergencyContact) {
        const subjectsError = document.getElementById("legacySignupSubjectsError");
        if (!learnerSubjects && subjectsError) {
            subjectsError.textContent = "Choose at least one subject for the learner.";
            return;
        }
        alert("Complete the account, guardian, and student details before signing up.");
        return;
    }
    try {
        const account = await apiRequest("/api/auth/signup", {
            method: "POST",
            body: {
                username, password, email, fullName, phone, role: "GUARDIAN",
                learnerName, learnerGrade, learnerSubjects, emergencyContact,
                guardianRelationship: sessionStorage.getItem("guardianRelationship")
            }
        });
        storeAccount(account);
        ["signupUsername", "signupPassword", "guardianName", "guardianEmail", "guardianPhone",
            "guardianRelationship"].forEach(key => sessionStorage.removeItem(key));
        window.location.href = "guardian-dashboard.html";
    } catch (error) {
        showApiError(error);
    }
}

async function handleLogin() {
    await submitLogin("loginUsername", "loginPassword", "LEARNER");
}

async function handleGuardianLogin() {
    await submitLogin("guardianLoginUsername", "guardianLoginPassword", "GUARDIAN");
}

async function handleAdminLogin() {
    await submitLogin("adminLoginUsername", "adminLoginPassword", "ADMIN");
}

async function submitLogin(usernameId, passwordId, expectedRole) {
    const username = document.getElementById(usernameId).value.trim();
    const password = document.getElementById(passwordId).value;
    const errorElement = document.getElementById("loginError");
    if (errorElement) errorElement.textContent = "";
    if (!username || !password) {
        if (errorElement) errorElement.textContent = "Enter your username and password.";
        else alert("Enter your username and password.");
        return;
    }
    try {
        const account = await apiRequest("/api/auth/login", {
            method: "POST",
            body: { username, password }
        });
        if (account.role !== expectedRole) {
            const portal = {
                LEARNER: "student",
                GUARDIAN: "guardian",
                ADMIN: "administrator"
            }[account.role] || "correct";
            throw new Error(`This is not a ${expectedRole.toLowerCase()} account. Please use the ${portal} sign-in.`);
        }
        storeAccount(account);
        const destinations = {
            LEARNER: "Dashboard.html",
            GUARDIAN: "guardian-dashboard.html",
            ADMIN: "admin-dashboard.html"
        };
        window.location.href = destinations[account.role];
    } catch (error) {
        if (errorElement) errorElement.textContent = error.message;
        else showApiError(error);
    }
}

const SUBJECTS_BY_GRADE = {
    primary: [
        "Mathematics", "English", "Afrikaans", "isiXhosa / other Home Language",
        "Natural Sciences and Technology", "Social Sciences", "Life Skills"
    ],
    intermediate: [
        "Mathematics", "English", "Afrikaans", "isiXhosa / other Home Language",
        "Natural Sciences", "Social Sciences", "Technology",
        "Economic and Management Sciences", "Life Orientation"
    ],
    senior: [
        "Mathematics", "Mathematical Literacy", "English", "Afrikaans",
        "isiXhosa / other Home Language", "Physical Sciences", "Life Sciences",
        "Geography", "History", "Accounting", "Business Studies", "Economics",
        "Computer Applications Technology", "Information Technology",
        "Agricultural Sciences", "Life Orientation"
    ]
};

function setupSubjectChoices(gradeId, choicesId) {
    const gradeInput = document.getElementById(gradeId);
    const choices = document.getElementById(choicesId);
    if (!gradeInput || !choices) return;

    const render = () => {
        const grade = Number(String(gradeInput.value).match(/\d+/)?.[0]);
        const subjects = grade >= 10
            ? SUBJECTS_BY_GRADE.senior
            : grade >= 7
                ? SUBJECTS_BY_GRADE.intermediate
                : SUBJECTS_BY_GRADE.primary;
        const selected = new Set(getSelectedSubjectNames(choicesId));
        choices.replaceChildren();
        subjects.forEach((subject, index) => {
            const label = makeElement("label", "subject-choice");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = choicesId;
            checkbox.value = subject;
            checkbox.checked = selected.has(subject);
            checkbox.id = `${choicesId}-${index}`;
            label.htmlFor = checkbox.id;
            label.append(checkbox, makeElement("span", "", subject));
            choices.append(label);
        });
        const errorId = {
            familySubjectChoices: "familySubjectsError",
            studentSignupSubjectChoices: "studentSignupSubjectsError",
            guardianSignupSubjectChoices: "guardianSignupSubjectsError",
            legacySignupSubjectChoices: "legacySignupSubjectsError"
        }[choicesId];
        const error = errorId && document.getElementById(errorId);
        if (error) error.textContent = "";
    };

    gradeInput.addEventListener("change", render);
    gradeInput.addEventListener("input", render);
    render();
}

function getSelectedSubjectNames(choicesId) {
    return [...document.querySelectorAll(`#${choicesId} input[type="checkbox"]:checked`)]
        .map(input => input.value);
}

function initializeFamilyPortal() {
    const loginForm = document.getElementById("familyLoginForm");
    const signupForm = document.getElementById("familySignupForm");
    if (!loginForm || !signupForm) return;

    const roleInputs = document.querySelectorAll('input[name="familyRole"]');
    const guardianFields = document.getElementById("guardianLearnerFields");
    const fullNameLabel = document.getElementById("familyFullNameLabel");
    const gradeLabel = document.getElementById("familyGradeLabel");
    const signupButton = signupForm.querySelector('button[type="submit"]');
    let mode = "login";

    const selectedRole = () =>
        document.querySelector('input[name="familyRole"]:checked')?.value || "LEARNER";

    const updateForm = () => {
        const guardian = selectedRole() === "GUARDIAN";
        guardianFields.hidden = !guardian;
        document.getElementById("familyLearnerName").required = guardian;
        document.getElementById("familyEmergency").required = guardian;
        document.getElementById("familyRelationship").required = guardian;
        fullNameLabel.textContent = guardian ? "Guardian full name" : "Student full name";
        gradeLabel.textContent = guardian ? "Learner's school grade" : "Your school grade";
        document.getElementById("familySubjectsLegend").textContent = guardian
            ? "Choose subjects the learner needs help with"
            : "Choose subjects you want help with";
        signupButton.textContent = guardian ? "Create guardian account" : "Create student account";
    };

    roleInputs.forEach(input => input.addEventListener("change", updateForm));
    document.querySelectorAll("[data-family-mode]").forEach(button => {
        button.addEventListener("click", () => {
            mode = button.dataset.familyMode;
            loginForm.hidden = mode !== "login";
            signupForm.hidden = mode !== "signup";
            document.querySelectorAll("[data-family-mode]").forEach(option => {
                const active = option === button;
                option.classList.toggle("active", active);
                option.setAttribute("aria-pressed", String(active));
            });
        });
    });

    loginForm.addEventListener("submit", async event => {
        event.preventDefault();
        const error = document.getElementById("familyLoginError");
        error.textContent = "";
        try {
            const account = await apiRequest("/api/auth/login", {
                method: "POST",
                body: {
                    username: document.getElementById("familyLoginUsername").value.trim(),
                    password: document.getElementById("familyLoginPassword").value
                }
            });
            const role = selectedRole();
            if (account.role !== role) {
                const actualRole = account.role === "LEARNER" ? "student" : "parent/guardian";
                throw new Error(`This account is registered as a ${actualRole}. Choose the matching account type.`);
            }
            storeAccount(account);
            window.location.href = role === "GUARDIAN" ? "guardian-dashboard.html" : "Dashboard.html";
        } catch (requestError) {
            error.textContent = requestError.message;
        }
    });

    signupForm.addEventListener("submit", async event => {
        event.preventDefault();
        const error = document.getElementById("familySignupError");
        const subjectsError = document.getElementById("familySubjectsError");
        error.textContent = "";
        subjectsError.textContent = "";
        const guardian = selectedRole() === "GUARDIAN";
        const fullName = document.getElementById("familyFullName").value.trim();
        const learnerName = guardian
            ? document.getElementById("familyLearnerName").value.trim()
            : fullName;
        const phone = document.getElementById("familyPhone").value.trim();
        const body = {
            username: document.getElementById("familySignupUsername").value.trim(),
            password: document.getElementById("familySignupPassword").value,
            email: document.getElementById("familyEmail").value.trim(),
            fullName,
            phone,
            role: guardian ? "GUARDIAN" : "LEARNER",
            learnerName,
            learnerGrade: document.getElementById("familyGrade").value,
            learnerSubjects: getSelectedSubjectNames("familySubjectChoices").join(", ")
        };
        if (!body.learnerSubjects) {
            subjectsError.textContent = "Choose at least one subject.";
            return;
        }
        if (guardian) {
            body.emergencyContact = document.getElementById("familyEmergency").value.trim();
            body.guardianRelationship = document.getElementById("familyRelationship").value.trim();
        }
        if (body.password.length < 8) {
            error.textContent = "Use a password with at least 8 characters.";
            return;
        }
        try {
            const account = await apiRequest("/api/auth/signup", { method: "POST", body });
            storeAccount(account);
            window.location.href = guardian ? "guardian-dashboard.html" : "Dashboard.html";
        } catch (requestError) {
            error.textContent = requestError.message;
        }
    });

    updateForm();
}

let studentSearchData = [];

async function loadStudentPortalSearch() {
    const search = document.getElementById("studentPortalSearch");
    const gradeSelect = document.getElementById("studentSearchGrade");
    const results = document.getElementById("studentSearchResults");
    const status = document.getElementById("studentSearchStatus");
    if (!search || !gradeSelect || !results || !status) return;

    const [announcements, homework, resources, learners] = await Promise.all([
        apiRequest("/api/announcements"),
        apiRequest("/api/homework"),
        apiRequest("/api/study-resources"),
        apiRequest("/api/auth/learners")
    ]);
    const learnerGrade = String(learners[0]?.grade || "").match(/\d+/)?.[0] || "";
    if ([...gradeSelect.options].some(option => option.value === learnerGrade)) {
        gradeSelect.value = learnerGrade;
    }
    studentSearchData = [
        ...homework.map(item => ({
            type: "Homework",
            title: item.title,
            description: `${item.subject} · ${item.description} · Due ${displayDate(item.dueDate)}`,
            gradeLevel: "",
            href: "Homework.html"
        })),
        ...announcements.map(item => ({
            type: "Announcement",
            title: item.title,
            description: `${item.category || "General"} · ${item.content}`,
            gradeLevel: "",
            href: "Announcements.html"
        })),
        ...resources.map(item => ({
            type: "Study resource",
            title: item.title,
            description: `${item.subject} · ${item.resourceType || "Study material"} · ${item.gradeLevel || "All grades"} · ${item.description}`,
            gradeLevel: item.gradeLevel || "",
            href: "study-resources.html"
        }))
    ];

    const renderResults = () => {
        const query = search.value.trim().toLowerCase();
        const grade = gradeSelect.value;
        const matches = studentSearchData.filter(item => {
            const textMatches = !query ||
                `${item.type} ${item.title} ${item.description}`.toLowerCase().includes(query);
            const gradeMatches = item.type !== "Study resource" ||
                !grade || resourceMatchesGrade(item.gradeLevel, Number(grade));
            return textMatches && gradeMatches;
        });
        results.replaceChildren();
        matches.slice(0, 12).forEach(item => {
            const card = makeElement("article", "student-search-result");
            card.append(
                makeElement("span", "student-search-type", item.type),
                makeElement("h3", "", item.title),
                makeElement("p", "", item.description)
            );
            const link = makeElement("a", "", item.type === "Study resource" ? "Browse study resources" :
                item.type === "Homework" ? "View homework" : "View announcements");
            link.href = item.href;
            card.append(link);
            results.append(card);
        });
        if (!matches.length) {
            status.textContent = query
                ? "No matching homework, announcements or resources. Try another search."
                : "No content is available yet. Check back soon.";
        } else {
            status.textContent = `${matches.length} result${matches.length === 1 ? "" : "s"} found${matches.length > 12 ? " — showing the first 12" : ""}.`;
        }
    };

    search.addEventListener("input", renderResults);
    gradeSelect.addEventListener("change", renderResults);
    renderResults();
}

function resourceMatchesGrade(gradeLevel, grade) {
    const label = gradeLevel.toLowerCase();
    if (!label || label.includes("all")) return true;
    const range = label.match(/(?:grade|grades)\s*(r|\d+)\s*(?:-|to)\s*(r|\d+)/i);
    if (range) {
        const lower = range[1].toLowerCase() === "r" ? 0 : Number(range[1]);
        const upper = range[2].toLowerCase() === "r" ? 0 : Number(range[2]);
        return grade >= lower && grade <= upper;
    }
    const numbers = [...label.matchAll(/\d+/g)].map(match => Number(match[0]));
    if (numbers.length >= 2) return grade >= numbers[0] && grade <= numbers[1];
    if (numbers.length === 1) return grade === numbers[0];
    return true;
}

document.addEventListener("DOMContentLoaded", async function () {
    initializeFamilyPortal();
    setupSubjectChoices("familyGrade", "familySubjectChoices");
    setupSubjectChoices("studentSignupGrade", "studentSignupSubjectChoices");
    setupSubjectChoices("studentGrade", "guardianSignupSubjectChoices");
    setupSubjectChoices("studentGrade", "legacySignupSubjectChoices");
    const path = window.location.pathname.split("/").pop().toLowerCase();
    const account = currentAccount();
    const adminPages = new Set([
        "admin-dashboard.html", "admin-profile.html", "manage-announcements.html",
        "manage-homework.html", "manage-study-resources.html", "manage-contact-requests.html",
        "manage-users.html"
    ]);
    const userPages = new Set([
        "dashboard.html", "homework.html", "announcements.html", "study-resources.html", "user-profile.html"
    ]);
    if (adminPages.has(path) && account?.role !== "ADMIN") {
        window.location.replace("admin-login.html");
        return;
    }
    if (userPages.has(path) && !account) {
        window.location.replace("family-portal.html");
        return;
    }
    const guardianPages = new Set(["guardian-dashboard.html", "guardian-study-resources.html"]);
    if (guardianPages.has(path) && !account) {
        window.location.replace("family-portal.html");
        return;
    }
    if (guardianPages.has(path) && account?.role !== "GUARDIAN") {
        window.location.replace(account?.role === "LEARNER" ? "Dashboard.html" : "index.html");
        return;
    }
    if (userPages.has(path) && account?.role === "GUARDIAN" && path !== "user-profile.html") {
        window.location.replace("guardian-dashboard.html");
        return;
    }
    if (userPages.has(path) && account?.role !== "LEARNER" && account?.role !== "GUARDIAN") {
        window.location.replace(account?.role === "ADMIN" ? "admin-dashboard.html" : "user-login.html");
        return;
    }

    if (account) {
        document.querySelectorAll(".user-info strong").forEach(item => item.textContent = account.fullName);
        document.querySelectorAll(".user-info small").forEach(item => item.textContent = account.role);
    }

    document.querySelectorAll("[data-open-modal]").forEach(button => {
        button.addEventListener("click", () => {
            apiEditingId = null;
            if (path === "manage-homework.html") {
                document.getElementById("adminHomeworkFormTitle").textContent = "Add Homework";
            } else if (path === "manage-study-resources.html") {
                document.getElementById("adminResourceFormTitle").textContent = "Add Resource";
            }
        });
    });

    try {
        if (document.querySelector(".announcement-grid")) await loadAnnouncements();
        if (document.querySelector(".homework-grid")) await loadHomework();
        if (path === "dashboard.html") await loadLearnerDashboard();
        if (path === "dashboard.html") await loadStudentPortalSearch();
        if (path === "study-resources.html") await loadResources();
        if (path === "guardian-study-resources.html") await loadResources();
        if (path === "guardian-dashboard.html") await loadGuardianDashboard();
        if (path === "manage-announcements.html") await loadManagedAnnouncements();
        if (path === "manage-homework.html") await loadManagedHomework();
        if (path === "manage-study-resources.html") await loadManagedResources();
        if (path === "manage-contact-requests.html") await loadContactRequests();
        if (path === "manage-users.html") await loadManagedUsers();
        if (path === "admin-dashboard.html") await loadAdminDashboard();
        if (path === "user-profile.html" || path === "admin-profile.html") await loadProfile();
    } catch (error) {
        showApiError(error);
    }
});

async function loadAnnouncements() {
    const container = document.querySelector(".announcement-grid");
    const announcements = await apiRequest("/api/announcements");
    container.replaceChildren();
    if (!announcements.length) {
        container.append(makeElement("p", "empty-state", "There are no announcements yet. Please check back later."));
        return;
    }
    announcements.forEach(item => {
        const card = makeElement("article", "announcement-card");
        card.setAttribute("data-search-row", "");
        card.dataset.category = (item.category || "general").toLowerCase();
        const top = makeElement("div", "announcement-card-top");
        top.append(
            makeElement("span", "announcement-category", item.category || "General"),
            makeElement("span", "announcement-date", displayDate(item.createdDate))
        );
        card.append(top, makeElement("div", "announcement-large-icon", "📢"),
            makeElement("h3", "", item.title), makeElement("p", "", item.content));
        const button = makeElement("button", "secondary-btn", "Read More");
        button.type = "button";
        button.addEventListener("click", () =>
            viewAnnouncement(item.title, item.content, displayDate(item.createdDate), item.category || "General"));
        card.append(button);
        container.append(card);
    });
}

async function loadHomework() {
    const container = document.querySelector(".homework-grid");
    const assignments = await apiRequest("/api/homework");
    container.replaceChildren();
    if (!assignments.length) {
        container.append(makeElement("p", "empty-state", "There is no homework available yet. Please check back later."));
        return;
    }
    assignments.forEach(item => {
        const pastDue = item.dueDate && new Date(`${item.dueDate}T23:59:59`) < new Date();
        const status = item.status === "completed" ? "completed" : (pastDue ? "overdue" : "pending");
        const card = makeElement("article", "homework-card");
        card.dataset.status = status;
        card.dataset.id = item.homeworkId;
        const top = makeElement("div", "homework-card-top");
        top.append(makeElement("span", "subject", item.subject),
            makeElement("span", `status ${status}`, status[0].toUpperCase() + status.slice(1)));
        card.append(top, makeElement("h3", "", item.title), makeElement("p", "", item.description));
        const details = makeElement("div", "homework-info");
        details.append(makeElement("span", "", `Due: ${displayDate(item.dueDate)}`));
        card.append(details);
        const actions = makeElement("div", "homework-actions");
        const view = makeElement("button", "secondary-btn", "View Details");
        view.type = "button";
        view.addEventListener("click", () => viewHomework(item.title, item.description, displayDate(item.dueDate)));
        actions.append(view);
        if (status !== "completed") {
            const complete = makeElement("button", "primary-small-btn", "Mark Complete");
            complete.type = "button";
            complete.addEventListener("click", () => markComplete(complete));
            actions.append(complete);
        } else {
            actions.append(makeElement("button", "completed-btn", "✓ Completed"));
        }
        card.append(actions);
        container.append(card);
    });
}

async function markComplete(button) {
    const card = button.closest(".homework-card");
    if (!card?.dataset.id) return;
    try {
        await apiRequest(`/api/homework/${card.dataset.id}/status`, {
            method: "PATCH",
            body: { status: "completed" }
        });
        await loadHomework();
    } catch (error) {
        showApiError(error);
    }
}

async function loadResources() {
    const container = document.querySelector(".cards");
    if (!container) return;
    const resources = await apiRequest("/api/study-resources");
    container.replaceChildren();
    if (!resources.length) {
        container.append(makeElement("p", "empty-state", "There are no study resources available yet."));
        return;
    }
    resources.forEach(resource => {
        const card = makeElement("article", "resource-card");
        card.setAttribute("data-search-row", "");
        card.append(makeElement("div", "file-box", "▯"));
        const info = makeElement("div", "card-info");
        info.append(makeElement("h2", "", resource.title),
            makeElement("p", "accent", resource.subject),
            makeElement("p", "resource-meta",
                [resource.resourceType || "Study material", resource.gradeLevel].filter(Boolean).join(" · ")),
            makeElement("p", "", resource.description));
        card.append(info);
        if (resource.fileUrl) {
            const actions = makeElement("div", "card-actions");
            const link = makeElement("a", "icon-btn", "Open");
            link.href = resource.fileUrl;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.setAttribute("aria-label", `Open ${resource.title}`);
            actions.append(link);
            card.append(actions);
        }
        container.append(card);
    });
}

function formatDateInput(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value || "";
    return date.toISOString().slice(0, 10);
}

function actionButton(text, className, handler) {
    const button = makeElement("button", className, text);
    button.type = "button";
    button.addEventListener("click", handler);
    return button;
}

async function loadManagedAnnouncements() {
    const body = document.getElementById("announcementTableBody");
    const records = await apiRequest("/api/announcements");
    body.replaceChildren();
    records.forEach(item => {
        const row = document.createElement("tr");
        row.dataset.id = item.announcementId;
        row.dataset.title = item.title.toLowerCase();
        row.dataset.category = (item.category || "").toLowerCase();
        const date = item.createdDate;
        row.append(makeElement("td", "", item.title),
            makeElement("td", "", item.category || "General"),
            makeElement("td", "", displayDate(date)),
            makeElement("td", "", "Published"));
        const actions = makeElement("td");
        actions.append(actionButton("Edit", "edit-btn", () => editAnnouncementRow(item)),
            actionButton("Delete", "delete-btn", () => deleteAnnouncementRecord(item.announcementId)));
        row.append(actions);
        body.append(row);
    });
}

function openAnnouncementForm() {
    apiEditingId = null;
    document.getElementById("announcementTitle").value = "";
    document.getElementById("announcementCategory").value = "General";
    document.getElementById("announcementDate").value = "";
    document.getElementById("announcementDescription").value = "";
    document.getElementById("announcementFormTitle").textContent = "Add Announcement";
    document.getElementById("announcementFormModal").classList.add("show");
}

function editAnnouncementRow(item) {
    apiEditingId = item.announcementId;
    document.getElementById("announcementTitle").value = item.title;
    document.getElementById("announcementCategory").value = item.category || "General";
    document.getElementById("announcementDate").value = formatDateInput(item.createdDate);
    document.getElementById("announcementDescription").value = item.content;
    document.getElementById("announcementFormTitle").textContent = "Edit Announcement";
    document.getElementById("announcementFormModal").classList.add("show");
}

function closeAnnouncementForm() {
    document.getElementById("announcementFormModal").classList.remove("show");
    apiEditingId = null;
}

async function saveAnnouncement() {
    const body = {
        title: document.getElementById("announcementTitle").value.trim(),
        category: document.getElementById("announcementCategory").value,
        createdDate: document.getElementById("announcementDate").value,
        content: document.getElementById("announcementDescription").value.trim()
    };
    if (!body.title || !body.createdDate || !body.content) {
        alert("Complete the title, date, and description.");
        return;
    }
    try {
        await apiRequest(apiEditingId ? `/api/announcements/${apiEditingId}` : "/api/announcements", {
            method: apiEditingId ? "PUT" : "POST",
            body
        });
        closeAnnouncementForm();
        await loadManagedAnnouncements();
    } catch (error) {
        showApiError(error);
    }
}

async function deleteAnnouncementRecord(id) {
    if (!confirm("Delete this announcement?")) return;
    try {
        await apiRequest(`/api/announcements/${id}`, { method: "DELETE" });
        await loadManagedAnnouncements();
    } catch (error) {
        showApiError(error);
    }
}

async function loadManagedHomework() {
    const body = document.getElementById("adminHomeworkTableBody");
    const records = await apiRequest("/api/homework");
    body.replaceChildren();
    records.forEach(item => {
        const row = document.createElement("tr");
        row.dataset.id = item.homeworkId;
        row.append(makeElement("td", "", item.title), makeElement("td", "", displayDate(item.dueDate)));
        const actions = makeElement("td");
        actions.append(actionButton("Edit", "action-btn", () => editManagedHomework(item)),
            actionButton("Delete", "action-btn danger", () => deleteManagedHomework(item.homeworkId)));
        row.append(actions);
        body.append(row);
    });
}

function editManagedHomework(item) {
    apiEditingId = item.homeworkId;
    document.getElementById("adminHomeworkFormTitle").textContent = "Edit Homework";
    document.getElementById("adminHomeworkTitle").value = item.title;
    document.getElementById("adminHomeworkSubject").value = item.subject;
    document.getElementById("adminHomeworkDueDate").value = formatDateInput(item.dueDate);
    document.getElementById("adminHomeworkDescription").value = item.description;
    document.querySelector(".modal-backdrop").classList.add("show");
}

async function saveManagedHomework() {
    const body = {
        title: document.getElementById("adminHomeworkTitle").value.trim(),
        subject: document.getElementById("adminHomeworkSubject").value.trim(),
        dueDate: document.getElementById("adminHomeworkDueDate").value,
        description: document.getElementById("adminHomeworkDescription").value.trim()
    };
    if (!body.title || !body.subject || !body.dueDate || !body.description) {
        alert("Complete all homework fields.");
        return;
    }
    try {
        await apiRequest(apiEditingId ? `/api/homework/${apiEditingId}` : "/api/homework", {
            method: apiEditingId ? "PUT" : "POST",
            body
        });
        apiEditingId = null;
        document.querySelector(".modal-backdrop").classList.remove("show");
        document.getElementById("adminHomeworkFormTitle").textContent = "Add Homework";
        await loadManagedHomework();
    } catch (error) {
        showApiError(error);
    }
}

async function deleteManagedHomework(id) {
    if (!confirm("Delete this homework assignment?")) return;
    try {
        await apiRequest(`/api/homework/${id}`, { method: "DELETE" });
        await loadManagedHomework();
    } catch (error) {
        showApiError(error);
    }
}

async function loadManagedResources() {
    const body = document.getElementById("adminResourcesTableBody");
    const records = await apiRequest("/api/study-resources");
    body.replaceChildren();
    records.forEach(item => {
        const row = document.createElement("tr");
        row.dataset.id = item.resourceId;
        row.append(makeElement("td", "", `${item.title} (${item.resourceType || "Study material"})`),
            makeElement("td", "", item.subject));
        const actions = makeElement("td");
        actions.append(actionButton("Edit", "action-btn", () => editManagedResource(item)),
            actionButton("Delete", "action-btn danger", () => deleteManagedResource(item.resourceId)));
        row.append(actions);
        body.append(row);
    });
}

function editManagedResource(item) {
    apiEditingId = item.resourceId;
    document.getElementById("adminResourceFormTitle").textContent = "Edit Resource";
    document.getElementById("adminResourceTitle").value = item.title;
    document.getElementById("adminResourceSubject").value = item.subject;
    document.getElementById("adminResourceDescription").value = item.description;
    document.getElementById("adminResourceUrl").value = item.fileUrl || "";
    document.getElementById("adminResourceType").value = item.resourceType || "Study material";
    document.getElementById("adminResourceGrade").value = item.gradeLevel || "";
    document.querySelector(".modal-backdrop").classList.add("show");
}

async function saveManagedResource() {
    const body = {
        title: document.getElementById("adminResourceTitle").value.trim(),
        subject: document.getElementById("adminResourceSubject").value.trim(),
        description: document.getElementById("adminResourceDescription").value.trim(),
        fileUrl: document.getElementById("adminResourceUrl").value.trim() || null,
        resourceType: document.getElementById("adminResourceType").value,
        gradeLevel: document.getElementById("adminResourceGrade").value.trim() || null
    };
    if (!body.title || !body.subject || !body.description) {
        alert("Complete the title, subject, and description.");
        return;
    }
    try {
        await apiRequest(apiEditingId ? `/api/study-resources/${apiEditingId}` : "/api/study-resources", {
            method: apiEditingId ? "PUT" : "POST",
            body
        });
        apiEditingId = null;
        document.querySelector(".modal-backdrop").classList.remove("show");
        document.getElementById("adminResourceFormTitle").textContent = "Add Resource";
        await loadManagedResources();
    } catch (error) {
        showApiError(error);
    }
}

async function deleteManagedResource(id) {
    if (!confirm("Delete this resource?")) return;
    try {
        await apiRequest(`/api/study-resources/${id}`, { method: "DELETE" });
        await loadManagedResources();
    } catch (error) {
        showApiError(error);
    }
}

async function loadContactRequests() {
    const body = document.getElementById("contactRequestTableBody");
    const records = await apiRequest("/api/contact-requests");
    body.replaceChildren();
    records.forEach(item => {
        const row = document.createElement("tr");
        row.setAttribute("data-search-row", "");
        row.append(makeElement("td", "", `${item.name} (${item.email})`),
            makeElement("td", "", item.subject),
            makeElement("td", "", item.status));
        const action = makeElement("td");
        action.append(actionButton(item.reply ? "View reply" : "Reply", "action-btn reply", async () => {
            const reply = prompt(`Message: ${item.message}\n\nEnter a reply:`, item.reply || "");
            if (reply === null) return;
            if (!reply.trim()) {
                alert("Enter a reply before saving.");
                return;
            }
            try {
                await apiRequest(`/api/contact-requests/${item.requestId}`, {
                    method: "PATCH",
                    body: { status: "Replied", reply: reply.trim() }
                });
                await loadContactRequests();
            } catch (error) {
                showApiError(error);
            }
        }));
        row.append(action);
        body.append(row);
    });
}

async function loadManagedUsers() {
    const body = document.getElementById("userTableBody");
    const records = await apiRequest("/api/admin/users");
    body.replaceChildren();
    records.forEach(item => {
        const row = document.createElement("tr");
        const role = item.role.toLowerCase() === "guardian" ? "parent" : item.role.toLowerCase();
        const status = item.status.toLowerCase();
        row.dataset.userId = item.id;
        row.dataset.role = role;
        row.dataset.status = status;
        row.append(makeElement("td", "", item.fullName),
            makeElement("td", "", item.email),
            makeElement("td", "", item.role),
            makeElement("td", "", item.status));
        const actions = makeElement("td");
        const nextStatus = status === "active" ? "SUSPENDED" : "ACTIVE";
        actions.append(actionButton(status === "active" ? "Suspend" : "Activate",
            status === "active" ? "delete-btn" : "edit-btn",
            async () => {
                try {
                    await apiRequest(`/api/admin/users/${item.id}/status`, {
                        method: "PATCH",
                        body: { status: nextStatus }
                    });
                    await loadManagedUsers();
                } catch (error) {
                    showApiError(error);
                }
            }));
        row.append(actions);
        body.append(row);
    });
}

async function loadAdminDashboard() {
    const stats = await apiRequest("/api/admin/dashboard");
    document.getElementById("adminUsersCount").textContent = String(stats.users);
    document.getElementById("adminHomeworkCount").textContent = String(stats.homework);
    document.getElementById("adminAnnouncementsCount").textContent = String(stats.announcements);
    document.getElementById("adminContactCount").textContent = String(stats.contactRequests);
}

async function loadLearnerDashboard() {
    const [assignments, announcements] = await Promise.all([
        apiRequest("/api/homework"),
        apiRequest("/api/announcements")
    ]);
    const statuses = document.querySelectorAll(".stats-grid .stat-card h3");
    if (statuses.length >= 4) {
        const completed = assignments.filter(item => item.status === "completed").length;
        statuses[0].textContent = String(assignments.length);
        statuses[1].textContent = String(assignments.length - completed);
        statuses[2].textContent = String(completed);
        statuses[3].textContent = String(announcements.length);
    }
    const preview = document.querySelector(".homework-preview");
    if (preview) {
        preview.replaceChildren();
        assignments.slice(0, 4).forEach(item => {
            const row = makeElement("div", "preview-item");
            const details = makeElement("div");
            details.append(makeElement("h4", "", item.title),
                makeElement("p", "", `Due: ${displayDate(item.dueDate)}`));
            row.append(details, makeElement("span", `status ${item.status || "pending"}`,
                item.status || "Pending"));
            preview.append(row);
        });
    }
}

async function completeStudentSignup() {
    const errorElement = document.getElementById("signupError");
    const subjectsError = document.getElementById("studentSignupSubjectsError");
    if (errorElement) errorElement.textContent = "";
    if (subjectsError) subjectsError.textContent = "";
    const learnerSubjects = getSelectedSubjectNames("studentSignupSubjectChoices").join(", ");
    const body = {
        fullName: document.getElementById("studentSignupName").value.trim(),
        email: document.getElementById("studentSignupEmail").value.trim(),
        phone: document.getElementById("studentSignupPhone").value.trim(),
        learnerGrade: document.getElementById("studentSignupGrade").value.trim(),
        learnerSubjects,
        learnerName: document.getElementById("studentSignupName").value.trim(),
        username: document.getElementById("studentSignupUsername").value.trim(),
        password: document.getElementById("studentSignupPassword").value,
        role: "LEARNER"
    };
    if (!body.fullName || !body.email || !body.phone || !body.learnerGrade ||
        !body.username || !body.password) {
        if (errorElement) errorElement.textContent = "Complete all required fields before creating your account.";
        return;
    }
    if (!body.learnerSubjects) {
        if (subjectsError) subjectsError.textContent = "Choose at least one subject.";
        return;
    }
    if (body.password.length < 8) {
        if (errorElement) errorElement.textContent = "Use a password with at least 8 characters.";
        return;
    }
    try {
        const account = await apiRequest("/api/auth/signup", { method: "POST", body });
        storeAccount(account);
        window.location.href = "Dashboard.html";
    } catch (error) {
        if (errorElement) errorElement.textContent = error.message;
        else showApiError(error);
    }
}

async function completeGuardianSignup() {
    const errorElement = document.getElementById("signupError");
    const subjectsError = document.getElementById("guardianSignupSubjectsError");
    if (errorElement) errorElement.textContent = "";
    if (subjectsError) subjectsError.textContent = "";
    const learnerSubjects = getSelectedSubjectNames("guardianSignupSubjectChoices").join(", ");
    const body = {
        fullName: document.getElementById("guardianName").value.trim(),
        email: document.getElementById("guardianEmail").value.trim(),
        phone: document.getElementById("guardianPhone").value.trim(),
        username: document.getElementById("username").value.trim(),
        password: document.getElementById("password").value,
        learnerName: document.getElementById("studentName").value.trim(),
        learnerGrade: document.getElementById("studentGrade").value.trim(),
        learnerSubjects,
        emergencyContact: document.getElementById("studentEmergency").value.trim(),
        guardianRelationship: document.getElementById("guardianRelationship").value.trim(),
        role: "GUARDIAN"
    };
    if (!body.fullName || !body.email || !body.phone || !body.username || !body.password ||
        !body.learnerName || !body.learnerGrade || !body.emergencyContact ||
        !body.guardianRelationship) {
        if (errorElement) errorElement.textContent = "Complete all fields before creating your account.";
        return;
    }
    if (!body.learnerSubjects) {
        if (subjectsError) subjectsError.textContent = "Choose at least one subject for the learner.";
        return;
    }
    if (body.password.length < 8) {
        if (errorElement) errorElement.textContent = "Use a password with at least 8 characters.";
        return;
    }
    try {
        const account = await apiRequest("/api/auth/signup", { method: "POST", body });
        storeAccount(account);
        window.location.href = "guardian-dashboard.html";
    } catch (error) {
        if (errorElement) errorElement.textContent = error.message;
        else showApiError(error);
    }
}

async function loadGuardianDashboard() {
    const account = currentAccount();
    const welcomeName = document.getElementById("guardianWelcomeName");
    if (welcomeName && account) welcomeName.textContent = account.fullName;
    const container = document.getElementById("guardianLearners");
    const learners = await apiRequest("/api/auth/learners");
    container.replaceChildren();
    if (!learners.length) {
        container.append(makeElement("p", "", "No learner is linked to this account yet."));
        return;
    }
    learners.forEach(learner => {
        const card = makeElement("article", "learner-summary-card");
        card.append(makeElement("h3", "", learner.fullName),
            makeElement("p", "", `Grade ${learner.grade}`),
            makeElement("p", "", `Subjects: ${learner.subjects || "Not specified"}`),
            makeElement("p", "", `Relationship: ${learner.relationship || "Not specified"}`));
        container.append(card);
    });
}

async function loadProfile() {
    const profile = await apiRequest("/api/auth/me");
    cachedProfile = profile;
    const account = currentAccount();
    if (account) {
        account.fullName = profile.fullName;
        storeAccount(account);
    }

    const userCard = document.querySelector(".profile-card");
    if (userCard) {
        const values = [
            profile.fullName, profile.email, profile.phone || "", profile.address || ""
        ];
        userCard.querySelectorAll(".profile-field p").forEach((node, index) => {
            if (values[index] !== undefined) node.textContent = values[index];
        });
        const fields = userCard.querySelectorAll(".profile-field p");
        if (fields.length >= 4) {
            document.getElementById("editProfileName").value = profile.fullName;
            document.getElementById("editProfileEmail").value = profile.email;
            document.getElementById("editProfilePhone").value = profile.phone || "";
            document.getElementById("editProfileAddress").value = profile.address || "";
        }
    }

    const adminHero = document.querySelector(".admin-hero");
    if (adminHero) {
        adminHero.querySelector("h2").textContent = profile.fullName;
        adminHero.querySelector("p").textContent = profile.email;
        const rows = document.querySelectorAll(".admin-info-row p");
        if (rows[0]) rows[0].textContent = profile.fullName;
        if (rows[1]) rows[1].textContent = profile.email;
        if (rows[2]) rows[2].textContent = profile.phone || "";
        if (rows[3]) rows[3].textContent = profile.role;
        document.getElementById("adminFullName").value = profile.fullName;
        document.getElementById("adminEmail").value = profile.email;
        document.getElementById("adminPhone").value = profile.phone || "";
    }

    const learnerList = document.querySelector(".learner-item");
    if (learnerList) {
        const learners = await apiRequest("/api/auth/learners");
        const parent = learnerList.parentElement;
        parent.querySelectorAll(".learner-item").forEach(item => item.remove());
        learners.forEach(learner => {
            const card = makeElement("div", "learner-item");
            [["Learner name:", learner.fullName], ["Grade:", learner.grade],
                ["Subjects:", learner.subjects || ""]].forEach(([label, value]) => {
                const field = makeElement("div", "profile-field");
                field.append(makeElement("label", "", label), makeElement("p", "", value));
                card.append(field);
            });
            parent.append(card);
        });
    }
}

async function saveEditProfile() {
    const body = {
        fullName: document.getElementById("editProfileName").value.trim(),
        email: document.getElementById("editProfileEmail").value.trim(),
        phone: document.getElementById("editProfilePhone").value.trim(),
        address: document.getElementById("editProfileAddress").value.trim()
    };
    if (!body.fullName || !body.email) {
        alert("Enter your name and email address.");
        return;
    }
    try {
        await apiRequest("/api/auth/me", { method: "PUT", body });
        closeEditProfileForm();
        await loadProfile();
    } catch (error) {
        showApiError(error);
    }
}

async function saveAdminProfile() {
    const body = {
        fullName: document.getElementById("adminFullName").value.trim(),
        email: document.getElementById("adminEmail").value.trim(),
        phone: document.getElementById("adminPhone").value.trim(),
        address: cachedProfile?.address || ""
    };
    if (!body.fullName || !body.email) {
        alert("Enter your name and email address.");
        return;
    }
    try {
        await apiRequest("/api/auth/me", { method: "PUT", body });
        closeAdminProfileForm();
        await loadProfile();
    } catch (error) {
        showApiError(error);
    }
}


/* ---------- Helper ---------- */

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


/* ================================
   ADMIN PROFILE — EDIT MODAL
   ================================ */

function openAdminProfileForm() {

    document
        .getElementById("adminProfileFormModal")
        .classList
        .add("show");
}


function closeAdminProfileForm() {

    document
        .getElementById("adminProfileFormModal")
        .classList
        .remove("show");
}


/* =========================================
   DESIGN B PAGES — interactivity shim
   (Manage Homework, Manage Study Resources,
    Manage Contact Requests, Study Resources)
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* ---- Skip if not a Design B page ---- */
    if (!document.querySelector(".app")) return;


    /* =====================================
       1. MODAL OPEN / CLOSE
       ===================================== */

    const backdrop = document.querySelector(".modal-backdrop");
    const openBtn  = document.querySelector("[data-open-modal]");
    const closeBtn = document.querySelector("[data-close-modal]");

    function openModal() {
        if (backdrop) backdrop.classList.add("show");
    }

    function closeModal() {
        if (backdrop) backdrop.classList.remove("show");
    }

    function clearModal() {
        if (!backdrop) return;
        backdrop.querySelectorAll("input, textarea").forEach(function (el) {
            el.value = "";
        });
    }

    if (openBtn) {
        openBtn.addEventListener("click", function () {
            clearModal();
            openModal();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    if (backdrop) {
        backdrop.addEventListener("click", function (event) {
            if (event.target === backdrop) closeModal();
        });
    }


    /* =====================================
       2. DATA-DEMO BUTTON HANDLER
       Instead of showing an alert, route the
       demo buttons to real actions.
       ===================================== */

    function getTableRow(button) {
        return button.closest("tr");
    }

    /* --- Edit row --- */

    function editRow(button) {
        const row = getTableRow(button);
        if (!row) return;

        const cells = row.querySelectorAll("td");

        /* Fill modal with the row's data */
        const inputs = backdrop ? backdrop.querySelectorAll("input") : [];
        const textarea = backdrop ? backdrop.querySelector("textarea") : null;

        if (inputs[0]) inputs[0].value = cells[0].textContent.trim();
        if (inputs[1]) inputs[1].value = cells[1].textContent.trim();
        if (textarea) textarea.value = "Editing…";

        /* Change modal title for context */
        const modalTitle = backdrop ? backdrop.querySelector("h2") : null;
        if (modalTitle) modalTitle.textContent = "Edit";

        openModal();
    }

    /* --- Delete row --- */

    function deleteRow(button) {
        const row = getTableRow(button);
        if (!row) return;

        if (confirm("Delete this item?")) {
            row.remove();
        }
    }

    /* --- Save (add new row) --- */

    function saveFromModal() {
        if (!backdrop) return;

        const inputs = backdrop.querySelectorAll("input");
        const textarea = backdrop.querySelector("textarea");

        const title = inputs[0] ? inputs[0].value.trim() : "";
        const second = inputs[1] ? inputs[1].value.trim() : "";

        if (!title || !second) {
            alert("Please fill in the required fields.");
            return;
        }

        /* Find the table on the page */
        const tbody = document.querySelector("table tbody");
        if (!tbody) {
            /* Not a table page (Study Resources uses cards) */
            /* We still close the modal so it doesn't feel stuck */
            closeModal();
            return;
        }

        /* Build a new row with the same structure as the others */
        const templateRow = tbody.querySelector("tr");
        const cellCount = templateRow ? templateRow.querySelectorAll("td").length : 3;

        const newRow = document.createElement("tr");
        newRow.setAttribute("data-search-row", "");

        let rowHTML = `<td>${title}</td>`;
        if (cellCount >= 2) rowHTML += `<td>${second}</td>`;

        if (cellCount >= 3) {
            /* Detect the kind of page from the action column's button label */
            const existingLabel = templateRow
                ? templateRow.querySelector("button")?.textContent.trim()
                : "Edit";

            if (existingLabel && existingLabel.toLowerCase().includes("delete")) {
                rowHTML += `<td><button class="action-btn" data-demo="Edit">Edit</button></td>`;
            } else {
                rowHTML += `<td>
                    <button class="action-btn" data-demo="Edit">Edit</button>
                    <button class="action-btn danger" data-demo="Delete">Delete</button>
                </td>`;
            }
        }

        newRow.innerHTML = rowHTML;
        tbody.appendChild(newRow);

        /* Re-attach demo handlers to the new row's buttons */
        attachDemoHandlers(newRow);

        closeModal();
        clearModal();
    }


    /* =====================================
       3. WIRE UP ALL `data-demo` BUTTONS
       ===================================== */

    function attachDemoHandlers(scope) {
        scope.querySelectorAll("[data-demo]").forEach(function (button) {
            const label = button.dataset.demo.toLowerCase();

            button.onclick = function () {

                if (label.includes("edit")) {
                    editRow(button);
                    return;
                }

                if (label.includes("delete")) {
                    deleteRow(button);
                    return;
                }

                if (label.includes("submitted") || label.includes("save")) {
                    saveFromModal();
                    return;
                }

                /* Reply / View / Preview / Download etc. — no-op */
            };
        });
    }

    /* Attach to every demo button on the page on load */
    attachDemoHandlers(document);


    /* =====================================
       4. SEARCH
       ===================================== */

    const searchInput = document.querySelector("[data-search]");

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const query = this.value.toLowerCase().trim();

            /* Filter table rows */
            document
                .querySelectorAll("[data-search-row]")
                .forEach(function (item) {
                    const text = item.textContent.toLowerCase();
                    item.style.display = text.includes(query) ? "" : "none";
                });
        });
    }


    /* =====================================
       5. PREVENT FORM SUBMITS FROM RELOADING
       (Design B modals have no <form>, but
        just in case any future edit adds one)
       ===================================== */

    document.querySelectorAll("form").forEach(function (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
        });
    });

});