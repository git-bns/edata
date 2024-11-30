function authenticate(){
	var pwd = $("#user-password").val();
	if(pwd == 12345){
		window.location.href = "data/emc.html";
	}else{
		alert("Invalid Credentials!");
		$("#user-password").val('');
	}
}