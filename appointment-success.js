// ===========================================
// HEALTHCARE HOSPITAL
// APPOINTMENT SUCCESS PAGE
// ===========================================

document.addEventListener("DOMContentLoaded", function () {

    // ===========================================
    // GET DATA
    // ===========================================

    const appointment = JSON.parse(
        localStorage.getItem("printAppointment")
    );

    if (!appointment) return;

    // ===========================================
    // SHOW APPOINTMENT DATA
    // ===========================================

    document.getElementById("appointmentID").textContent =
        appointment.appointmentID || "-";

    document.getElementById("patientName").textContent =
        appointment.patientName || "-";

    document.getElementById("fatherName").textContent =
        appointment.fatherName || "-";

    document.getElementById("gender").textContent =
        appointment.gender || "-";

    document.getElementById("age").textContent =
        appointment.age || "-";

    document.getElementById("phone").textContent =
        appointment.phone || "-";

    document.getElementById("doctor").textContent =
        appointment.doctor || "-";

    document.getElementById("department").textContent =
        appointment.department || "-";

    document.getElementById("date").textContent =
        appointment.date || "-";

    document.getElementById("time").textContent =
        appointment.time || "-";

    document.getElementById("fee").textContent =
        appointment.fee || "Rs. 2,000";

    document.getElementById("status").textContent =
        appointment.status || "Confirmed";

    // ===========================================
    // PRINT DATE
    // ===========================================

    const today = new Date();

    document.getElementById("printDate").textContent =
        today.toLocaleString();

    // ===========================================
    // CARD ANIMATION
    // ===========================================

    const card = document.querySelector(".success-card");

    if (card) {

        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";

        setTimeout(function () {

            card.style.transition = "all .5s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }, 150);

    }

});