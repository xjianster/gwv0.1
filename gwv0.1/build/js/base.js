//图片预载入
function preloadpic(imgSrc){ 
    var imgObj = new Image();
    imgObj.src =imgSrc;
} 

//通过包外部的js文件来配置一级菜单，这里是全部的一级菜单项
var all_menu1 = [
	{"id":"m0","name":"productmanage","tag":"业务办理","offset_x":"-154px","offset_y":"0px","display":true},
	{"id":"m1","name":"accountquery","tag":"帐务查询","offset_x":"-154px","offset_y":"-95px","display":true},
	{"id":"m2","name":"pay","tag":"支付","offset_x":"-154px","offset_y":"-194px","display":true},
	{"id":"m3","name":"pointmanage","tag":"积分管理","offset_x":"-154px","offset_y":"-285px","display":false},
	{"id":"m4","name":"usermanage","tag":"用户办理","offset_x":"-154px","offset_y":"-372px","display":false}
];
//全部的二级菜单项
var all_menu2 = [
	{"id":"m00","name":"service","tag":"业务变更","href":"test2.vm","display":true},
	{"id":"m01","name":"stopresume","tag":"停/复机","href":"test.vm","display":true},
	{"id":"m10","name":"charge","tag":"账单查询","href":"accountQueryAction.do?method=toCharge","display":true},
	{"id":"m11","name":"detailmonth","tag":"当月详单查询","href":"accountQueryAction.do?method=toDetailThisMonth","display":true},
	{"id":"m12","name":"detail","tag":"详单查询","href":"accountQueryAction.do?method=toDetail","display":true},
	{"id":"m13","name":"account","tag":"账本查询","href":"accountQueryAction.do?method=toBook","display":true},
	{"id":"m20","name":"shopcart","tag":"购物车","href":"underconstruction.vm","display":true},
	{"id":"m21","name":"fund","tag":"充值","href":"rechargeMana.do?method=toRecharge","display":true},
	{"id":"m22","name":"payfee","tag":"缴费","href":"underconstruction.vm","display":false},
	{"id":"m23","name":"payhistory","tag":"支付历史","href":"rechargeMana.do?method=toHistory","display":true},
	{"id":"m40","name":"passwd","tag":"密码修改","href":"underconstruction.vm","display":true},
	{"id":"m41","name":"customerinfo","tag":"基本信息修改","href":"underconstruction.vm","display":true},
];
var column = [
{"index":"0","displayname":"操作类型","width":"20","type":"string","name":"operationType"},
{"index":"1","displayname":"操作值","width":"20","type":"string","name":"operationValue"},
{"index":"2","displayname":"当前帐户余额","width":"30","type":"string","name":"balance"},
{"index":"3","displayname":"帐户变动原因","width":"30","type":"string","name":"desc"},
{"index":"3","displayname":"帐户变动原因","width":"30","type":"string","name":"operationDate"}
];
var data = [
 {"balance":"￥0.00","operationDate":"2011-01-19","operationValue":"￥0.00","operationType":"充值","desc":"其他缴费！"}
];
var servicelist = [{"name":"服务1","link":""},{"name":"服务1","link":""},{"name":"服务1","link":""},{"name":"服务1","link":""},{"name":"服务1","link":""},{"name":"服务1","link":""},{"name":"服务1","link":""},{"name":"服务1","link":""},{"name":"服务1","link":""},
                  {"name":"服务1","link":""},{"name":"服务1","link":""},{"name":"服务1","link":""},{"name":"服务1","link":""},{"name":"服务1","link":""},{"name":"服务1","link":""},{"name":"服务1","link":""},{"name":"服务1","link":""}
];
/***************
 * 页面初始化代码
 ***************/
//通用部分,解决bar和menu部分的焦点问题
//menu2DownAction:二级菜单向下动作
function commonInit(menu2DownAction){
	renderBottom();
	renderMenu1();
	$('#menu1list').horizontalListContainer(
			function(){window.frames[0].$('#index').focus();},//这个upAction不要为空
			function(){
				$('#menu2list').horizontalListContainer(
						function(){
							$('#'+$('a:first','#menu2list').attr('id').substring(0,2)).focus();//选中对应的一级菜单
						},
						menu2DownAction
				);
				$('a:first','#menu2list').focus();
			}
	);
	//ui('m0').focus();
}
//账务查询通用部分
//在页面初始就显示二级菜单
function accountInit(menu2DownAction){
		renderMenu2('m1');
		$('#menu2list').horizontalListContainer(
				function(){
					$('#'+$('a:first','#menu2list').attr('id').substring(0,2)).focus();//选中对应的一级菜单
				},
				menu2DownAction
		);
}
//支付页面通用部分
function payInit(menu2DownAction){
	renderMenu2('m2');
	$('#menu2list').horizontalListContainer(
			function(){
				$('#'+$('a:first','#menu2list').attr('id').substring(0,2)).focus();//选中对应的一级菜单
			},
			menu2DownAction
	);
}

