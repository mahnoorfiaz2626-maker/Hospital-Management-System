// ===========================================
// HEALTHCARE HOSPITAL
// PATIENT MANAGEMENT
// PHASE 3 - PART 1
// ===========================================

document.addEventListener("DOMContentLoaded", function () {

    // ===========================================
    // LOCAL STORAGE
    // ===========================================

    let patients =
        JSON.parse(localStorage.getItem("patients")) || [];

    let editPatientId = null;

    // ===========================================
    // HTML ELEMENTS
    // ===========================================

    const patientForm =
        document.getElementById("patientForm");

    const patientTable =
        document.querySelector("#patientTable tbody");

    const searchPatient =
        document.getElementById("searchPatient");

    // ===========================================
    // LOAD PATIENTS
    // ===========================================

    loadPatients();

    updateDashboardCounter();

    // ===========================================
    // ADD / UPDATE PATIENT
    // ===========================================

    patientForm.addEventListener("submit", function (e) {

        e.preventDefault();

        if (editPatientId !== null) {

            patients = patients.map(function (patient) {

                if (patient.id === editPatientId) {

                    patient.name =
                        document.getElementById("patientName").value;

                    patient.age =
                        document.getElementById("age").value;

                    patient.gender =
                        document.getElementById("gender").value;

                    patient.disease =
                        document.getElementById("disease").value;

                    patient.doctor =
                        document.getElementById("doctor").value;

                    patient.phone =
                        document.getElementById("phone").value;

                    patient.email =
                        document.getElementById("email").value;

                    patient.admissionDate =
                        document.getElementById("admissionDate").value;

                    patient.status =
                        document.getElementById("status").value;

                }

                return patient;

            });

            localStorage.setItem(
                "patients",
                JSON.stringify(patients)
            );

            updateDashboardCounter();

            loadPatients();

            patientForm.reset();

            editPatientId = null;

            document.getElementById("addPatientBtn").innerHTML =
                '<i class="fa-solid fa-plus"></i> Add Patient';

            alert("Patient Updated Successfully.");

            return;

        }

        const patient = {

            id: Date.now(),

            name:
                document.getElementById("patientName").value,

            age:
                document.getElementById("age").value,

            gender:
                document.getElementById("gender").value,

            disease:
                document.getElementById("disease").value,

            doctor:
                document.getElementById("doctor").value,

            phone:
                document.getElementById("phone").value,

            email:
                document.getElementById("email").value,

            admissionDate:
                document.getElementById("admissionDate").value,

            status:
                document.getElementById("status").value

        };

        patients.push(patient);

        localStorage.setItem(
            "patients",
            JSON.stringify(patients)
        );

        updateDashboardCounter();

        loadPatients();

        patientForm.reset();

        alert("Patient Added Successfully.");

    });
        // ===========================================
    // LOAD PATIENTS
    // PHASE 3 - PART 2
    // ===========================================

    function loadPatients() {

        patientTable.innerHTML = "";

        patients.forEach(function (patient, index) {

            let statusClass = "";

            if (patient.status === "Admitted") {

                statusClass = "admitted";

            }

            else if (patient.status === "Under Treatment") {

                statusClass = "treatment";

            }

            else {

                statusClass = "discharged";

            }

            patientTable.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${patient.name}</td>

                <td>${patient.age}</td>

                <td>${patient.gender}</td>

                <td>${patient.disease}</td>

                <td>${patient.doctor}</td>

                <td>${patient.phone}</td>

                <td>${patient.email}</td>

                <td>${patient.admissionDate}</td>

                <td>

                    <span class="${statusClass}">

                        ${patient.status}

                    </span>

                </td>

                <td>

                    <button
                        class="editBtn"
                        onclick="editPatient(${patient.id})">

                        Edit

                    </button>

                    <button
                        class="deleteBtn"
                        onclick="deletePatient(${patient.id})">

                        Delete

                    </button>

                </td>

            </tr>

            `;

        });

    }
        // ===========================================
    // DELETE PATIENT
    // PHASE 3 - PART 3
    // ===========================================

    window.deletePatient = function (id) {

        const confirmDelete = confirm(
            "Are you sure you want to delete this patient?"
        );

        if (!confirmDelete) {

            return;

        }

        patients = patients.filter(function (patient) {

            return patient.id !== id;

        });

        localStorage.setItem(
            "patients",
            JSON.stringify(patients)
        );

        updateDashboardCounter();

        loadPatients();

        alert("Patient Deleted Successfully.");

    };

    // ===========================================
    // EDIT PATIENT
    // PHASE 3 - PART 3
    // ===========================================

    window.editPatient = function (id) {

        const patient = patients.find(function (item) {

            return item.id === id;

        });

        if (!patient) return;

        editPatientId = id;

        document.getElementById("patientName").value =
            patient.name;

        document.getElementById("age").value =
            patient.age;

        document.getElementById("gender").value =
            patient.gender;

        document.getElementById("disease").value =
            patient.disease;

        document.getElementById("doctor").value =
            patient.doctor;

        document.getElementById("phone").value =
            patient.phone;

        document.getElementById("email").value =
            patient.email;

        document.getElementById("admissionDate").value =
            patient.admissionDate;

        document.getElementById("status").value =
            patient.status;

        document.getElementById("addPatientBtn").innerHTML =
            '<i class="fa-solid fa-pen"></i> Update Patient';

    };
        // ===========================================
    // SEARCH PATIENT
    // PHASE 3 - PART 4
    // ===========================================

    if (searchPatient) {

        searchPatient.addEventListener("keyup", function () {

            const value =
                searchPatient.value.toLowerCase();

            const rows =
                document.querySelectorAll("#patientTable tbody tr");

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
            "totalPatients",
            patients.length
        );

    }

});