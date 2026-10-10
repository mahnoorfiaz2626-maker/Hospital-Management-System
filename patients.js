// ==========================
// PATIENTS PAGE JAVASCRIPT
// ==========================

// Edit Button

const editButtons = document.querySelectorAll(".edit");

editButtons.forEach(function(button){

    button.addEventListener("click", function(){

        alert("Patient information can be edited here.");

    });

});

// Delete Button

const deleteButtons = document.querySelectorAll(".delete");

deleteButtons.forEach(function(button){

    button.addEventListener("click", function(){

        let result = confirm("Are you sure you want to delete this patient?");

        if(result){

            button.closest("tr").remove();

            alert("Patient record deleted successfully.");

        }

    });

});
// ==========================
// SEARCH PATIENT
// ==========================

const searchBox = document.querySelector("input");

if(searchBox){

    searchBox.addEventListener("keyup", function(){

        let filter = this.value.toLowerCase();

        let rows = document.querySelectorAll("table tr");

        rows.forEach(function(row,index){

            if(index===0) return;

            let text = row.innerText.toLowerCase();

            if(text.includes(filter)){

                row.style.display="";

            }else{

                row.style.display="none";

            }

        });

    });

}