//显示一级菜单
function  renderMenu1(){
	if(typeof(configMenu) != undefined){
		//configMenu();
	}
	var str = "";
	for(var i in all_menu1){
		if(all_menu1[i].display){
			str+='<li><a id="'+ all_menu1[i].id+'" style="background-position:'+all_menu1[i].offset_x+' '+all_menu1[i].offset_y+'"></a></li>';
		}
	}
	$('#menu1list').html(str);
	$('a','#menu1list').each(function(){
		var button=$(this);
		var item=all_menu1[button.attr('id')[1]];//json配置
		button.bind("mouseover focus",function(){
			button.css("background-position","-10px "+item.offset_y);
			//var menu2item = $('a:first','#menu2list');
			//if(menu2item.length==0 || menu2item.attr('id')[1] != button.attr('id')[1]){
				renderMenu2(button.attr('id'));
			//}
		});
		button.bind("mouseout blur",function(){
			button.css("background-position",item.offset_x+" "+item.offset_y);
		});
	});
}


//显示二级菜单
function renderMenu2(id_menu1){
	if(!id_menu1){
		return;
	}
	var str="";
	for(var i in all_menu2){
		if(all_menu2[i].display && all_menu2[i].id.indexOf(id_menu1)!=-1){
			str+='<li><a id="'+all_menu2[i].id+'" href="'+all_menu2[i].href+'">'+all_menu2[i].tag+'</a></li>';
		}
	}
	$("#menu2list").html(str);
	$('a','#menu2list').each(function(){
		var button=$(this);
		button.bind("mouseover focus",function(){
			button.addClass('focus');
		});
		button.bind("mouseout blur",function(){
			button.removeClass('focus');
		});
	});
}


/**
*	bar各种事件
*/
function barKeyDown(event,t){
	var myEvent = (event) ? event : ((window.event) ? window.event : "") ;
	var srcObj = myEvent.srcElement ? myEvent.srcElement : myEvent.target;	
    var key = myEvent.keyCode?myEvent.keyCode:myEvent.which;
	if((key==Key.backKey)||(key==Key.returnKey)){
		gohome();
	}
	if(key==Key.downKey){
		window.parent.$('a:first','#menu1list').focus();
	}
	if(key==Key.enterKey){
		if(t==0){
			gohome();
		}else if(t=="dl"){
			var localportalurl=getlocalurl();
			if(localportalurl!="")window.parent.location.href=localportalurl+"download.html";
		}else if(t=="cm"){
			var localportalurl=getlocalurl();
			if(localportalurl!="")window.parent.location.href=localportalurl+"usb.html";
		}else if(t=="sc"){
			window.parent.location.href="search.jsp";
		}
	}
}

