// ===========================================
// HEALTHCARE HOSPITAL
// DOCTOR MANAGEMENT
// PHASE 6 - PART 1
// ===========================================

document.addEventListener("DOMContentLoaded", function () {

    // ===========================================
    // LOCAL STORAGE
    // ===========================================

    let doctors =
        JSON.parse(localStorage.getItem("doctors")) || [];

    // ===========================================
    // HTML ELEMENTS
    // ===========================================

    const doctorForm =
        document.getElementById("doctorForm");

    const doctorTable =
        document.querySelector("#doctorTable tbody");

    // ===========================================
    // LOAD DOCTORS
    // ===========================================

    loadDoctors();

    // ===========================================
    // ADD DOCTOR
    // ===========================================

    doctorForm.addEventListener("submit", function (e) {

        e.preventDefault();
if (editDoctorId !== null) {

    doctors = doctors.map(function (doctor) {

        if (doctor.id === editDoctorId) {

            doctor.name =
                document.getElementById("doctorName").value;

            doctor.department =
                document.getElementById("department").value;

            doctor.experience =
                document.getElementById("experience").value;

            doctor.phone =
                document.getElementById("phone").value;

            doctor.email =
                document.getElementById("email").value;

            doctor.fee =
                document.getElementById("fee").value;

            doctor.status =
                document.getElementById("status").value;

        }

        return doctor;

    });

    localStorage.setItem(
        "doctors",
        JSON.stringify(doctors)
    );
updateDashboardCounter();
    loadDoctors();

    doctorForm.reset();

    editDoctorId = null;

    document.getElementById("addDoctorBtn").innerHTML =
        '<i class="fa-solid fa-plus"></i> Add Doctor';

    alert("Doctor Updated Successfully.");

    return;

}
        const doctor = {

            id: Date.now(),

            name:
                document.getElementById("doctorName").value,

            department:
                document.getElementById("department").value,

            experience:
                document.getElementById("experience").value,

            phone:
                document.getElementById("phone").value,

            email:
                document.getElementById("email").value,

            fee:
                document.getElementById("fee").value,

            status:
                document.getElementById("status").value,

            image:
                "images/doctor1.jpg"

        };

        doctors.push(doctor);

        localStorage.setItem(

            "doctors",

            JSON.stringify(doctors)

        );

        loadDoctors();

        doctorForm.reset();

        alert("Doctor Added Successfully.");

    });
        // ===========================================
    // LOAD DOCTORS FUNCTION
    // PHASE 6 - PART 2
    // ===========================================

    function loadDoctors() {

        doctorTable.innerHTML = "";

        doctors.forEach(function (doctor, index) {

            let statusClass = "";

            if (doctor.status === "Available") {

                statusClass = "available";

            }

            else if (doctor.status === "Busy") {

                statusClass = "busy";

            }

            else {

                statusClass = "leave";

            }

            doctorTable.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>

                    <img
                        src="${doctor.image}"
                        width="60"
                        height="60"
                        style="border-radius:50%; object-fit:cover;">

                </td>

                <td>${doctor.name}</td>

                <td>${doctor.department}</td>

                <td>${doctor.experience}</td>

                <td>${doctor.phone}</td>

                <td>${doctor.email}</td>

                <td>Rs. ${doctor.fee}</td>

                <td>

                    <span class="${statusClass}">

                        ${doctor.status}

                    </span>

                </td>

                <td>

                    <button
                        class="editBtn"
                        onclick="editDoctor(${doctor.id})">

                        Edit

                    </button>

                    <button
                        class="deleteBtn"
                        onclick="deleteDoctor(${doctor.id})">

                        Delete

                    </button>

                </td>

            </tr>

            `;

        });

    }
    // ===========================================
    // DELETE DOCTOR
    // PHASE 6 - PART 3
    // ===========================================

    window.deleteDoctor = function (id) {

        const confirmDelete = confirm(

            "Are you sure you want to delete this doctor?"

        );

        if (!confirmDelete) {

            return;

        }

        doctors = doctors.filter(function (doctor) {

            return doctor.id !== id;

        });

        localStorage.setItem(

            "doctors",

            JSON.stringify(doctors)

        );
        updateDashboardCounter();

        loadDoctors();

        alert("Doctor Deleted Successfully.");

    };
    // ===========================================
// EDIT DOCTOR
// PHASE 6 - PART 4
// ===========================================

let editDoctorId = null;

window.editDoctor = function (id) {

    const doctor = doctors.find(function (item) {

        return item.id === id;

    });

    if (!doctor) return;

    editDoctorId = id;

    document.getElementById("doctorName").value =
        doctor.name;

    document.getElementById("department").value =
        doctor.department;

    document.getElementById("experience").value =
        doctor.experience;

    document.getElementById("phone").value =
        doctor.phone;

    document.getElementById("email").value =
        doctor.email;

    document.getElementById("fee").value =
        doctor.fee;

    document.getElementById("status").value =
        doctor.status;

    document.getElementById("addDoctorBtn").innerHTML =
        '<i class="fa-solid fa-pen"></i> Update Doctor';
        
        localStorage.setItem(

            "doctors",

            JSON.stringify(doctors)

        );
        updateDashboardCounter();

        loadDoctors();

        alert("Doctor Edited Successfully.");


};
// ===========================================
// SEARCH DOCTOR
// PHASE 6 - PART 5
// ===========================================

const searchDoctor =
    document.getElementById("searchDoctor");

if (searchDoctor) {

    searchDoctor.addEventListener("keyup", function () {

        const value =
            searchDoctor.value.toLowerCase();

        const rows =
            document.querySelectorAll("#doctorTable tbody tr");

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
// HEALTHCARE HOSPITAL
// DOCTOR MANAGEMENT
// PHASE 6 - PART 6
// UPDATE DASHBOARD COUNTER
// ===========================================

function updateDashboardCounter() {

    const doctors =
        JSON.parse(localStorage.getItem("doctors")) || [];

    localStorage.setItem(
        "totalDoctors",
        doctors.length
    );

}

updateDashboardCounter();
});
