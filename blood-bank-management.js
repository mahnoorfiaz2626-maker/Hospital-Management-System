// ===========================================
// HEALTHCARE HOSPITAL
// BLOOD BANK MANAGEMENT
// PHASE 3 - PART 1
// ===========================================

document.addEventListener("DOMContentLoaded", function () {

    // ===========================================
    // LOCAL STORAGE
    // ===========================================

    let bloodRecords =
        JSON.parse(localStorage.getItem("bloodRecords")) || [];

    let editBloodId = null;

    // ===========================================
    // HTML ELEMENTS
    // ===========================================

    const bloodForm =
        document.getElementById("bloodForm");

    const bloodTable =
        document.querySelector("#bloodTable tbody");

    const searchBlood =
        document.getElementById("searchBlood");

    // ===========================================
    // LOAD DATA
    // ===========================================

    loadBloodRecords();

    updateDashboardCounter();

    // ===========================================
    // ADD / UPDATE BLOOD RECORD
    // ===========================================

    bloodForm.addEventListener("submit", function (e) {

        e.preventDefault();

        if (editBloodId !== null) {

            bloodRecords = bloodRecords.map(function (record) {

                if (record.id === editBloodId) {

                    record.bloodUnitId =
                        document.getElementById("bloodUnitId").value;

                    record.bloodGroup =
                        document.getElementById("bloodGroup").value;

                    record.donorName =
                        document.getElementById("donorName").value;

                    record.donorContact =
                        document.getElementById("donorContact").value;

                    record.donationDate =
                        document.getElementById("donationDate").value;

                    record.bloodQuantity =
                        document.getElementById("bloodQuantity").value;

                    record.status =
                        document.getElementById("bloodStatus").value;

                }

                return record;

            });

            localStorage.setItem(
                "bloodRecords",
                JSON.stringify(bloodRecords)
            );

            updateDashboardCounter();

            loadBloodRecords();

            bloodForm.reset();

            editBloodId = null;

            document.getElementById("addBloodBtn").innerHTML =
                '<i class="fa-solid fa-plus"></i> Add Blood Record';

            alert("Blood Record Updated Successfully.");

            return;

        }

        const record = {

            id: Date.now(),

            bloodUnitId:
                document.getElementById("bloodUnitId").value,

            bloodGroup:
                document.getElementById("bloodGroup").value,

            donorName:
                document.getElementById("donorName").value,

            donorContact:
                document.getElementById("donorContact").value,

            donationDate:
                document.getElementById("donationDate").value,

            bloodQuantity:
                document.getElementById("bloodQuantity").value,

            status:
                document.getElementById("bloodStatus").value

        };

        bloodRecords.push(record);

        localStorage.setItem(
            "bloodRecords",
            JSON.stringify(bloodRecords)
        );

        updateDashboardCounter();

        loadBloodRecords();

        bloodForm.reset();

        alert("Blood Record Added Successfully.");

    });
        // ===========================================
    // LOAD BLOOD RECORDS
    // PHASE 3 - PART 2
    // ===========================================

    function loadBloodRecords() {

        bloodTable.innerHTML = "";

        bloodRecords.forEach(function (record, index) {

            let statusClass = "";

            if (record.status === "Available") {

                statusClass = "available";

            }

            else if (record.status === "Reserved") {

                statusClass = "reserved";

            }

            else {

                statusClass = "used";

            }

            bloodTable.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${record.bloodUnitId}</td>

                <td>${record.bloodGroup}</td>

                <td>${record.donorName}</td>

                <td>${record.donorContact}</td>

                <td>${record.donationDate}</td>

                <td>${record.bloodQuantity} ml</td>

                <td>

                    <span class="${statusClass}">

                        ${record.status}

                    </span>

                </td>

                <td>

                    <button
                        class="editBtn"
                        onclick="editBloodRecord(${record.id})">

                        Edit

                    </button>

                    <button
                        class="deleteBtn"
                        onclick="deleteBloodRecord(${record.id})">

                        Delete

                    </button>

                </td>

            </tr>

            `;

        });

    }
        // ===========================================
    // DELETE BLOOD RECORD
    // PHASE 3 - PART 3
    // ===========================================

    window.deleteBloodRecord = function (id) {

        const confirmDelete = confirm(
            "Are you sure you want to delete this blood record?"
        );

        if (!confirmDelete) {

            return;

        }

        bloodRecords = bloodRecords.filter(function (record) {

            return record.id !== id;

        });

        localStorage.setItem(
            "bloodRecords",
            JSON.stringify(bloodRecords)
        );

        updateDashboardCounter();

        loadBloodRecords();

        alert("Blood Record Deleted Successfully.");

    };

    // ===========================================
    // EDIT BLOOD RECORD
    // PHASE 3 - PART 3
    // ===========================================

    window.editBloodRecord = function (id) {

        const record = bloodRecords.find(function (item) {

            return item.id === id;

        });

        if (!record) return;

        editBloodId = id;

        document.getElementById("bloodUnitId").value =
            record.bloodUnitId;

        document.getElementById("bloodGroup").value =
            record.bloodGroup;

        document.getElementById("donorName").value =
            record.donorName;

        document.getElementById("donorContact").value =
            record.donorContact;

        document.getElementById("donationDate").value =
            record.donationDate;

        document.getElementById("bloodQuantity").value =
            record.bloodQuantity;

        document.getElementById("bloodStatus").value =
            record.status;

        document.getElementById("addBloodBtn").innerHTML =
            '<i class="fa-solid fa-pen"></i> Update Blood Record';

    };
        // ===========================================
    // SEARCH BLOOD RECORD
    // PHASE 3 - PART 4
    // ===========================================

    if (searchBlood) {

        searchBlood.addEventListener("keyup", function () {

            const value =
                searchBlood.value.toLowerCase();

            const rows =
                document.querySelectorAll("#bloodTable tbody tr");

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

            "totalBloodRecords",

            bloodRecords.length

        );

    }

});