/**
*	bottom 按键提示
*/
var bottomlist=new Array("确定","&nbsp;","&nbsp;","返回","选择","主菜单");
function renderBottom(){
	var str='<ul>';
	for(var i=0;i<bottomlist.length;i++){
		str+='<li><img src="img/icon'+(i+1)+'.png"/><span id="botli'+i+'">'+bottomlist[i]+'</span></li>';
	}
	str+='</ul>';
	$("#bottom").html(str);
}
/**
*   获取列表
*/
var pgnum,t,col,pg=0;
var num=0;
function simpleTable(tableId,columnStr,dataStr){
	//解析json
	var column = jQuery.parseJSON(columnStr);
	var data = jQuery.parseJSON(dataStr);
	var str='';
	var width=$("#"+tableId).css("width").split("px")[0];var height=$("#"+tableId).css("height").split("px")[0];
    num=data.length;//列表数据条数
    t=Math.floor((height-90)/45);//每页列表的数据行数
    pgnum=Math.ceil(num/t);col=column.length;//列表页数和栏目数
    if(num>0){
    	for(var j=0;j<num;j++){
    		if(j%t==0){
    			if(j==0)str+='<table id="table0">';
    			else str+='<table id="table'+Math.ceil(j/t)+'" style="display:none;">';
    			for(var i in column)str+='<td width="'+Math.ceil(parseInt(column[i].width)*width/100)+'px">'+column[i].displayname+'</td>';
    		}
    		str+='<tr>';
    		for(var k=0;k<column.length;k++){
    			if(k==0){
    				if(column[k].type=="boolean"){
    					var name1=column[k].name;
    					if(eval("data[j]."+name1)=="true")str+='<td><a id="list'+j+'" href="javascript:void(0);LL=0&RL=0&DL=0&UL=0" onfocus="lif('+j+');" onblur="lib('+j+');" onkeydown="liv(event,'+j+');"><img id="pic'+j+'" src="img/dlcb1.png"></img></a></td>';
    					else str+='<td><a id="list'+j+'" href="javascript:void(0);LL=0&RL=0&DL=0&UL=0" onfocus="lif('+j+');" onblur="lib('+j+');" onkeydown="liv(event,'+j+');"><img id="pic'+j+'" src="img/dlcb0.png"></img></a></td>';
    				}
    				else{
    					var name2=column[k].name;
    					str+='<td><a id="list'+j+'" href="javascript:void(0);LL=0&RL=0&DL=0&UL=0" onfocus="lif('+j+');" onblur="lib('+j+');" onkeydown="liv(event,'+j+');">'+eval("data[j]."+name2)+'</td>';
    				}
    			}else{
    				if(column[k].type=="boolean"){
    					var name1=column[k].name;
    					if(eval("data[j]."+name1)=="true")str+='<td><img id="pic'+j+'" src="img/dlcb1.png"></img></td>';
    					else str+='<td><img id="pic'+j+'" src="img/dlcb0.png"></img></td>';
    				}
    				else{
    					var name2=column[k].name;
    					str+='<td id="list'+j+'_'+k+'">'+eval("data[j]."+name2)+'</td>';
    				} 
    			}
    		}
    		str+='</tr>';
    		if(j%t==(t-1))str+='</table>';
    	}
    	if(j%t!=0)str+='</table>';
    	str+='<div id="pgs" class="pageDiv" style="display:block;top:'+(t+1)*44+'px;">';
    	if(pgnum==1)str+='<div id="glrb" class="lr lb gl"></div><a id="pg" href="javascript:void(0);LL=0&RL=0&UL=0&DL=0" onfocus="pgf();" onblur="pgb();" onkeydown="pgv(event);">第1页</a><div id="glre" class="lr rb gr"></div>';
    	else if(pgnum>1)str+='<div id="glrb" class="lr lb gl"></div><a id="pg" href="javascript:void(0);LL=0&RL=0&UL=0&DL=0" onfocus="pgf();" onblur="pgb();" onkeydown="pgv(event);">第1页</a><div id="glre" class="lr re gr"></div>';
    	str+='<div id="pgi" class="innerpg">';
    	if(pgnum>1){
    		for(var m=1;m<pgnum;m++){
    			str+='<span>'+(m+1)+'</span>';
    		}
    		str+='</div></div>';
    	}
    	else str+='</div></div>';
    	str+='<div id="pgnum" class="pnum" style="top:'+(t+1)*44+'px;">共'+pgnum+'页</div></div></div>';time=0;pg=0;
    	$("#"+tableId).html(str);
	}
    else {
    	str+='<table id="table0">';
		for(var i in column)str+='<td width="'+Math.ceil(parseInt(column[i].width)*width/100)+'px">'+column[i].displayname+'</td>';
		str+='</table><table><td width="958px">当前没有数据记录</td></table>';
	    $("#"+tableId).html(str);
    }
}
/**
列表某行的聚焦函数
*/
function lif(m){
	$("#plbar").css("top",(7+(m%t+1)*46)+"px");
	$("#plbar").css("display","block");
	ui("list"+m).style.color="#fff";
	for(var i=0;i<col;i++){if(ui("list"+m+"_"+i)!=null)ui("list"+m+"_"+i).style.color="#fff";}
	if((ui("pic"+m)!=null)&&(ui("pic"+m).style.src=="img/dlcb1.png"))ui("pic"+m).style.src="img/dlcb2.png";
	}
/**
列表某行的离焦函数
*/
function lib(m){
	ui("list"+m).style.color="#39f";
	$("#plbar").css("display","none");
	for(var i=1;i<col;i++){if(ui("list"+m+"_"+i)!=null)ui("list"+m+"_"+i).style.color="#39f";}
	if((ui("pic"+m)!=null)&&(ui("pic"+m).style.src=="img/dlcb2.png"))ui("pic"+m).style.src="img/dlcb1.png";
	}
