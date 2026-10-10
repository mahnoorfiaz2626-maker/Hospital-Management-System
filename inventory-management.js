// ===========================================
// HEALTHCARE HOSPITAL
// INVENTORY MANAGEMENT
// PHASE 3 - PART 1
// ===========================================

document.addEventListener("DOMContentLoaded", function () {

    // ===========================================
    // LOCAL STORAGE
    // ===========================================

    let inventoryItems =
        JSON.parse(localStorage.getItem("inventoryItems")) || [];

    let editItemId = null;

    // ===========================================
    // HTML ELEMENTS
    // ===========================================

    const inventoryForm =
        document.getElementById("inventoryForm");

    const inventoryTable =
        document.querySelector("#inventoryTable tbody");

    const searchInventory =
        document.getElementById("searchInventory");

    // ===========================================
    // LOAD DATA
    // ===========================================

    loadInventoryItems();

    updateDashboardCounter();

    // ===========================================
    // ADD / UPDATE INVENTORY ITEM
    // ===========================================

    inventoryForm.addEventListener("submit", function (e) {

        e.preventDefault();

        if (editItemId !== null) {

            inventoryItems = inventoryItems.map(function (item) {

                if (item.id === editItemId) {

                    item.itemId =
                        document.getElementById("itemId").value;

                    item.itemName =
                        document.getElementById("itemName").value;

                    item.category =
                        document.getElementById("category").value;

                    item.quantity =
                        document.getElementById("quantity").value;

                    item.unitPrice =
                        document.getElementById("unitPrice").value;

                    item.supplier =
                        document.getElementById("supplier").value;

                    item.expiryDate =
                        document.getElementById("expiryDate").value;

                    item.stockStatus =
                        document.getElementById("stockStatus").value;

                }

                return item;

            });

            localStorage.setItem(
                "inventoryItems",
                JSON.stringify(inventoryItems)
            );

            updateDashboardCounter();

            loadInventoryItems();

            inventoryForm.reset();

            editItemId = null;

            document.getElementById("addItemBtn").innerHTML =
                '<i class="fa-solid fa-plus"></i> Add Inventory Item';

            alert("Inventory Item Updated Successfully.");

            return;

        }

        const item = {

            id: Date.now(),

            itemId:
                document.getElementById("itemId").value,

            itemName:
                document.getElementById("itemName").value,

            category:
                document.getElementById("category").value,

            quantity:
                document.getElementById("quantity").value,

            unitPrice:
                document.getElementById("unitPrice").value,

            supplier:
                document.getElementById("supplier").value,

            expiryDate:
                document.getElementById("expiryDate").value,

            stockStatus:
                document.getElementById("stockStatus").value

        };

        inventoryItems.push(item);

        localStorage.setItem(
            "inventoryItems",
            JSON.stringify(inventoryItems)
        );

        updateDashboardCounter();

        loadInventoryItems();

        inventoryForm.reset();

        alert("Inventory Item Added Successfully.");

    });
        // ===========================================
    // LOAD INVENTORY ITEMS
    // PHASE 3 - PART 2
    // ===========================================

    function loadInventoryItems() {

        inventoryTable.innerHTML = "";

        inventoryItems.forEach(function (item, index) {

            let statusClass = "";

            if (item.stockStatus === "In Stock") {

                statusClass = "inStock";

            }

            else if (item.stockStatus === "Low Stock") {

                statusClass = "lowStock";

            }

            else {

                statusClass = "outOfStock";

            }

            inventoryTable.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${item.itemId}</td>

                <td>${item.itemName}</td>

                <td>${item.category}</td>

                <td>${item.quantity}</td>

                <td>PKR ${Number(item.unitPrice).toLocaleString()}</td>

                <td>${item.supplier}</td>

                <td>${item.expiryDate}</td>

                <td>

                    <span class="${statusClass}">

                        ${item.stockStatus}

                    </span>

                </td>

                <td>

                    <button
                        class="editBtn"
                        onclick="editInventoryItem(${item.id})">

                        Edit

                    </button>

                    <button
                        class="deleteBtn"
                        onclick="deleteInventoryItem(${item.id})">

                        Delete

                    </button>

                </td>

            </tr>

            `;

        });

    }
        // ===========================================
    // DELETE INVENTORY ITEM
    // PHASE 3 - PART 3
    // ===========================================

    window.deleteInventoryItem = function (id) {

        const confirmDelete = confirm(
            "Are you sure you want to delete this inventory item?"
        );

        if (!confirmDelete) {

            return;

        }

        inventoryItems = inventoryItems.filter(function (item) {

            return item.id !== id;

        });

        localStorage.setItem(
            "inventoryItems",
            JSON.stringify(inventoryItems)
        );

        updateDashboardCounter();

        loadInventoryItems();

        alert("Inventory Item Deleted Successfully.");

    };

    // ===========================================
    // EDIT INVENTORY ITEM
    // PHASE 3 - PART 3
    // ===========================================

    window.editInventoryItem = function (id) {

        const item = inventoryItems.find(function (record) {

            return record.id === id;

        });

        if (!item) return;

        editItemId = id;

        document.getElementById("itemId").value =
            item.itemId;

        document.getElementById("itemName").value =
            item.itemName;

        document.getElementById("category").value =
            item.category;

        document.getElementById("quantity").value =
            item.quantity;

        document.getElementById("unitPrice").value =
            item.unitPrice;

        document.getElementById("supplier").value =
            item.supplier;

        document.getElementById("expiryDate").value =
            item.expiryDate;

        document.getElementById("stockStatus").value =
            item.stockStatus;

        document.getElementById("addItemBtn").innerHTML =
            '<i class="fa-solid fa-pen"></i> Update Inventory Item';

    };
        // ===========================================
    // SEARCH INVENTORY ITEM
    // PHASE 3 - PART 4
    // ===========================================

    if (searchInventory) {

        searchInventory.addEventListener("keyup", function () {

            const value =
                searchInventory.value.toLowerCase();

            const rows =
                document.querySelectorAll("#inventoryTable tbody tr");

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

            "totalInventoryItems",

            inventoryItems.length

        );

    }

});