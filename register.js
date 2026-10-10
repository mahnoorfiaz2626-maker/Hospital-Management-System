// ==========================
// REGISTER FORM VALIDATION
// ==========================

const form = document.querySelector("form");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const fullName = document.querySelectorAll("input")[0].value.trim();
    const email = document.querySelectorAll("input")[1].value.trim();
    const username = document.querySelectorAll("input")[2].value.trim();
    const password = document.querySelectorAll("input")[3].value.trim();
    const confirmPassword = document.querySelectorAll("input")[4].value.trim();

    if(fullName === "" || email === "" || username === "" || password === "" || confirmPassword === ""){

        alert("Please fill in all fields.");
        return;
    }

    // Email Validation
    if(!email.includes("@") || !email.includes(".")){

        alert("Please enter a valid email address.");
        return;
    }

    // Username Validation
    if(username.length < 4){

        alert("Username must be at least 4 characters.");
        return;
    }

    // Password Validation
    if(password.length < 6){

        alert("Password must be at least 6 characters.");
        return;
    }

    // Confirm Password
    if(password !== confirmPassword){

        alert("Passwords do not match.");
        return;
    }

    alert("Registration Successful!");

    window.location.href = "login.html";

});