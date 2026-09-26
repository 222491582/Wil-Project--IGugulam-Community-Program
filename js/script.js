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


/* Sign up step 3 -> done */
function completeSignup() {

    const name       = document.getElementById("studentName").value.trim();
    const grade      = document.getElementById("studentGrade").value.trim();
    const subjects   = document.getElementById("studentSubjects").value.trim();
    const emergency  = document.getElementById("studentEmergency").value.trim();

    if (!name || !grade || !subjects || !emergency) {
        alert("Please fill in all student details.");
        return;
    }

    localStorage.setItem("studentName", name);
    localStorage.setItem("studentGrade", grade);
    localStorage.setItem("studentSubjects", subjects);
    localStorage.setItem("studentEmergency", emergency);

    /* For now, send them to the login page.
       Later this will POST to the backend. */
    alert("Account created! Please log in.");
    window.location.href = "user-login.html";
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
    window.location.href = "dashboard.html";
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


function saveAdminProfile() {

    const name  = document.getElementById("adminFullName").value.trim();
    const email = document.getElementById("adminEmail").value.trim();
    const phone = document.getElementById("adminPhone").value.trim();

    if (!name || !email || !phone) {
        alert("Please fill in all fields.");
        return;
    }

    /* Update the visible values on the page */
    const hero = document.querySelector(".admin-hero");
    hero.querySelector("h2").textContent = name;
    hero.querySelector("p").textContent  = email;

    const rows = document.querySelectorAll(".admin-info-row");

    /* Row 0 = Full Name, Row 1 = Email, Row 2 = Phone, Row 3 = Role */
    rows[0].querySelector("p").textContent = name;
    rows[1].querySelector("p").textContent = email;
    rows[2].querySelector("p").textContent = phone;

    closeAdminProfileForm();
}
