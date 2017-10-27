<template>
	<div class='testingdetail'>
		
		<!------上面部分-------->
		<div class='header'>			
			<div class='share'>
				<span>{{taskType}}</span><i>{{taskName}}</i>
			</div>
			
			<div class="money"><span>{{singleAmount}}</span>元</div>
			<div class='testing'>审核中</div>
			<div class='testnum'>任务编号：<span>{{taskId}}</span></div>
			
			<div class="time">
				<i><img src="../../assets/testdetail/time.png" /></i>
				<span>审核剩余时间：</span>
				<em>
					<strong class="_h">{{hours}}</strong>:
					<strong class="_m">{{minutes}}</strong>:
					<strong class="_s">{{seconds}}</strong>					
				</em>
			</div>
			
			<div class='pic'><img src="../../assets/testdetail/2@2x.png" /></div>
		</div>
		<!--任务描述-->
		<div class='decribe'>
			<h3>任务描述</h3>
			<p v-html="taskDescription"></p>
		</div>
		
		
		<!--任务攻略-->
		<div class="process">
			<div class="center">
				<h3>任务攻略</h3>
				<ul class="content">
					<li class="" v-for="data in taskRaider">
						<img :src="data.raiderImage" />
						<div class="right">
							<div class='contentdetail'>{{data.raiderContent}}</div>
							<div class="location">{{data.raiderSort}}</div>
						</div>					
					</li>
				</ul>
			</div>
		</div>
		
		<!--您可能还感兴趣的任务-->
		<h3 class="interest">您可能还感兴趣的任务</h3>
			
		<!--项目列表-->
		<ul class='interestlist' v-for='data in taskList'>
			<li class="">
  	  			<div class='left'>{{data.taskType}}</div>
	  	  		<div class='center'>
	  	  			<div class="name">{{data.taskName}}</div>
	  	  			<div class="under">
	  	  				<div class="moneys">{{data.singleAmount}}</div>
		  	  			<div class="init">元</div>
		  	  			<div class="number">剩余{{data.surplusCount}}次</div>
	  	  			</div>	  	  			
	  	  		</div>
	  	  		<div class='right'>
	  	  			<!--<router-link :to="{path:'/todotest',query:{orderId:data.orderId,taskId:data.taskId}}">-->
	  	  			<router-link :to="{path:'/gettest?title='+'任务详情',query:{taskId:data.taskId}}">
	  	  				<div class="todotest">领任务</div>
	  	  			</router-link>
	  	  			<div class="todotests">24小时极速审核</div>
	  	  		</div>  	  			  	  		
	  	  	</li>
	  	  
	  	  
		</ul>
	</div>
</template>

<script>
	import $ from 'jquery'
	import { getTaskOrderdDetails , getTaskList } from '@/service/getdata'	
	import {millisecondToDate} from '@/config/utils'
	export default {
		data(){
			return {
				orderId:'',
				taskId:'',
				orderMap:'',
				taskRaider:'',//攻略
				taskName:'',
				singleAmount:'',
				taskNum:'',
				completedNum:'',
				surplusCount:'',
				taskDescription:'',
				publishTime:'',//开始时间
				endTime:'',//结束时间
				t:'',
				_timer:'',
				remark:'',//驳回原因
				raiderImage:'',
				raiderContent:'',
				raiderSort:'',
				taskType:'',
				city:'',				
				taskList:'',
				time:'',
				hours:'',
				minutes:'',
				seconds:''
			}
		},
		mounted(){
			this.orderId = this.$route.query.orderId
			this.taskId = this.$route.query.taskId
			getTaskOrderdDetails(this.orderId).then(res=>{
				if(res.code == '000'){
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
					this.endTime = parseInt(res.orderMap.endTime)	
					this.t = Math.floor(this.endTime/1000);						
					this.raiderImage = res.taskRaider.raiderImage 
					this.raiderContent = res.taskRaider.raiderContent
					this.raiderSort = res.taskRaider.raiderSort				
					this.city = localStorage.getItem('city')
					setTimeout(this.getDJS,0);
			    	this._timer = setInterval(this.getDJS,1000);
			    	
					getTaskList(this.taskType,'','','',this.city).then(res=>{
						if(res.code == '000'){
							console.log(res)
							this.taskList = res.taskList
						}else{

						}
					})				
				}else{
					console.log('系统异常')
				}
			});
						
		},
		methods:{
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
		}
	}
	
	
