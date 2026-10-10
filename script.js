function showService(service){

    let box = document.getElementById("service-details");

    if(service==="cardiology"){

        box.innerHTML=`
        <h2>❤️ Cardiology</h2>
        <p>
        Our Cardiology Department provides advanced heart care including ECG,
        Angiography, Angioplasty, Heart Surgery and Emergency Cardiac Services.
        </p>
        <ul>
            <li>✔ ECG</li>
            <li>✔ Heart Checkup</li>
            <li>✔ Angiography</li>
            <li>✔ Angioplasty</li>
            <li>✔ Heart Surgery</li>
        </ul>
        `;
    }

    else if(service==="neurology"){

        box.innerHTML=`
        <h2>🧠 Neurology</h2>
        <p>
        We diagnose and treat brain, spinal cord and nervous system disorders.
        </p>
        <ul>
            <li>✔ Brain MRI</li>
            <li>✔ Stroke Care</li>
            <li>✔ Migraine Treatment</li>
            <li>✔ Epilepsy Treatment</li>
            <li>✔ Nerve Testing</li>
        </ul>
        `;
    }

    else if(service==="emergency"){

        box.innerHTML=`
        <h2>🚑 Emergency Care</h2>
        <p>
        24/7 emergency services with modern ambulances and experienced doctors.
        </p>
        <ul>
            <li>✔ Emergency Ambulance</li>
            <li>✔ ICU Support</li>
            <li>✔ Trauma Care</li>
            <li>✔ Emergency Surgery</li>
            <li>✔ Critical Care Unit</li>
        </ul>
        `;
    }

    else if(service==="pediatrics"){

        box.innerHTML=`
        <h2>👶 Pediatrics</h2>
        <p>
        Complete healthcare services for newborn babies, infants and children.
        </p>
        <ul>
            <li>✔ Vaccination</li>
            <li>✔ Child Specialist</li>
            <li>✔ Nutrition Advice</li>
            <li>✔ Baby Checkup</li>
            <li>✔ Emergency Care</li>
        </ul>
        `;
    }

    else if(service==="orthopedics"){

        box.innerHTML=`
        <h2>🦴 Orthopedics</h2>
        <p>
        Treatment for bones, muscles and joints using advanced technology.
        </p>
        <ul>
            <li>✔ Bone Fracture</li>
            <li>✔ Joint Replacement</li>
            <li>✔ Spine Surgery</li>
            <li>✔ Arthritis Care</li>
            <li>✔ Sports Injury</li>
        </ul>
        `;
    }

    else if(service==="general"){

        box.innerHTML=`
        <h2>🩺 General Checkup</h2>
        <p>
        Complete body health examination with experienced physicians.
        </p>
        <ul>
            <li>✔ Blood Pressure</li>
            <li>✔ Blood Sugar</li>
            <li>✔ CBC Test</li>
            <li>✔ BMI Check</li>
            <li>✔ Doctor Consultation</li>
        </ul>
        `;
    }

    box.scrollIntoView({
        behavior:"smooth"
    });

}
document.getElementById("service-details").scrollIntoView({
    behavior: "smooth",
    block: "start"
});
const appointmentId =
"A" + Math.floor(Math.random() * 9000 + 1000);