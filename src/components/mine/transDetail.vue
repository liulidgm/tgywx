<template>
<div class="transDetail">
	<div class="callback" @click="callback()">返回上一页</div>
	<div class="item" v-for="item in orderList" v-show="!isEmpty">
		<div class="col_1"><h2>{{item.taskName}}</h2></div>
		<div class="col_2">
			<span class="money">{{item.singleAmount}}元</span>
			<span class="cardid">卡号：{{bankCard}}</span>			
			<div style="cleatr:both"></div>
		</div>
		
		<div class="col_3">{{item.orderDate}}</div>
	</div>
	<div class="isEmpty"  v-show="isEmpty">
		<img src="../../assets/nodata.png" style="width:7rem;" />
		<div style="color:#666;">暂无数据</div>
	</div>
	<!-- <div class="item">
		<div class="col_1">亚太蒂森电梯专注富士电梯 “优良品质,贴心服务”赢得了海内外客户的</div>
		<div class="col_2">
			<span class="money">5000.00元</span>
			<span class="cardid">卡号：2345783218</span>
			<div style="cleatr:both"></div>
		</div>
		
		<div class="col_3">2017/09/01 12:00:00</div>
	</div> -->
</div>
	
</template>

<script>
	
	import $ from 'jquery';
	import {selTransactionRecord} from '@/service/getdata'
	import {Toast} from 'mint-ui'
	export default {
		data(){
			return {
				orderList:'',
				isEmpty:false,
				bankCard:''
			}
		},
		mounted(){
			selTransactionRecord().then(res=>{
				 console.log(res)
				if(res.code=="000"){
					this.orderList = res.orderList;
					this.bankCard = res.bankCard||'未绑卡';
					//console.log(this.orderList[0].orderDate)
					//console.log(res)
					if(this.orderList&&this.orderList.length>0){
						this.isEmpty = false;
					}else{
						this.isEmpty = true
					}
				}else{
					Toast(res.msg);
				}
			});
		},
		methods:{
			callback(){
				window.history.back(-1)
			}
		}
	}
</script>

<style lang="scss" scoped>
.transDetail{
	width: 100%;
	height:100%;
	text-align:left;
	.item{
		min-height: 2rem;
		background: #fff;
		border-bottom: 1px solid #ddd;
		padding:0.5rem 0.5rem;
		.col_1{
			width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.money{float:left;color:#F5A623;font-size:1.25rem;}
		.cardid{float:right}
	}
	.item>div{padding:0.5rem 0.5rem;min-height:1rem;}
	.item:last-child{
		border:0
	}
	.isEmpty{
		text-align: center;
		margin-top: 4rem;
	}
}

.callback{
	width: 100%;
	height: 30px;
	background: #fff;
	border-bottom: 1px solid #f0f0f0;
	line-height: 30px;
	text-indent: 1rem;
    font-family: PingFangSC-Regular;
    font-size: .9375rem;
    color: #333333;
}
	
</style>