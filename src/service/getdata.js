import fetch from '@/config/fetch'

/*****************首页banner**************************/
var bannerList = () => fetch('POST', 'weixin/bannerList.do', {});
var selTaskType = () => fetch('POST','weixin/selTaskType.do',{});
var getTaskList = (type,sort,page,name,city) => fetch('POST','weixin/getTaskList.do',{type:type,sort:sort,page:page,name:name,city:city});
var selCityList = (city) => fetch('POST','weixin/selCityList.do',{city:city})


/*****登录兼注册*******/
var userLogin = (openId) => fetch('POST','weixin/userLogin.do',{openId:openId});

/**********************任务页******************************/

//查询任务详情
var selTaskInfoDetail = (taskId) => fetch('POST','weixin/selTaskInfoDetail.do',{taskId:taskId});
//领取任务
var receiveTask = (taskId) => fetch('POST','weixin/receiveTask.do',{taskId:taskId});
//用户提交任务
var submitTask = (taskId,moblie,name,orderId) => fetch('POST','weixin/submitTask.do',{taskId:taskId,moblie:moblie,name:name,orderId:orderId});
//用户提交任务信息显返
var selUserToSubmitTask = () => fetch('POST','weixin/selUserToSubmitTask.do',{});

//查询用户订单上列表
var getTaskOrderList = (orderState,page) => fetch('POST','weixin/getTaskOrderList.do',{orderState:orderState,page:page});
//查询用户订单详情
var getTaskOrderdDetails = (orderId) => fetch('POST','weixin/getTaskOrderdDetails.do',{orderId:orderId});
//用户取消订单
var cancelOrderd = (taskId,orderId) => fetch('POST','weixin/cancelOrderd.do',{taskId:taskId,orderId:orderId});


/************************个人中心*********************************************/
//个人中心查询用户累计完成任务
var getUserTaskStatistics = () => fetch('POST','weixin/getUserTaskStatistics.do',{});
//个人中心查询用户基本信息//编辑
var getUserInfo = () => fetch('POST','weixin/getUserInfo.do',{});
//查询省份
var getProvinceCity = () => fetch('POST','weixin/getProvinceCity.do',{});
//设置用户基本信息
var setUserInfo = (city,industry,occupationName,collegeName,gender,birthday) => fetch('POST','weixin/setUserInfo.do',{city:city,industry:industry,occupationName:occupationName,collegeName:collegeName,gender:gender,birthday:birthday});
//查询行业和职业类型
var selTypeList = (type) => fetch('POST','weixin/selTypeList.do',{type:type});
//绑卡设置姓名身份证
var setUserCardId = (name,idCard) => fetch('POST','weixin/setUserCardId.do',{name:name,idCard:idCard});
//绑定设置银行卡信息
var setUserBank = (bankCard,openBankName,mobile) => fetch('POST','weixin/setUserBank.do',{bankCard:bankCard,openBankName:openBankName,mobile:mobile});

//登录外发送手机动态码
var getWXVerifyCode = (userPhone,sendType) => fetch('POST','weixin/getWXVerifyCode.do',{userPhone:userPhone,sendType:sendType});

//登录外验证手机动态码
var WXVerifiedCode = (userPhone,phoneCode,sendType) => fetch('POST','weixin/WXVerifiedCode.do',{userPhone:userPhone,phoneCode:phoneCode,sendType:sendType});
/**微信相关接口调用**/
//获取基本配置
var wxconfig = (url) => fetch('POST','weixin/weixinJSCheck.do',{url:url});
//设置头像
var WXSaveHeadpic = (mediaId) => fetch('POST','weixin/WXSaveHeadpic.do',{mediaId:mediaId});
//上传任务图片
var saveTaskPic = (mediaId) => fetch('POST','weixin/saveTaskPic.do',{mediaId:mediaId})
//帮助反馈
var saveOpinion = (content) => fetch('POST','weixin/saveOpinion.do',{content:content})
//交易明细
var selTransactionRecord = () =>fetch("POST",'weixin/selTransactionRecord.do',{})

//消息页面
//
var selAllMessage = () => fetch('POST','weixin/selAllMessage.do',{})
//
var selAllMessageDetail = (mesgId) => fetch('POST','weixin/selAllMessageDetail.do',{mesgId:mesgId})

//钱包  我的余额
var getUserUseableAmount = () => fetch('POST','weixin/getUserUseableAmount.do',{})
//我的余额 当前余额 提现余额
var withoutDraw = ( withdrawAmount ) => fetch('POST','weixin/withdraw.do',{withdrawAmount :withdrawAmount })
//任务状态，左划可以删除
//var cancelOrderd = (taskId,orderId) => fetch('POST','weixin/cancelOrderd.do',{taskId:taskId,orderId:orderId})



export {
	bannerList,selTaskType,getTaskList,selCityList,userLogin,receiveTask,
	getTaskOrderList,getUserTaskStatistics,getUserInfo,getProvinceCity,
	setUserInfo,selTypeList,setUserCardId,setUserBank,getWXVerifyCode,
	WXVerifiedCode,WXSaveHeadpic,selTaskInfoDetail,submitTask,
	getTaskOrderdDetails,cancelOrderd,selUserToSubmitTask,
	wxconfig,saveTaskPic,saveOpinion,selTransactionRecord,
	selAllMessage,selAllMessageDetail,withoutDraw,getUserUseableAmount
}
