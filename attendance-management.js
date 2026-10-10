// ===========================================
// HEALTHCARE HOSPITAL
// ATTENDANCE MANAGEMENT
// PHASE 3 - PART 1
// ===========================================

document.addEventListener("DOMContentLoaded", function () {

    // ===========================================
    // LOCAL STORAGE
    // ===========================================

    let attendance =
        JSON.parse(localStorage.getItem("attendance")) || [];

    let editAttendanceId = null;

    // ===========================================
    // HTML ELEMENTS
    // ===========================================

    const attendanceForm =
        document.getElementById("attendanceForm");

    const attendanceTable =
        document.querySelector("#attendanceTable tbody");

    const searchAttendance =
        document.getElementById("searchAttendance");

    // ===========================================
    // LOAD DATA
    // ===========================================

    loadAttendance();

    updateDashboardCounter();

    // ===========================================
    // ADD / UPDATE ATTENDANCE
    // ===========================================

    attendanceForm.addEventListener("submit", function (e) {

        e.preventDefault();

        if (editAttendanceId !== null) {

            attendance = attendance.map(function (record) {

                if (record.id === editAttendanceId) {

                    record.employeeId =
                        document.getElementById("employeeId").value;

                    record.employeeName =
                        document.getElementById("employeeName").value;

                    record.department =
                        document.getElementById("department").value;

                    record.date =
                        document.getElementById("attendanceDate").value;

                    record.checkIn =
                        document.getElementById("checkIn").value;

                    record.checkOut =
                        document.getElementById("checkOut").value;

                    record.status =
                        document.getElementById("attendanceStatus").value;

                }

                return record;

            });

            localStorage.setItem(
                "attendance",
                JSON.stringify(attendance)
            );

            updateDashboardCounter();

            loadAttendance();

            attendanceForm.reset();

            editAttendanceId = null;

            document.getElementById("addAttendanceBtn").innerHTML =
                '<i class="fa-solid fa-check"></i> Mark Attendance';

            alert("Attendance Updated Successfully.");

            return;

        }

        const record = {

            id: Date.now(),

            employeeId:
                document.getElementById("employeeId").value,

            employeeName:
                document.getElementById("employeeName").value,

            department:
                document.getElementById("department").value,

            date:
                document.getElementById("attendanceDate").value,

            checkIn:
                document.getElementById("checkIn").value,

            checkOut:
                document.getElementById("checkOut").value,

            status:
                document.getElementById("attendanceStatus").value

        };

        attendance.push(record);

        localStorage.setItem(
            "attendance",
            JSON.stringify(attendance)
        );

        updateDashboardCounter();

        loadAttendance();

        attendanceForm.reset();

        alert("Attendance Marked Successfully.");

    });
        // ===========================================
    // LOAD ATTENDANCE
    // PHASE 3 - PART 2
    // ===========================================

    function loadAttendance() {

        attendanceTable.innerHTML = "";

        attendance.forEach(function (record, index) {

            let statusClass = "";

            if (record.status === "Present") {

                statusClass = "present";

            }

            else if (record.status === "Absent") {

                statusClass = "absent";

            }

            else {

                statusClass = "leave";

            }

            attendanceTable.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${record.employeeId}</td>

                <td>${record.employeeName}</td>

                <td>${record.department}</td>

                <td>${record.date}</td>

                <td>${record.checkIn}</td>

                <td>${record.checkOut}</td>

                <td>

                    <span class="${statusClass}">

                        ${record.status}

                    </span>

                </td>

                <td>

                    <button
                        class="editBtn"
                        onclick="editAttendance(${record.id})">

                        Edit

                    </button>

                    <button
                        class="deleteBtn"
                        onclick="deleteAttendance(${record.id})">

                        Delete

                    </button>

                </td>

            </tr>

            `;

        });

    }
        // ===========================================
    // DELETE ATTENDANCE
    // PHASE 3 - PART 3
    // ===========================================

    window.deleteAttendance = function (id) {

        const confirmDelete = confirm(
            "Are you sure you want to delete this attendance record?"
        );

        if (!confirmDelete) {

            return;

        }

        attendance = attendance.filter(function (record) {

            return record.id !== id;

        });

        localStorage.setItem(
            "attendance",
            JSON.stringify(attendance)
        );

        updateDashboardCounter();

        loadAttendance();

        alert("Attendance Record Deleted Successfully.");

    };

    // ===========================================
    // EDIT ATTENDANCE
    // PHASE 3 - PART 3
    // ===========================================

    window.editAttendance = function (id) {

        const record = attendance.find(function (item) {

            return item.id === id;

        });

        if (!record) return;

        editAttendanceId = id;

        document.getElementById("employeeId").value =
            record.employeeId;

        document.getElementById("employeeName").value =
            record.employeeName;

        document.getElementById("department").value =
            record.department;

        document.getElementById("attendanceDate").value =
            record.date;

        document.getElementById("checkIn").value =
            record.checkIn;

        document.getElementById("checkOut").value =
            record.checkOut;

        document.getElementById("attendanceStatus").value =
            record.status;

        document.getElementById("addAttendanceBtn").innerHTML =
            '<i class="fa-solid fa-pen"></i> Update Attendance';

    };
        // ===========================================
    // SEARCH ATTENDANCE
    // PHASE 3 - PART 4
    // ===========================================

    if (searchAttendance) {

        searchAttendance.addEventListener("keyup", function () {

            const value =
                searchAttendance.value.toLowerCase();

            const rows =
                document.querySelectorAll("#attendanceTable tbody tr");

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

            "totalAttendance",

            attendance.length

        );

    }

});