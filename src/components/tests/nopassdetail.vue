<template>
	<div class="nopassdetail">
		<div class='header'>			
			<div class='share'>
				<span>{{taskType}}</span><i>{{taskName}}</i>
			</div>			
			<div class="money"><span>{{singleAmount}}</span>元</div>
			<div class='nopass'>未通过审核</div>
			<div class='testnum'>任务编号：<span>{{taskId}}</span></div>
		</div>		
		<div class='reason'>
			<h3>未通过原因</h3>
			<p>{{remark}}</p>
		</div>
		
		<!--------底部按钮---------->
		<div class='bottom'>
			<div class="as cancel" @click="canceltask()">取消任务</div>
			<!--<router-link :to="{path:'/todotask',query:{orderId:this.orderId,taskId:this.taskId}}" class="aresubmit">-->				
			<div class="as resubmit" @click="resubmit()">重新提交</div>
		</div>
		
		<!----失败图片---->
		<div class="pic"></div>
		
		<!---遮罩-->
		<div class="shadow" v-show="maskTip">
			<h3 class="title">是否取消任务</h3>
			<div class="btn">
				<div class="left" @click="suredelete()">确定</div>
				<div class="right" @click="cancel()">取消</div>
			</div>
			<div class="point" @click="point()">返回</div>
		</div>
		
	</div>
