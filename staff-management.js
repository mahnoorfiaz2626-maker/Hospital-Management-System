// ===========================================
// HEALTHCARE HOSPITAL
// STAFF MANAGEMENT
// PHASE 3 - PART 1
// ===========================================

document.addEventListener("DOMContentLoaded", function () {

    // ===========================================
    // LOCAL STORAGE
    // ===========================================

    let staff =
        JSON.parse(localStorage.getItem("staff")) || [];

    let editStaffId = null;

    // ===========================================
    // HTML ELEMENTS
    // ===========================================

    const staffForm =
        document.getElementById("staffForm");

    const staffTable =
        document.querySelector("#staffTable tbody");

    const searchStaff =
        document.getElementById("searchStaff");

    // ===========================================
    // LOAD DATA
    // ===========================================

    loadStaff();

    updateDashboardCounter();

    // ===========================================
    // ADD / UPDATE STAFF
    // ===========================================

    staffForm.addEventListener("submit", function (e) {

        e.preventDefault();

        if (editStaffId !== null) {

            staff = staff.map(function (employee) {

                if (employee.id === editStaffId) {

                    employee.staffId =
                        document.getElementById("staffId").value;

                    employee.name =
                        document.getElementById("staffName").value;

                    employee.designation =
                        document.getElementById("designation").value;

                    employee.department =
                        document.getElementById("department").value;

                    employee.phone =
                        document.getElementById("phone").value;

                    employee.email =
                        document.getElementById("email").value;

                    employee.salary =
                        document.getElementById("salary").value;

                }

                return employee;

            });

            localStorage.setItem(
                "staff",
                JSON.stringify(staff)
            );

            updateDashboardCounter();

            loadStaff();

            staffForm.reset();

            editStaffId = null;

            document.getElementById("addStaffBtn").innerHTML =
                '<i class="fa-solid fa-plus"></i> Add Staff';

            alert("Staff Updated Successfully.");

            return;

        }

        const employee = {

            id: Date.now(),

            staffId:
                document.getElementById("staffId").value,

            name:
                document.getElementById("staffName").value,

            designation:
                document.getElementById("designation").value,

            department:
                document.getElementById("department").value,

            phone:
                document.getElementById("phone").value,

            email:
                document.getElementById("email").value,

            salary:
                document.getElementById("salary").value

        };

        staff.push(employee);

        localStorage.setItem(
            "staff",
            JSON.stringify(staff)
        );

        updateDashboardCounter();

        loadStaff();

        staffForm.reset();

        alert("Staff Added Successfully.");

    });
        // ===========================================
    // LOAD STAFF
    // PHASE 3 - PART 2
    // ===========================================

    function loadStaff() {

        staffTable.innerHTML = "";

        staff.forEach(function (employee, index) {

            staffTable.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${employee.staffId}</td>

                <td>${employee.name}</td>

                <td>${employee.designation}</td>

                <td>${employee.department}</td>

                <td>${employee.phone}</td>

                <td>${employee.email}</td>

                <td>Rs. ${employee.salary}</td>

                <td>

                    <button
                        class="editBtn"
                        onclick="editStaff(${employee.id})">

                        Edit

                    </button>

                    <button
                        class="deleteBtn"
                        onclick="deleteStaff(${employee.id})">

                        Delete

                    </button>

                </td>

            </tr>

            `;

        });

    }
        // ===========================================
    // DELETE STAFF
    // PHASE 3 - PART 3
    // ===========================================

    window.deleteStaff = function (id) {

        const confirmDelete = confirm(
            "Are you sure you want to delete this staff member?"
        );

        if (!confirmDelete) {

            return;

        }

        staff = staff.filter(function (employee) {

            return employee.id !== id;

        });

        localStorage.setItem(
            "staff",
            JSON.stringify(staff)
        );

        updateDashboardCounter();

        loadStaff();

        alert("Staff Deleted Successfully.");

    };

    // ===========================================
    // EDIT STAFF
    // PHASE 3 - PART 3
    // ===========================================

    window.editStaff = function (id) {

        const employee = staff.find(function (item) {

            return item.id === id;

        });

        if (!employee) return;

        editStaffId = id;

        document.getElementById("staffId").value =
            employee.staffId;

        document.getElementById("staffName").value =
            employee.name;

        document.getElementById("designation").value =
            employee.designation;

        document.getElementById("department").value =
            employee.department;

        document.getElementById("phone").value =
            employee.phone;

        document.getElementById("email").value =
            employee.email;

        document.getElementById("salary").value =
            employee.salary;

        document.getElementById("addStaffBtn").innerHTML =
            '<i class="fa-solid fa-pen"></i> Update Staff';

    };
        // ===========================================
    // SEARCH STAFF
    // PHASE 3 - PART 4
    // ===========================================

    if (searchStaff) {

        searchStaff.addEventListener("keyup", function () {

            const value =
                searchStaff.value.toLowerCase();

            const rows =
                document.querySelectorAll("#staffTable tbody tr");

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

            "totalStaff",

            staff.length

        );

    }

});