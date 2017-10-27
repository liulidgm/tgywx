<template>	
	<div class="tests">
		<ul class="testsnav">
			<li class="active">已领取</li>
			<li >审核中</li>
			<li >未通过</li>
			<li >已完成</li>
		</ul>
		
		<div class="list_content" id="list_content">			
		<!--<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" v-show="!isEmpty"
			@bottom-status-change="handleBottomChange" ref='loadmore'>	-->			
			<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" ref="loadmore" :auto-fill="false" :bottom-all-loaded="allLoaded"@bottom-status-change="handleBottomChange" v-show="!isEmpty">
			



			<ul class="homelists">
				
                    <li  class="line-wrapper" v-for="(item,index) in orderList" >
			  	  		<left-slider v-if="item.orderState==0||item.orderState==2" :index="item.orderId" :orderId="item.orderId" :taskId="item.taskId" :orderState="item.orderState"  @deleteItem="deleteItem">
				  	  		<div class='center' @click.capture="clickdetail(item.orderState,item.orderId,item.taskId)">
				  	  			<div style="float:left;width:65%">
				  	  				<div class="name">{{item.taskName}}</div>
				  	  				<div class="under">
					  	  				<div class="money">{{item.singleAmount}}</div>
						  	  			<div class="init">元</div>
						  	  			<div class="number">剩余{{item.surplusCount}}次</div>
				  	  				</div>
				  	  			</div>
				  	  			<div class='right' v-if="item.orderState=='0'">
						  	  		<div class="todotest" ref='todotest'>提交</div>
						  	  		<div class="todotests" ref="todotests">已领取未提交</div>
					  	  		</div> 
					  	  		<div class="right"  v-if="item.orderState=='2'">
					  	  			<div class="todotest" ref='todotest'>查看</div>
					  	  			<div class="todotests" ref="todotests">未通过</div>
					  	  		</div>
					  	  		<div class="clearfix"></div>
					  	  	</div>
			  	  		</left-slider>
			  	  		<div v-else>
			  	  			<div class='center' @click.capture="clickdetail(item.orderState,item.orderId,item.taskId)">
				  	  			<div style="float:left;width:65%">
				  	  				<div class="name">{{item.taskName}}</div>
				  	  				<div class="under">
					  	  				<div class="money">{{item.singleAmount}}</div>
						  	  			<div class="init">元</div>
						  	  			<div class="number">剩余{{item.surplusCount}}次</div>
				  	  				</div>
				  	  			</div>
				  	  			<div class="right"  v-if="item.orderState=='1'">
					  	  			<div class="todotest" ref='todotest'>查看</div>
					  	  			<div class="todotests" ref="todotests">审核中</div>
					  	  		</div> 
					  	  		<div class="right"  v-if="item.orderState=='3'">
					  	  			<div class="todotest" ref='todotest'>查看</div>
					  	  			<div class="todotests" ref="todotests">已完成</div>
					  	  		</div>
					  	  		<div class="clearfix"></div>
				  	  		</div>
			  	  		</div>			  	  		
			  	  	</li>	 
                
		  	  	 	  	  	  	  	 	  	  	
		  	  </ul> 
	  	  
	  	  	  <div v-show="loadFlag" class="nomore">没有更多数据</div>
	  	  	  
		  	  <div slot="top" class="mint-loadmore-top">
			      <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">下拉刷新</span>
			      <span v-show="topStatus === 'loading'">Loading...</span>
			  </div>
			  <div slot="bottom" class="mint-loadmore-bottom">
			      <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">加载更多</span>
			      <span v-show="bottomStatus === 'loading'">Loading...</span>
			  </div>
		  
		  
	  	  </mt-loadmore>
	  	  <div v-show="isEmpty" class="nodata" style="margin-top:4rem;">
		  	  		<img src = '../../assets/nodata.png' style="width:6rem;" />
		  	  		<p style="color:#666">暂无数据</p>
		  	  </div>
	  	  <!--加载更多-->
		  </div>
	  	  
	  	  <footers :styleObj="footerstyle"></footers>
	</div>
</template>

