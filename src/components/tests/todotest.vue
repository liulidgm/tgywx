<template>
	<div class="todotest">
		<div class="name">
			<span class="nametext">姓名</span>
			<span class="namedetail"><input type="text" ref='namedetailinput' v-model="name" class="namedetailinput" placeholder="请输入姓名" /></span>
		</div>
		<div class="phone">
			<span class="phonetext">电话</span>
			<span class="phonedetail">
				<input type="text" ref='phonedetailinput' v-model="moblie" class="phonedetailinput" placeholder="请输入手机号码" />
			</span>
		</div>
		<!--上传照片-->
		<div class='picture' >
			<div class="picturetext">上传照片</div>
			<div class="piclist">
				<div class="picturedetail" @click="uploadImg()">
					<span class="addpic"></span>
				</div>
			</div>
			
		</div>
		<!--任务事例-->
		<div class="exam">
			<div class='examtext' @click="cc()">任务示例</div>
			<div class='examdetail'>
				<ul class="examdetail_ul">
					<li class="img_img"><img src="../../assets/todo/Group 7@2x.png" /><span>接任务</span></li>
					<li class="img_icon"><img src="../../assets/todo/Rectangle 10 Copy 6@2x.png" /></li>				
					<li class="img_img"><img src="../../assets/todo/Group 6@2x.png" /><span>看攻略</span></li>
					<li class="img_icon"><img src="../../assets/todo/Rectangle 10 Copy 6@2x.png" /></li>	
					<li class="img_img"><img src="../../assets/todo/Group 5@2x.png" /><span>交任务</span></li>
					<li class="img_icon"><img src="../../assets/todo/Rectangle 10 Copy 6@2x.png" /></li>	
					<li class="img_img"><img src="../../assets/todo/Group 4@2x.png" /><span>领佣金</span></li>
				</ul>
			</div>
		</div>
		
		<!--中间有文字-->	
		<div class="bottom">
			<div class="left">
				<div class='timeimg'><img src="../../assets/testdetail/time.png" /></div>
				<div class='timetext'>剩余时间</div>
				<div class="time">
					<span class="_h">{{hours}}</span>:
					<span class="_m">{{minutes}}</span>:
					<span class="_s">{{seconds}}</span>
				</div>
			</div>
			<div class="right" @click="submittest()">提交任务</div>
		</div>	
		
		
		<!--遮罩-->
		<div class="mask" ref='mask'>
			<h3>任务提交成功</h3>
			<div class="btn">
				<div class="button" ref='button' @click='clickbutton()'>继续做任务</div>
			</div>		
		</div>			
	</div>
</template>

