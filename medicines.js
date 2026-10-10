// ==========================
// MEDICINES PAGE JAVASCRIPT
// ==========================

// Edit Medicine

const editButtons = document.querySelectorAll(".edit");

editButtons.forEach(function(button){

    button.addEventListener("click", function(){

        alert("Medicine information can be edited here.");

    });

});

// Delete Medicine

const deleteButtons = document.querySelectorAll(".delete");

deleteButtons.forEach(function(button){

    button.addEventListener("click", function(){

        let result = confirm("Are you sure you want to delete this medicine?");

        if(result){

            button.closest("tr").remove();

            alert("Medicine deleted successfully.");

        }

    });

});
// ==========================
// SEARCH MEDICINE
// ==========================

const searchBox = document.querySelector("input");

if(searchBox){

    searchBox.addEventListener("keyup", function(){

        let filter = this.value.toLowerCase();

        let rows = document.querySelectorAll("table tr");

        rows.forEach(function(row,index){

            if(index === 0) return;

            let text = row.innerText.toLowerCase();

            if(text.includes(filter)){

                row.style.display = "";

            }else{

                row.style.display = "none";

            }

        });

    });

}
// ==========================
// ADD MEDICINE BUTTON
// ==========================

const addButton = document.querySelector(".add-btn");

if(addButton){

    addButton.addEventListener("click", function(){

        alert("Add Medicine feature will be added in the backend version.");

    });

}