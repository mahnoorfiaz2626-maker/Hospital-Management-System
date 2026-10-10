// ===========================================
// HEALTHCARE HOSPITAL
// DOCTORS MODULE
// PHASE 3 - PART 1
// ===========================================

document.addEventListener("DOMContentLoaded", function () {

    // ===========================================
    // SEARCH DOCTOR
    // ===========================================

    const searchInput =
        document.getElementById("searchDoctor");

    const doctorCards =
        document.querySelectorAll(".doctor-card");

    if (searchInput) {

        searchInput.addEventListener("keyup", function () {

            const value =
                searchInput.value.toLowerCase();

            doctorCards.forEach(function (card) {

                const name =
                    card.querySelector("h3").innerText.toLowerCase();

                const speciality =
                    card.querySelector(".speciality").innerText.toLowerCase();

                if (

                    name.includes(value) ||

                    speciality.includes(value)

                ) {

                    card.style.display = "block";

                }

                else {

                    card.style.display = "none";

                }

            });

        });

    }

});
// ===========================================
// HEALTHCARE HOSPITAL
// DOCTORS MODULE
// PHASE 3 - PART 2
// FILTER DOCTORS
// ===========================================

const filterButtons =
    document.querySelectorAll(".filter-btn");

const doctorCards =
    document.querySelectorAll(".doctor-card");

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Remove Active Class

        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });

        // Add Active Class

        button.classList.add("active");

        const filter =
            button.dataset.filter;

        doctorCards.forEach(function (card) {

            const department =
                card.dataset.department;

            if (

                filter === "all" ||

                department === filter

            ) {

                card.style.display = "block";

            }

            else {

                card.style.display = "none";

            }

        });

    });

});
// ===========================================
// HEALTHCARE HOSPITAL
// DOCTORS MODULE
// PHASE 3 - PART 3
// VIEW PROFILE POPUP
// ===========================================

const modal =
    document.getElementById("doctorModal");

const viewButtons =
    document.querySelectorAll(".view-btn");

const closeBtn =
    document.querySelector(".close");

viewButtons.forEach(function(button){

    button.addEventListener("click", function(){

        const card =
            button.closest(".doctor-card");

        // Doctor Image
        document.getElementById("modalImage").src =
            card.querySelector("img").src;

        // Doctor Name
        document.getElementById("modalName").innerText =
            card.querySelector("h3").innerText;

        // Speciality
        document.getElementById("modalSpeciality").innerText =
            card.querySelector(".speciality").innerText;

        // Experience
        document.getElementById("modalExperience").innerText =
            card.querySelector(".experience").innerText;

        // Rating
        document.getElementById("modalRating").innerText =
            card.querySelector(".rating").innerText;

        // Status
        document.getElementById("modalStatus").innerText =
            card.querySelector(".status").innerText;

        // Schedule
        document.getElementById("modalSchedule").innerHTML =
            card.querySelector(".schedule").innerHTML;

        // Phone
        document.getElementById("modalPhone").innerText =
            card.querySelector(".phone").innerText;

        // Email
        document.getElementById("modalEmail").innerText =
            card.querySelector(".email").innerText;

        // Show Popup
        modal.style.display = "block";

    });

});
// ===========================================
// HEALTHCARE HOSPITAL
// DOCTORS MODULE
// PHASE 3 - PART 4
// CLOSE POPUP
// ===========================================

// Close Button

if (closeBtn) {

    closeBtn.addEventListener("click", function () {

        modal.style.display = "none";

    });

}

// Click Outside Popup

window.addEventListener("click", function (event) {

    if (event.target === modal) {

        modal.style.display = "none";

    }

});

// ESC Key Close

document.addEventListener("keydown", function (event) {

    if (

        event.key === "Escape" &&

        modal.style.display === "block"

    ) {

        modal.style.display = "none";

    }

});
// ===========================================
// HEALTHCARE HOSPITAL
// DOCTORS MODULE
// PHASE 3 - PART 5
// BOOK APPOINTMENT
// ===========================================

const bookButtons =
    document.querySelectorAll(".book-btn");

bookButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Doctor Name

        const doctorName =
            button.getAttribute("data-doctor");

        // Save Doctor in LocalStorage

        localStorage.setItem(

            "selectedDoctor",

            doctorName

        );

        // Open Appointment Page

        window.location.href =
            "appointments.html";

    });

});

// ===========================================
// POPUP BOOK APPOINTMENT BUTTON
// ===========================================

const popupBookBtn =
    document.getElementById("popupBookBtn");

if (popupBookBtn) {

    popupBookBtn.addEventListener("click", function () {

        const doctorName =
            document.getElementById("modalName").innerText;

        localStorage.setItem(

            "selectedDoctor",

            doctorName

        );

        window.location.href =
            "appointments.html";

    });

}
// ===========================================
// HEALTHCARE HOSPITAL
// DOCTOR MODULE
// PHASE 3 - PART 6
// AUTO SELECT DOCTOR
// ===========================================

const doctorSelect =
    document.getElementById("doctor");

const selectedDoctor =
    localStorage.getItem("selectedDoctor");

if (

    doctorSelect &&

    selectedDoctor

) {

    doctorSelect.value =
        selectedDoctor;

}