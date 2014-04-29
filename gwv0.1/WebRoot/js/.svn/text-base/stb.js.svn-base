/*
	机顶盒相关的js  按键定义以及自定义JS接口
*/
function ui(elId){return document.getElementById(elId);} 
var Key = {
	downKey:19,
	rightKey:18,
	leftKey:16,
	upKey:17,
	enterKey:13,
	prepageKey:302,
	nextpageKey:301,
	delKey:28,
	playKey:30,
	addKey:31,
	backKey:10,
	returnKey:304,
};

function getlocalurl(){
	var localportalurl=callApp("Get_Download_List_Url");
	if(localportalurl=="fileinfoerror"){
		callApp("JS_ShowInfo","本地页面连接错误");
		return "";
	}
	return localportalurl;
}

function goback(){
	callApp("JS_GoBackward");
}

function gohome(){
	callApp("JS_GoHome");
}




