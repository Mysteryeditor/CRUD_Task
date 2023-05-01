function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/employees");
    xhttp.send();
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
                trHTML += '<td><img style="width:50px;height:50px" src="' + object["image"] + '"></td>';
                trHTML += '<td><button type="button" class="btn btn-outline-primary" onclick="showUserEditBox('+object["id"]+')">Edit</button>';
                trHTML += '<button type="button" class="btn btn-outline-danger" onclick="userDelete('+object["id"]+')">Del</button></td>';
                trHTML += "</tr>";
            }
            document.getElementById("mytable").innerHTML = trHTML;
        }
    };
}

loadTable();

function createEmployee(){
    Swal.fire({
        title:"Create user",
        html:
        '<input id="id" type="hidden">' +
        '<input id="empname" class="swal2-input" placeholder="Employee Name">'+
        '<input id="DOJ" class="swal2-input" placeholder="Joining Date">'+
        '<input id="department" class="swal2-input" placeholder="Department">'+
        '<input id="designation" class="swal2-input" placeholder="Designation">'+
        '<input id="salary" class="swal2-input" placeholder="Salary">',
        preConfirm:() =>{
            userCreate();
        }
    })
}

function userCreate(){
    const empname=document.getElementById("empname").value;
    const DOJ=document.getElementById("DOJ").value;
    const department=document.getElementById("department").value;
    const designation=document.getElementById("designation").value;
    const salary=document.getElementById("salary").value;
    
    const xhttp=new XMLHttpRequest();
    xhttp.open("POST","http://localhost:3000/employees/");
    xhttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    xhttp.send(
        JSON.stringify({
            empname:empname,
            DOJ:DOJ,
            department:department,
            designation:designation,
            salary:salary,
            image: "https://www.melivecode.com/users/1.png",

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

function showUserEditBox(id){
console.log(id);
const xhttp=new XMLHttpRequest();
xhttp.open("GET",`http://localhost:3000/employees/${id}`);
xhttp.send();
xhttp.onreadystatechange=function(){
    if(this.readyState==4 && this.status==200){
        const objects=JSON.parse(this.responseText);
        Swal.fire({
            title:"Edit Employee",
            html:
            '<input id="id" type="hidden" value="'+objects[`${id}`]+'">'+
             '<input id="empname" class="swal2-input" type="text" value="'+objects[`empname`]+'">'+
            '<input id="DOJ" type="text" class="swal2-input" value="'+objects[`DOJ`]+'">'+
            '<input id="department" type="text" class="swal2-input" value="'+objects[`department`]+'">'+
            '<input id="designation" type="text" class="swal2-input" value="'+objects[`designation`]+'">'+
            '<input id="salary" type="text" class="swal2-input"  value="'+objects[`salary`]+'">',
            preConfirm:() => {
                userEdit(id);
            }
        })
    }
}
}

function userEdit(id){
    const empname=document.getElementById("empname").value;
    const DOJ=document.getElementById("DOJ").value;
    const department=document.getElementById("department").value;
    const designation=document.getElementById("designation").value;
    const salary=document.getElementById("salary").value;
    console.log(empname);
    const xhttp=new XMLHttpRequest();
    xhttp.open("PUT",`http://localhost:3000/employees/${id}`);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
        JSON.stringify({
            empname:empname,
            DOJ:DOJ,
            department:department,
            designation:designation,
            salary:salary,
            image: "https://www.melivecode.com/users/1.png",
        })
        );

        xhttp.onreadystatechange=function(){
            if(this.readyState==0 && this.status==200){
                const objects=JSON.parse(this.responseText);
                Swal.fire(objects["message"]);
                loadTable();
            }
        }


}

function userDelete(id){
    const xhttp=new XMLHttpRequest();
    xhttp.open("DELETE",`http://localhost:3000/employees/${id}`);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
        JSON.stringify({
            id:id,
        })
    );
        xhttp.onreadystatechange=function(){
            if (this.readyState==4 && this.status==200){
                const objects=JSON.parse(this.responseText);
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
                        objects["message"];
                    }
                })

            }
        }




}