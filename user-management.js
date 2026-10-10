// ===========================================
// HEALTHCARE HOSPITAL
// USER / ADMIN MANAGEMENT
// PHASE 3 - PART 1
// ===========================================

document.addEventListener("DOMContentLoaded", function () {

    // ===========================================
    // LOCAL STORAGE
    // ===========================================

    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    let editUserId = null;

    // ===========================================
    // HTML ELEMENTS
    // ===========================================

    const userForm =
        document.getElementById("userForm");

    const userTable =
        document.querySelector("#userTable tbody");

    const searchUser =
        document.getElementById("searchUser");

    // ===========================================
    // LOAD DATA
    // ===========================================

    loadUsers();

    updateDashboardCounter();

    // ===========================================
    // ADD / UPDATE USER
    // ===========================================

    userForm.addEventListener("submit", function (e) {

        e.preventDefault();

        if (editUserId !== null) {

            users = users.map(function (user) {

                if (user.id === editUserId) {

                    user.fullName =
                        document.getElementById("fullName").value;

                    user.username =
                        document.getElementById("username").value;

                    user.email =
                        document.getElementById("email").value;

                    user.password =
                        document.getElementById("password").value;

                    user.contact =
                        document.getElementById("contact").value;

                    user.role =
                        document.getElementById("role").value;

                    user.status =
                        document.getElementById("status").value;

                }

                return user;

            });

            localStorage.setItem(
                "users",
                JSON.stringify(users)
            );

            updateDashboardCounter();

            loadUsers();

            userForm.reset();

            editUserId = null;

            document.getElementById("addUserBtn").innerHTML =
                '<i class="fa-solid fa-plus"></i> Add User';

            alert("User Updated Successfully.");

            return;

        }

        const user = {

            id: Date.now(),

            fullName:
                document.getElementById("fullName").value,

            username:
                document.getElementById("username").value,

            email:
                document.getElementById("email").value,

            password:
                document.getElementById("password").value,

            contact:
                document.getElementById("contact").value,

            role:
                document.getElementById("role").value,

            status:
                document.getElementById("status").value

        };

        users.push(user);

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        updateDashboardCounter();

        loadUsers();

        userForm.reset();

        alert("User Added Successfully.");

    });
        // ===========================================
    // LOAD USERS
    // PHASE 3 - PART 2
    // ===========================================

    function loadUsers() {

        userTable.innerHTML = "";

        users.forEach(function (user, index) {

            let statusClass = "";

            if (user.status === "Active") {

                statusClass = "activeStatus";

            }

            else {

                statusClass = "inactiveStatus";

            }

            userTable.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${user.fullName}</td>

                <td>${user.username}</td>

                <td>${user.email}</td>

                <td>${user.contact}</td>

                <td>${user.role}</td>

                <td>

                    <span class="${statusClass}">

                        ${user.status}

                    </span>

                </td>

                <td>

                    <button
                        class="editBtn"
                        onclick="editUser(${user.id})">

                        Edit

                    </button>

                    <button
                        class="deleteBtn"
                        onclick="deleteUser(${user.id})">

                        Delete

                    </button>

                </td>

            </tr>

            `;

        });

    }
        // ===========================================
    // DELETE USER
    // PHASE 3 - PART 3
    // ===========================================

    window.deleteUser = function (id) {

        const confirmDelete = confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) {

            return;

        }

        users = users.filter(function (user) {

            return user.id !== id;

        });

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        updateDashboardCounter();

        loadUsers();

        alert("User Deleted Successfully.");

    };

    // ===========================================
    // EDIT USER
    // PHASE 3 - PART 3
    // ===========================================

    window.editUser = function (id) {

        const user = users.find(function (item) {

            return item.id === id;

        });

        if (!user) return;

        editUserId = id;

        document.getElementById("fullName").value =
            user.fullName;

        document.getElementById("username").value =
            user.username;

        document.getElementById("email").value =
            user.email;

        document.getElementById("password").value =
            user.password;

        document.getElementById("contact").value =
            user.contact;

        document.getElementById("role").value =
            user.role;

        document.getElementById("status").value =
            user.status;

        document.getElementById("addUserBtn").innerHTML =
            '<i class="fa-solid fa-pen"></i> Update User';

    };
        // ===========================================
    // SEARCH USER
    // PHASE 3 - PART 4
    // ===========================================

    if (searchUser) {

        searchUser.addEventListener("keyup", function () {

            const value =
                searchUser.value.toLowerCase();

            const rows =
                document.querySelectorAll("#userTable tbody tr");

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

            "totalUsers",

            users.length

        );

    }

});