<script>
	import $ from 'jquery'
	import { submitTask , 
//		selUserToSubmitTask ,
		getTaskOrderdDetails } from '@/service/getdata'
	import {chooseImage,millisecondToDate} from '@/config/utils'
	import {Toast} from 'mint-ui'
	
	export default {
		data(){
			return {
				moblie:'',
				name:'',
				taskId:'',
				orderId:'',
				orderMap:'',
				time:'',
				endTime:'',
				t:'',
				_timer:'',
				imgUrl:'',
				hours:'',
				minutes:'',
				seconds:'',
				abc:''
			}
		},
		created(){
		},
		mounted(){	
			this.orderId = this.$route.query.orderId;
			//console.log(this.orderId)
			this.taskId = this.$route.query.taskId;
			var _self = this
			
//			selUserToSubmitTask().then(res=>{
//				if(res.code === '000'){
//					console.log(res)
//					this.moblie = res.moblie
//					this.name = res.name					
//					//console.log(this.moblie)
//					//console.log(this.name)									
//				}else{
//					
//				}
//			});
			
//			$("input").focus(function(){$(".bottom").hide();});
//			$("input").blur(function(){$(".bottom").show();});			
			
			getTaskOrderdDetails(this.orderId).then(res=>{
				if(res.code == '000'){
						console.log(res)
					this.orderMap = res.orderMap
					this.endTime = parseInt(res.orderMap.endTime)
					    console.log(this.endTime)
					this.t = Math.floor(this.endTime/1000);				
		        	setTimeout(this.getDJS,0);
			    	this._timer = setInterval(this.getDJS,1000);
				}else{}
			})
			//this.cc();
		},
		methods:{
			uploadImg(){
				chooseImage('2',function(res){
					//console.log(res)
					if(res.code=="000"){
						var imgDom = '<img class="imgpic" style="float:left;width:6.5rem;height:6.5rem;margin:0.5rem;" src="'+res.path+'" />';
						$('.piclist').append(imgDom);
					}else{
						Toast(res.msg);
					}
				})
			},
			submittest(){
				var reg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/ ;				
				this.name = this.$refs.namedetailinput.value;
				this.moblie = this.$refs.phonedetailinput.value;
				
				if(this.name == ''){
					$('.namedetailinput').addClass('inputred')
					$('.namedetailinput').focus()
				}else if(this.moblie ==''){
					$('.phonedetailinput').addClass('inputred')
					$('.phonedetailinput').focus()
				}else{
					if(reg.test(this.moblie)){						
						//判断有没有图片
						//console.log($('.piclist').has('img').length)
						if($('.piclist').has('img').length !== 0){
							submitTask(this.taskId,this.moblie,this.name,this.orderId).then(res=>{
								if(res.code == '000'){
									console.log(res)
									$('.mask').css('display','block')	
								}else if(res.code == '001'){
									Toast('提交失败');
								}else if(res.code == '002'){
									Toast('请先绑定银行卡');
								}
							})
						}else{
							Toast('没有上传图片')
						}
					
					}else{
						//console.log('电话号码有误')
						Toast('电话号码有误')
						//$('.phonedetailinput').val('');
						//$('.phonedetailinput').addClass('inputred')
					}
				}					
			},
			clickbutton(){
				this.$router.push('/tests?title='+'任务状态')
			},
			getDJS(){
				var _self = this;
				this.t--;
		        if (this.t < 1) {
		                clearInterval(this._timer);
		        }else{
		        	var arr = millisecondToDate(Math.floor(this.t));
		            this.hours=arr[2];
			        this.minutes=arr[1];
			        this.seconds=arr[0];
		        }
		    },
		},
		components:{}		
	}
</script>

