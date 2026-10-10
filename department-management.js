// ===========================================
// HEALTHCARE HOSPITAL
// DEPARTMENT MANAGEMENT
// PHASE 3 - PART 1
// ===========================================

document.addEventListener("DOMContentLoaded", function () {

    // ===========================================
    // LOCAL STORAGE
    // ===========================================

    let departments =
        JSON.parse(localStorage.getItem("departments")) || [];

    let editDepartmentId = null;

    // ===========================================
    // HTML ELEMENTS
    // ===========================================

    const departmentForm =
        document.getElementById("departmentForm");

    const departmentTable =
        document.querySelector("#departmentTable tbody");

    const searchDepartment =
        document.getElementById("searchDepartment");

    // ===========================================
    // LOAD DEPARTMENTS
    // ===========================================

    loadDepartments();

    updateDashboardCounter();

    // ===========================================
    // ADD / UPDATE DEPARTMENT
    // ===========================================

    departmentForm.addEventListener("submit", function (e) {

        e.preventDefault();

        if (editDepartmentId !== null) {

            departments = departments.map(function (department) {

                if (department.id === editDepartmentId) {

                    department.name =
                        document.getElementById("departmentName").value;

                    department.head =
                        document.getElementById("headDoctor").value;

                    department.staff =
                        document.getElementById("staffCount").value;

                    department.location =
                        document.getElementById("location").value;

                    department.contact =
                        document.getElementById("contact").value;

                }

                return department;

            });

            localStorage.setItem(
                "departments",
                JSON.stringify(departments)
            );

            updateDashboardCounter();

            loadDepartments();

            departmentForm.reset();

            editDepartmentId = null;

            document.getElementById("addDepartmentBtn").innerHTML =
                '<i class="fa-solid fa-plus"></i> Add Department';

            alert("Department Updated Successfully.");

            return;

        }

        const department = {

            id: Date.now(),

            name:
                document.getElementById("departmentName").value,

            head:
                document.getElementById("headDoctor").value,

            staff:
                document.getElementById("staffCount").value,

            location:
                document.getElementById("location").value,

            contact:
                document.getElementById("contact").value

        };

        departments.push(department);

        localStorage.setItem(
            "departments",
            JSON.stringify(departments)
        );

        updateDashboardCounter();

        loadDepartments();

        departmentForm.reset();

        alert("Department Added Successfully.");

    });
        // ===========================================
    // LOAD DEPARTMENTS
    // PHASE 3 - PART 2
    // ===========================================

    function loadDepartments() {

        departmentTable.innerHTML = "";

        departments.forEach(function (department, index) {

            departmentTable.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${department.name}</td>

                <td>${department.head}</td>

                <td>${department.staff}</td>

                <td>${department.location}</td>

                <td>${department.contact}</td>

                <td>

                    <button
                        class="editBtn"
                        onclick="editDepartment(${department.id})">

                        Edit

                    </button>

                    <button
                        class="deleteBtn"
                        onclick="deleteDepartment(${department.id})">

                        Delete

                    </button>

                </td>

            </tr>

            `;

        });

    }
        // ===========================================
    // DELETE DEPARTMENT
    // PHASE 3 - PART 3
    // ===========================================

    window.deleteDepartment = function (id) {

        const confirmDelete = confirm(
            "Are you sure you want to delete this department?"
        );

        if (!confirmDelete) {

            return;

        }

        departments = departments.filter(function (department) {

            return department.id !== id;

        });

        localStorage.setItem(
            "departments",
            JSON.stringify(departments)
        );

        updateDashboardCounter();

        loadDepartments();

        alert("Department Deleted Successfully.");

    };

    // ===========================================
    // EDIT DEPARTMENT
    // PHASE 3 - PART 3
    // ===========================================

    window.editDepartment = function (id) {

        const department = departments.find(function (item) {

            return item.id === id;

        });

        if (!department) return;

        editDepartmentId = id;

        document.getElementById("departmentName").value =
            department.name;

        document.getElementById("headDoctor").value =
            department.head;

        document.getElementById("staffCount").value =
            department.staff;

        document.getElementById("location").value =
            department.location;

        document.getElementById("contact").value =
            department.contact;

        document.getElementById("addDepartmentBtn").innerHTML =
            '<i class="fa-solid fa-pen"></i> Update Department';

    };
        // ===========================================
    // SEARCH DEPARTMENT
    // PHASE 3 - PART 4
    // ===========================================

    if (searchDepartment) {

        searchDepartment.addEventListener("keyup", function () {

            const value =
                searchDepartment.value.toLowerCase();

            const rows =
                document.querySelectorAll("#departmentTable tbody tr");

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

            "totalDepartments",

            departments.length

        );

    }

});