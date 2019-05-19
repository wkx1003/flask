

//检查提交的账号密码是否为空
function loginCheck(){
	var flag = true;
	var admin = document.getElementById("username").value;
	var password = document.getElementById("passwd").value;
	if ("" == admin){
		alert("请输入账号！");
		flag = false;
		return false;
	}
	else if ("" == password){
		alert("请输入密码！");
		flag = false;
		return false;
	}
	if(flag == true){
		//form.submit();
		return true;
	}
}

//检查输入的邮箱格式是否正确
function isEmail(){
	var str = document.getElementById("username").value;
	var myReg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;
	var login_btn = document.getElementById("geeTestButton");
	var userInput = document.getElementById("username")
	if(myReg.test(str)){
		document.getElementById("emailError").innerHTML = ""
		document.getElementById("emailError").setAttribute('style',"display:none")
		
		login_btn.removeAttribute('style',"cursor");
		userInput.removeAttribute('style',"border-color");
		//删除disbaled属性
		login_btn.removeAttribute("disabled");
		return true;
	}	
	else {
		document.getElementById("emailError").innerHTML = "邮箱格式错误"
		document.getElementById("emailError").setAttribute('style',"display:block")
		
		//修改输入框颜色
		userInput.setAttribute('style',"border-color: #ff0000;")
		//设置input按钮为不可点击状态
		login_btn.setAttribute("style", "cursor:not-allowed;");
		login_btn.setAttribute("disabled", "true");
		return false
	}
}

//检查输入的密码长度
function passFormat(){
	var login_btn = document.getElementById("geeTestButton");
	var str = document.getElementById("passwd").value;
	var userStr = document.getElementById("username").value;
	var userInput = document.getElementById("username")
	var passInput = document.getElementById("passwd")
	//判断邮箱用户名是否为空
	if(userStr.length < 1){
		document.getElementById("emailError").innerHTML = "请输入用户名(邮箱)"
		document.getElementById("emailError").setAttribute('style',"display:block")
		 
		userInput.setAttribute('style',"display: block")
		userInput.setAttribute('style',"border-color: #ff0000;")
	}
	//检查密码长度
	if(str.length < 8){
		document.getElementById("passFormatError").innerHTML = "输入的密码必须大于8位数"
		login_btn.setAttribute("style", "cursor:not-allowed;");
		login_btn.setAttribute("disabled", "true");
		
		document.getElementById("passFormatError").setAttribute('style',"display: block")
		document.getElementById("passFormatError").setAttribute('style',"border-color: #ff0000;")
	}
	else if(str.length > 16){
		document.getElementById("passFormatError").innerHTML = "输入的密码必须小于16位数"
		login_btn.setAttribute("style", "cursor:not-allowed;");
		login_btn.setAttribute("disabled", "true");
		
		document.getElementById("passFormatError").setAttribute('style',"display: block")
		document.getElementById("passFormatError").setAttribute('style',"border-color: #ff0000;")
	}
	else{
		document.getElementById("passFormatError").innerHTML = ""
		document.getElementById("passFormatError").setAttribute('style',"display: none")
		document.getElementById("emailError").setAttribute('style',"display: none")
		
		login_btn.removeAttribute('style',"cursor");
		//删除disbaled属性
		login_btn.removeAttribute("disabled");
		//删除输入框颜色
		passInput.removeAttribute('style',"border-color");
	}
}