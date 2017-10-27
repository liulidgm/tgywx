<template>
	<div class="mymoneydetail">
		<div class="account">
			<h3>当前余额</h3>
			<div class='con'>
				<div class="money">￥{{allAmount}}元</div>
				<div class='pickcash' @click="clickcash()">提现</div>
			</div>	
			<!--------提现浮框-------------->
			<div class="floatblock">
				<span v-if='can'>您已提现{{allAmount}}元，平台将于下周四（如遇节假日顺延至下一工作日）进行统一打款操作，届时烦请查收</span>
				<span v-if='cannot'>账户余额小于50，不能提现哦</span>
			</div>
		</div>	
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { getUserTaskStatistics , withoutDraw , getUserUseableAmount} from '@/service/getdata'	
	export default {
		data(){
			return {
				userTask:'',
				cardId:'',
				allAmount:'',
				headImgUrl:'',
				can:'',
				cannot:''
			}
		},
		mounted(){
//			getUserTaskStatistics().then(res=>{
//				var _self = this
//				if(res.code == '000'){
//					console.log(res)
//					this.userTask = res.userTask
//					this.cardId = res.userTask.cardId;
//					this.allAmount = res.userTask.allAmount;
//				}else{
//					
//				}
//			})	
			//当前余额
			getUserUseableAmount().then(res=>{
				if(res.code == '000'){
					//console.log(res)
					this.allAmount = res.userTask.allAmount;
				}else{
					
				}
			})
		},
		methods:{
			clickcash(){
				$('.floatblock').css('display','block')
				$('.floatblock').click(function(){
					$('.floatblock').css('display','none')
				})
				//判断账户余额是否大于50
				if(this.allAmount >= 50){
					this.can = true
					this.cannot = false					
						console.log(this.allAmount)
					//提现
					withoutDraw(this.allAmount).then(res=>{
						console.log(res)
						if(res.code == '001'){
							Toast('提交失败')
						}else if(res.code == '002'){
							Toast('请先绑定银行卡')
						}						
					})					
				}else{
					this.can = false
					this.cannot = true
				}				
			}
		}
	}
</script>

<style scoped>
	.mymoneydetail{
		width: 100%;
		background: #fff;
		/*overflow: hidden;*/
		font-family: .PingFangSC-Regular;	
		color: #666;
	}
	.account{
		width: 100%;
		height: 7.2rem;
		position: relative;
	}	
	.account h3{
		width: 88%;
		height: 2rem;
		text-align: left;
		font-size: 1rem;
		line-height: 2rem;
		margin: 0 auto;
	}
	.con{
		width: 90%;
		height: 100%;
		margin: 0 auto;
	}
	.money{
		width: 60%;
		height: 4rem;
		text-align: left;
		font-size: 2rem;
		line-height: 4rem;
		float: left;
		display: inline-block;
		text-align: left;
	}
	.pickcash{
		display: inline-block;
		width: 50px;;
		height: 20px;
		float: left;
		background: #ddd;
		margin-top: 1rem;
		margin-left: 4rem;
		line-height: 20px;
	}	 
	 /*****提现浮框*******/
	 .floatblock{
	 	z-index: 999999;
	 	width: 50%;
	 	overflow: hidden;
	 	position: absolute;
	 	top: 3rem;
	 	left: 5.2rem;
	 	display: none;
	 }
	 .floatblock span{
	 	display: block;
	 	width: 99%;
	 	background: #ffd743;
	 	border: 1px solid #999;
	 	font-size: 0.9375rem;
		line-height: 1rem;
		text-align: left;
		text-indent: 5px;	
	 }
</style>