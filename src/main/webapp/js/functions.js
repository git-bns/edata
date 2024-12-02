var operation = "A"; //"A"=Adding; "E"=Editing
var selected_index = -1; //Index of the selected list item
var tbClients = localStorage.getItem("tbClients");//Retrieve the stored data
tbClients = JSON.parse(tbClients); //Converts string to object
if(tbClients == null) //If there is no data, initialize an empty array of local storage
	tbClients = [];

function logout(){
	localStorage.clear();
	window.location.href = "../index.html";
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function toggleView(){
	if(tbClients.length == 0){//If there is no data
		$("#dispaly-all").hide();
		$("#data-entry").show();
		alert("Employee information not available.");
	}else{
		$("#data-entry").hide();
		$("#dispaly-all").show();
	}
}

function toggleEdit(){
	$("#dispaly-all").hide();
	$("#data-entry").show();
}

function List(){	
	if(tbClients.length == 0)//If there is no data
		$("#dispaly-all").hide();
	else{
		$("#tblList").html(
		"<thead>"+
		"	<tr>"+
		"	<th width='20'>Edit</th>"+
		"	<th width='10'>ID</th>"+
		"	<th style=' word-wrap:break-word;'>Name</th>"+
		"	<th width='20'>Phone</th>"+
		"	<th width='30'>Email</th>"+
		"   <th width='20'>Delete</th>" +
		"	</tr>"+
		"</thead>"+
		"<tbody>"+
		"</tbody>"
		);
	for(var i in tbClients){
		var cli = JSON.parse(tbClients[i]);
	  	$("#tblList tbody").append("<tr>"+
			 "	<td><img style='cursor: pointer;' src='../res/icon/android/edit.png' heigt='16' width='16' onclick='editData("+i+")' class='btnEdit'/></td>" + 
			 "	<td>"+cli.ID+"</td>" + 
			 "	<td>"+cli.Name+"</td>" + 
			 "	<td>"+cli.Phone+"</td>" + 
			 "	<td>"+cli.Email+"</td>" + 
			 "	<td><img style='cursor: pointer;' src='../res/icon/android/delete.png' heigt='16' width='16' onclick='deleteData("+i+")' class='btnDelete'/></td>" +
	  		 "</tr>");
	}
 }
} 

function saveData(){
	if(operation == "A")
		return Add();
	else
		return Edit();		
}; 

function Add(){
	var client = JSON.stringify({
		ID    : $("#txtID").val(),
		Name  : $("#txtName").val(),
		Phone : $("#txtPhone").val(),
		Email : $("#txtEmail").val()
	});
	tbClients.push(client);
	localStorage.setItem("tbClients", JSON.stringify(tbClients));
	alert("Employee information saved successfully.");
	$("#frmCadastre").submit();
} 

function editData(idx){
	operation = "E";
	selected_index = idx;
	var cli = JSON.parse(tbClients[selected_index]);
	$("#txtID").val(cli.ID);
	$("#txtName").val(cli.Name);
	$("#txtPhone").val(cli.Phone);
	$("#txtEmail").val(cli.Email);
	$("#txtID").attr("readonly","readonly");
	$("#txtName").focus();
	$("#dispaly-all").hide();
	$("#data-entry").show();
} 

function Edit(){
	tbClients[selected_index] = JSON.stringify({
			ID    : $("#txtID").val(),
			Name  : $("#txtName").val(),
			Phone : $("#txtPhone").val(),
			Email : $("#txtEmail").val()
		});//Alter the selected item on the table
	localStorage.setItem("tbClients", JSON.stringify(tbClients));
	alert("Employee data modified successfully.");
	$("#frmCadastre").submit();
	operation = "A"; //Return to default value
	return true;
} 

function deleteData(idx){
	selected_index = idx;
	Delete();
	List();
} 

function Delete(){
	tbClients.splice(selected_index, 1);
	localStorage.setItem("tbClients", JSON.stringify(tbClients));
	alert("Employee record deleted successfully.");
	if(tbClients.length == 0){//If there is no data
		$("#dispaly-all").hide();
		$("#data-entry").show();
	}else{
		$("#data-entry").hide();
		$("#dispaly-all").show();
	}
	
} 