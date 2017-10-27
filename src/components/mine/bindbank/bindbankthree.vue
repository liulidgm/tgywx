<template>
<div class="bindCard">
	<img style="height:1.78rem;width: 17.66rem;margin:2rem 0;" src="../../../assets/icons/bc-three.png">
	<div class="input-area">
		<p>已向<span class='phonenum'>139****2345</span>发送短信验证码，请注意查收</p>
		<input class="common-input verticode" placeholder="请输入短信验证码" />
	</div>
	<button class="common-btn" @click="bindCardSub()">
		提交
	</button>
</div>
	
</template>

<script>
	import $ from 'jquery';
	import { getWXVerifyCode , WXVerifiedCode ,setUserBank } from '@/service/getdata'	
	import {Toast} from 'mint-ui'
	export default {
		data(){
			return {
				userPhone:'',
				phoneCode:'',
				sendType:'',
				bankCard:'',
				openBankName:'',
				mobile:''
			}
		},
		mounted(){			
			var phonenum = $('.phonenum').val()
			var phonenumber = localStorage.getItem('phone')	
			this.userPhone = phonenumber;
			
			//console.log(this.userPhone)
			$('.phonenum').text(phonenumber);
				
			var data = phonenumber.substring(3,7).replace('****')
			//console.log(phonenumber.substring(3,7))
			//console.log(data)				
		},
		methods:{
			bindCardSub(){
				var verticode = $('.verticode').val();
				this.phoneCode = verticode;
				WXVerifiedCode(this.userPhone,this.phoneCode,1).then(res=>{
					    console.log(res)
					if(res.code == '000'){
						this.bankCard = localStorage.getItem('bankcardid')
						this.openBankName = localStorage.getItem('bank')
						this.mobile = localStorage.getItem('phone')
						console.log(this.openBankName)
							//console.log(this.bankCard)
						setUserBank(this.bankCard,this.openBankName,this.mobile).then(res=>{
							//跳转成功页面
							if(res.code=="000"){
								let title = '绑定银行卡'
								this.$router.push('/bindbankSuccess?title='+title);
							}else{
								Toast(res.msg)
							}
							
						})
					}else{
						Toast(res.msg)
					}
				})
				
			}
		}
	}
</script>

<style lang="scss">
.bindCard{
	height:100%;
	background:#fff;
	padding:0 12.8%;
	img{height:1.78rem;margin:2rem 0;width: 17.66rem;}
	.input-area{
		 width: 100%;
		 p{
		 	span{color:rgb(3,120,255);}
		 	line-height:1.5rem;
		 	margin-bottom:1rem;
		 }
	}
}
	
</style>