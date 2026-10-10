// ===========================================
// HEALTHCARE HOSPITAL
// BILLING MANAGEMENT
// PHASE 3 - PART 1
// ===========================================

document.addEventListener("DOMContentLoaded", function () {

    // ===========================================
    // LOCAL STORAGE
    // ===========================================

    let bills =
        JSON.parse(localStorage.getItem("bills")) || [];

    let editBillId = null;

    // ===========================================
    // HTML ELEMENTS
    // ===========================================

    const billingForm =
        document.getElementById("billingForm");

    const billingTable =
        document.querySelector("#billingTable tbody");

    const searchBill =
        document.getElementById("searchBill");

    const medicineCharges =
        document.getElementById("medicineCharges");

    const roomCharges =
        document.getElementById("roomCharges");

    const testCharges =
        document.getElementById("testCharges");

    const doctorFee =
        document.getElementById("doctorFee");

    const totalBill =
        document.getElementById("totalBill");

    // ===========================================
    // LOAD DATA
    // ===========================================

    loadBills();

    updateDashboardCounter();

    // ===========================================
    // AUTO TOTAL BILL CALCULATION
    // ===========================================

    function calculateTotalBill() {

        const medicine =
            Number(medicineCharges.value) || 0;

        const room =
            Number(roomCharges.value) || 0;

        const test =
            Number(testCharges.value) || 0;

        const doctor =
            Number(doctorFee.value) || 0;

        totalBill.value =
            medicine + room + test + doctor;

    }

    medicineCharges.addEventListener("input", calculateTotalBill);

    roomCharges.addEventListener("input", calculateTotalBill);

    testCharges.addEventListener("input", calculateTotalBill);

    doctorFee.addEventListener("input", calculateTotalBill);

    // ===========================================
    // ADD / UPDATE BILL
    // ===========================================

    billingForm.addEventListener("submit", function (e) {

        e.preventDefault();

        if (editBillId !== null) {

            bills = bills.map(function (bill) {

                if (bill.id === editBillId) {

                    bill.patient =
                        document.getElementById("patientName").value;

                    bill.doctor =
                        document.getElementById("doctorName").value;

                    bill.medicine =
                        medicineCharges.value;

                    bill.room =
                        roomCharges.value;

                    bill.test =
                        testCharges.value;

                    bill.fee =
                        doctorFee.value;

                    bill.total =
                        totalBill.value;

                    bill.status =
                        document.getElementById("paymentStatus").value;

                }

                return bill;

            });

            localStorage.setItem(
                "bills",
                JSON.stringify(bills)
            );

            updateDashboardCounter();

            loadBills();

            billingForm.reset();

            totalBill.value = "";

            editBillId = null;

            document.getElementById("addBillBtn").innerHTML =
                '<i class="fa-solid fa-file-invoice-dollar"></i> Generate Bill';

            alert("Bill Updated Successfully.");

            return;

        }

        const bill = {

            id: Date.now(),

            patient:
                document.getElementById("patientName").value,

            doctor:
                document.getElementById("doctorName").value,

            medicine:
                medicineCharges.value,

            room:
                roomCharges.value,

            test:
                testCharges.value,

            fee:
                doctorFee.value,

            total:
                totalBill.value,

            status:
                document.getElementById("paymentStatus").value

        };

        bills.push(bill);

        localStorage.setItem(
            "bills",
            JSON.stringify(bills)
        );

        updateDashboardCounter();

        loadBills();

        billingForm.reset();

        totalBill.value = "";

        alert("Bill Generated Successfully.");

    });
        // ===========================================
    // LOAD BILLS
    // PHASE 3 - PART 2
    // ===========================================

    function loadBills() {

        billingTable.innerHTML = "";

        bills.forEach(function (bill, index) {

            let statusClass = "";

            if (bill.status === "Paid") {

                statusClass = "paid";

            }

            else {

                statusClass = "unpaid";

            }

            billingTable.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${bill.patient}</td>

                <td>${bill.doctor}</td>

                <td>Rs. ${bill.medicine}</td>

                <td>Rs. ${bill.room}</td>

                <td>Rs. ${bill.test}</td>

                <td>Rs. ${bill.fee}</td>

                <td><strong>Rs. ${bill.total}</strong></td>

                <td>

                    <span class="${statusClass}">

                        ${bill.status}

                    </span>

                </td>

                <td>

                    <button
                        class="editBtn"
                        onclick="editBill(${bill.id})">

                        Edit

                    </button>

                    <button
                        class="deleteBtn"
                        onclick="deleteBill(${bill.id})">

                        Delete

                    </button>

                </td>

            </tr>

            `;

        });

    }
        // ===========================================
    // DELETE BILL
    // PHASE 3 - PART 3
    // ===========================================

    window.deleteBill = function (id) {

        const confirmDelete = confirm(
            "Are you sure you want to delete this bill?"
        );

        if (!confirmDelete) {

            return;

        }

        bills = bills.filter(function (bill) {

            return bill.id !== id;

        });

        localStorage.setItem(
            "bills",
            JSON.stringify(bills)
        );

        updateDashboardCounter();

        loadBills();

        alert("Bill Deleted Successfully.");

    };

    // ===========================================
    // EDIT BILL
    // PHASE 3 - PART 3
    // ===========================================

    window.editBill = function (id) {

        const bill = bills.find(function (item) {

            return item.id === id;

        });

        if (!bill) return;

        editBillId = id;

        document.getElementById("patientName").value =
            bill.patient;

        document.getElementById("doctorName").value =
            bill.doctor;

        document.getElementById("medicineCharges").value =
            bill.medicine;

        document.getElementById("roomCharges").value =
            bill.room;

        document.getElementById("testCharges").value =
            bill.test;

        document.getElementById("doctorFee").value =
            bill.fee;

        document.getElementById("totalBill").value =
            bill.total;

        document.getElementById("paymentStatus").value =
            bill.status;

        document.getElementById("addBillBtn").innerHTML =
            '<i class="fa-solid fa-pen"></i> Update Bill';

    };
        // ===========================================
    // SEARCH BILL
    // PHASE 3 - PART 4
    // ===========================================

    if (searchBill) {

        searchBill.addEventListener("keyup", function () {

            const value =
                searchBill.value.toLowerCase();

            const rows =
                document.querySelectorAll("#billingTable tbody tr");

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

            "totalBills",

            bills.length

        );

    }

});