/**
列表某行的动作函数
*/
function liv(event,n){
	var myEvent = (event) ? event : ((window.event) ? window.event : "") ;
	var srcObj = myEvent.srcElement ? myEvent.srcElement : myEvent.target;	
    var key = myEvent.keyCode?myEvent.keyCode:myEvent.which;
  	if(key==Key.upKey){
  	  if(n%t==0){$("#plbar").css("display","none");$('a:first','#menu2list').focus();}
  	  else ui("list"+(n-1)).focus();
  	}
  	if(key==Key.downKey){
  	  if((n==(num-1))||(n%t==(t-1))){$("#plbar").css("display","none");ui("pg").focus();}
  	  else ui("list"+(n+1)).focus();
  	}
  	if(key==Key.enterKey){
  		
  	}
  }
/**
列表页码项的聚焦函数
*/
function pgf(){
	ui("pg").style.color="#fff";
	ui("pg").style.background="url(./img/lid_menu2.png)";
}
/**
列表页码项的离焦函数
*/
function pgb(){
	ui("pg").style.color="#39f";
	ui("pg").style.background="";
}
/**
列表页码项的动作函数
*/
function pgv(){
	var myEvent = (event) ? event : ((window.event) ? window.event : "") ;
	var srcObj = myEvent.srcElement ? myEvent.srcElement : myEvent.target;	
    var key = myEvent.keyCode?myEvent.keyCode:myEvent.which;
    if(key==Key.leftKey){
    	if(pgnum>1){
        if(pg>0){
        if(pg==1){ui("pgi").style.pixelLeft+=40;ui("glrb").className="lr lb gl";}
        else{ui("pgi").style.pixelLeft+=40;if(pg==pgnum-1)ui("glre").className="lr re gr";}
        ui("pg").innerHTML='第'+pg+'页';var str='';
        ui("table"+pg).style.display="none";ui("table"+(pg-1)).style.display="block";
        if(pg>1)for(var i=0;i<(pg-1);i++)str+='<span>'+(i+1)+'</span>';
        str+='<span style="width:190px;"></span>';
        for(var i=pg;i<pgnum;i++)str+='<span>'+(i+1)+'</span>';
        pg--;
        ui("pgi").innerHTML=str;
        }
      }
    }
    if(key==Key.rightKey){
    	if(pgnum>1){
            if(pg<(pgnum-1)){
            if(pg==0){if(time==0){ui("pgi").style.pixelLeft+=3;time=1;}else ui("pgi").style.pixelLeft-=40;ui("glrb").className="lr le gl";}
            else{ui("pgi").style.pixelLeft-=40;if(pg==pgnum-2)ui("glre").className="lr rb gr";}
            ui("pg").innerHTML='第'+(pg+2)+'页';var str='';
            ui("table"+pg).style.display="none";ui("table"+(pg+1)).style.display="block";
            for(var i=0;i<(pg+1);i++)str+='<span>'+(i+1)+'</span>';
            str+='<span style="width:190px;"></span>';
            if(pg<(pgnum-2))for(var i=pg+2;i<pgnum;i++)str+='<span>'+(i+1)+'</span>';
            pg++;
            ui("pgi").innerHTML=str;
            }
          }
    }
    if(key==Key.upKey){
    	if((pgnum==1)||pg==(pgnum-1))ui("list"+(num-1)).focus();
    	else ui("list"+((pg+1)*t-1)).focus();
    }
    if(key==Key.downKey){
    	ui("pay").focus();
    }
}
var totalnum,clid;
function conlist(servicelist){
	var list="";
	totalnum=servicelist.length;
	ui("clist").style.width=(Math.ceil(totalnum/6)+1)*250+"px";
	for(var i=0;i<totalnum;i++){
		if(i%6==0)list+='<table style="border:0px;cellpadding:0px;cellspacing:0px;">';
		list+='<tr style="border:0px;">';
		
        list+='<td style="border:0px;width:20px;"><strong>'+(i+1)+'</strong></td>'+
              '<td style="border:0px;width:130px;"><a id="cl'+i+'" href="javascript:'+servicelist[i].link+';UL=0&DL=0&LL=0&RL=0" onfocus="clf('+i+');" onblur="clb();"  onkeydown="clv(event);"><span>'+servicelist[i].name+'</span></a></td>';
        list+='</tr>';
		if(i%6==5)list+='</table>';
	}
	if(i%6!=0)list+='</table>';
	ui("clist").innerHTML=list;
}
function clv(event){
	var myEvent = (event) ? event : ((window.event) ? window.event : "") ;
	var srcObj = myEvent.srcElement ? myEvent.srcElement : myEvent.target;	
    var key = myEvent.keyCode?myEvent.keyCode:myEvent.which;
	if((key==Key.backKey)||(key==Key.returnKey)){
		gotobackurl();
	}
	if(key==Key.upKey){
		if(clid%6==0){alert(1);$('#m01').focus();}
		else ui("cl"+(clid-1)).focus();
	}
	if(key==Key.downKey){
		if(ui("cl"+(clid+1)))ui("cl"+(clid+1)).focus();
	}
	if(key==Key.leftKey){
		if(ui("cl"+(clid-6)))ui("cl"+(clid-6)).focus();
	}
	if(key==Key.rightKey){
		if(clid+6>=totalnum-1){
			var le=totalnum%6>0?totalnum%6:6;
			if(clid<totalnum-le)ui("cl"+(totalnum-1)).focus();
		}else{
			if(ui("cl"+(clid+6)))ui("cl"+(clid+6)).focus();
		}
	}
}
function clf(n){
	ui("tbar").style.opacity=1;clid=n;
	ui("tbar").style.top=(n%6*40+48)+"px";
	ui("clist").style.left=-(Math.floor(n/6)*250)+"px";
}
function clb(){
	ui("tbar").style.opacity=0;
}
/**
缴费按钮项的聚焦函数
*/
function pyf(){
	ui("pay").style.color="#fff";
	ui("pay").style.background="url(./img/lid_menu2.png)";
}
/**
缴费按钮的离焦函数
*/
function pyb(){
	ui("pay").style.color="#39f";
	ui("pay").style.background="";
}
function pyv(event){
	var myEvent = (event) ? event : ((window.event) ? window.event : "") ;
	var srcObj = myEvent.srcElement ? myEvent.srcElement : myEvent.target;	
    var key = myEvent.keyCode?myEvent.keyCode:myEvent.which;
}

