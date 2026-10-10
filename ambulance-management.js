// ===========================================
// HEALTHCARE HOSPITAL
// AMBULANCE MANAGEMENT
// PHASE 3 - PART 1
// ===========================================

document.addEventListener("DOMContentLoaded", function () {

    // ===========================================
    // LOCAL STORAGE
    // ===========================================

    let ambulances =
        JSON.parse(localStorage.getItem("ambulances")) || [];

    let editAmbulanceId = null;

    // ===========================================
    // HTML ELEMENTS
    // ===========================================

    const ambulanceForm =
        document.getElementById("ambulanceForm");

    const ambulanceTable =
        document.querySelector("#ambulanceTable tbody");

    const searchAmbulance =
        document.getElementById("searchAmbulance");

    // ===========================================
    // LOAD DATA
    // ===========================================

    loadAmbulances();

    updateDashboardCounter();

    // ===========================================
    // ADD / UPDATE AMBULANCE
    // ===========================================

    ambulanceForm.addEventListener("submit", function (e) {

        e.preventDefault();

        if (editAmbulanceId !== null) {

            ambulances = ambulances.map(function (ambulance) {

                if (ambulance.id === editAmbulanceId) {

                    ambulance.ambulanceId =
                        document.getElementById("ambulanceId").value;

                    ambulance.vehicleNumber =
                        document.getElementById("vehicleNumber").value;

                    ambulance.driverName =
                        document.getElementById("driverName").value;

                    ambulance.driverContact =
                        document.getElementById("driverContact").value;

                    ambulance.currentLocation =
                        document.getElementById("currentLocation").value;

                    ambulance.status =
                        document.getElementById("status").value;

                }

                return ambulance;

            });

            localStorage.setItem(
                "ambulances",
                JSON.stringify(ambulances)
            );

            updateDashboardCounter();

            loadAmbulances();

            ambulanceForm.reset();

            editAmbulanceId = null;

            document.getElementById("addAmbulanceBtn").innerHTML =
                '<i class="fa-solid fa-plus"></i> Add Ambulance';

            alert("Ambulance Updated Successfully.");

            return;

        }

        const ambulance = {

            id: Date.now(),

            ambulanceId:
                document.getElementById("ambulanceId").value,

            vehicleNumber:
                document.getElementById("vehicleNumber").value,

            driverName:
                document.getElementById("driverName").value,

            driverContact:
                document.getElementById("driverContact").value,

            currentLocation:
                document.getElementById("currentLocation").value,

            status:
                document.getElementById("status").value

        };

        ambulances.push(ambulance);

        localStorage.setItem(
            "ambulances",
            JSON.stringify(ambulances)
        );

        updateDashboardCounter();

        loadAmbulances();

        ambulanceForm.reset();

        alert("Ambulance Added Successfully.");

    });
        // ===========================================
    // LOAD AMBULANCES
    // PHASE 3 - PART 2
    // ===========================================

    function loadAmbulances() {

        ambulanceTable.innerHTML = "";

        ambulances.forEach(function (ambulance, index) {

            let statusClass = "";

            if (ambulance.status === "Available") {

                statusClass = "available";

            }

            else if (ambulance.status === "On Duty") {

                statusClass = "onDuty";

            }

            else {

                statusClass = "maintenance";

            }

            ambulanceTable.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${ambulance.ambulanceId}</td>

                <td>${ambulance.vehicleNumber}</td>

                <td>${ambulance.driverName}</td>

                <td>${ambulance.driverContact}</td>

                <td>${ambulance.currentLocation}</td>

                <td>

                    <span class="${statusClass}">

                        ${ambulance.status}

                    </span>

                </td>

                <td>

                    <button
                        class="editBtn"
                        onclick="editAmbulance(${ambulance.id})">

                        Edit

                    </button>

                    <button
                        class="deleteBtn"
                        onclick="deleteAmbulance(${ambulance.id})">

                        Delete

                    </button>

                </td>

            </tr>

            `;

        });

    }
        // ===========================================
    // DELETE AMBULANCE
    // PHASE 3 - PART 3
    // ===========================================

    window.deleteAmbulance = function (id) {

        const confirmDelete = confirm(
            "Are you sure you want to delete this ambulance?"
        );

        if (!confirmDelete) {

            return;

        }

        ambulances = ambulances.filter(function (ambulance) {

            return ambulance.id !== id;

        });

        localStorage.setItem(
            "ambulances",
            JSON.stringify(ambulances)
        );

        updateDashboardCounter();

        loadAmbulances();

        alert("Ambulance Deleted Successfully.");

    };

    // ===========================================
    // EDIT AMBULANCE
    // PHASE 3 - PART 3
    // ===========================================

    window.editAmbulance = function (id) {

        const ambulance = ambulances.find(function (item) {

            return item.id === id;

        });

        if (!ambulance) return;

        editAmbulanceId = id;

        document.getElementById("ambulanceId").value =
            ambulance.ambulanceId;

        document.getElementById("vehicleNumber").value =
            ambulance.vehicleNumber;

        document.getElementById("driverName").value =
            ambulance.driverName;

        document.getElementById("driverContact").value =
            ambulance.driverContact;

        document.getElementById("currentLocation").value =
            ambulance.currentLocation;

        document.getElementById("status").value =
            ambulance.status;

        document.getElementById("addAmbulanceBtn").innerHTML =
            '<i class="fa-solid fa-pen"></i> Update Ambulance';

    };
        // ===========================================
    // SEARCH AMBULANCE
    // PHASE 3 - PART 4
    // ===========================================

    if (searchAmbulance) {

        searchAmbulance.addEventListener("keyup", function () {

            const value =
                searchAmbulance.value.toLowerCase();

            const rows =
                document.querySelectorAll("#ambulanceTable tbody tr");

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

            "totalAmbulances",

            ambulances.length

        );

    }

});
