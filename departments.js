// ==========================
// DEPARTMENTS PAGE JAVASCRIPT
// ==========================

function showDepartment(department) {

    let box = document.getElementById("details-box");

    if (department === "cardiology") {

        box.innerHTML = `
            <h2>❤️ Cardiology Department</h2>

            <img src="images/cardiology.jpg" alt="Cardiology">

            <p>
                Our Cardiology Department specializes in diagnosing and treating
                heart diseases using modern medical technology.
            </p>

            <ul>
                <li>✔ Heart Checkup</li>
                <li>✔ ECG</li>
                <li>✔ Angiography</li>
                <li>✔ Angioplasty</li>
                <li>✔ Heart Surgery</li>
            </ul>
        `;
    }

    else if (department === "neurology") {

        box.innerHTML = `
            <h2>🧠 Neurology Department</h2>

            <img src="images/neurology.jpg" alt="Neurology">

            <p>
                Our Neurology Department provides treatment for brain,
                spinal cord and nerve disorders.
            </p>

            <ul>
                <li>✔ Migraine Treatment</li>
                <li>✔ Stroke Care</li>
                <li>✔ Epilepsy Treatment</li>
                <li>✔ Brain MRI</li>
                <li>✔ Nerve Testing</li>
            </ul>
        `;
    }

    else if (department === "pediatrics") {

        box.innerHTML = `
            <h2>👶 Pediatrics Department</h2>

            <img src="images/pediatrics.jpg" alt="Pediatrics">

            <p>
                Our Pediatrics Department provides complete healthcare
                services for newborn babies and children.
            </p>

            <ul>
                <li>✔ Child Vaccination</li>
                <li>✔ Baby Checkup</li>
                <li>✔ Nutrition Advice</li>
                <li>✔ Emergency Care</li>
                <li>✔ Growth Monitoring</li>
            </ul>
        `;
    }

    else if (department === "orthopedics") {

        box.innerHTML = `
            <h2>🦴 Orthopedics Department</h2>

            <img src="images/orthopedics.jpg" alt="Orthopedics">

            <p>
                Advanced treatment for bones, joints, muscles and fractures.
            </p>

            <ul>
                <li>✔ Bone Fractures</li>
                <li>✔ Joint Replacement</li>
                <li>✔ Sports Injury</li>
                <li>✔ Arthritis Care</li>
                <li>✔ Spine Surgery</li>
            </ul>
        `;
    }

    else if (department === "dental") {

        box.innerHTML = `
            <h2>🦷 Dental Care Department</h2>

            <img src="images/dental.jpg" alt="Dental">

            <p>
                We provide complete dental care using advanced equipment.
            </p>

            <ul>
                <li>✔ Teeth Cleaning</li>
                <li>✔ Tooth Filling</li>
                <li>✔ Braces</li>
                <li>✔ Root Canal</li>
                <li>✔ Dental Surgery</li>
            </ul>
        `;
    }

    else if (department === "ophthalmology") {

        box.innerHTML = `
            <h2>👁 Ophthalmology Department</h2>

            <img src="images/ophthalmology.jpg" alt="Ophthalmology">

            <p>
                Professional eye care services including diagnosis,
                treatment and eye surgery.
            </p>

            <ul>
                <li>✔ Eye Checkup</li>
                <li>✔ Cataract Surgery</li>
                <li>✔ LASIK</li>
                <li>✔ Retina Care</li>
                <li>✔ Vision Testing</li>
            </ul>
        `;
    }

}de