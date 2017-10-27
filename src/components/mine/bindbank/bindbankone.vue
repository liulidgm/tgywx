<template>
<div class="bindCard">
	<img class="img" style="height:1.78rem;width:17.66rem;margin:2rem 0;" src="../../../assets/icons/bc-one.png" />
	<div class="input-area">
		<input class="common-input name" placeholder="请输入姓名"></input>
		<input class="common-input idcard" placeholder="请输入身份证号码"></input>
	</div>
	<button class="common-btn" @click="bindcardNext()">
		下一步
	</button>
</div>
	
</template>

<script>
	
	import $ from 'jquery';
	import { setUserCardId } from '@/service/getdata'
	import {Toast} from 'mint-ui'
	export default {
		data(){
			return {
				content:''
			}
		},
		mounted(){
			
		},
		methods:{
			bindcardNext(){
				var name = $('.name').val();
				var idcard = $('.idcard').val();
				//18位身份证号码
				var reg1=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
				var reg2=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/; 
				
				console.log(name)
				
				if(name == ''){
					//alert('姓名不能为空')
					$('.name').focus()
				    $('.name').addClass('inputred')
				}else if(idcard == ''){
					//alert('身份证不能为空')
					$('.idcard').focus()
					$('.idcard').addClass('inputred')
				}else if(reg1.test(idcard)||reg2.test(idcard)){
					
					//传入数据
					setUserCardId(name,idcard).then(res=>{
						if(res.code=="000"){
							//异步请求后台成功后进入下一步
							let title = '绑定银行卡'
							this.$router.push('/bindbanktwo?title='+title);
						}else{
							Toast(res.msg);
						}
					})
				}else{
					Toast('请输入正确的身份证号码')
					$('.idcard').focus()
					$('.idcard').val(idcard)
					$('.idcard').addClass('inputred')
				}
				
			}
			
		}
	}
</script>

<style lang="scss">
.bindCard{
	height:100%;
	background:#fff;
	padding:0 12.8%;
	img{
		height:1.78rem;margin:2rem 0;width: 17.66rem;
		}
	.input-area{
		 width: 100%;
	}
}
/*.bindCard .img{height:1.78rem;width: 17.66rem;margin:2rem 0;}*/
	
</style>