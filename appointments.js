// ===========================================
// HEALTHCARE HOSPITAL
// APPOINTMENTS PAGE JAVASCRIPT
// PART 1
// ===========================================

document.addEventListener("DOMContentLoaded", function () {

    // ===========================================
    // GET HTML ELEMENTS
    // ===========================================

    const modal =
        document.getElementById("appointmentModal");

    const openBtn =
        document.getElementById("openForm");

    const closeBtn =
        document.querySelector(".close");

    const form =
        document.getElementById("appointmentForm");

    const tableBody =
        document.querySelector("#appointmentTable tbody");

    const searchInput =
        document.getElementById("searchAppointment");

    const successMessage =
        document.getElementById("successMessage");

    const doctor =
        document.getElementById("doctor");

    const department =
        document.getElementById("department");

    const confirmButton =
        document.getElementById("confirmAppointment");

    const resetButton =
        document.getElementById("resetForm");
        const exportCSV =
document.getElementById("exportCSV");
const exportPDF =
document.getElementById("exportPDF");
        // ===========================================
// FILTER ELEMENTS
// ===========================================

const doctorFilter =
document.getElementById("doctorFilter");

const departmentFilter =
document.getElementById("departmentFilter");

    // ===========================================
    // EDIT MODE
    // ===========================================

    let editIndex = -1;

    // ===========================================
    // OPEN MODAL
    // ===========================================

    function openModal() {

        modal.style.display = "flex";

        modal.classList.add("show");

    }

    // ===========================================
    // CLOSE MODAL
    // ===========================================

    function closeModal() {

        modal.style.display = "none";

        modal.classList.remove("show");

        form.reset();

        successMessage.style.display = "none";

        editIndex = -1;

        confirmButton.innerHTML =
        '<i class="fa-solid fa-calendar-check"></i> Confirm Appointment';

    }

    // ===========================================
    // OPEN BUTTON
    // ===========================================

    if (openBtn) {

        openBtn.addEventListener("click", function () {

            form.reset();

            editIndex = -1;

            confirmButton.innerHTML =
            '<i class="fa-solid fa-calendar-check"></i> Confirm Appointment';

            openModal();

        });

    }

    // ===========================================
    // CLOSE BUTTON
    // ===========================================

    if (closeBtn) {

        closeBtn.addEventListener("click", closeModal);

    }

    // ===========================================
    // CLICK OUTSIDE MODAL
    // ===========================================

    window.addEventListener("click", function (e) {

        if (e.target === modal) {

            closeModal();

        }

    });

    // ===========================================
    // DOCTOR → DEPARTMENT AUTO SELECT
    // ===========================================

    const doctorDepartment = {

        "Dr. Aleeza": "Cardiology",

        "Dr. Tehreem": "Neurology",

        "Dr. Mahnoor": "Pediatrics",

        "Dr. Ahmed": "Orthopedics",

        "Dr. Fatima": "Dental Care",

        "Dr. Usman": "Ophthalmology"

    };

    if (doctor) {

        doctor.addEventListener("change", function () {

            if (doctorDepartment[this.value]) {

                department.value =
                doctorDepartment[this.value];

            }

        });

    }

    // ===========================================
    // TODAY DATE
    // ===========================================

    const appointmentDate =
        document.getElementById("appointmentDate");

    if (appointmentDate) {

        const today = new Date();

        appointmentDate.min =
        today.toISOString().split("T")[0];

    }

    // ===========================================
    // APPOINTMENT ID GENERATOR
    // ===========================================

    function generateAppointmentID() {

        return "APT-" +

        Math.floor(

            100000 +

            Math.random() * 900000

        );

    }

    // ===========================================
    // PART 2 STARTS FROM HERE
    // ===========================================
        // ===========================================
    // FORM SUBMIT
    // ===========================================

    form.addEventListener("submit", function (e) {

        e.preventDefault();
        updateStatistics();

        // ===========================================
        // GET FORM VALUES
        // ===========================================

        const appointment = {

            id:
                generateAppointmentID(),

            patientName:
                document.getElementById("patientName").value.trim(),

            fatherName:
                document.getElementById("fatherName").value.trim(),

            gender:
                document.getElementById("patientGender").value,

            age:
                document.getElementById("patientAge").value,

            phone:
                document.getElementById("patientPhone").value.trim(),

            email:
                document.getElementById("patientEmail").value.trim(),

            address:
                document.getElementById("address").value.trim(),

            bloodGroup:
                document.getElementById("bloodGroup").value,

            emergencyName:
                document.getElementById("emergencyName").value.trim(),

            emergencyPhone:
                document.getElementById("emergencyPhone").value.trim(),

            department:
                document.getElementById("department").value,

            doctor:
                document.getElementById("doctor").value,

            date:
                document.getElementById("appointmentDate").value,

            time:
                document.getElementById("appointmentTime").value,

            symptoms:
                document.getElementById("symptoms").value.trim(),

            message:
                document.getElementById("message").value.trim(),

            status:
                "Confirmed",

            fee:
                "Rs. 2,000"

        };

        // ===========================================
        // VALIDATION
        // ===========================================

        if (

            appointment.patientName === "" ||

            appointment.gender === "" ||

            appointment.age === "" ||

            appointment.phone === "" ||

            appointment.department === "" ||

            appointment.doctor === "" ||

            appointment.date === "" ||

            appointment.time === "" ||

            appointment.symptoms === ""

        ) {

            alert("Please fill all required fields.");

            return;

        }

        if (

            !document.getElementById("terms").checked

        ) {

            alert("Please accept Terms & Conditions.");

            return;

        }

        // ===========================================
        // LOAD APPOINTMENTS
        // ===========================================

        let appointments =

            JSON.parse(

                localStorage.getItem("appointments")

            ) || [];

        // ===========================================
        // PHASE 3
        // ADD / UPDATE APPOINTMENT
        // ===========================================

        if (editIndex === -1) {

            appointments.push(appointment);

        } else {

            appointment.id =
                appointments[editIndex].id;

            appointments[editIndex] =
                appointment;

        }

        localStorage.setItem(

            "appointments",

            JSON.stringify(appointments)

        );

        // ===========================================
        // SAVE CURRENT APPOINTMENT
        // ===========================================

        localStorage.setItem(

            "currentAppointment",

            JSON.stringify(appointment)

        );

        // ===========================================
        // PRINT SLIP DATA
        // ===========================================

        localStorage.setItem(

            "printAppointment",

            JSON.stringify(appointment)

        );

        // ===========================================
        // SUCCESS MESSAGE
        // ===========================================

        successMessage.style.display = "block";

        successMessage.innerHTML =
            "✅ Appointment Booked Successfully!";

        // ===========================================
        // PART 3 STARTS FROM HERE
        // ===========================================
                // ===========================================
        // REFRESH TABLE
        // ===========================================

        if (tableBody) {

            tableBody.innerHTML = "";

            appointments.forEach(function (appointment) {

                const row = document.createElement("tr");

                row.innerHTML = `

                    <td>${appointment.id}</td>

                    <td>${appointment.patientName}</td>

                    <td>${appointment.doctor}</td>

                    <td>${appointment.department}</td>

                    <td>${appointment.date}</td>

                    <td>${appointment.time}</td>

                    <td>

                        <span class="${appointment.status.toLowerCase()}">

                            ${appointment.status}

                        </span>

                    </td>

                    <td>

                        <button class="edit">

                            Edit

                        </button>

                        <button class="complete">

                            Complete

                        </button>

                        <button class="cancel">

                            Cancel

                        </button>

                        <button class="delete">

                            Delete

                        </button>

                    </td>

                `;

                tableBody.appendChild(row);

            });

        }

        // ===========================================
        // RESET FORM
        // ===========================================

        form.reset();

        editIndex = -1;

        confirmButton.innerHTML =
        '<i class="fa-solid fa-calendar-check"></i> Confirm Appointment';

        // ===========================================
        // CLOSE MODAL
        // ===========================================

        setTimeout(function () {

            closeModal();

        }, 1500);

        // ===========================================
        // SUCCESS PAGE
        // ===========================================

        setTimeout(function () {

            window.location.href =
            "appointment-success.html";

        }, 1700);

    });

    // ===========================================
    // SEARCH
    // ===========================================

    if (searchInput) {

        searchInput.addEventListener("keyup", function () {

            const value =
            this.value.toLowerCase();

            const rows =
            tableBody.querySelectorAll("tr");

            rows.forEach(function (row) {

                row.style.display =

                row.innerText.toLowerCase().includes(value)

                ? ""

                : "none";

            });

        });

    }

    // ===========================================
    // PART 4 STARTS HERE
    // ===========================================
        // ===========================================
    // EDIT / DELETE / COMPLETE / CANCEL
    // PHASE 5
    // ===========================================

    tableBody.addEventListener("click", function (e) {

        const row = e.target.closest("tr");

        if (!row) return;

        let appointments =

            JSON.parse(

                localStorage.getItem("appointments")

            ) || [];

        const index = row.rowIndex - 1;

        // ===========================================
        // EDIT
        // ===========================================

        if (e.target.classList.contains("edit")) {

            editIndex = index;

            const appointment = appointments[index];

            if (!appointment) return;

            document.getElementById("patientName").value =
            appointment.patientName;

            document.getElementById("fatherName").value =
            appointment.fatherName;

            document.getElementById("patientGender").value =
            appointment.gender;

            document.getElementById("patientAge").value =
            appointment.age;

            document.getElementById("patientPhone").value =
            appointment.phone;

            document.getElementById("patientEmail").value =
            appointment.email;

            document.getElementById("address").value =
            appointment.address;

            document.getElementById("bloodGroup").value =
            appointment.bloodGroup;

            document.getElementById("emergencyName").value =
            appointment.emergencyName;

            document.getElementById("emergencyPhone").value =
            appointment.emergencyPhone;

            document.getElementById("department").value =
            appointment.department;

            document.getElementById("doctor").value =
            appointment.doctor;

            document.getElementById("appointmentDate").value =
            appointment.date;

            document.getElementById("appointmentTime").value =
            appointment.time;

            document.getElementById("symptoms").value =
            appointment.symptoms;

            document.getElementById("message").value =
            appointment.message;

            document.getElementById("terms").checked = true;

            confirmButton.innerHTML =
            '<i class="fa-solid fa-pen"></i> Update Appointment';

            openModal();

        }

        // ===========================================
        // DELETE
        // ===========================================

        if (e.target.classList.contains("delete")) {

            if (confirm("Delete this appointment?")) {

                appointments.splice(index, 1);

                localStorage.setItem(

                    "appointments",

                    JSON.stringify(appointments)

                );
updateStatistics();
                row.remove();

            }

        }

        // ===========================================
        // COMPLETE
        // ===========================================

        if (e.target.classList.contains("complete")) {

            appointments[index].status = "Completed";

            localStorage.setItem(

                "appointments",

                JSON.stringify(appointments)

            );
updateStatistics();
            row.cells[6].innerHTML =

            '<span class="completed">Completed</span>';

            alert("Appointment Completed Successfully.");

        }

        // ===========================================
        // CANCEL
        // ===========================================

        if (e.target.classList.contains("cancel")) {

            appointments[index].status = "Cancelled";

            localStorage.setItem(

                "appointments",

                JSON.stringify(appointments)

            );
updateStatistics();
            row.cells[6].innerHTML =

            '<span class="cancelled">Cancelled</span>';

            alert("Appointment Cancelled Successfully.");

        }

    });

    // ===========================================
    // PART 5 STARTS FROM HERE
    // ===========================================
        // ===========================================
    // LOAD SAVED APPOINTMENTS
    // ===========================================

    const savedAppointments =

        JSON.parse(

            localStorage.getItem("appointments")

        ) || [];

    if (tableBody) {

        tableBody.innerHTML = "";

        savedAppointments.forEach(function (appointment) {

            const row = document.createElement("tr");

            row.innerHTML = `

                <td>${appointment.id}</td>

                <td>${appointment.patientName}</td>

                <td>${appointment.doctor}</td>

                <td>${appointment.department}</td>

                <td>${appointment.date}</td>

                <td>${appointment.time}</td>

                <td>

                    <span class="${appointment.status.toLowerCase()}">

                        ${appointment.status}

                    </span>

                </td>

                <td>

                    <button class="edit">

                        Edit

                    </button>

                    <button class="complete">

                        Complete

                    </button>

                    <button class="cancel">

                        Cancel

                    </button>

                    <button class="delete">

                        Delete

                    </button>

                </td>

            `;

            tableBody.appendChild(row);

        });

    }
    // ===========================================
// FILTER FUNCTION
// ===========================================

function filterAppointments(){

const doctorValue =
doctorFilter.value.toLowerCase();

const departmentValue =
departmentFilter.value.toLowerCase();

const rows =
tableBody.querySelectorAll("tr");

rows.forEach(function(row){

const doctor =
row.cells[2].innerText.toLowerCase();

const department =
row.cells[3].innerText.toLowerCase();

const doctorMatch =
doctorValue === "" ||
doctor === doctorValue;

const departmentMatch =
departmentValue === "" ||
department === departmentValue;

row.style.display =
doctorMatch && departmentMatch
? ""
: "none";

});

}

doctorFilter.addEventListener(
"change",
filterAppointments
);

departmentFilter.addEventListener(
"change",
filterAppointments
);
    // ===========================================
// DASHBOARD STATISTICS
// ===========================================

function updateStatistics(){

const appointments=

JSON.parse(

localStorage.getItem("appointments")

)||[];

document.getElementById("totalAppointments").innerHTML=

appointments.length;

document.getElementById("confirmedAppointments").innerHTML=

appointments.filter(a=>a.status==="Confirmed").length;

document.getElementById("completedAppointments").innerHTML=

appointments.filter(a=>a.status==="Completed").length;

document.getElementById("cancelledAppointments").innerHTML=

appointments.filter(a=>a.status==="Cancelled").length;

}

updateStatistics();

    // ===========================================
    // PAGE ANIMATION
    // ===========================================

    const main = document.querySelector(".main");

    if (main) {

        main.style.opacity = "0";

        main.style.transform = "translateY(20px)";

        setTimeout(function () {

            main.style.transition = "all .5s ease";

            main.style.opacity = "1";

            main.style.transform = "translateY(0)";

        }, 200);

    }

    // ===========================================
    // INPUT FOCUS EFFECT
    // ===========================================

    const inputs =

        document.querySelectorAll(

            "input, select, textarea"

        );

    inputs.forEach(function (input) {

        input.addEventListener("focus", function () {

            this.style.borderColor = "#0b74d1";

        });

        input.addEventListener("blur", function () {

            this.style.borderColor = "#dbe8f5";

        });

    });

    // ===========================================
    // RESET BUTTON
    // ===========================================

    if (resetButton) {

        resetButton.addEventListener("click", function () {

            form.reset();

            editIndex = -1;

            confirmButton.innerHTML =
            '<i class="fa-solid fa-calendar-check"></i> Confirm Appointment';

            successMessage.style.display = "none";

        });

    }

    // ===========================================
    // PRINT FUNCTION
    // ===========================================

    window.printAppointmentSlip = function () {

        window.open(

            "appointment-success.html",

            "_blank"

        );

    };
    // ===========================================
// EXPORT CSV
// ===========================================

if(exportCSV){

exportCSV.addEventListener("click",function(){

const appointments =
JSON.parse(
localStorage.getItem("appointments")
) || [];

if(appointments.length===0){

alert("No appointments found.");

return;

}

let csv =
"ID,Patient,Doctor,Department,Date,Time,Status\n";

appointments.forEach(function(item){

csv +=

`${item.id},
${item.patientName},
${item.doctor},
${item.department},
${item.date},
${item.time},
${item.status}\n`;

});

const blob =
new Blob([csv],{
type:"text/csv"
});

const url =
window.URL.createObjectURL(blob);

const a =
document.createElement("a");

a.href = url;

a.download =
"Appointments.csv";

a.click();

window.URL.revokeObjectURL(url);

});

}
// ===========================================
// EXPORT PDF
// ===========================================

if(exportPDF){

exportPDF.addEventListener("click",function(){

const { jsPDF } = window.jspdf;

const doc = new jsPDF();

doc.setFontSize(18);

doc.text("HealthCare Hospital",14,15);

doc.setFontSize(12);

doc.text("Appointments Report",14,25);

const appointments =

JSON.parse(

localStorage.getItem("appointments")

) || [];

const rows = [];

appointments.forEach(function(item){

rows.push([

item.id,

item.patientName,

item.doctor,

item.department,

item.date,

item.time,

item.status

]);

});

doc.autoTable({

head:[["ID","Patient","Doctor","Department","Date","Time","Status"]],

body:rows,

startY:35

});

doc.save("Appointments_Report.pdf");

});

}

}); // DOMContentLoaded END