/**
	按钮事件绑定
*/
function bindButton(id,clickAction){
	var button = $('#'+ id);
	if(button){
		button.bind("mouseover focus",function(){
			button.addClass('focus');
		});
		button.bind("mouseout blur",function(){
			button.removeClass('focus');
		});
		button.bind("click",function(){
			clickAction();
		});
	}
}
	
/**
	radio按钮
*/
function radioCSS(name,parentId){
	var radios = $('input[name='+name+']','#'+parentId);
	radios.each(function(){this.checked=false;});
	radios.next().addClass("unchecked");
	//select first
	radios.first().attr('checked',true);
	radios.first().next().removeClass("unchecked");
	radios.first().next().addClass("checked");
	
	radios.each(function(){
	   var radio=this;
	   var label=$(this).next();
	   var link=$(this).parent();
	   link.bind("click",function(){
		 if(radio.checked == false){
		   radios.each(function(){
			   if(this.checked == true){
				   this.checked = false;
				   $(this).next().removeClass("checked");
				   $(this).next().addClass("unchecked");
			   }
		   });
		   radio.checked = true;
		   label.removeClass("unchecked");
		   label.addClass("checked");
		 }
	   });
	 });
}
	
//禁用所有的可聚焦项,即删除所有anchor的href属性，这些属性保存在返回的字符串数组中，这样以后可以restore
(function($){

 	$.fn.extend({
 		disableAnchor:function(){
 			var anchors = $('a',this);
 			if(anchors.length==0){
 				return;
 			}
 			var hrefs = new Array();
 			anchors.each(function(index){
 				hrefs[index]=$(this).attr('href');
 				$(this).removeAttr('href');
 			});
 			return hrefs;
 		},
 		
 		restoreAnchor:function(hrefs){
 			var anchors = $('a',this);
 			if(anchors.length==0){
 				return;
 			}
 			anchors.each(function(index){
 				$(this).attr('href',hrefs[index]);
 			});
 		}
	});
	
})(jQuery);
	
/**
*	date相关
*/
function getDate(){
	var now=new Date();
	return now.getFullYear()+addzero(now.getMonth())+addzero(now.getDay());
}
function addzero(num){
	return num<10?"0"+num:num;
}
var timeTimer;
function gettime(){
	var date = new Date();
	$("#time").html(addzero(date.getHours())+":"+addzero(date.getMinutes()));
	timeTimer = setTimeout(gettime,30000);
}
function isMoney( s ){   
	var pattern = new RegExp("^(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*))$");//正浮点数
	return pattern.test(s);
}

