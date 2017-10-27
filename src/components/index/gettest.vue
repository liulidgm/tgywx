<template>
	<div class='gettest'>
		<div class="share">
			<div class="header">
				<div class="ashare">{{taskType}}</div>
				<div class="name">{{taskName}}</div>
			</div>
			<div class="money">
				<span>{{singleAmount}}</span>
				<i>元</i>
			</div>
			<ul class="slist">
				<li class="total">
					<span>{{taskNum}}次</span>
					<i>任务总数</i>
				</li>
				<li class="surplus">
					<span>{{surplusCount}}次</span>
					<i>剩余次数</i>
				</li>
				<li class="time">
					<span>{{endTime}}</span>
					<i>审核时间</i>
				</li>
			</ul>
			<div class="limit">任务限制：{{numbers}}</div>
		</div>
		
		<!-----------任务描述-------------->
		<div class="discribe">
			<div class='center'>
				<h3>任务描述</h3>
				<p v-html="taskDescription"></p>
			</div>
		</div>
		
		<!-----------任务攻略-------------->
		<div class="process">
			<div class="center">
				<h3>任务攻略</h3>
				<ul class="content">
					<li class="" v-for="data in taskRaiders">
						<img :src="data.raiderImage" @click="clickImg($event)"/>
						<<!-- img src="../../assets/logo.png" @click="clickImg($event)"/> -->
						<div class="right">
							<p class='contentdetail'>{{data.raiderContent}}</p>
							<div class="location">{{data.raiderSort}}</div>
						</div>					
					</li>
				</ul>
			</div>
		</div>	
		<!------领取任务-------->
		<div class="receive">
			<div class="surercv" @click="receivetest()" ref='surercv'>领取任务</div>
		</div>
		
		<!------遮罩------->
		<div class="mask mask1" ref='mask'>
			<h3>任务领取成功</h3>
			<p>领取任务后请前往任务状态页面按步骤要求提交任务内容</p>
			<div class="btn">
				<router-link :to="{path:'/index'}">
					<button class="left">继续领任务</button>
				</router-link>
				<!--<router-link :to="{path:'/todotest'}">-->
				<router-link :to="{path:'/todotest?title='+'提交任务',query:{orderId:this.orderId,taskId:this.taskId}}">
					<button class="right" @click='tosubmit()'>提交任务</button>
				</router-link>
			</div>		
		</div>
		
		<!------领取任务失败时处理--------->
		<div class="mask mask2"  ref='mask'>
			<h3 class='msg'>剩余次数不足</h3>
			<div class="btn">
				<router-link :to="{path:'/index'}"><button class="left left2">继续领任务</button></router-link>
				<!--<router-link :to="{path:'/todotest'}"><button class="right">做任务</button></router-link>-->
			</div>		
		</div>
		<big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
	</div>
</template>

