// ===========================================
// HEALTHCARE HOSPITAL
// LABORATORY TEST MANAGEMENT
// PHASE 3 - PART 1
// ===========================================

document.addEventListener("DOMContentLoaded", function () {

    // ===========================================
    // LOCAL STORAGE
    // ===========================================

    let tests =
        JSON.parse(localStorage.getItem("tests")) || [];

    let editTestId = null;

    // ===========================================
    // HTML ELEMENTS
    // ===========================================

    const laboratoryForm =
        document.getElementById("laboratoryForm");

    const laboratoryTable =
        document.querySelector("#laboratoryTable tbody");

    const searchLaboratory =
        document.getElementById("searchLaboratory");

    // ===========================================
    // LOAD DATA
    // ===========================================

    loadTests();

    updateDashboardCounter();

    // ===========================================
    // ADD / UPDATE TEST
    // ===========================================

    laboratoryForm.addEventListener("submit", function (e) {

        e.preventDefault();

        if (editTestId !== null) {

            tests = tests.map(function (test) {

                if (test.id === editTestId) {

                    test.patient =
                        document.getElementById("patientName").value;

                    test.doctor =
                        document.getElementById("doctorName").value;

                    test.testName =
                        document.getElementById("testName").value;

                    test.testDate =
                        document.getElementById("testDate").value;

                    test.result =
                        document.getElementById("testResult").value;

                    test.status =
                        document.getElementById("status").value;

                }

                return test;

            });

            localStorage.setItem(
                "tests",
                JSON.stringify(tests)
            );

            updateDashboardCounter();

            loadTests();

            laboratoryForm.reset();

            editTestId = null;

            document.getElementById("addTestBtn").innerHTML =
                '<i class="fa-solid fa-plus"></i> Add Test';

            alert("Test Updated Successfully.");

            return;

        }

        const test = {

            id: Date.now(),

            patient:
                document.getElementById("patientName").value,

            doctor:
                document.getElementById("doctorName").value,

            testName:
                document.getElementById("testName").value,

            testDate:
                document.getElementById("testDate").value,

            result:
                document.getElementById("testResult").value,

            status:
                document.getElementById("status").value

        };

        tests.push(test);

        localStorage.setItem(
            "tests",
            JSON.stringify(tests)
        );

        updateDashboardCounter();

        loadTests();

        laboratoryForm.reset();

        alert("Test Added Successfully.");

    });
        // ===========================================
    // LOAD TESTS
    // PHASE 3 - PART 2
    // ===========================================

    function loadTests() {

        laboratoryTable.innerHTML = "";

        tests.forEach(function (test, index) {

            let statusClass = "";

            if (test.status === "Completed") {

                statusClass = "completed";

            }

            else {

                statusClass = "pending";

            }

            laboratoryTable.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${test.patient}</td>

                <td>${test.doctor}</td>

                <td>${test.testName}</td>

                <td>${test.testDate}</td>

                <td>${test.result}</td>

                <td>

                    <span class="${statusClass}">

                        ${test.status}

                    </span>

                </td>

                <td>

                    <button
                        class="editBtn"
                        onclick="editTest(${test.id})">

                        Edit

                    </button>

                    <button
                        class="deleteBtn"
                        onclick="deleteTest(${test.id})">

                        Delete

                    </button>

                </td>

            </tr>

            `;

        });

    }
        // ===========================================
    // DELETE TEST
    // PHASE 3 - PART 3
    // ===========================================

    window.deleteTest = function (id) {

        const confirmDelete = confirm(
            "Are you sure you want to delete this test?"
        );

        if (!confirmDelete) {

            return;

        }

        tests = tests.filter(function (test) {

            return test.id !== id;

        });

        localStorage.setItem(
            "tests",
            JSON.stringify(tests)
        );

        updateDashboardCounter();

        loadTests();

        alert("Test Deleted Successfully.");

    };

    // ===========================================
    // EDIT TEST
    // PHASE 3 - PART 3
    // ===========================================

    window.editTest = function (id) {

        const test = tests.find(function (item) {

            return item.id === id;

        });

        if (!test) return;

        editTestId = id;

        document.getElementById("patientName").value =
            test.patient;

        document.getElementById("doctorName").value =
            test.doctor;

        document.getElementById("testName").value =
            test.testName;

        document.getElementById("testDate").value =
            test.testDate;

        document.getElementById("testResult").value =
            test.result;

        document.getElementById("status").value =
            test.status;

        document.getElementById("addTestBtn").innerHTML =
            '<i class="fa-solid fa-pen"></i> Update Test';

    };
        // ===========================================
    // SEARCH LABORATORY TEST
    // PHASE 3 - PART 4
    // ===========================================

    if (searchLaboratory) {

        searchLaboratory.addEventListener("keyup", function () {

            const value =
                searchLaboratory.value.toLowerCase();

            const rows =
                document.querySelectorAll("#laboratoryTable tbody tr");

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

            "totalTests",

            tests.length

        );

    }

});