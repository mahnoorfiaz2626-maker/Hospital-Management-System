// ===========================================
// HEALTHCARE HOSPITAL
// APPOINTMENT MANAGEMENT
// PHASE 3 - PART 1
// ===========================================

document.addEventListener("DOMContentLoaded", function () {

    // ===========================================
    // LOCAL STORAGE
    // ===========================================

    let appointments =
        JSON.parse(localStorage.getItem("appointments")) || [];

    let editAppointmentId = null;

    // ===========================================
    // HTML ELEMENTS
    // ===========================================

    const appointmentForm =
        document.getElementById("appointmentForm");

    const appointmentTable =
        document.querySelector("#appointmentTable tbody");

    const searchAppointment =
        document.getElementById("searchAppointment");

    // ===========================================
    // LOAD APPOINTMENTS
    // ===========================================

    loadAppointments();

    updateDashboardCounter();

    // ===========================================
    // ADD / UPDATE APPOINTMENT
    // ===========================================

    appointmentForm.addEventListener("submit", function (e) {

        e.preventDefault();

        // ===========================
        // UPDATE APPOINTMENT
        // ===========================

        if (editAppointmentId !== null) {

            appointments = appointments.map(function (appointment) {

                if (appointment.id === editAppointmentId) {

                    appointment.patient =
                        document.getElementById("patientName").value;

                    appointment.doctor =
                        document.getElementById("doctorName").value;

                    appointment.department =
                        document.getElementById("department").value;

                    appointment.date =
                        document.getElementById("appointmentDate").value;

                    appointment.time =
                        document.getElementById("appointmentTime").value;

                    appointment.status =
                        document.getElementById("status").value;

                }

                return appointment;

            });

            localStorage.setItem(
                "appointments",
                JSON.stringify(appointments)
            );

            updateDashboardCounter();

            loadAppointments();

            appointmentForm.reset();

            editAppointmentId = null;

            document.getElementById("addAppointmentBtn").innerHTML =
                '<i class="fa-solid fa-plus"></i> Add Appointment';

            alert("Appointment Updated Successfully.");

            return;

        }

        // ===========================
        // ADD APPOINTMENT
        // ===========================

        const appointment = {

            id: Date.now(),

            patient:
                document.getElementById("patientName").value,

            doctor:
                document.getElementById("doctorName").value,

            department:
                document.getElementById("department").value,

            date:
                document.getElementById("appointmentDate").value,

            time:
                document.getElementById("appointmentTime").value,

            status:
                document.getElementById("status").value

        };

        appointments.push(appointment);

        localStorage.setItem(
            "appointments",
            JSON.stringify(appointments)
        );

        updateDashboardCounter();

        loadAppointments();

        appointmentForm.reset();

        alert("Appointment Added Successfully.");

    });
        // ===========================================
    // LOAD APPOINTMENTS
    // PHASE 3 - PART 2
    // ===========================================

    function loadAppointments() {

        appointmentTable.innerHTML = "";

        appointments.forEach(function (appointment, index) {

            let statusClass = "";

            if (appointment.status === "Pending") {

                statusClass = "pending";

            }

            else if (appointment.status === "Confirmed") {

                statusClass = "confirmed";

            }

            else if (appointment.status === "Completed") {

                statusClass = "completed";

            }

            else {

                statusClass = "cancelled";

            }

            appointmentTable.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${appointment.patient}</td>

                <td>${appointment.doctor}</td>

                <td>${appointment.department}</td>

                <td>${appointment.date}</td>

                <td>${appointment.time}</td>

                <td>

                    <span class="${statusClass}">

                        ${appointment.status}

                    </span>

                </td>

                <td>

                    <button
                        class="editBtn"
                        onclick="editAppointment(${appointment.id})">

                        Edit

                    </button>

                    <button
                        class="deleteBtn"
                        onclick="deleteAppointment(${appointment.id})">

                        Delete

                    </button>

                </td>

            </tr>

            `;

        });

    }
        // ===========================================
    // DELETE APPOINTMENT
    // PHASE 3 - PART 3
    // ===========================================

    window.deleteAppointment = function (id) {

        const confirmDelete = confirm(
            "Are you sure you want to delete this appointment?"
        );

        if (!confirmDelete) {

            return;

        }

        appointments = appointments.filter(function (appointment) {

            return appointment.id !== id;

        });

        localStorage.setItem(
            "appointments",
            JSON.stringify(appointments)
        );

        updateDashboardCounter();

        loadAppointments();

        alert("Appointment Deleted Successfully.");

    };

    // ===========================================
    // EDIT APPOINTMENT
    // PHASE 3 - PART 3
    // ===========================================

    window.editAppointment = function (id) {

        const appointment = appointments.find(function (item) {

            return item.id === id;

        });

        if (!appointment) return;

        editAppointmentId = id;

        document.getElementById("patientName").value =
            appointment.patient;

        document.getElementById("doctorName").value =
            appointment.doctor;

        document.getElementById("department").value =
            appointment.department;

        document.getElementById("appointmentDate").value =
            appointment.date;

        document.getElementById("appointmentTime").value =
            appointment.time;

        document.getElementById("status").value =
            appointment.status;

        document.getElementById("addAppointmentBtn").innerHTML =
            '<i class="fa-solid fa-pen"></i> Update Appointment';

    };
        // ===========================================
    // SEARCH APPOINTMENT
    // PHASE 3 - PART 4
    // ===========================================

    if (searchAppointment) {

        searchAppointment.addEventListener("keyup", function () {

            const value =
                searchAppointment.value.toLowerCase();

            const rows =
                document.querySelectorAll("#appointmentTable tbody tr");

            rows.forEach(function (row) {

                const text =
                    row.innerText.toLowerCase();

                if (text.includes(value)) {

                    row.style.display = "";

                }

                else {

                    row.style.display = "none";

                }

            });

        });

    }

    // ===========================================
    // UPDATE DASHBOARD COUNTER
    // PHASE 3 - PART 4
    // ===========================================

    function updateDashboardCounter() {

        localStorage.setItem(

            "totalAppointments",

            appointments.length

        );

    }

});