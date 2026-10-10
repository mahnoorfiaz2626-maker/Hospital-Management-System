// ==========================
// LOGIN FORM VALIDATION
// ==========================

const form = document.querySelector("form");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const username = document.querySelector("input[type='text']").value.trim();

    const password = document.querySelector("input[type='password']").value.trim();

    if(username === "" || password === ""){

        alert("Please fill in all fields.");

        return;

    }

    alert("Login Successful!");

    window.location.href = "index.html";

});