<style style="scss" scoped>
	.todotest{width: 100%;
	overflow: hidden;
	/*background: #fff;*/
	}	
	.name{width: 100%;height: 2.75rem;background: #fff;margin-top: .88rem;}
	.name span{display: inline-block;float: left;}
	.name .nametext{width: 1.94rem;height: 1.13rem;margin-left: .88rem;font-family:.PingFangSC-Regular;font-size: .9375rem;color: #979797;letter-spacing: 0;margin-top: .81rem;float: left;}
	.name .namedetail{
		overflow: hidden;
		height: 1.13rem;margin-right: 5%;font-family: .PingFangSC-Regular;font-size: .9375rem;color: #333333;letter-spacing: 0;margin-top: .81rem;text-align: right;float: right;}
	.name .namedetail input{height: 100%;border: 0;text-align: right;}
	
	
	.phone{width: 100%;height: 2.75rem;margin-top: 1rem;background: #fff;}
	.phone span{display: inline-block;float: left;}
	.phone .phonetext{width: 1.94rem;height: 1.13rem;margin-left: .88rem;font-family:.PingFangSC-Regular;font-size: .9375rem;color: #979797;letter-spacing: 0;margin-top: .81rem;}
	.phone .phonedetail{
		overflow: hidden;
	height: 1.13rem;margin-right: 5%;font-family: .PingFangSC-Regular;font-size: .9375rem;color: #333333;letter-spacing: 0;margin-top: .81rem;text-align: right;float: right;}
	.phone .phonedetail input{height: 100%;border: 0;text-align: right;}
	
	
	.picture{width:100%;min-height: 12.2rem;background: #F0F0F0;text-align: left;}
	.picture .picturetext{float: left;width: 100%;height: 1.13rem;margin:1.31rem 0 .94rem .81rem;text-align: left;font-family: .PingFangSC-Regular;font-size: .9375rem;color: #979797;letter-spacing: 0;}
	.picture .piclist img{float: left;width: 7rem;margin-right: 0.5rem;}
	
	/*.picture .piclist img{float: left;width: 6.5rem;height: 6.35rem;margin-left: 0.5rem;}*/
	
	.picture .piclist .picturedetail{float: left;width: 6.5rem;height: 6.35rem;margin:0.5rem;background: #fff;border: 1px dashed #ddd;}
	/*.picture .piclist .picturedetail span{width: 100%;height: 100%;margin: 0;}*/
	
	.addpic{display: block;width: 100%;height: 100%;background: url(../../assets/testdetail/addpic.png) no-repeat 3rem 3rem;border: 0;margin-left: -0.5rem;margin-top: -0.5rem;}
		
	.exam{width: 100%;overflow: hidden;background: #fff;}
		
	.exam .examtext{float: left;width: 100%;height: 1.13rem;margin:1.31rem 0 1.56rem .81rem;text-align: left;font-family: .PingFangSC-Regular;font-size: .9375rem;color: #979797;letter-spacing: 0;float: left;}
	.exam .examdetail{
		width: 92.4%;
		height: 10rem;
		background: #fff;
		float: left;
		margin-left: 3.7%;
		margin-bottom: .38rem;
		}
		.exam .examdetail .examdetail_ul{
			margin: 0 auto;
		}
		.exam .examdetail li{
			float: left;
		}
		.exam .examdetail .img_img{
			width: 13%;
			height: 7.2%;
		}
		.exam .examdetail .img_img img{
			width: 100%;
			height: 100%;
		} 
		.exam .examdetail .img_img span{
			display: inline-block;
			margin-top: 1rem;
			font-family:.PingFangSC-Regular;
			font-size: .8rem;
			color: #999;letter-spacing: 0;
			text-align: center;
		}
		.exam .examdetail .img_icon{
			display: inline-block;
			width: 0.5rem;
			height: 1rem;
			margin: 0 6.3%;
			margin-top: 1rem;
		}
		.exam .examdetail .img_icon img{
			width: 100%;
			height: 100%;
		} 
	
	.bottom{width: 100%;height: 3.63rem;position: fixed;left: 0;bottom: 0;background: #fff;}
	.bottom .left{width: 56.8%;height: 100%;float: left;}
	.bottom .left .timeimg{float: left;width: .94rem;height: .94rem;margin-top: 1.44rem;margin-left: 5.1%;margin-right: .4rem;}
	.bottom .left .timeimg img{width: 100%;height: 100%;}
	.bottom .left .timetext{float: left;width: 4rem;height: .94rem;font-family: PingFangSC-Regular;font-size: .875rem;color: #9B9B9B;margin-top: 1.6rem;}
	.bottom .left .time{display: flex;float: left;width: 5rem;height: .94rem;font-family: PingFangSC-Regular;font-size: .875rem;color: #9B9B9B;margin-top: 1.6rem;margin-left: .5rem;}
	.bottom .left .time span{flex: 1;}
	
	.bottom .right{width: 43.2%;height: 100%;float: left;background: #FFD743;font-family: PingFangSC-Regular;font-size: 1.125rem;color: #333333;line-height: 3.63rem;}


	.mask{width: 65%;height: 10rem;position: fixed;top: 15rem;left: 17.5%;right: 17.5%;background: rgba(0,0,0,.4);border-radius: 10px;color: #fff;
		display: none;
		}	
	.mask h3{width: 100%;height: 2rem;font-size: 1.13rem;margin-top: 2rem;}
	.mask p{width: 100%;height: 2rem;font-size: .9375rem;}
	.mask .btn{width: 82%;height: 3rem;
			margin: 0 auto;
			margin-top: 1.5rem;
			overflow: hidden;
			font-size: 0.9375rem;}
	.mask .btn .button{border-radius: 5px;width: 50%;height: 2rem;border: 0;background: #fff;color: #000;
		line-height: 2rem;text-align: center;
		margin: 0 auto;
	}
		
</style>