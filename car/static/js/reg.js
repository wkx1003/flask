
//检查提交的账号密码是否为空
function regCheck(){
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

//检查当前表单的值
function getAllData(){
	var formDiv = document.getElementById('formData');//找到div
	var inputs = formDiv.getElementsByTagName('input');//找到这个div里面所有的input
	var selects = formDiv.getElementsByTagName('select')
	var str = ''
	for(var i=0,j=selects.length; i<j; i++){
		//selectedIndex代表的是你所选中项的index
		var index = selects[i].selectedIndex;
		str += selects[i].name +':' + selects[i].options[index].text +'\n';
	}
	for(var i=0,j=inputs.length; i<j; i++){
	  str += inputs[i].name + ':'+inputs[i].value + '\n';
	}
	alert(str);
}

//当表单不存在空值的时候允许提交
function onSubmit(){
	var nullInputArr = new Array()
	var nullInputLen = 0
	var errorNum = 0
	var formDiv = document.getElementById('formData');//找到div
	var btnErrText = document.getElementById('btnError')
	var reg_btn = document.getElementById("geeTestButton");
	var inputs = formDiv.getElementsByTagName('input');//找到这个div里面所有的input
	var ps = formDiv.getElementsByTagName('p');//找到这个div里面所有的input
	var inputBool = true
	var errInfoBool = true
	//条件1：只要有一个输入框为空，则为False
	//条件2：且需要全部错误信息(class='el-form-item__error')的display都为none的状态
	
	//定位表单内所有input标签
	for(var i=0;i < inputs.length; i++){
	  if(inputs[i].value == ""){
		  inputBool = false
		  nullInputLen = nullInputArr.push(inputs[i])
	  }
	}
	//定位表单内所有class为el-form-item__error的P标签
	for(var i=0;i < ps.length; i++){
		if(ps[i].className == "el-form-item__error"){
			if(ps[i].style.display == 'block'){
				errorNum += 1
				errInfoBool = false
			}
		}
	}
	if(inputBool == true && errInfoBool == true){
		btnErrText.innerHTML = ''
		//删除disbaled属性
		reg_btn.removeAttribute("disabled");
		//隐藏提示信息
		reg_btn.removeAttribute('style',"cursor");
		btnErrText.setAttribute('style','display:none')
	}
	else{
		reg_btn.setAttribute('disabled',"true")
		reg_btn.setAttribute('style','cursor: not-allowed;background: #b5afaf70')
		btnErrText.setAttribute('style','display:block')
		//输出未输入的信息数量
		btnErrText.innerHTML = '还有 ' + nullInputLen + ' 项未填写 '+errorNum+' 项错误，请检查'
	}
}

//检查输入的邮箱格式是否正确
function isEmail(){
	onSubmit()
	var str = document.getElementById("username").value;
	var myReg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;
	var userInput = document.getElementById("username")
	var emailErrText = document.getElementById("emailError")
	//输入格式正确
	if(myReg.test(str)){
		onSubmit()
		emailErrText.innerHTML = ""
		userInput.removeAttribute('style',"border-color");
		emailErrText.setAttribute('style','display:none')
		return true;
	}
	//输入格式错误
	else {
		emailErrText.innerHTML = "邮箱格式错误"
		//修改输入框颜色
		userInput.setAttribute('style',"border-color: #ff0000;")
		emailErrText.setAttribute('style','display:block')
		//设置input按钮为不可点击状态
		onSubmit()
		return false
	}
}

//检查输入的密码长度
function passFormat(){
	onSubmit()
	var str = document.getElementById("passwd").value;
	var str2 = document.getElementById("passwd2").value;
	var emailErrText = document.getElementById("emailError")
	var passErrText = document.getElementById("passFormatError")
	var userStr = document.getElementById("username").value;
	var userInput = document.getElementById("username")
	var passInput = document.getElementById("passwd")

	//判断邮箱用户名是否为空
	if(userStr.length < 1){
		onSubmit()
		emailErrText.innerHTML = "请输入用户名(邮箱)"
		emailErrText.setAttribute('style','display:block')
		userInput.setAttribute('style',"border-color: #ff0000;")
		
	}
	//检查密码长度
	if(str.length < 8){
		onSubmit()
		passErrText.setAttribute("style",'display:block')
		passErrText.innerHTML = "输入的密码必须大于8位数"
		passInput.setAttribute('style',"border-color: #ff0000;")
		
	}
	else if(str.length > 16){
		onSubmit()
		passErrText.setAttribute("style",'display:block')
		passErrText.innerHTML = "输入的密码必须小于16位数"
		passInput.setAttribute('style',"border-color: #ff0000;")
		
	}
	else if(str != str2){
		onSubmit()
		passErrText.setAttribute("style",'display:block')
		passErrText.innerHTML = "两次输入的密码不一致，请重新输入"
		passInput.setAttribute('style',"border-color: #ff0000;")
		
	}
	else{
		onSubmit()
		passErrText.innerHTML = ""
		document.getElementById("passFormatError2").innerHTML = ""
		passErrText.setAttribute("style",'display:none')
		document.getElementById("passFormatError2").setAttribute("style",'display:none')
		//删除输入框颜色
		passInput.removeAttribute('style',"border-color");
		document.getElementById("passwd2").removeAttribute('style',"border-color");
	}
}
//检查两次密码是否相同
function passFormat2(){
	onSubmit()
	var str1 = document.getElementById("passwd").value;
	var str2 = document.getElementById("passwd2").value;
	var userStr = document.getElementById("username").value;
	var passErrText = document.getElementById("passFormatError2")
	var passInput = document.getElementById("passwd2")
	//判断邮箱用户名是否为空
	if(userStr.length < 1){
		onSubmit()
		document.getElementById("emailError").innerHTML = "请输入用户名(邮箱)"
		document.getElementById("emailError").setAttribute('style','display:block')
		document.getElementById("username").setAttribute('style',"border-color: #ff0000;")
	}
	if(str1.length <1){
		onSubmit()
		document.getElementById("passFormatError").innerHTML = "请输入密码"
		document.getElementById("passFormatError").setAttribute('style','display:block')
		document.getElementById("passwd").setAttribute('style',"border-color: #ff0000;")
	}
	//检查密码长度
	if(str2.length < 8){
		onSubmit()
		passErrText.setAttribute("style",'display:block')
		passErrText.innerHTML = "输入的密码必须大于8位数"
		passInput.setAttribute('style',"border-color: #ff0000;")
	}
	else if(str2.length > 16){
		onSubmit()
		passErrText.setAttribute("style",'display:block')
		passErrText.innerHTML = "输入的密码必须小于16位数"
		passInput.setAttribute('style',"border-color: #ff0000;")
	}
	else if(str1 != str2){
		onSubmit()
		passErrText.setAttribute("style",'display:block')
		passErrText.innerHTML = "两次输入的密码不一致，请重新输入"
		passInput.setAttribute('style',"border-color: #ff0000;")
	}
	else{
		onSubmit()
		passErrText.innerHTML = ""
		document.getElementById("passFormatError").innerHTML = ""
		passErrText.setAttribute("style",'display:none')
		document.getElementById("passFormatError").setAttribute("style",'display:none')
		//删除输入框颜色
		passInput.removeAttribute('style',"border-color");
		document.getElementById("passwd").removeAttribute('style',"border-color");
	}
}

//生成民族下拉框
var nations = ["汉族","蒙古族","回族","藏族","维吾尔族","苗族","彝族","壮族","布依族","朝鲜族","满族","侗族","瑶族","白族","土家族",  
               "哈尼族","哈萨克族","傣族","黎族","傈僳族","佤族","畲族","高山族","拉祜族","水族","东乡族","纳西族","景颇族","柯尔克孜族",  
               "土族","达斡尔族","仫佬族","羌族","布朗族","撒拉族","毛南族","仡佬族","锡伯族","阿昌族","普米族","塔吉克族","怒族", "乌孜别克族",  
              "俄罗斯族","鄂温克族","德昂族","保安族","裕固族","京族","塔塔尔族","独龙族","鄂伦春族","赫哲族","门巴族","珞巴族","基诺族"];  
function initNations(){  
    var staff_nation = document.getElementById("staff_nation");  
    for ( var i in nations) {  
        staff_nation.add(new Option(nations[i], i));  
    }
}

//检查手机号
function checkPhone(){
	onSubmit()
	phone = document.getElementById("phone")
	phoneErrText = document.getElementById("phoneFormatError")
	val = phone.value
	if(val.length < 11){
		onSubmit()
		phoneErrText.setAttribute("style",'display:block')
		phoneErrText.innerHTML = "请输入11位数的手机号码"
	}
	else{
		onSubmit()
		phoneErrText.setAttribute("style",'display:none')
		phoneErrText.innerHTML = ""
	}
}
//检查身份照号
function checkCard(){
	onSubmit()
	card = document.getElementById("cardNum")
	cardErrText = document.getElementById("cardFormatError")
	val = card.value
	if(val.length < 18){
		onSubmit()
		cardErrText.setAttribute("style",'display:block')
		cardErrText.innerHTML = "请输入18位数的身份证号码"
	}
	else{
		onSubmit()
		cardErrText.setAttribute("style",'display:none')
		cardErrText.innerHTML = ""
	}
}

//判断是否为正式党员
function isZsdy(selectNum){
	var zsdyTime = document.getElementById("zsInDate");
	var zsdyP = document.getElementById("zsrdP");
	if(selectNum == 1){
		zsdyTime.setAttribute("type", "hidden");
		zsdyP.setAttribute("style","display:none");
		document.getElementById("isZsdy0").value = '2'
		document.getElementById("isZsdy1").value = '1';
		document.getElementById("zsInDate").value = 'None'
	}
	else {
		zsdyTime.setAttribute("type", "date");
		zsdyP.setAttribute("style","display:inline-block");
		document.getElementById("isZsdy1").value = '2';
		document.getElementById("isZsdy0").value = '0';
	}
}