<script>
	import $ from 'jquery'
	import { Loadmore  , Toast } from 'mint-ui';	
	import footers from 'components/common/footers'
	//任务详情
	import testdetail from 'components/tests/testdetail'
	//未通过
	import nopassdetail from 'components/tests/nopassdetail'
	//审核中详情
	import testingdetail from 'components/tests/testingdetail'
	//已完成详情
	import donedetail from 'components/tests/donedetail'
	//做任务
	import todotest from 'components/tests/todotest'	
	import { getTaskOrderList,cancelOrderd  } from '@/service/getdata'
	import LeftSlider from './sliderdel'
	
	export default {
		data(){
			return {
				orderState:'',		
				orderList:[],
				page:1,
				src:'',
				taskId:'',
				orderId:'',
				type:'',
				isEmpty:false,
				loadFlag:false,
				topStatus:'',
				bottomStatus:'',
				allLoaded:false,
				footerstyle:{
					color: '#ffe37f'
				}
			}
		},
		created(){
			
		},
		mounted(){
			
//			let a = document.documentElement.clientHeight-52;
//			$('#list_content').css('height',a);			
			
			getTaskOrderList(0,this.page).then(res=>{
				if(res.code == '000'){
					//console.log(res)
					this.orderList = res.orderList;
					this.orderState = 0
					//_self.src= '/todotest?orderState=0'
				}else{
					Toast('系统异常')
				}
			});		
			
			var _self = this;			
			$('.testsnav li').click(function() {
				_self.loadFlag = false;//每次切换tab,要是的列表可以上拉加载
				_self.allLoaded = false;
				_self.orderState = $(this).index();		
				$(this).addClass('active').siblings().removeClass('active');				
				//获取任务列表
				getTaskOrderList(_self.orderState,1).then(res=>{//切换tab请求的数据是第一页
					if(res.code == '000'){	
						_self.orderList = res.orderList;												
						if(res.orderList.length==0){
				 			_self.isEmpty = true;
				 		}else{
				 			_self.isEmpty = false;
				 			_self.orderList = res.orderList;
				 		}
					}else{
				 		Toast(res.msg);
				 	}
				})
			})			
		},
		methods:{
			loadTop() {
			   // 加载更多数据
			   this.page = 1;
			   this.$refs.loadmore.onTopLoaded();	
			   getTaskOrderList(0,this.page)
//			   .then(res=>{
//			   	  console.log(res)
//			   	  if(res.code == '000'){
//			   	  	this.orderList = res.orderList
//			   	  }
//			   })
//				getTaskOrderList(0,1)
			   //console.log(this.page)		   
			},			
			loadBottom() {				
 			  // 加载更多数据
			  this.$refs.loadmore.onBottomLoaded();				  
			  this.allLoaded = false;			  
			  this.page = this.page + 1;	
			  
   			  //console.log(this.page)			  
   			  //console.log(this.loadFlag+','+this.allLoaded)
   			  
			  getTaskOrderList(this.orderState,this.page).then(res=>{
			  	//console.log(res)
					  if(res.orderList.length == 0){
		                 $('.mint-loadmore-content').css('transform','translate3d(0px, 0px, 0px)');
		                  this.allLoaded = true;
		                  this.loadFlag = true;
		              }else{
		                this.orderList = this.orderList.concat(res.orderList);
		                this.$refs.loadmore.onBottomLoaded();
		              }
			  });
			  //console.log(this.page);
			},
			handleBottomChange(status) {
		        this.bottomStatus = status;
		    },
			clickdetail(orderState,orderId,taskId){
				var title = "任务详情"				
				if(this.orderState == 0){
					this.$router.push('/testdetail?title='+title+'&orderId='+orderId+'&taskId='+taskId);
				}else if(this.orderState == 1){
					this.$router.push('/testingdetail?title='+title+'&orderId='+orderId+'&taskId='+taskId)
				}else if(this.orderState == 2){
					this.$router.push('/nopassdetail?title='+title+'&orderId='+orderId+'&taskId='+taskId)
				}else if(this.orderState == 3){
					this.$router.push('/donedetail?title='+title+'&orderId='+orderId+'&taskId='+taskId)
				}
				
			},
			// 删除
	        deleteItem: function(taskId,orderId) {
	        	console.log(taskId+","+orderId);
	            cancelOrderd(taskId,orderId).then(res=>{
	            	console.log(res);
	            	getTaskOrderList(0,this.page).then(res=>{
						if(res.code == '000'){
							//console.log(res)
							this.orderList = res.orderList;
							this.orderState = 0
							$(".move").css('transform','translateX(0)');
							$(".deleteIcon").css('display','none');
						}else{
							Toast('系统异常')
						}
					});	
	            })
	        }		
		},
		components:{footers,nopassdetail,testingdetail,donedetail, testdetail , todotest , Loadmore ,LeftSlider}
	}
