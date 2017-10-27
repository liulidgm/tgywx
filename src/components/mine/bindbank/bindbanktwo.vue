<template>
<div class="bindCard">
	<img style="height:1.78rem;width: 17.66rem;margin:2rem 0;" src="../../../assets/icons/bc-two.png">
	<div class="input-area">
		<input class="common-input bankcardid" placeholder="请输入银行卡号"></input>
		<input class="common-input bank" placeholder="请输入开户银行"></input>
		<input class="common-input phone" placeholder="请输入银行预留手机号"></input>
	</div>
	<button class="common-btn" @click="bindCardNext()">
		下一步
	</button>
</div>
	
</template>

<script>
	import $ from 'jquery';	
	import { setUserBank,getWXVerifyCode } from '@/service/getdata'	
	import {Toast} from 'mint-ui'
	export default {
		data(){
			return {
				userPhone:''
			}
		},
		mounted(){			
		},
		methods:{
			//异步请求后台成功后进入下一步
			bindCardNext(){
				var 
					bankcardid = $('.bankcardid').val(),
					bank = $('.bank').val(),
					phone = $('.phone').val();
				var reg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/ ;
				
				if(bankcardid == ''){
					$('.bankcardid').focus();
					$('.bankcardid').addClass('inputred')
				}else if(bank == ''){
					$('.bank').focus();
					$('.bank').addClass('inputred')
				}else if(phone == ''){
					$('.phone').focus();
					$('.phone').addClass('inputred');
				}else if(reg.test(phone)){										
					//web存储
					localStorage.setItem('bankcardid',bankcardid)
					localStorage.setItem('bank',bank)
					localStorage.setItem('phone',phone)		
					
					this.userPhone = localStorage.getItem('phone');					
					//console.log(this.userPhone)
//					var data = localStorage.getItem(bankcardid)
//					console.log(data);		
//					console.log(bankcardid);	
					//this.$router.push('/bindbankSuccess');
					getWXVerifyCode(this.userPhone,1).then(res=>{
						if(res.code=="000"){
							let title = '绑定银行卡'
							this.$router.push('/bindbankthree?title='+title);
						}else{
							Toast(res.msg);
						}
						
							
					})				
					
									
				}else{
					$('.phone').focus();
					$('.phone').val('');
					$('.phone').addClass('inputred')
				}
					
				
//				this.$router.push('/bindbankthree');
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
	}
}
	
</style>