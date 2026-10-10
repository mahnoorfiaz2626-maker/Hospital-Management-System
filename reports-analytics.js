// ===========================================
// HEALTHCARE HOSPITAL
// REPORTS & ANALYTICS
// PHASE 3 - PART 1
// ===========================================

document.addEventListener("DOMContentLoaded", function () {

    // ===========================================
    // LOCAL STORAGE DATA
    // ===========================================

    const totalDoctors =
        Number(localStorage.getItem("totalDoctors")) || 0;

    const totalPatients =
        Number(localStorage.getItem("totalPatients")) || 0;

    const totalAppointments =
        Number(localStorage.getItem("totalAppointments")) || 0;

    const totalRevenue =
        Number(localStorage.getItem("totalRevenue")) || 0;

    const totalMedicines =
        Number(localStorage.getItem("totalMedicines")) || 0;

    const totalBlood =
        Number(localStorage.getItem("totalBloodRecords")) || 0;

    const totalInventory =
        Number(localStorage.getItem("totalInventoryItems")) || 0;

    const totalStaff =
        Number(localStorage.getItem("totalStaff")) || 0;

    // ===========================================
    // DASHBOARD CARDS
    // ===========================================

    document.getElementById("totalDoctors").textContent =
        totalDoctors;

    document.getElementById("totalPatients").textContent =
        totalPatients;

    document.getElementById("totalAppointments").textContent =
        totalAppointments;

    document.getElementById("totalRevenue").textContent =
        "PKR " + totalRevenue.toLocaleString();

    document.getElementById("totalMedicines").textContent =
        totalMedicines;

    document.getElementById("totalBlood").textContent =
        totalBlood;

    document.getElementById("totalInventory").textContent =
        totalInventory;

    document.getElementById("totalStaff").textContent =
        totalStaff;

    // ===========================================
    // LOAD SUMMARY TABLE
    // ===========================================

    loadSummaryTable();
        // ===========================================
    // LOAD SUMMARY TABLE
    // PHASE 3 - PART 2
    // ===========================================

    function loadSummaryTable() {

        document.getElementById("doctorCount").textContent =
            totalDoctors;

        document.getElementById("patientCount").textContent =
            totalPatients;

        document.getElementById("appointmentCount").textContent =
            totalAppointments;

        document.getElementById("medicineCount").textContent =
            totalMedicines;

        document.getElementById("bloodCount").textContent =
            totalBlood;

        document.getElementById("inventoryCount").textContent =
            totalInventory;

        document.getElementById("staffCount").textContent =
            totalStaff;

        document.getElementById("revenueCount").textContent =
            "PKR " + totalRevenue.toLocaleString();

    }

    // ===========================================
    // PRINT REPORT
    // PHASE 3 - PART 2
    // ===========================================

    const printReport =
        document.getElementById("printReport");

    if (printReport) {

        printReport.addEventListener("click", function () {

            window.print();

        });

    }
        // ===========================================
    // EXPORT CSV
    // PHASE 3 - PART 3
    // ===========================================

    const exportCSV =
        document.getElementById("exportCSV");

    if (exportCSV) {

        exportCSV.addEventListener("click", function () {

            const csvData = [

                ["Module", "Total Records"],

                ["Doctors", totalDoctors],

                ["Patients", totalPatients],

                ["Appointments", totalAppointments],

                ["Medicines", totalMedicines],

                ["Blood Bank", totalBlood],

                ["Inventory", totalInventory],

                ["Staff", totalStaff],

                ["Revenue (PKR)", totalRevenue]

            ];

            const csvContent = csvData

                .map(function (row) {

                    return row.join(",");

                })

                .join("\n");

            const blob = new Blob(

                [csvContent],

                { type: "text/csv;charset=utf-8;" }

            );

            const link = document.createElement("a");

            const url = URL.createObjectURL(blob);

            link.href = url;

            link.download = "Hospital_Report.csv";

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

            URL.revokeObjectURL(url);

        });

    }
        // ===========================================
    // INITIALIZATION
    // PHASE 3 - PART 4
    // ===========================================

    console.log("Reports & Analytics Module Loaded Successfully.");

});