</template>
<script>
	import $ from 'jquery'
	import { getTaskOrderdDetails ,cancelOrderd } from '@/service/getdata'
	import {Toast} from 'mint-ui'
	export default {
		data(){
			return {
				orderId:'',
				taskId:'',
				orderMap:'',
				taskRaider:'',//攻略
				taskName:'',
				taskType:'',
				singleAmount:'',
				taskNum:'',
				completedNum:'',
				surplusCount:'',
				taskDescription:'',
				publishTime:'',//开始时间
				endTime:'',//结束时间
				remark:'',//驳回原因
				raiderImage:'',
				raiderContent:'',
				raiderSort:'',
				maskTip:false		
			}
		},
		mounted(){
			this.orderId = this.$route.query.orderId
			this.taskId = this.$route.query.taskId
			
			getTaskOrderdDetails(this.orderId).then(res=>{
				if(res.code == '000'){
					console.log('成功')				
					this.orderMap = res.orderMap
					this.taskRaider = res.taskRaider
					this.taskName = res.orderMap.taskName
					this.taskType = res.orderMap.taskType
					this.singleAmount = res.orderMap.singleAmount
					this.taskNum = res.orderMap.taskNum
					this.completedNum = res.orderMap.completedNum
					this.surplusCount = res.orderMap.surplusCount
					this.taskDescription = res.orderMap.taskDescription
					this.publishTime = res.orderMap.publishTime
					this.endTime = res.orderMap.endTime
					this.remark = res.orderMap.remark
					
					console.log(this.remark)
					
					this.raiderImage = res.taskRaider.raiderImage 
					this.raiderContent = res.taskRaider.raiderContent
					this.raiderSort = res.taskRaider.raiderSort					
					//console.log(res.orderMap.publishTime)
					//console.log(this.endTime)					
				}else{
					console.log('系统异常')
				}
			})
		},
		methods:{
//			canceltask(){				
//				cancelOrderd(this.taskId,this.orderId).then(res=>{
//					if(res.code == '000'){
//						console.log('取消成功')
//					}else if(res.code == '001'){
//						console.log('系统异常')
//					}else if(res.code == '002'){
//						console.log('订单取消异常')
//					}
//				})				
//			},
			suredelete(){
					cancelOrderd(this.taskId,this.orderId).then(res=>{
						if(res.code == '000'){
							this.$router.push('/tests?title='+'任务状态')
						}
						this.maskTip = false;
						Toast('取消成功');
					})
			},
			canceltask(){
				this.maskTip = true;
			},						
			point(){
				$('.shadow').css('display','none')
			},
			cancel(){
				$('.shadow').css('display','none');
				this.maskTip = false;
			},		
			resubmit(){
				this.$router.push('/todotest?orderId='+this.orderId+'&taskId='+this.taskId)
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'src/style/mixin';	
	
	.nopassdetail{width: 100%;overflow: hidden;background: #fff;position: relative;}
	
	.header{width: 100%;height: 11.56rem;overflow: hidden;border-bottom: 1px solid #f0f0f0;}
	.share{width: 100%;height: 2.75rem;margin-top: 1.31rem;}
	.share span{display: inline-block;width: 2.75rem;height: 2.75rem;
		@include beijing2();
		border-radius: 50%;font-family: PingFangSC-Semibold;font-size: 1rem;color: #333333;text-align: center;line-height: 2.75rem;margin-left: 17.1%;float: left;
	}
	.share i{width: 43.2%;height: 1.38rem;float: left;margin-left: 3.7%;font-family: PingFangSC-Regular;font-size: 1rem;color: #333333;margin-top: 0.69rem;line-height: 1.38rem;}
	.money{width: 100%;height: 3.13rem;font-family: PingFangSC-Semibold;font-size: .9375rem;color: #F5A623;}
	.money span{display: inline-block;font-family: PingFangSC-Medium;font-size: 2.25rem;color: #F5A623;margin-top: 0.69rem;}
	.nopass{width: 5.31rem;height: 1.38rem;font-family: PingFangSC-Regular;font-size: 1rem;color: #D0021B;margin: 0 auto;line-height: 1.38rem;margin-bottom: 0.88rem;margin-top: 0.25rem;}
	.testnum{width: 15rem;height: 1.25rem;margin: 0 auto;font-family: PingFangSC-Regular;font-size: .875rem;color: #9B9B9B;line-height: 1.25rem;}
	.testnum span{display: inline-block;color: #2A2A2A;}	
	.reason{width: 100%;overflow: hidden;background: #fff;margin-bottom: 1.06rem;}
	.reason h3{width: 7.13rem;height: 1.38rem;font-family: PingFangSC-Regular;font-size: 1rem;color: #333333;line-height: 1.38rem;text-align: center;margin-bottom: 0.38rem;margin-top: 0.69rem;margin-left: 3.7%;text-align: left;}
	.reason p{width: 92.3%;overflow: hidden;font-family: PingFangSC-Regular;font-size: 0.8125rem;color: #777777;line-height: 1.314rem;margin-left: 3.7%;margin-right: 3.7%;text-align: left;}
	
	
	/************底部按钮*************/
	.bottom{width: 100%;height: 3.63rem;position: fixed;left: 0;bottom: 0;background: #fff;}	
	.bottom .as{display: inline-block;width: 50%;height: 100%;border: 0;line-height: 3.63rem;font-family: PingFangSC-Regular;
			font-size: 1.125rem;color: #333333;}			
	.bottom .cancel{float: left;height: 100%;position: absolute;left: 0;top: 0;}
	.bottom .resubmit{float: left;height: 100%;
		@include beijing2();
		position: absolute;right: 0;top: 0;}
			
	.pic{width: 4.88rem;height: 4.88rem;background: url(../../assets/testdetail/1@2x.png) no-repeat 0 0;background-size: cover;position: absolute;top: 3.88rem;left: 84.8%;}
	
	
	
	/*******遮罩********/
	.shadow{width: 65%;height: 10rem;position: fixed;top: 14rem;left: 17.5%;right: 17.5%;background: rgba(0,0,0,.4);border-radius: 10px;color: #fff;}
	.shadow h3{width: 100%;height: 2rem;font-size: 1.13rem;margin-top: 2rem;}	
	
	.shadow .btn{width: 82%;height: 3rem;margin: 1rem auto;overflow: hidden;font-size: 0.9375rem;}
	.shadow .btn div{display: inline-block;}
	.shadow .btn .left{float: left;width: 49.9%;height: 2rem;border: 0;background: #fff;color: #000;line-height: 2rem;border-radius: 5px;}
	.shadow .btn .right{float: left;width: 49.9%;height: 2rem;border: 0;background: skyblue;color: #fff;line-height: 2rem;border-radius: 5px;}
	
	.shadow .point{width: 41%;height: 3rem;margin: 1rem auto;overflow: hidden;font-size: 1rem;background: skyblue;border-radius: 5px;line-height: 3rem;display: none;}
</style>