<script>
	//import { MessageBox } from 'mint-ui';
	import $ from 'jquery'
	
	import home from 'components/index/home'
	import todotest from 'components/tests/todotest'
	
	import { selTaskInfoDetail , receiveTask } from '@/service/getdata'
	import bigImg from 'components/common/viewImg'
	export default {
		data(){
			return {
				showImg:false,
				taskInfoDetail:'',
				taskName:'',
				singleAmount:'',
				taskNum:'500',
				completedNum:'',
				surplusCount:'500',
				manyRunFlag:'',
				taskDescription:'',
				publishTime:'',
				endTime:'',
				taskId:'',//
				taskRaiders:'',
				raiderImage:'',
				raiderContent:'',
				raiderSort:'',
				orderId:'',
				taskType:'',
				time:'',
				numbers:''
			}
		},
		mounted(){
			//查询任务详情			
			this.taskId = this.$route.query.taskId;
				
			selTaskInfoDetail(this.taskId).then(res=>{
				if(res.code == '000'){	
					console.log(res)
					//console.log(res.taskInfoDetail)					
					this.taskInfoDetail = res.taskInfoDetail;
					
					this.taskName= res.taskInfoDetail.taskName;				
					this.singleAmount = res.taskInfoDetail.singleAmount;
					this.taskNum = res.taskInfoDetail.taskNum;
					this.completedNum = res.taskInfoDetail.completedNum;
					this.surplusCount = res.taskInfoDetail.surplusCount;
					this.manyRunFlag = res.taskInfoDetail.manyRunFlag;
					//console.log(this.manyRunFlag)
					this.taskDescription = res.taskInfoDetail.taskDescription;
					this.publishTime = res.taskInfoDetail.publishTime;
					this.endTime = res.taskInfoDetail.endTime;
					
					this.taskId = res.taskInfoDetail.taskId;					
					this.taskRaiders = res.taskInfoDetail.taskRaiders;
					this.raiderImage = res.taskInfoDetail.taskRaiders.raiderImage;
					this.raiderContent = res.taskInfoDetail.taskRaiders.raiderContent;
					this.raiderSort = res.taskInfoDetail.taskRaiders.raiderSort;				
					
					this.taskType = res.taskInfoDetail.taskType;
					
					//是否允许多次执行
					if(this.manyRunFlag == '0'){
						this.numbers = '每人一次'
					}else if(this.manyRunFlag == '1'){
						this.numbers = '不限'
					}
					//获取当前时间				
		            var date = new Date();
		            var now = date.getTime();
		            //设置截止时间
		            var endDate = new Date(this.endTime);
		            var end = endDate.getTime();
		            //时间差
		            var leftTime = end-now;
					console.log(leftTime)
					var h;
			        if (leftTime>=0) {
		                h = Math.ceil(leftTime/1000/60/60);                
			        }
			        this.time = h;
			        //console.log(h)
				}else if(res.code){
					//console.log('订单取消异常')
				}else{
					//console.log('系统异常')
				}
			})			
			if(this.orderId != ''){
				this.$refs.surercv.innerHTML= '提交任务';
				//this.$refs.mask.css('display','none')
			}else{				
			}				
		},
		methods:{
			clickImg(e) {
                this.showImg = true;
                // 获取当前图片地址
                this.imgSrc = e.currentTarget.src;
            },
            viewImg(){
                this.showImg = false;
            },
			//点击领取任务
			receivetest(){
//				$('.mask').css('display','block');
				var 
					mask1 = $('.mask1'),
				    mask2 = $('.mask2');				    
				console.log(this.taskId)
				
				//任务orderID
				this.taskId = this.$route.query.taskId
				
				console.log(this.taskId)
				//用户领取任务
				receiveTask(this.taskId).then(res=>{													
					if(res.code == '000'){
						console.log(res)
						this.orderId = res.orderId
						$('.mask1').css('display','block')
						$('.mask2').css('display','none')
					}else{
						$('.mask1').css('display','none')
						$('.mask2').css('display','block')
						if(res.code == '001'){
							$('.msg').text('剩余次数不足')
						}else if(res.code == '002'){
							$('.msg').text('任务已过期')
						}else if(res.code == '003'){
							$('.msg').text('该任务不能多次领取')
						}else{
							$('.msg').text('任务异常')
						}
					}
				})		
			},
			tosubmit(){
//				this.$route.push = 
			}
		},
		components:{ home,todotest,bigImg }
	}
	
</script>