</script>

<style scoped>
.tests{width: 100%;overflow: hidden;}
.testsnav{display: flex;width: 100%;height: 3.25rem;background: #FFFFFF;box-shadow: 0 2px 4px 0 rgba(191,191,191,0.22);position: fixed;left: 0;top: 0;z-index: 999999999999;}
.testsnav li{flex: 1;float: left;width: 15%;height: 1.38rem;padding-bottom: .13rem;font-family: PingFangSC-Regular;font-size: 1rem;color: #333333;margin-top: .75rem;margin-left: 5%;margin-right: 5%;line-height: 1.38rem;}

.testsnav .active{border-bottom: 2px solid #ffd743;}

.list_content{
	/*overflow: auto;*/    
	width:100%;
	min-height: 5rem;
	position:relative;
	margin-bottom: 3rem;	
}

.homelists{width: 100%;overflow: hidden;background: #fff;
	margin-top: 3.3rem;
	margin-bottom: 1rem;
	}
.homelists li{width: 100%;height: 5rem;border-bottom: 1px solid rgba(191,191,191,0.22);overflow: hidden;}

.homelists li .left{width: 2.75rem;height: 2.75rem;margin-top: 1.13rem;margin-left: 3.7%;background: #ffd743;border-radius: 50%;float: left;text-align: center;line-height: 2.75rem;color: #333;font-weight: bold;font-family: PingFangSC-Semibold;
overflow: hidden;
/*white-space: nowrap;text-overflow: ellipsis;*/
}
.homelists li .center{width:100%;float: left;display:inline-block;margin-left: 3.7%;margin-top: 1.19rem;}
.homelists li .center .name{width: 100%;height: 1.38rem;text-align: left;
		overflow: hidden;
		white-space: nowrap;text-overflow: ellipsis;
		}
.homelists li .center .under{width: 100%;height: 1.75rem;overflow: hidden;}
.homelists li .center .under .money{float: left;overflow:hidden;height: 1.75rem;font-family: PingFangSC-Medium;font-size: 20px;color: #F5A623;}
.homelists li .center .under .init{float: left;width: 14%;height: 1.31rem;font-family: PingFangSC-Semibold;font-size: 15px;color: #F5A623;text-align: left;line-height: 1.31rem;font-weight: 700;margin-top: 0.13rem;}
.homelists li .center .under .number{float: left;width: 46%;height: 1.13rem;text-align: left;font-family: PingFangSC-Regular;font-size: 13px;color: #778892;line-height: 1.13rem;margin-top: 0.25rem;}

.homelists li .right{float: right;width:30%;height: 2.75rem;margin-top: 0.5rem;margin-right: 2.7%;}
.homelists li .right .todotest{width: 80.6%;height: 1.56rem;line-height: 1.56rem;background: #FFE37F;border-radius: 44px;font-family: PingFangSC-Regular;font-size: 14px;color: #333333;margin: 0 9.5%;}
.homelists li .right .todotests{width: 100%;height: 1.06rem;font-family: PingFangSC-Regular;font-size: 12px;color: #C7C7CC;margin-top: 0.13rem;}



.clearfix:after {
    display: table;
    content: " ";
    clear: both;
}

.clearfix:after {
    display: table;
    content: " ";
    clear: both;
}
.clearfix{
    *zoom: 1;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: " ";
}
.clearfix:after {
    clear: both;
}
.clearfix{
    *zoom: 1;
}
</style>