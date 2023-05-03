// for the retrieval of data
function loadTable(empname='') {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/employees?empname_like=${empname}`);
    xhttp.send();
    // xhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log(this.responseText);
    //         var trHTML = "";
    //         const objects = JSON.parse(this.responseText);
    //         for (let object of objects) {
    //             trHTML += "<tr>";
    //             trHTML += "<td>" + object["id"] + "</td>";
    //             trHTML += "<td>" + object["empname"] + "</td>";
    //             trHTML += "<td>" + object["DOJ"] + "</td>";
    //             trHTML += "<td>" + object["department"] + "</td>";
    //             trHTML += "<td>" + object["designation"] + "</td>";
    //             trHTML += "<td>" + object["salary"] + "</td>";
    //             trHTML += '<td><img style="width:50px;height:50px" src="' + object["image"] + '"></td>';
    //             trHTML += '<td><button type="button" class="btn btn-outline-primary" onclick="showUserEditBox(' + object["id"] + ')">Edit</button>';
    //             trHTML += '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' + object["id"] + ')">Del</button></td>';
    //             trHTML += "</tr>";
    //         }
    //         document.getElementById("mytable").innerHTML = trHTML;
    //     }
    // };

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
          var trHTML = "";
          const objects = JSON.parse(this.responseText);
          for (let object of objects) {
            trHTML += "<tr>";
            trHTML += "<td>" + object["id"] + "</td>";
            trHTML += "<td>" + object["empname"] + "</td>";
            trHTML += "<td>" + object["DOJ"] + "</td>";
            trHTML += "<td>" + object["department"] + "</td>";
            trHTML += "<td>" + object["designation"] + "</td>";
            trHTML += "<td>" + object["salary"] + "</td>";
            trHTML += '<td><img style="width:50px;height:50px" src="' + object["image"] + '"></td>'; // use the selected avatar URL
            trHTML += '<td><button type="button" class="btn btn-outline-primary" onclick="showUserEditBox(' + object["id"] + ')">Edit</button>';
            trHTML += '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' + object["id"] + ')">Del</button></td>';
            trHTML += "</tr>";
          }
          document.getElementById("mytable").innerHTML = trHTML;
        }
      };
}

loadTable();

// searching
function search(){
const empname=document.getElementById("searchvalue").value;
loadTable(empname);
}

// creating the record

function createEmployee() {

    Swal.fire({
        title: "Create user",
        html:
        
          '<input id="id" type="hidden">' +
          
          '<input id="empname" class="swal2-input" placeholder="Employee Name" required>' +
          '<label for="empname">Employee Name</label>'+
          '<input id="DOJ" class="swal2-input" placeholder="Joining Date" required>' +
          '<label for="DOJ">Date Of Joining</label>'+
          '<input id="department" class="swal2-input" placeholder="Department" required>' +
          '<label for="department">EMP Department</label>'+
          '<input id="designation" class="swal2-input" placeholder="Designation" required>' +
          '<label for="designation">EMP Designation</label>'+
          '<input id="salary" class="swal2-input" placeholder="Salary" required>'+
          '<label for="salary">Monthly Salary</label>',
          showCancelButton:true,

        preConfirm:  () => {
          const enameinput = document.getElementById("empname").value;
          const DOJInput = document.getElementById("DOJ").value;
          const deptinput = document.getElementById("department").value;
          const designationInput = document.getElementById("designation").value;
          const salinput = document.getElementById("salary").value;

    //   for removing the whitespaces
          const empname = enameinput.trim();
          const DOJ = DOJInput.trim();
          const department = deptinput.trim();
          const designation = designationInput.trim();
          const salary = salinput.trim();
      
          if (!empname || !DOJ || !department || !designation || !salary) {
            Swal.fire({
              icon: 'warning',
              title: 'Please fill in the fields',
              text: 'Validation error',
            });
            return false;
          }

           else {
            userCreate();
          }
        }
      });
}

function userCreate() {
    const empname = document.getElementById("empname").value;
    const DOJ = document.getElementById("DOJ").value;
    const department = document.getElementById("department").value;
    const designation = document.getElementById("designation").value;
    const salary = document.getElementById("salary").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3000/employees/");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
        JSON.stringify({
            empname: empname,
            DOJ: DOJ,
            department: department,
            designation: designation,
            salary: salary,
            image: "https://www.melivecode.com/users/3.png",

        })
    );
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(objects["message"]);
            loadTable();
        }
    };

}

// editing the record
function showUserEditBox(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/employees/${id}`);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire({
                title: "Edit Employee",
                html:
                    '<input id="id" type="hidden" value="' + objects[`${id}`] + '">' +
                    
                    '<input id="empname" class="swal2-input" required type="text" value="' + objects[`empname`] + '">' +
                    '<label for="empname">Employee Name</label>'+
                    '<input id="DOJ" type="text" class="swal2-input" value="' + objects[`DOJ`] + '">' +
                    '<label for="DOJ">Date of Joining</label>'+
                    '<input id="department" type="text" class="swal2-input" value="' + objects[`department`] + '">' +
                    '<label for="department">EMP Department</label>'+

                    '<input id="designation" type="text" class="swal2-input" value="' + objects[`designation`] + '">' +
                    '<label for="designation">EMP Designation</label>'+
                    '<input id="salary" type="text" class="swal2-input"  value="' + objects[`salary`] + '">'+
                    '<label for="designation">Monthly Salary</label>',
                preConfirm: () => {
                    userEdit(id);
                }
            })
        }
    }
}

function userEdit(id) {
    const empname = document.getElementById("empname").value;
    const DOJ = document.getElementById("DOJ").value;
    const department = document.getElementById("department").value;
    const designation = document.getElementById("designation").value;
    const salary = document.getElementById("salary").value;
    console.log(empname);
    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", `http://localhost:3000/employees/${id}`);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
        JSON.stringify({
            empname: empname,
            DOJ: DOJ,
            department: department,
            designation: designation,
            salary: salary,
            // image: "https://www.melivecode.com/users/1.png",
        })
    );

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
       
        
        }
        Swal.fire({
            title:'Successfully Updated',
            icon:'success'
    });
    loadTable();
        
    }
    
}

// deleting the record

function userDelete(id) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", `http://localhost:3000/employees/${id}`);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");


    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
        xhttp.send(JSON.stringify({id: id,}));

        xhttp.onreadystatechange = function () {
                if (this.readyState == 4) { loadTable();}
            }}
            });    
}



         