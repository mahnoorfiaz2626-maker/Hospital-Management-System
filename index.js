function showAbout(){

    const box = document.getElementById("about-box");

    box.style.display = "block";

    box.innerHTML = `

        <h2>About HealthCare Hospital</h2>

        <p>
        HealthCare Hospital is one of the leading healthcare institutions,
        providing high-quality medical services with experienced doctors,
        advanced medical technology, and compassionate patient care.
        </p>

        <p>
        Our hospital operates 24 hours a day with emergency services,
        modern operation theaters, diagnostic laboratories,
        digital patient records, and highly trained medical staff.
        </p>

        <h3>Our Facilities</h3>

        <ul>
            <li>✔ Emergency Services (24/7)</li>
            <li>✔ Experienced Specialist Doctors</li>
            <li>✔ ICU & Operation Theatres</li>
            <li>✔ Digital Laboratory</li>
            <li>✔ Online Appointment System</li>
            <li>✔ Pharmacy Services</li>
            <li>✔ Ambulance Services</li>
            <li>✔ Patient Management System</li>
        </ul>

    `;

    box.scrollIntoView({
        behavior:"smooth"
    });

}