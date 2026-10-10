// ===========================================
// HEALTHCARE HOSPITAL
// DASHBOARD JAVASCRIPT
// PART 1 (CORRECTED)
// ===========================================

document.addEventListener("DOMContentLoaded", function () {

    // ===========================================
    // EDIT BUTTON
    // ===========================================

    const editButtons =
        document.querySelectorAll(".edit");

    editButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            alert("Edit feature will be added soon.");

        });

    });

    // ===========================================
    // DELETE BUTTON
    // ===========================================

    const deleteButtons =
        document.querySelectorAll(".delete");

    deleteButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const result = confirm(
                "Are you sure you want to delete this record?"
            );

            if (result) {

                button.closest("tr").remove();

                alert("Record Deleted Successfully.");

            }

        });

    });

    // ===========================================
    // SEARCH TABLE
    // ===========================================

    const searchInput =
        document.querySelector("input");

    if (searchInput) {

        searchInput.addEventListener("keyup", function () {

            const filter =
                this.value.toLowerCase();

            const rows =
                document.querySelectorAll("table tr");

            rows.forEach(function (row, index) {

                if (index === 0) return;

                const text =
                    row.innerText.toLowerCase();

                row.style.display =
                    text.includes(filter)
                        ? ""
                        : "none";

            });

        });

    }

    // ===========================================
    // LOAD LOCAL STORAGE DATA
    // ===========================================

    const appointments =
        JSON.parse(
            localStorage.getItem("appointments")
        ) || [];

    const doctors =
        JSON.parse(
            localStorage.getItem("doctors")
        ) || [];

    const patients =
        JSON.parse(
            localStorage.getItem("patients")
        ) || [];

    const departments =
        JSON.parse(
            localStorage.getItem("departments")
        ) || [];

    // ===========================================
    // DASHBOARD COUNTERS
    // ===========================================

    const totalDoctors =
        document.getElementById("totalDoctors");

    const totalPatients =
        document.getElementById("totalPatients");

    const totalAppointments =
        document.getElementById("totalAppointments");

    const totalDepartments =
        document.getElementById("totalDepartments");

    if (totalDoctors) {

        totalDoctors.innerText =
            doctors.length;

    }

    if (totalPatients) {

        totalPatients.innerText =
            patients.length;

    }

    if (totalAppointments) {

        totalAppointments.innerText =
            appointments.length;

    }

    if (totalDepartments) {

        totalDepartments.innerText =
            departments.length;

    }

    // ===========================================
    // PART 2 STARTS FROM HERE
    // ===========================================
        // ===========================================
    // RECENT APPOINTMENTS
    // ===========================================

    const recentTable =
        document.querySelector("#recentAppointmentsTable tbody");

    if (recentTable) {

        recentTable.innerHTML = "";

        const recentAppointments =
            appointments
            .slice()
            .reverse()
            .slice(0, 5);

        recentAppointments.forEach(function (item) {

            const row =
                document.createElement("tr");

            row.innerHTML = `

                <td>${item.id}</td>

                <td>${item.patientName}</td>

                <td>${item.doctor}</td>

                <td>${item.date}</td>

                <td>${item.status}</td>

            `;

            recentTable.appendChild(row);

        });

    }

    // ===========================================
    // LIVE DASHBOARD STATISTICS
    // ===========================================

    function updateDashboardStats() {

        const totalAppointmentsCard =
            document.getElementById("totalAppointments");

        const totalPatientsCard =
            document.getElementById("totalPatients");

        const totalDoctorsCard =
            document.getElementById("totalDoctors");

        const totalDepartmentsCard =
            document.getElementById("totalDepartments");

        if (totalAppointmentsCard) {

            totalAppointmentsCard.innerText =
                appointments.length;

        }

        if (totalPatientsCard) {

            const uniquePatients =

                [...new Set(

                    appointments.map(function(item){

                        return item.patientName;

                    })

                )];

            totalPatientsCard.innerText =
                uniquePatients.length;

        }

        if (totalDoctorsCard) {

            const uniqueDoctors =

                [...new Set(

                    appointments.map(function(item){

                        return item.doctor;

                    })

                )];

            totalDoctorsCard.innerText =
                uniqueDoctors.length;

        }

        if (totalDepartmentsCard) {

            const uniqueDepartments =

                [...new Set(

                    appointments.map(function(item){

                        return item.department;

                    })

                )];

            totalDepartmentsCard.innerText =
                uniqueDepartments.length;

        }

    }

    updateDashboardStats();

    // ===========================================
    // PART 3 STARTS FROM HERE
    // ===========================================
        // ===========================================
    // APPOINTMENT ANALYTICS BAR CHART
    // ===========================================

    const chartCanvas =
        document.getElementById("appointmentChart");

    if (chartCanvas) {

        let confirmed = 0;
        let completed = 0;
        let cancelled = 0;

        appointments.forEach(function (item) {

            if (item.status === "Confirmed") {

                confirmed++;

            }

            else if (item.status === "Completed") {

                completed++;

            }

            else if (item.status === "Cancelled") {

                cancelled++;

            }

        });

        new Chart(chartCanvas, {

            type: "bar",

            data: {

                labels: [

                    "Confirmed",

                    "Completed",

                    "Cancelled"

                ],

                datasets: [{

                    label: "Appointments",

                    data: [

                        confirmed,

                        completed,

                        cancelled

                    ],

                    backgroundColor: [

                        "#28a745",

                        "#0b74d1",

                        "#dc3545"

                    ],

                    borderRadius: 8

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {

                        display: false

                    }

                },

                scales: {

                    y: {

                        beginAtZero: true,

                        ticks: {

                            precision: 0

                        }

                    }

                }

            }

        });

    }

    // ===========================================
    // PART 4 STARTS FROM HERE
    // ===========================================
        // ===========================================
    // PIE CHART
    // ===========================================

    const pieCanvas =
        document.getElementById("statusPieChart");

    if (pieCanvas) {

        let confirmed = 0;
        let completed = 0;
        let cancelled = 0;

        appointments.forEach(function (item) {

            if (item.status === "Confirmed") {

                confirmed++;

            }

            else if (item.status === "Completed") {

                completed++;

            }

            else if (item.status === "Cancelled") {

                cancelled++;

            }

        });

        new Chart(pieCanvas, {

            type: "pie",

            data: {

                labels: [

                    "Confirmed",

                    "Completed",

                    "Cancelled"

                ],

                datasets: [{

                    data: [

                        confirmed,

                        completed,

                        cancelled

                    ],

                    backgroundColor: [

                        "#28a745",

                        "#0b74d1",

                        "#dc3545"

                    ],

                    borderWidth: 2

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {

                        position: "bottom"

                    }

                }

            }

        });

    }

    // ===========================================
    // MONTHLY REPORT
    // PART 5 STARTS FROM HERE
    // ===========================================
        // ===========================================
    // MONTHLY REPORT
    // ===========================================

    const monthAppointments =
        document.getElementById("monthAppointments");

    const todayAppointments =
        document.getElementById("todayAppointments");

    const upcomingAppointments =
        document.getElementById("upcomingAppointments");

    if (

        monthAppointments &&

        todayAppointments &&

        upcomingAppointments

    ) {

        const today = new Date();

        const currentMonth =
            today.getMonth();

        const currentYear =
            today.getFullYear();

        let monthCount = 0;

        let todayCount = 0;

        let upcomingCount = 0;

        appointments.forEach(function (item) {

            if (!item.date) return;

            const appointmentDate =
                new Date(item.date);

            if (

                appointmentDate.getMonth() === currentMonth &&

                appointmentDate.getFullYear() === currentYear

            ) {

                monthCount++;

            }

            if (

                appointmentDate.toDateString() ===

                today.toDateString()

            ) {

                todayCount++;

            }

            if (appointmentDate > today) {

                upcomingCount++;

            }

        });

        monthAppointments.innerText =
            monthCount;

        todayAppointments.innerText =
            todayCount;

        upcomingAppointments.innerText =
            upcomingCount;

    }

    // ===========================================
    // LOAD RECENT APPOINTMENTS
    // ===========================================

    const appointmentTable =
        document.querySelector(
            "#recentAppointments tbody"
        );

    if (appointmentTable) {

        appointmentTable.innerHTML = "";

        appointments

            .slice()

            .reverse()

            .slice(0, 5)

            .forEach(function (appointment) {

                const row =
                    document.createElement("tr");

                row.innerHTML = `

                    <td>${appointment.id}</td>

                    <td>${appointment.patientName}</td>

                    <td>${appointment.doctor}</td>

                    <td>${appointment.date}</td>

                    <td>${appointment.status}</td>

                `;

                appointmentTable.appendChild(row);

            });

    }

}); // DOMContentLoaded END