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
					<i>剩余总数</i>
				</li>
				<li class="time">
					<span>{{endTime}}</span>
					<i>审核时间</i>
				</li>
			</ul>
			<div class="limit">任务限制：{{manyRunFlag}}</div>
		</div>
		
		<!--任务描述-->
		<div class="discribe">
			<div class='center'>
				<h3>任务描述</h3>
				<p v-html="taskDescription"></p>
			</div>
		</div>
		<!--任务攻略-->
		<div class="process">
			<div class="center">
				<h3>任务攻略</h3>
				<ul class="content">
					<li class="" v-for="data in taskRaider">
						<img :src="data.raiderImage" @click="clickImg($event)"/>
						<!-- <img src="../../assets/logo.png" @click="clickImg($event)"/> -->
						<div class="right">
							<div class='contentdetail'>{{data.raiderContent}}</div>
							<div class="location">{{data.raiderSort}}</div>
						</div>					
					</li>
				</ul>
			</div>
		</div>
		<!--领取任务-->
		<div class="receive">
			<a v-if="taskAppendixPath" href='{path:taskAppendixPath}' class="left" download="">
				<!--<div class='timeimg'><img src="../../assets/testdetail/time.png" /></div>
				<div class='timetext'>剩余时间</div>
				<div class="time">
					<span class="_h">{{hours}}</span>:
					<span class="_m">{{minutes}}</span>:
					<span class="_s">{{seconds}}</span>
				</div>-->
				点击下载（{{taskAppendixName}}）
			</a>
			<a v-else></a>			
			<!--<router-link :to="{path:'/todotest?title='+'提交任务',query:{orderId:this.orderId,taskId:this.taskId}}">-->			
				<div class="surercv" @click="submittest()" v-show="isValid">
					<div class='overplustime'>
						<!--<div class='timeimg'><img src="../../assets/testdetail/time.png" /></div>-->
						<span>任务剩余时间：</span>
						<span class="_h">{{hours}}:</span>
						<span class="_m">{{minutes}}:</span>
						<span class="_s">{{seconds}}</span>
					</div>
					<div class='surercvwords'>提交任务</div>
				</div>	
				<div class="gray" v-show="!isValid">任务已过期</div>
			<!--</router-link>-->
		</div>
		<big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
	</div>
</template>

<script>
	//import { MessageBox } from 'mint-ui';
	import $ from 'jquery';
	
	import {getTaskOrderdDetails } from '@/service/getdata'
	import {millisecondToDate} from '@/config/utils'
	import bigImg from 'components/common/viewImg'
	export default {
		data(){
			return {
				showImg:false,
				imgSrc: '',
				orderId:'',
				orderMap:'',
				taskRaider:'',//攻略
				taskName:'',
				singleAmount:'',
				taskNum:'',
				manyRunFlag:'',//是否允许多次执行
				taskType:'',
				completedNum:'',
				surplusCount:'',
				taskDescription:'',
				publishTime:'',
				endTime:'',
				t:'',
				_timer:'',
				remark:'',//驳回原因
				raiderImage:'',
				raiderContent:'',
				raiderSort:'',
				taskId:'',
				time:'',
				manyRunFlag:'',
				hours:'',
				minutes:'',
				seconds:'',
				taskAppendixPath:'',//任务附件路径
				taskAppendixName:'',//任务附件名称,
				isValid:false,//任务未过期
				isInvalid:false,//任务已过期
				taskValidtime:''//是否过期标志		
			}
		},
		create(){

		},
		mounted(){
			this.orderId = this.$route.query.orderId;
			this.taskId = this.$route.query.taskId;
			 //console.log(this.orderId);
			getTaskOrderdDetails(this.orderId).then(res=>{
				if(res.code == '000'){
					//console.log(res)
					this.orderMap = res.orderMap
					this.taskRaider = res.taskRaider
					this.taskName = res.orderMap.taskName
					this.taskType = res.orderMap.taskType
					this.singleAmount = res.orderMap.singleAmount
					this.taskNum = res.orderMap.taskNum
					this.completedNum = res.orderMap.completedNum
					this.surplusCount = res.orderMap.surplusCount
					this.taskDescription = res.orderMap.taskDescription
					this.manyRunFlag = res.orderMap.manyRunFlag
					this.publishTime = res.orderMap.publishTime
					this.endTime = res.orderMap.endTime
					this.taskAppendixPath = res.orderMap.taskAppendixPath
					this.taskAppendixName = res.orderMap.taskAppendixName
					this.raiderImage = res.taskRaider.raiderImage 
					this.raiderContent = res.taskRaider.raiderContent
					this.raiderSort = res.taskRaider.raiderSort 					
					this.taskValidtime = res.orderMap.taskValidtime					
					var flag = res.orderMap.manyRunFlag;					
					//判断任务是否已经过期
					console.log("判断任务是否已经过期")
					console.log(res.orderMap.endTime);
					console.log(res.orderMap.taskValidtime);
					if(this.taskValidtime <= 0){
						console.log("ddd")
						this.isValid = false
						console.log(this.isValid)
					}else{
						this.isValid = true
						//倒计时
						this.t = Math.floor(this.taskValidtime/1000);
						setTimeout(this.getDJS,0);
				    	this._timer = setInterval(this.getDJS,1000);
				    	// console.log(this._timer)	
					}									
					if(flag&&flag=="1"){
						this.manyRunFlag = "不限"
					}else{
						this.manyRunFlag = "每人一次"
					}
				}else{
					console.log('系统异常')
				}			
			})
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
			submittest(){
				this.$router.push('/todotest?title='+'提交任务'+'&orderId='+this.orderId+'&taskId='+this.taskId)
				//:to="{path:'/todotest?title='+'提交任务',query:{orderId:this.orderId,taskId:this.taskId}}"
				//this.$router.push('/bindbanktwo?title='+title);
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

					if(arr[2] == null){
						this.hours === '00';
						$('._h').css('display','none')
					}
		        }
		    }	
	          
		},
		components:{bigImg}
	}	