<style lang="scss" scoped>
	@import 'src/style/mixin';
	.gettest{width: 100%;height: 100%;background: #f0f0f0;position: relative;}
	
	.share{width: 100%;background: #fff;margin-bottom: 0.63rem;overflow: hidden;}
	.share .header{height: 2.75rem;margin-top: 1.31rem;margin-left: 17.1%;border: 0;}
	.share .header .ashare{width: 2.75rem;height: 2.75rem;float: left;
		@include beijing();border: 0;
		border-radius: 50%;font-family: PingFangSC-Semibold;font-size: 1rem;color: #333333;font-weight: 900;line-height: 2.75rem;text-align: center;
		overflow: hidden;
	}
	.share .header .name{width: 78%;height: 1.38rem;float: left;font-family: PingFangSC-Regular;font-size: 1rem;color: #333333;margin-top: 0.685rem;border: 0;}
	
	.share .money{width: 100%;height: 3.13rem;}
	.share .money span{display: inline-block;height: 100%;font-family: PingFangSC-Medium;font-size: 2.25rem;color: #F5A623;margin-left: 40.5%;line-height: 3.13rem;float: left;}
	.share .money i{display: inline-block;width: 7%;height: 1.31rem;font-family: PingFangSC-Semibold;font-size: 0.9375rem;color: #F5A623;float: left;margin-top: 1.5rem;}
	
	.share .slist{display: flex;width: 100%;height: 2.87rem;border-bottom: 1px solid #f0f0f0;margin-top: 0.44rem;margin-bottom: 1.25rem;}
	.share .slist li{flex: 1;width: 14.9%;height: 100%;float: left;}
	.share .slist li span{display: block;width: 100%;height: 1.56rem;font-family: PingFangSC-Regular;font-size: 1.125rem;color: #666666;}
	.share .slist li i{display: block;font-style: normal;width: 100%;height: 1.31rem;font-family: PingFangSC-Regular;font-size: 0.8125rem;color: #9B9B9B;}
	.share .slist .total{}
	.share .slist .surplus{}
	.share .slist .time{}
	.share .limit{height: 2.25rem;margin:0 auto;font-family: PingFangSC-Regular;font-size: .875rem;color: #9B9B9B;margin-top: .69rem;}
	
/***************************************************************************/	
	.discribe{width: 100%;overflow: hidden;background: #fff;margin-bottom: 0.63rem;padding-bottom: 1rem;}
	.discribe .center{width: 92.3%;overflow:hidden;margin-left: 3.7%;}
	.discribe h3{width: 25%;height: 1.38rem;margin-top: 0.63rem;margin-top: 0.38rem;text-align: left;font-family: PingFangSC-Regular;font-size: 1rem;color: #333333;line-height: 1.38rem;}
	.discribe p{font-family: PingFangSC-Regular;font-size: .8125rem;color: #777777;line-height: 1.314rem;text-align: left;}/****/
	
	
	
	
	.process{width: 100%;overflow: hidden;background: #fff;padding-bottom: 3.13rem;}
	.process .center{width: 92.3%;overflow: hidden;margin-left: 3.7%;margin-top: .63rem;}
	.process .center h3{text-align: left;font-family: PingFangSC-Regular;font-size: 1rem;color: #333333;}
	.process .center .content{margin-top: .7rem;}
	.process .center .content li{width: 100%;position: relative;overflow: auto;}
	.process .center .content li img{display: inline-block;float: left;width: 4.38rem;height: 4.38rem;background: #FFD743;
border-radius: 10px;margin-bottom: 1.5rem;border: 0;}

	.process .center .content li .right{text-align:left;float: right;width: 60%;border-left: 1px solid #C7C7CC;margin-right: 0;position:relative;right: 0;top: 0;min-height: 6rem;}
	.process .center .content li .right .contentdetail{display: block;width: 80%;margin: 5%;margin-left: 10%;font-family: PingFangSC-Regular;font-size: .8125rem;color: #777777;line-height: 1.314rem;text-align: left;}/****/
	
	
	.process .center .content li .right .location{width: 1.56rem;height: 1.56rem;background: #FFD744;border-radius: 100%;position: absolute;top: 0;left: -0.78rem;font-family: PingFangSC-Medium;font-size: 1.125rem;color: #000000;line-height: 1.56rem;text-align: center;}
	
	
	
	
	
	
	

/***************************************************************************/	
	.receive{width: 100%;height: 3.63rem;background: #fff;border-top: 1px solid #eee;position: fixed;bottom: 0;}
	.receive .surercv{width: 43.2%;height: 100%;
		@include beijing2();
		font-family: PingFangSC-Regular;font-size: 1.125rem;color: #333333;line-height: 3.63rem;float: right;
	}
	
	
	.gettest .mask{width: 65%;height: 10rem;position: fixed;top: 15rem;left: 17.5%;right: 17.5%;background: rgba(0,0,0,.7);border-radius: 10px;color: #fff;display: none;}
	.gettest .mask h3{width: 100%;height: 2rem;font-size: 1.13rem;margin-top: 2rem;}
	.gettest .mask p{width: 100%;height: 2rem;font-size: .9375rem;}
	.gettest .mask .btn{width: 82%;height: 3rem;margin: 1rem auto;overflow: hidden;font-size: 0.9375rem;}
	.gettest .mask .btn button{border-radius: 5px;}
	.gettest .mask .btn .left{float: left;width: 50%;height: 2rem;border: 0;background: #fff;color: #000;}
	.gettest .mask .btn .right{float: left;width: 50%;height: 2rem;border: 0;background: skyblue;color: #fff;}
	.gettest .mask .btn .left2{margin-left: 25%;}
	.gettest .mask1{display: none;}
	.gettest .mask2{display: none;}
	
	
</style>