
import wx from 'weixin-js-sdk'
import {wxconfig,WXSaveHeadpic,saveTaskPic} from '@/service/getData'
export const weixinInfo = (arr) => {
	let url = window.location.href;
	//alert(url);
	wxconfig(url).then(res =>{
	 //console.log(res)
	 if(res.code == '000'){
	 	//console.log(res)
	   // 微信配置
	   wx.config({
	     debug: false,
	     appId: res.appId,
	     timestamp: res.timestamp,
	     nonceStr: res.nonceStr,
	     signature: res.signature,
	     jsApiList: arr
	   })
	 }
	})
}

/*获取地理位置*/
export const getLocation = ()=>{
	weixinInfo(['getLocation']);
	// wx.getLocation({
	// 		type: 'wgs84',
	// 		complete:function(argv){
	// 			if(argv.errMsg=="getLocation:fail"){
	// 				alert(JSON.stringify(res));
	// 				var gc = new BMap.Geocoder();
	// 				var pointAdd = new BMap.Point(res.longitude, res.latitude);
	// 				gc.getLocation(pointAdd, function(rs){
	// 					var city = rs.addressComponents.city;
	// 					alert(city);
	// 					}
	// 				);
	// 			}else{
	// 				alert("ok");
	// 			}
	// 		},
	// 		cancel: function (res) {
	// 			alert('用户拒绝授权获取地理位置');
	// 		}
	// 	})
		wx.ready(function(){
			wx.getLocation({
		    success: function (res) {
		        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
		        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
		        var speed = res.speed; // 速度，以米/每秒计
		        var accuracy = res.accuracy; // 位置精度
		        // wx.openLocation({
          //           latitude: res.latitude, // 纬度，浮点数，范围为90 ~ -90
          //           longitude: res.longitude, // 经度，浮点数，范围为180 ~ -180。
          //           name: '当前位置', // 位置名
          //           address: '点击查看', // 地址详情说明
          //           scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
          //           infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
          //       });
		    },
		    cancel: function (res) {
		        alert('用户拒绝授权获取地理位置');
		    }
		});
	})
	
}
export const openLocation = (location) =>{
	weixinInfo(["openLocation"]);
	wx.openLocation({
	    latitude: location.latitude, // 纬度，浮点数，范围为90 ~ -90
	    longitude: location.longitude, // 经度，浮点数，范围为180 ~ -180。
	    name: '', // 位置名
	    address: '', // 地址详情说明
	    scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
	    infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
	});
}




/*微信获取摄像头*/
export const chooseImage = (type,callback) => {	
  weixinInfo(["chooseImage","uploadImage"]);
  //wx.ready(() => {
    wx.chooseImage({
      count: 1, // 选择图片数量
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
      	//alert(123)
      	//console.log(12)
      	//alert("chooseImage ："+res);
        var localIds = res.localIds.pop(); 
        uploadImage(type,localIds,function (result) {
          callback(result)
          //console.log(123)
        });
      }
    });
 // })
}

export const uploadImage = (type,localIds,callback) => {
  wx.uploadImage({
    localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
    isShowProgressTips: 1, // 默认为1，显示进度提示
    success: function (res) {
      //alert('uploadImage:'+JSON.stringify(res))
      var serverId = res.serverId; // 返回图片的服务器端ID
      if(type=="1"){//上传头像
		WXSaveHeadpic(serverId).then(res =>{
	        //alert(JSON.stringify(res));
	        callback(res)
      	})
      }
      if(type=="2"){//提交任务上传图片
		saveTaskPic(serverId).then(res =>{
	        //alert(JSON.stringify(res));
	        callback(res)
      	})
      }
      
    }
  });
}

/*获取本地图片接口*/
export const getLocalImgData = (localId,callback) => {
  wx.getLocalImgData({
    localId: localId, // 图片的localID
    success: function (res) {
      var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
      callback(localData)
    }
  });
}

//加密
export const Encrypt = (val) =>{
   var public_key = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCUd7d/8WitO+fjE3+mQoobe9AeAHRPNTH8pSdAde5wTEXstyz0ZYZNN5fJGv+h2RZ0Au4US6sHMyVd0gN7YUo+7k2c4xD4AXJOoPLMjsvpR8IamFDvYFLQaoqYIfzzlCaj4s0MVQFD6X+BsY6ew1927LVkQ/RlkPj0vxxWj7/cZwIDAQAB";
   
 
// 测试 开发环境公钥
//MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCsWr6hFkOtLuSaLAmnO5p7rde8Swuk3j6p/2rh48iU8MjgJNyMy5L1qHM7GDn+R7qpXsHmJ1ZcNozluOhuCxXcjasNJDVQpDLylmPps8kw+4mV916vl3YB3E3DnkbuCxCujiluOOng345TUvwBopcWVlYe51ETR4M7lVzqWpnccwIDAQAB
// 生产环境公钥
//MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCUd7d/8WitO+fjE3+mQoobe9AeAHRPNTH8pSdAde5wTEXstyz0ZYZNN5fJGv+h2RZ0Au4US6sHMyVd0gN7YUo+7k2c4xD4AXJOoPLMjsvpR8IamFDvYFLQaoqYIfzzlCaj4s0MVQFD6X+BsY6ew1927LVkQ/RlkPj0vxxWj7/cZwIDAQAB
   
   var encrypt = new JSEncrypt();
encrypt.setPublicKey(public_key);
   var data = encrypt.encrypt(val);
   return data;
}
export const  UnUnicode = (str) =>{
     return unescape(str.replace(/\\/g, "%"));
}
export const  millisecondToDate = (value) =>{
				    var theTime = parseInt(value);// 秒
				    var theTime1 = 0;// 分
				    var theTime2 = 0;// 小时
				    if(theTime > 60) {
				        theTime1 = parseInt(theTime/60);
				        theTime = parseInt(theTime%60);
				        if(theTime1 > 60) {
				            theTime2 = parseInt(theTime1/60);
				            theTime1 = parseInt(theTime1%60);
				        }
				    }
				    var result = [];
				    if(theTime<10){
						result.push('0'+theTime);//秒
				    }else{
				    	result.push(theTime);//秒
				    }
				    
				    if(theTime1 > 0) {
				    	if(theTime1<10){
				    		result.push('0'+theTime1);
				    	}else{
				    		result.push(theTime1);//时
				    	}
				        
				    }
				   	if(theTime2 > 0) {
				   		if(theTime2<10){
				    		result.push('0'+theTime2);
				    	}else{
				    		result.push(theTime2);//分
				    	}
				    }
				    return result;

			}