</script>

<style lang="scss" scoped>
	@import 'src/style/mixin';
	.gettest{width: 100%;height: 100%;background: #f0f0f0;font-family: PingFangSC-Regular;}
	
	.share{width: 100%;background: #fff;margin-bottom: 0.63rem;overflow: hidden;}
	.share .header{height: 2.75rem;margin-top: 1.31rem;margin-left: 17.1%;border: 0;}
	.share .header .ashare{width: 2.75rem;height: 2.75rem;float: left;
		@include beijing();
		border-radius: 50%;font-family: PingFangSC-Semibold;font-size: 1rem;color: #333333;font-weight: 900;line-height: 2.75rem;text-align: center;
		overflow: hidden;border: 0;
	}
	.share .header .name{width: 78%;height: 1.38rem;float: left;font-family: PingFangSC-Regular;font-size: 1rem;color: #333333;margin-top: 0.685rem;border: 0;}
	
	.share .money{width: 100%;height: 3.13rem;}
	.share .money span{display: inline-block;width: 8rem;height: 100%;font-family: PingFangSC-Medium;font-size: 2.25rem;color: #F5A623;margin-left: 33.5%;line-height: 3.13rem;float: left;}
	.share .money i{display: inline-block;width: 7%;height: 1.31rem;font-family: PingFangSC-Semibold;font-size: 0.9375rem;color: #F5A623;float: left;margin-top: 1.5rem;}
	
	.share .slist{display: flex;width: 100%;height: 2.87rem;border-bottom: 1px solid #f0f0f0;margin-top: 0.44rem;margin-bottom: 1.25rem;}
	.share .slist li{flex: 1;height: 100%;float: left;}
	.share .slist li span{display: block;width: 100%;height: 1.56rem;font-family: PingFangSC-Regular;font-size: 1.125rem;color: #666666;}
	.share .slist li i{display: block;font-style: normal;width: 100%;height: 1.31rem;font-family: PingFangSC-Regular;font-size: 0.8125rem;color: #9B9B9B;}
	.share .slist .total{}
	.share .slist .surplus{}
	.share .slist .time{}
	.share .limit{height: 2.25rem;margin:0 auto;font-family: PingFangSC-Regular;font-size: .875rem;color: #9B9B9B;margin-top: .69rem;}
	
	.discribe{width: 100%;overflow: hidden;background: #fff;margin-bottom: 0.63rem;padding-bottom: 1rem;}
	.discribe .center{width: 92.3%;overflow:hidden;margin-left: 3.7%;}
	.discribe h3{width: 25%;height: 1.38rem;margin-top: 0.63rem;margin-top: 0.38rem;text-align: left;font-family: PingFangSC-Regular;font-size: 1rem;color: #333333;line-height: 1.38rem;}
	.discribe p{font-family: PingFangSC-Regular;font-size: .8125rem;color: #777777;line-height: 1.314rem;text-align: left;}

		
	.process{width: 100%;overflow: hidden;background: #fff;padding-bottom: 3.13rem;}
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
	.process .center .content li .right .location{width: 1.56rem;height: 1.56rem;background: #FFD744;border-radius: 100%;position: absolute;top: 0;left: -0.78rem;font-family: PingFangSC-Medium;font-size: 1.125rem;color: #000000;line-height: 1.56rem;text-align: center;}
		
/***************底部******************************************************************************************************/		
	.receive{width: 100%;height: 3.63rem;background: #fff;border-top: 1px solid #eee;position: fixed;bottom: 0;left: 0;
	}
/*********************底部剩余时间********************/
	/*****提交任务*******/
	.surercv{width: 55%;height: 100%;
		@include beijing2();
		font-size: 1rem;color: #333333;
		float: right;
		line-height: 1.5rem;		
		color: #000;
	}
	.gray{
		width: 55%;
		height: 100%;		
		font-size: 1rem;
		color: #333333;
		float: right;
		line-height: 3.63rem;		
		color: #000;
		background: #aaa;
	}
	.overplustime{
		width: 100%;
		height: 50%;
		font-family: PingFangSC-Regular;
		font-size: .875rem;color: #000;
		line-height: 2.6rem;
	}
	.receive{width: 100%;height: 3.63rem;position: fixed;left: 0;bottom: 0;background: #fff;		
		}
	.left{width: 45%;
		height: 100%;
		float: left;
		font-size: 0.8rem;
		line-height: 3.63rem;
		color: #666;
	}	
	.surercvwords{
		color: #000;
	}
	.timeimg{float: left;width: .94rem;height: .94rem;
		position: relative;
	}
	.timeimg img{width: 100%;height: 100%;
		position: absolute;
		top: 0.8rem;
		left: 0.2rem;
	}
	.receive .left .timetext{float: left;width: 4rem;height: .94rem;font-family: PingFangSC-Regular;font-size: .875rem;color: #9B9B9B;margin-top: 1.6rem;}
	.receive .left .time{display: flex;float: left;width: 5rem;height: .94rem;font-family: PingFangSC-Regular;font-size: .875rem;color: #9B9B9B;margin-top: 1.6rem;margin-left: .5rem;}
	.receive .left .time span{flex: 1;}
</style>