$().ready(function() {
	validateRule();
	 document.onkeypress = banBackSpace;
	 document.onkeydown = banBackSpace;
});

function banBackSpace(e){
	 var ev = e || window.event;
	 //各种浏览器下获取事件对象
	 var obj = ev.relatedTarget || ev.srcElement || ev.target ||ev.currentTarget;
	 //按下Backspace键
	 if(ev.keyCode == 8){
	 var tagName = obj.nodeName //标签名称
	 //如果标签不是input或者textarea则阻止Backspace
	 if(tagName!='INPUT' && tagName!='TEXTAREA'){
	   return stopIt(ev);
	    }
	var tagType = obj.type.toUpperCase();//标签类型
	//input标签除了下面几种类型，全部阻止Backspace
	if(tagName=='INPUT' && (tagType!='TEXT' && tagType!='TEXTAREA' && tagType!='PASSWORD')){
	   return stopIt(ev);
	  }
	//input或者textarea输入框如果不可编辑则阻止Backspace
	if((tagName=='INPUT' || tagName=='TEXTAREA') && (obj.readOnly==true || obj.disabled ==true)){
	   return stopIt(ev);
	   }
	   }
	 }
	 function stopIt(ev){
	  if(ev.preventDefault ){
	     //preventDefault()方法阻止元素发生默认的行为
	    ev.preventDefault();
	  }
	  if(ev.returnValue){
	     //IE浏览器下用window.event.returnValue = false;实现阻止元素发生默认的行为
	    ev.returnValue = false;
	   }
	  return false;
	}

$.validator.setDefaults({
	submitHandler : function() {
		update();
	}
});
function update() {
	$.ajax({
		cache : true,
		type : "POST",
		url : contpath + "lubr/caLubrOil/update",
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("操作成功");
				parent.reLoad();
				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
				parent.layer.close(index);

			} else {
				parent.layer.alert(data.msg)
			}

		}
	});

}
function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		rules : {			
			oilSpec : {
				maxlength:32,
			},
			refReference : {
				maxlength:120,
			},
			oilFactory : {
				maxlength:120,
			},
			density15 : {
				maxlength:120,
			},
			mViscosity40 : {
				maxlength:120,
			},
			bViscosity40 : {
				maxlength:120,
			},
			viscosityIndex : {
				maxlength:120,
			},
			color : {
				maxlength:120,
			},
			flashPoint : {
				maxlength:120,
			},
			lightPoint : {
				maxlength:120,
			},
			pourPoint : {
				maxlength:120,
			},
			dropPoint : {
				maxlength:120,
			},
			needlePenetration : {
				maxlength:120,
			},
			remark : {
				maxlength:120,
			}
		},
		messages : {			
			oilSpec : {
				maxlength:icon +"油脂型号最长80个字符！",
			},
			refReference : {
				maxlength:icon +"加油参考最长120个字符！",
			},
			oilFactory : {
				maxlength:icon +"生产厂商最长100个字符！",
			},
			density15 : {
				maxlength:icon +"密度15℃最长20个字符！",
			},
			mViscosity40 : {
				maxlength:icon +"运动粘度40℃最长20个字符！",
			},
			bViscosity40 : {
				maxlength:icon +"基础油粘度40℃最长20个字符！",
			},
			viscosityIndex : {
				maxlength:icon +"粘度指数最长20个字符！",
			},
			color : {
				maxlength:icon +"颜色最长20个字符！",
			},
			flashPoint : {
				maxlength:icon +"闪点最长20个字符！",
			},
			lightPoint : {
				maxlength:icon +"燃点最长20个字符！",
			},
			pourPoint : {
				maxlength:icon +"倾点最长20个字符！",
			},
			dropPoint : {
				maxlength:icon +"滴点最长20个字符！",
			},
			needlePenetration : {
				maxlength:icon +"针入度25℃最长20个字符！",
			},
			remark : {
				maxlength:icon +"备注最长400个字符！",
			}
		}
	})
}