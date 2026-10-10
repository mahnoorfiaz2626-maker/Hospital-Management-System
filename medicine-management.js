// ===========================================
// HEALTHCARE HOSPITAL
// MEDICINE MANAGEMENT
// PHASE 3 - PART 1
// ===========================================

document.addEventListener("DOMContentLoaded", function () {

    // ===========================================
    // LOCAL STORAGE
    // ===========================================

    let medicines =
        JSON.parse(localStorage.getItem("medicines")) || [];

    let editMedicineId = null;

    // ===========================================
    // HTML ELEMENTS
    // ===========================================

    const medicineForm =
        document.getElementById("medicineForm");

    const medicineTable =
        document.querySelector("#medicineTable tbody");

    const searchMedicine =
        document.getElementById("searchMedicine");

    // ===========================================
    // LOAD MEDICINES
    // ===========================================

    loadMedicines();

    updateDashboardCounter();

    // ===========================================
    // ADD / UPDATE MEDICINE
    // ===========================================

    medicineForm.addEventListener("submit", function (e) {

        e.preventDefault();

        if (editMedicineId !== null) {

            medicines = medicines.map(function (medicine) {

                if (medicine.id === editMedicineId) {

                    medicine.name =
                        document.getElementById("medicineName").value;

                    medicine.category =
                        document.getElementById("category").value;

                    medicine.company =
                        document.getElementById("company").value;

                    medicine.price =
                        document.getElementById("price").value;

                    medicine.stock =
                        document.getElementById("stock").value;

                    medicine.expiryDate =
                        document.getElementById("expiryDate").value;

                }

                return medicine;

            });

            localStorage.setItem(
                "medicines",
                JSON.stringify(medicines)
            );

            updateDashboardCounter();

            loadMedicines();

            medicineForm.reset();

            editMedicineId = null;

            document.getElementById("addMedicineBtn").innerHTML =
                '<i class="fa-solid fa-plus"></i> Add Medicine';

            alert("Medicine Updated Successfully.");

            return;

        }

        const medicine = {

            id: Date.now(),

            name:
                document.getElementById("medicineName").value,

            category:
                document.getElementById("category").value,

            company:
                document.getElementById("company").value,

            price:
                document.getElementById("price").value,

            stock:
                document.getElementById("stock").value,

            expiryDate:
                document.getElementById("expiryDate").value

        };

        medicines.push(medicine);

        localStorage.setItem(
            "medicines",
            JSON.stringify(medicines)
        );

        updateDashboardCounter();

        loadMedicines();

        medicineForm.reset();

        alert("Medicine Added Successfully.");

    });
        // ===========================================
    // LOAD MEDICINES
    // PHASE 3 - PART 2
    // ===========================================

    function loadMedicines() {

        medicineTable.innerHTML = "";

        medicines.forEach(function (medicine, index) {

            medicineTable.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${medicine.name}</td>

                <td>${medicine.category}</td>

                <td>${medicine.company}</td>

                <td>Rs. ${medicine.price}</td>

                <td>${medicine.stock}</td>

                <td>${medicine.expiryDate}</td>

                <td>

                    <button
                        class="editBtn"
                        onclick="editMedicine(${medicine.id})">

                        Edit

                    </button>

                    <button
                        class="deleteBtn"
                        onclick="deleteMedicine(${medicine.id})">

                        Delete

                    </button>

                </td>

            </tr>

            `;

        });

    }
        // ===========================================
    // DELETE MEDICINE
    // PHASE 3 - PART 3
    // ===========================================

    window.deleteMedicine = function (id) {

        const confirmDelete = confirm(
            "Are you sure you want to delete this medicine?"
        );

        if (!confirmDelete) {

            return;

        }

        medicines = medicines.filter(function (medicine) {

            return medicine.id !== id;

        });

        localStorage.setItem(
            "medicines",
            JSON.stringify(medicines)
        );

        updateDashboardCounter();

        loadMedicines();

        alert("Medicine Deleted Successfully.");

    };

    // ===========================================
    // EDIT MEDICINE
    // PHASE 3 - PART 3
    // ===========================================

    window.editMedicine = function (id) {

        const medicine = medicines.find(function (item) {

            return item.id === id;

        });

        if (!medicine) return;

        editMedicineId = id;

        document.getElementById("medicineName").value =
            medicine.name;

        document.getElementById("category").value =
            medicine.category;

        document.getElementById("company").value =
            medicine.company;

        document.getElementById("price").value =
            medicine.price;

        document.getElementById("stock").value =
            medicine.stock;

        document.getElementById("expiryDate").value =
            medicine.expiryDate;

        document.getElementById("addMedicineBtn").innerHTML =
            '<i class="fa-solid fa-pen"></i> Update Medicine';

    };
        // ===========================================
    // SEARCH MEDICINE
    // PHASE 3 - PART 4
    // ===========================================

    if (searchMedicine) {

        searchMedicine.addEventListener("keyup", function () {

            const value =
                searchMedicine.value.toLowerCase();

            const rows =
                document.querySelectorAll("#medicineTable tbody tr");

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
            "totalMedicines",
            medicines.length
        );

    }

});