</script>

<style scoped lang='scss'>	
	@import 'src/style/mixin';
	
	.testingdetail{width: 100%;overflow: hidden;}
	
	.header{width: 100%;height: 14.06rem;overflow: hidden;border-bottom: 1px solid #f0f0f0;margin-bottom: 0.63rem;background: #fff;position: relative;}
	.share{width: 100%;height: 2.75rem;margin-top: 1.31rem;}
	.share span{display: inline-block;width: 2.75rem;height: 2.75rem;
		@include beijing2();
		border-radius: 50%;font-family: PingFangSC-Semibold;font-size: 1rem;color: #333333;text-align: center;line-height: 2.75rem;margin-left: 17.1%;float: left;
		overflow: hidden;
	}
	.share i{width: 43.2%;height: 1.38rem;float: left;margin-left: 3.7%;font-family: PingFangSC-Regular;font-size: 1rem;color: #333333;margin-top: 0.69rem;line-height: 1.38rem;}
	.money{width: 100%;height: 3.13rem;font-family: PingFangSC-Semibold;font-size: .9375rem;color: #F5A623;}
	.money span{display: inline-block;font-family: PingFangSC-Medium;font-size: 2.25rem;color: #F5A623;margin-top: 0.69rem;}
	.testing{width: 5.31rem;height: 1.38rem;font-family: PingFangSC-Regular;font-size: 1rem;color: #D0021B;margin: 0 auto;line-height: 1.38rem;margin-bottom: 0.88rem;margin-top: 0.25rem;color: #F5A623;}
	.testnum{width: 15rem;height: 1.25rem;margin: 0 auto;font-family: PingFangSC-Regular;font-size: .875rem;color: #9B9B9B;line-height: 1.25rem;margin-bottom: 0.75rem;}
	.testnum span{display: inline-block;color: #2A2A2A;}
	
	.time{width: 100%;height: 1.25rem;margin: 0.63rem auto;}
	.time i{display: inline-block;float: left;width: 0.94rem;height: 0.94rem;margin-left: 25.1%;}
	.time i img{width: 100%;height: 100%;margin-top: 1px;}
	.time span{display: inline-block;float: left;font-family: PingFangSC-Regular;font-size: .875rem;color: #9B9B9B;height: 100%;overflow: hidden;margin-top:2px;margin-left: 0.2rem;}
	.time em{display: flex;display: inline-block;float: left;font-family: PingFangSC-Regular;font-size: 0.875rem;color: #9B9B9B;margin-top: 2px;}
	.time em strong{flex: 1;display: inline;font-weight: 100;}
	
	.pic{width: 4.88rem;height: 4.88rem;position: absolute;top: 3.88rem;left: 84.8%;}
	.pic img{width: 100%;height: 100%;}
	
	.decribe{width: 100%;overflow: hidden;background: #fff;margin-bottom: .63rem;}
	.decribe h3{width: 7.13rem;height: 1.38rem;font-family: PingFangSC-Regular;font-size: 1rem;color: #333333;line-height: 1.38rem;text-align: center;margin-bottom: 0.38rem;margin-top: 0.69rem;margin-left: 3.7%;text-align: left;}
	.decribe p{width: 92.3%;overflow: hidden;font-family: PingFangSC-Regular;font-size: 0.8125rem;color: #777777;line-height: 1.314rem;margin-left: 3.7%;margin-right: 3.7%;text-align: left;}
	
	
	
	.process{width: 100%;overflow: hidden;background: #fff;margin-bottom: 1.5rem;}
	.process .center{width: 92.3%;overflow: hidden;margin-left: 3.7%;margin-top: .63rem;}
	.process .center h3{text-align: left;font-family: PingFangSC-Regular;font-size: 1rem;color: #333333;}
	.process .center .content{margin-top: .7rem;}
	.process .center .content li{width: 100%;position: relative;overflow: auto;}
	.process .center .content li img{display: inline-block;float: left;width: 4.38rem;height: 4.38rem;background: #FFD743;
border-radius: 10px;margin-bottom: 1.5rem;border: 0;}
	.process .center .content li .right{text-align:left;float: right;width: 60%;border-left: 1px solid #C7C7CC;margin-right: 0;position: relative;right: 0;top: 0;min-height: 6rem;}
	/*.process .center .content li .right .contentdetail{width: 80%;margin: 0.5rem;margin-left: 10%;
		font-family: PingFangSC-Regular;
		font-size: 0.8125rem;line-height: 1rem;color: #777777;
		display:block; 	
		overflow:hidden; 
		text-overflow:ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 5;		
		}*/
	.process .center .content li .right .contentdetail{display: block;width: 80%;margin: 5%;margin-left: 10%;font-family: PingFangSC-Regular;font-size: .8125rem;color: #777777;line-height: 1.314rem;text-align: left;}	
		
	/*.process .center .content li .right .location{width: 1.56rem;height: 1.56rem;background: #FFD744;border-radius: 100%;position: absolute;top: 0;left: -0.78rem;font-family: PingFangSC-Medium;font-size: 1.125rem;color: #000000;line-height: 1.56rem;}*/
	.process .center .content li .right .location{width: 1.56rem;height: 1.56rem;background: #FFD744;border-radius: 100%;position: absolute;top: 0;left: 		-0.78rem;font-family: PingFangSC-Medium;
	font-size: 1.125rem;color: #000000;line-height: 1.56rem;text-align: center;}
		
		
		
	
	.interest{width: 12rem;height: 1.38rem;font-family: PingFangSC-Regular;font-size: 1rem;color: #666666;margin: 0 auto;line-height: 1.38rem;margin-bottom: 0.44rem;}
	
	.interestlist{width: 100%;overflow: hidden;background: #fff;}
	.interestlist li{width: 100%;height: 5rem;border-bottom: 1px solid rgba(191,191,191,0.22);}
	.interestlist li .left{width: 2.75rem;height: 2.75rem;margin-top: 1.13rem;margin-left: 3.7%;background: #ffd743;border-radius: 50%;float: left;text-align: center;line-height: 2.75rem;color: #333;font-weight: bold;font-family: PingFangSC-Semibold;overflow: hidden;}
	.interestlist li .center{float: left;margin-left: 3.7%;margin-top: 1.19rem;width: 50%;}
	.interestlist li .center .name{width: 100%;height: 1.38rem;text-align: left;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
	.interestlist li .center .under{width: 100%;height: 1.75rem;overflow: hidden;}
	.interestlist li .center .under .moneys{float: left;height: 1.75rem;font-family: PingFangSC-Medium;font-size: 20px;color: #F5A623;margin: 0;}
	.interestlist li .center .under .init{float: left;width: 14%;height: 1.31rem;font-family: PingFangSC-Semibold;font-size: 15px;color: #F5A623;text-align: left;line-height: 1.31rem;font-weight: 700;margin-top: 0.13rem;}
	.interestlist li .center .under .number{float: left;width: 46%;height: 1.13rem;text-align: left;font-family: PingFangSC-Regular;font-size: 13px;color: #778892;line-height: 1.13rem;margin-top: 0.25rem;}
	
	.interestlist li .right{float: right;width: 26%;height: 2.75rem;margin-top: 1.1rem;margin-right: 2.7%;}
	.interestlist li .right .todotest{width: 80.6%;height: 1.56rem;line-height: 1.56rem;background: #FFE37F;border-radius: 44px;font-family: PingFangSC-Regular;font-size: 14px;color: #333333;margin-left: 8.5%;}
	.interestlist li .right .todotests{width: 100%;height: 1.06rem;font-family: PingFangSC-Regular;font-size: 12px;color: #C7C7CC;margin-top: 0.13rem;}
</style>