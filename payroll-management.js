// ===========================================
// HEALTHCARE HOSPITAL
// PAYROLL MANAGEMENT
// PHASE 3 - PART 1
// ===========================================

document.addEventListener("DOMContentLoaded", function () {

    // ===========================================
    // LOCAL STORAGE
    // ===========================================

    let payrollRecords =
        JSON.parse(localStorage.getItem("payrollRecords")) || [];

    let editPayrollId = null;

    // ===========================================
    // HTML ELEMENTS
    // ===========================================

    const payrollForm =
        document.getElementById("payrollForm");

    const payrollTable =
        document.querySelector("#payrollTable tbody");

    const searchPayroll =
        document.getElementById("searchPayroll");

    const basicSalary =
        document.getElementById("basicSalary");

    const bonus =
        document.getElementById("bonus");

    const deductions =
        document.getElementById("deductions");

    const netSalary =
        document.getElementById("netSalary");

    // ===========================================
    // AUTO NET SALARY CALCULATION
    // ===========================================

    function calculateNetSalary() {

        const basic =
            Number(basicSalary.value) || 0;

        const extraBonus =
            Number(bonus.value) || 0;

        const deduction =
            Number(deductions.value) || 0;

        netSalary.value =
            basic + extraBonus - deduction;

    }

    basicSalary.addEventListener(
        "input",
        calculateNetSalary
    );

    bonus.addEventListener(
        "input",
        calculateNetSalary
    );

    deductions.addEventListener(
        "input",
        calculateNetSalary
    );

    // ===========================================
    // LOAD DATA
    // ===========================================

    loadPayrollRecords();

    updateDashboardCounter();

    // ===========================================
    // ADD / UPDATE PAYROLL
    // ===========================================

    payrollForm.addEventListener("submit", function (e) {

        e.preventDefault();

        if (editPayrollId !== null) {

            payrollRecords = payrollRecords.map(function (record) {

                if (record.id === editPayrollId) {

                    record.employeeId =
                        document.getElementById("employeeId").value;

                    record.employeeName =
                        document.getElementById("employeeName").value;

                    record.department =
                        document.getElementById("department").value;

                    record.designation =
                        document.getElementById("designation").value;

                    record.basicSalary =
                        basicSalary.value;

                    record.bonus =
                        bonus.value;

                    record.deductions =
                        deductions.value;

                    record.netSalary =
                        netSalary.value;

                    record.salaryMonth =
                        document.getElementById("salaryMonth").value;

                }

                return record;

            });

            localStorage.setItem(
                "payrollRecords",
                JSON.stringify(payrollRecords)
            );

            updateDashboardCounter();

            loadPayrollRecords();

            payrollForm.reset();

            netSalary.value = "";

            editPayrollId = null;

            document.getElementById("addPayrollBtn").innerHTML =
                '<i class="fa-solid fa-plus"></i> Add Payroll Record';

            alert("Payroll Record Updated Successfully.");

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

            designation:
                document.getElementById("designation").value,

            basicSalary:
                basicSalary.value,

            bonus:
                bonus.value,

            deductions:
                deductions.value,

            netSalary:
                netSalary.value,

            salaryMonth:
                document.getElementById("salaryMonth").value

        };

        payrollRecords.push(record);

        localStorage.setItem(
            "payrollRecords",
            JSON.stringify(payrollRecords)
        );

        updateDashboardCounter();

        loadPayrollRecords();

        payrollForm.reset();

        netSalary.value = "";

        alert("Payroll Record Added Successfully.");

    });
        // ===========================================
    // LOAD PAYROLL RECORDS
    // PHASE 3 - PART 2
    // ===========================================

    function loadPayrollRecords() {

        payrollTable.innerHTML = "";

        payrollRecords.forEach(function (record, index) {

            payrollTable.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${record.employeeId}</td>

                <td>${record.employeeName}</td>

                <td>${record.department}</td>

                <td>${record.designation}</td>

                <td class="salary">
                    PKR ${Number(record.basicSalary).toLocaleString()}
                </td>

                <td class="salary">
                    PKR ${Number(record.bonus).toLocaleString()}
                </td>

                <td class="salary">
                    PKR ${Number(record.deductions).toLocaleString()}
                </td>

                <td class="salary">
                    PKR ${Number(record.netSalary).toLocaleString()}
                </td>

                <td>${record.salaryMonth}</td>

                <td>

                    <button
                        class="editBtn"
                        onclick="editPayroll(${record.id})">

                        Edit

                    </button>

                    <button
                        class="deleteBtn"
                        onclick="deletePayroll(${record.id})">

                        Delete

                    </button>

                </td>

            </tr>

            `;

        });

    }
        // ===========================================
    // DELETE PAYROLL RECORD
    // PHASE 3 - PART 3
    // ===========================================

    window.deletePayroll = function (id) {

        const confirmDelete = confirm(
            "Are you sure you want to delete this payroll record?"
        );

        if (!confirmDelete) {

            return;

        }

        payrollRecords = payrollRecords.filter(function (record) {

            return record.id !== id;

        });

        localStorage.setItem(
            "payrollRecords",
            JSON.stringify(payrollRecords)
        );

        updateDashboardCounter();

        loadPayrollRecords();

        alert("Payroll Record Deleted Successfully.");

    };

    // ===========================================
    // EDIT PAYROLL RECORD
    // PHASE 3 - PART 3
    // ===========================================

    window.editPayroll = function (id) {

        const record = payrollRecords.find(function (item) {

            return item.id === id;

        });

        if (!record) return;

        editPayrollId = id;

        document.getElementById("employeeId").value =
            record.employeeId;

        document.getElementById("employeeName").value =
            record.employeeName;

        document.getElementById("department").value =
            record.department;

        document.getElementById("designation").value =
            record.designation;

        document.getElementById("basicSalary").value =
            record.basicSalary;

        document.getElementById("bonus").value =
            record.bonus;

        document.getElementById("deductions").value =
            record.deductions;

        document.getElementById("netSalary").value =
            record.netSalary;

        document.getElementById("salaryMonth").value =
            record.salaryMonth;

        document.getElementById("addPayrollBtn").innerHTML =
            '<i class="fa-solid fa-pen"></i> Update Payroll Record';

    };
        // ===========================================
    // SEARCH PAYROLL RECORD
    // PHASE 3 - PART 4
    // ===========================================

    if (searchPayroll) {

        searchPayroll.addEventListener("keyup", function () {

            const value =
                searchPayroll.value.toLowerCase();

            const rows =
                document.querySelectorAll("#payrollTable tbody tr");

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

            "totalPayrollRecords",

            payrollRecords.length

        );

    }

});