/**
 * 水平list容器的实现
 * 一个水平list容器的子元素中包含一组可聚焦的链接，点击左右方向键可以依次选中这些链接，点击上下方向键的动作由参数决定
 * 函数原型：
 * horizontalListContainer(upAction,downAction);
 * 如果原来的a元素有href属性，这些href属性会被重写，原值会被加到对enterKey的响应里面。
 * 如果upAction为null，则这些链接的href属性中不包含UL=0，即点击上方向键时使用浏览器默认的焦点移动。downAction同理。
 * 如果upAction为字符串而不是function，将被理解为DOM元素的ID
 */
 (function($){

	 	$.fn.extend({
	 		horizontalListContainer: function(upAction,downAction) {
	 			var buttonArray = $('a',this);
	 			buttonArray.each(function(index){
	 					var button = $(this);//DOM对象
	 					var link = button.attr('href');//链接
	 					var href = "javascript:void(0);RL=0&LL=0";//覆盖原来的href属性
	 					if(upAction){
	 						href = href+'&UL=0';
	 					}
	 					if(downAction){
	 						href = href+'&DL=0';
	 					}
	 					button.attr('href',href);
	 					button.bind("keydown",function(){
	 						var myEvent = (event) ? event : ((window.event) ? window.event : "") ;
	 						var srcObj = myEvent.srcElement ? myEvent.srcElement : myEvent.target;	
	 						var key = myEvent.keyCode?myEvent.keyCode:myEvent.which;
	 						if((key==Key.backKey)||(key==Key.returnKey)){
	 						   goback();
	 						}
	 						if(key==Key.enterKey){
	 							if(link && link.length>0){
	 								window.location.href =link;
	 							}
	 						}
	 						if(key==Key.upKey && upAction){
	 							button.blur();
	 							if(typeof(upAction)=='function'){
	 								upAction();
	 							}
	 							if(typeof(upAction)=='string'){
	 								$('#'+upAction).focus();
	 							}
	 						}
	 						if(key==Key.downKey && downAction){
	 							button.blur();
	 							if(typeof(downAction)=='function'){
	 								downAction();
	 							}
	 							if(typeof(downAction)=='string'){
	 								$('#'+downAction).focus();
	 							}
	 						}
	 						if(key==Key.leftKey){
	 							button.blur();
	 							if(buttonArray[index-1]){
	 								$(buttonArray[index-1]).focus();
	 							}else{
	 								$(buttonArray[buttonArray.length-1]).focus();
	 							}
	 							
	 						}
	 						if(key==Key.rightKey){
	 							button.blur();
	 							if(buttonArray[index+1]){
	 								$(buttonArray[index+1]).focus();
	 							}else{
	 								$(buttonArray[0]).focus();
	 							}
	 						}
	 					});
	 			})
			}
			
		});
		
	})(jQuery);
 
//dimScreen()
//by Brandon Goldman
jQuery.extend({
   //dims the screen
   dimScreen: function(speed, opacity, callback) {
       if(jQuery('#__dimScreen').size() > 0) return;
       
       if(typeof speed == 'function') {
           callback = speed;
           speed = null;
       }

       if(typeof opacity == 'function') {
           callback = opacity;
           opacity = null;
       }

       if(speed < 1) {
           var placeholder = opacity;
           opacity = speed;
           speed = placeholder;
       }
       
       if(opacity >= 1) {
           var placeholder = speed;
           speed = opacity;
           opacity = placeholder;
       }

       speed = (speed > 0) ? speed : 500;
       opacity = (opacity > 0) ? opacity : 0.5;
       return jQuery('<div></div>').attr({
               id: '__dimScreen'
               ,fade_opacity: opacity
               ,speed: speed
           }).css({
           background: '#000'
           ,height: '100%'
           ,left: '0px'
           ,opacity: 0
           ,position: 'absolute'
           ,top: '0px'
           ,width: '100%'
           ,zIndex: 999
       }).appendTo(document.body).fadeTo(speed, opacity, callback);
   },
   
   //stops current dimming of the screen
   dimScreenStop: function(callback) {
       var x = jQuery('#__dimScreen');
       var opacity = x.attr('fade_opacity');
       var speed = x.attr('speed');
       x.fadeOut(speed, function() {
           x.remove();
           if(typeof callback == 'function') callback();
       });
   }
});