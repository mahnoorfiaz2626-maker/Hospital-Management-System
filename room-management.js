// ===========================================
// HEALTHCARE HOSPITAL
// ROOM MANAGEMENT
// PHASE 3 - PART 1
// ===========================================

document.addEventListener("DOMContentLoaded", function () {

    // ===========================================
    // LOCAL STORAGE
    // ===========================================

    let rooms =
        JSON.parse(localStorage.getItem("rooms")) || [];

    let editRoomId = null;

    // ===========================================
    // HTML ELEMENTS
    // ===========================================

    const roomForm =
        document.getElementById("roomForm");

    const roomTable =
        document.querySelector("#roomTable tbody");

    const searchRoom =
        document.getElementById("searchRoom");

    // ===========================================
    // LOAD DATA
    // ===========================================

    loadRooms();

    updateDashboardCounter();

    // ===========================================
    // ADD / UPDATE ROOM
    // ===========================================

    roomForm.addEventListener("submit", function (e) {

        e.preventDefault();

        if (editRoomId !== null) {

            rooms = rooms.map(function (room) {

                if (room.id === editRoomId) {

                    room.number =
                        document.getElementById("roomNumber").value;

                    room.type =
                        document.getElementById("roomType").value;

                    room.capacity =
                        document.getElementById("bedCapacity").value;

                    room.availability =
                        document.getElementById("availability").value;

                    room.charges =
                        document.getElementById("roomCharges").value;

                    room.floor =
                        document.getElementById("floorNumber").value;

                }

                return room;

            });

            localStorage.setItem(
                "rooms",
                JSON.stringify(rooms)
            );

            updateDashboardCounter();

            loadRooms();

            roomForm.reset();

            editRoomId = null;

            document.getElementById("addRoomBtn").innerHTML =
                '<i class="fa-solid fa-plus"></i> Add Room';

            alert("Room Updated Successfully.");

            return;

        }

        const room = {

            id: Date.now(),

            number:
                document.getElementById("roomNumber").value,

            type:
                document.getElementById("roomType").value,

            capacity:
                document.getElementById("bedCapacity").value,

            availability:
                document.getElementById("availability").value,

            charges:
                document.getElementById("roomCharges").value,

            floor:
                document.getElementById("floorNumber").value

        };

        rooms.push(room);

        localStorage.setItem(
            "rooms",
            JSON.stringify(rooms)
        );

        updateDashboardCounter();

        loadRooms();

        roomForm.reset();

        alert("Room Added Successfully.");

    });
        // ===========================================
    // LOAD ROOMS
    // PHASE 3 - PART 2
    // ===========================================

    function loadRooms() {

        roomTable.innerHTML = "";

        rooms.forEach(function (room, index) {

            let statusClass = "";

            if (room.availability === "Available") {

                statusClass = "available";

            }

            else if (room.availability === "Occupied") {

                statusClass = "occupied";

            }

            else {

                statusClass = "maintenance";

            }

            roomTable.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${room.number}</td>

                <td>${room.type}</td>

                <td>${room.capacity}</td>

                <td>

                    <span class="${statusClass}">

                        ${room.availability}

                    </span>

                </td>

                <td>Rs. ${room.charges}</td>

                <td>${room.floor}</td>

                <td>

                    <button
                        class="editBtn"
                        onclick="editRoom(${room.id})">

                        Edit

                    </button>

                    <button
                        class="deleteBtn"
                        onclick="deleteRoom(${room.id})">

                        Delete

                    </button>

                </td>

            </tr>

            `;

        });

    }
        // ===========================================
    // DELETE ROOM
    // PHASE 3 - PART 3
    // ===========================================

    window.deleteRoom = function (id) {

        const confirmDelete = confirm(
            "Are you sure you want to delete this room?"
        );

        if (!confirmDelete) {

            return;

        }

        rooms = rooms.filter(function (room) {

            return room.id !== id;

        });

        localStorage.setItem(
            "rooms",
            JSON.stringify(rooms)
        );

        updateDashboardCounter();

        loadRooms();

        alert("Room Deleted Successfully.");

    };

    // ===========================================
    // EDIT ROOM
    // PHASE 3 - PART 3
    // ===========================================

    window.editRoom = function (id) {

        const room = rooms.find(function (item) {

            return item.id === id;

        });

        if (!room) return;

        editRoomId = id;

        document.getElementById("roomNumber").value =
            room.number;

        document.getElementById("roomType").value =
            room.type;

        document.getElementById("bedCapacity").value =
            room.capacity;

        document.getElementById("availability").value =
            room.availability;

        document.getElementById("roomCharges").value =
            room.charges;

        document.getElementById("floorNumber").value =
            room.floor;

        document.getElementById("addRoomBtn").innerHTML =
            '<i class="fa-solid fa-pen"></i> Update Room';

    };
        // ===========================================
    // SEARCH ROOM
    // PHASE 3 - PART 4
    // ===========================================

    if (searchRoom) {

        searchRoom.addEventListener("keyup", function () {

            const value =
                searchRoom.value.toLowerCase();

            const rows =
                document.querySelectorAll("#roomTable tbody tr");

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

            "totalRooms",

            rooms.length

        );

    }

});