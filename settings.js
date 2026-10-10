// ==========================
// SETTINGS PAGE JAVASCRIPT
// ==========================

const form = document.querySelector("form");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const inputs = document.querySelectorAll("input");

        let isEmpty = false;

        inputs.forEach(function (input) {

            // Password fields ko empty rehne ki permission hai
            if (
                input.type !== "password" &&
                input.value.trim() === ""
            ) {
                isEmpty = true;
            }

        });

        if (isEmpty) {

            alert("Please fill in all required fields.");

            return;

        }

        // ==========================
        // PASSWORD VALIDATION
        // ==========================

        const passwords = document.querySelectorAll("input[type='password']");

        if (passwords.length === 2) {

            const newPassword = passwords[0].value;

            const confirmPassword = passwords[1].value;

            // Agar user password change karna chahe
            if (newPassword !== "" || confirmPassword !== "") {

                if (newPassword !== confirmPassword) {

                    alert("New Password and Confirm Password do not match.");

                    return;

                }

            }

        }

        alert("Profile Updated Successfully!");

    });

}