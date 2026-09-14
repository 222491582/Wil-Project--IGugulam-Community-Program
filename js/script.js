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

    document.getElementById("announcementForm").reset();

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