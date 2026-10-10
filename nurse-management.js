// ===========================================
// HEALTHCARE HOSPITAL
// NURSE MANAGEMENT
// PHASE 3 - PART 1
// ===========================================

document.addEventListener("DOMContentLoaded", function () {

    // ===========================================
    // LOCAL STORAGE
    // ===========================================

    let nurses =
        JSON.parse(localStorage.getItem("nurses")) || [];

    let editNurseId = null;

    // ===========================================
    // HTML ELEMENTS
    // ===========================================

    const nurseForm =
        document.getElementById("nurseForm");

    const nurseTable =
        document.querySelector("#nurseTable tbody");

    const searchNurse =
        document.getElementById("searchNurse");

    // ===========================================
    // LOAD DATA
    // ===========================================

    loadNurses();

    updateDashboardCounter();

    // ===========================================
    // ADD / UPDATE NURSE
    // ===========================================

    nurseForm.addEventListener("submit", function (e) {

        e.preventDefault();

        if (editNurseId !== null) {

            nurses = nurses.map(function (nurse) {

                if (nurse.id === editNurseId) {

                    nurse.nurseId =
                        document.getElementById("nurseId").value;

                    nurse.name =
                        document.getElementById("nurseName").value;

                    nurse.department =
                        document.getElementById("department").value;

                    nurse.shift =
                        document.getElementById("shift").value;

                    nurse.phone =
                        document.getElementById("phone").value;

                    nurse.email =
                        document.getElementById("email").value;

                    nurse.salary =
                        document.getElementById("salary").value;

                }

                return nurse;

            });

            localStorage.setItem(
                "nurses",
                JSON.stringify(nurses)
            );

            updateDashboardCounter();

            loadNurses();

            nurseForm.reset();

            editNurseId = null;

            document.getElementById("addNurseBtn").innerHTML =
                '<i class="fa-solid fa-plus"></i> Add Nurse';

            alert("Nurse Updated Successfully.");

            return;

        }

        const nurse = {

            id: Date.now(),

            nurseId:
                document.getElementById("nurseId").value,

            name:
                document.getElementById("nurseName").value,

            department:
                document.getElementById("department").value,

            shift:
                document.getElementById("shift").value,

            phone:
                document.getElementById("phone").value,

            email:
                document.getElementById("email").value,

            salary:
                document.getElementById("salary").value

        };

        nurses.push(nurse);

        localStorage.setItem(
            "nurses",
            JSON.stringify(nurses)
        );

        updateDashboardCounter();

        loadNurses();

        nurseForm.reset();

        alert("Nurse Added Successfully.");

    });
        // ===========================================
    // LOAD NURSES
    // PHASE 3 - PART 2
    // ===========================================

    function loadNurses() {

        nurseTable.innerHTML = "";

        nurses.forEach(function (nurse, index) {

            let shiftClass = "";

            if (nurse.shift === "Morning") {

                shiftClass = "morning";

            }

            else if (nurse.shift === "Evening") {

                shiftClass = "evening";

            }

            else {

                shiftClass = "night";

            }

            nurseTable.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${nurse.nurseId}</td>

                <td>${nurse.name}</td>

                <td>${nurse.department}</td>

                <td>

                    <span class="${shiftClass}">

                        ${nurse.shift}

                    </span>

                </td>

                <td>${nurse.phone}</td>

                <td>${nurse.email}</td>

                <td>Rs. ${nurse.salary}</td>

                <td>

                    <button
                        class="editBtn"
                        onclick="editNurse(${nurse.id})">

                        Edit

                    </button>

                    <button
                        class="deleteBtn"
                        onclick="deleteNurse(${nurse.id})">

                        Delete

                    </button>

                </td>

            </tr>

            `;

        });

    }
        // ===========================================
    // DELETE NURSE
    // PHASE 3 - PART 3
    // ===========================================

    window.deleteNurse = function (id) {

        const confirmDelete = confirm(
            "Are you sure you want to delete this nurse?"
        );

        if (!confirmDelete) {

            return;

        }

        nurses = nurses.filter(function (nurse) {

            return nurse.id !== id;

        });

        localStorage.setItem(
            "nurses",
            JSON.stringify(nurses)
        );

        updateDashboardCounter();

        loadNurses();

        alert("Nurse Deleted Successfully.");

    };

    // ===========================================
    // EDIT NURSE
    // PHASE 3 - PART 3
    // ===========================================

    window.editNurse = function (id) {

        const nurse = nurses.find(function (item) {

            return item.id === id;

        });

        if (!nurse) return;

        editNurseId = id;

        document.getElementById("nurseId").value =
            nurse.nurseId;

        document.getElementById("nurseName").value =
            nurse.name;

        document.getElementById("department").value =
            nurse.department;

        document.getElementById("shift").value =
            nurse.shift;

        document.getElementById("phone").value =
            nurse.phone;

        document.getElementById("email").value =
            nurse.email;

        document.getElementById("salary").value =
            nurse.salary;

        document.getElementById("addNurseBtn").innerHTML =
            '<i class="fa-solid fa-pen"></i> Update Nurse';

    };
        // ===========================================
    // SEARCH NURSE
    // PHASE 3 - PART 4
    // ===========================================

    if (searchNurse) {

        searchNurse.addEventListener("keyup", function () {

            const value =
                searchNurse.value.toLowerCase();

            const rows =
                document.querySelectorAll("#nurseTable tbody tr");

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

            "totalNurses",

            nurses.length

        );

    }

});