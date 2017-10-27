<template>
	<div class="wallet">
		<!------我的余额------->
		<div class="account" @click="mymoneydetail()">
			<div class='head'>
				<img style="width: 2.56rem;height: 2.56rem;border-radius: 100%;" :src="headImgUrl"/>
			</div>
			<div class='balance'>
				<i>我的余额</i>
				<em>{{allAmount}}元</em>
			</div>
		</div>
		
		
		<!--交易明细-->
		<div class="deal" @click="goTransDetail()">
			<i>交易明细</i>
			<span><img src='../../assets/news/spider@2x.png' /></span>
		</div>
		<!--绑定提现银行卡-->
		<!--<router-link :to='{path:"/bindbankone"}'>-->
		<div class="cash" @click="bandtixianCard()">
			<i>绑定提现银行卡</i>
			<span><img src='../../assets/news/spider@2x.png' /></span>
		</div>
		<!--</router-link>-->
		
		<!--已绑银行卡-->
		<div class="card">
			<i>已绑银行卡</i>
			<span class="bankname">卡号：{{bankCard}}</span>
		</div>
	</div>
</template>

<script>	
	
	import { getUserTaskStatistics ,getUserUseableAmount} from '@/service/getdata'	
	
	export default {
		data(){
			return {
				userTask:'',
				cardId:'',
				allAmount:'',
				headImgUrl:'',
				bankCard:''
			}
		},
		mounted(){
			getUserTaskStatistics().then(res=>{
				var _self = this
				if(res.code == '000'){
					//console.log(res)
					this.userTask = res.userTask
					//this.cardId = res.userTask.cardId;
					//this.allAmount = res.userTask.allAmount;
					this.headImgUrl = res.userTask.headImgUrl;
					this.bankCard = res.userTask.bankCard;
					//console.log(this.bankCard)
					//.log(this.cardId)
					//console.log(res.userTask.cardId)
					if(_self.bankCard == ''||_self.bankCard == undefined){
						$('.cash').css('display','block');
						$('.card').css('display','none');
					}else{
						$('.card').css('display','block');
						$('.cash').css('display','none');
						//$('.bankname').val(res.userTask.bankCard)
					}
				}else{
					
				}
			});
			getUserUseableAmount().then(res=>{
				//console.log(res)
				if(res.code == '000'){
					this.allAmount = res.userTask.allAmount;
				}else{
					
				}
				//console.log(this.allAmount)
			})
		},
		methods:{
			//交易明细
			goTransDetail(){
				let title = '交易明细'
				this.$router.push('/transDetail?title='+title);
			},
			//绑定提现银行卡
			bandtixianCard(){
				let title = '绑定银行卡'
				this.$router.push('/bindbankone?title='+title);
			},
			mymoneydetail(){
				this.$router.push('/mymoneydetail?title='+'我的余额');
			}
		},
		components:{  }
	}
	
</script>

<style>
	.wallet{width: 100%;height: 100%;background: #f0f0f0;}
	
	.account{width: 100%;height: 5rem;background: #fff;margin-bottom: 0.63rem;overflow: hidden;}
	.account .head{float: left;width: 2.56rem;height: 2.56rem;border-radius: 50%;background: skyblue;margin-top:1.09rem;margin-left: 3.6%;}
	.account .balance{float: left;width: 20%;height: 2.13rem;margin-top: 1.31rem;margin-left: 0.59rem;}
	.account .balance i{display: block;width: 100%;height: 1rem;font-family: .PingFangSC-Regular;font-size: 0.8125rem;color: #979797;letter-spacing: 0;text-align: left;}
	.account .balance em{display: block;width: 100%;height: 1.13rem;font-family: .PingFangSC-Regular;font-size: .9375rem;color: #333333;letter-spacing: 0;text-align: left;}
	
	.account span{float: right;width: 2.4rem;height: 100%;}
	.account span img{display: inline-block;width: .56rem;height: 0.81rem;margin-top: 2rem;}	
	
	.deal{width: 100%;height: 2.75rem;background: #fff;margin-bottom: 0.63rem;}
	.deal i{display: inline-block;width: 40%;height: 1.13rem;font-family: .PingFangSC-Regular;font-size: 0.9375rem;color: #333333;letter-spacing: 0;float: left;margin-top: 0.81rem;margin-left: 3.7%;text-align: left;}
	.deal span{display: inline-block;float: right;width: 2.4rem;height: 100%;}
	.deal span img{display: inline-block;width: .56rem;height: 0.81rem;margin-top: .81rem;}
	
	.cash{width: 100%;height: 2.75rem;background: #fff;margin-bottom: 0.63rem;display: none;}
	.cash i{display: inline-block;width: 40%;height: 1.13rem;font-family: .PingFangSC-Regular;font-size: 0.9375rem;color: #333333;letter-spacing: 0;float: left;margin-top: 0.81rem;margin-left: 3.7%;text-align: left;}
	.cash span{display: inline-block;float: right;width: 2.4rem;height: 100%;}
	.cash span img{display: inline-block;width: .56rem;height: 0.81rem;margin-top: .81rem;}
	
	.card{width: 100%;height: 4.5rem;background: #fff;display: none;}
	.card i{display: inline-block;float: left;height: 1.13rem;font-family: .PingFangSC-Regular;font-size: 0.9375rem;color: #333333;letter-spacing: 0;float: left;margin-top: 1.81rem;margin-left: 3.7%;text-align: left;}
	.card span{display: inline-block;
    float: right;
    /* width: 45%; */
    height: 80%;
    text-align: center;
    font-size: 0.8125rem;
    color: #666;
    letter-spacing: 0;
    font-family: PingFangSC-Regular;
    line-height: 3.2rem;
    margin-right: 6%;
    margin-top: 0.7rem;}
	.card span img{width: 9.13rem;height: 2.88rem;background: skyblue;margin-top: 0.94rem;}
</style>