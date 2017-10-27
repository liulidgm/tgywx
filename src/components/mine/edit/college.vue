<template>
	<div class="college">
		<!--<div class='header'>
			<input class='input' type='text' placeholder="请输入学校名称"  />			
				<!--<input class="button" type="button" value="确定" @click='clickButton()' />-->
				<!--<div class="button" type="button" @click='clickButton()'>确定</div>
			<img src="../../../assets/homepage/fangda@2x.png" class="fangda" />
			<img src="../../../assets/mine/guanbi@2x.png" class="cancel" />
		</div>-->		
		<div class='header'>
			<div class="center">
				<input class='input' type='text' placeholder="请输入院校名称" />
				<img src="../../../assets/homepage/fangda@2x.png" class="fangda" />
				<img src="../../../assets/mine/guanbi@2x.png" class="cancel" @click="clickcancal()" />	
			</div>			
			<div class="button" type="button" @click='clickButton()'>确定</div>													
		</div>	
		
	</div>
</template>

<script>
	import $ from 'jquery'
	import edit from 'components/mine/edit'
	
	import {setUserInfo } from '@/service/getdata'
	
	export default {
		data(){
			return {
				input:''
			}
		},
		mounted(){
			this.initdata()
		},
		methods:{
			clickButton(){
				var input = $('.input').val();
				
				//console.log(input)
				if(input == null){
					this.input = ''
				}else{
//					this.input = encodeURI(input);
					this.input = input;
					console.log(input)
				}
				//设置院校
				var _self = this
				setUserInfo('','','',this.input,'','').then(res=>{							
					if(res.code == '000'){
						this.$router.push('/edit?title='+"个人资料");											
					}else{
						
					}
				})				
			},
			initdata(){				
			},
			clickcancal(){
				console.log(12)
				$('.input').val('');
			}
		},
		components:{ edit }
	}
</script>

<style scoped >	
	.college{width: 100%;height: 3.63rem;}
	.header{width: 100%;height: 3.63rem;background: #fff;position: relative;overflow: hidden;}
	
	.center{width: 80%;height: 1.88rem;padding: 0.25rem 0;
		/*margin-top: .75rem;margin-left: 5%;*/
		float: left;position: relative;
		background: #fff;
		position: absolute;left: 5%;top: 0.75rem;
		}
	.center .input{display: inline-block;width: 85%;height: 1.88rem;padding-left: 2.3rem;margin: 0;
		background: #F0F0F0;
		border-radius: 1.25rem;border: 0;}	
	
	.center .fangda{display: inline-block;width: .75rem;height: .8rem;position: absolute;left: 4.5%;top: 0.68rem;
		padding: 0.5rem;
		padding-top: 0;
		}
	.center .cancel{display: inline-block;width: .81rem;height: .81rem;position: absolute;right: 5%;top: 0.68rem;			
			padding: 0.5rem;
			padding-top: 0;
			}
	
	input{margin: 0 !important;}
	.button{
		width: 2rem;
		height: 1.88rem;
		font-family: .AppleSystemUIFont;
		color: #0076FF;text-align: center;
		line-height: 1.31rem;border: 0;
		background: #fff;	
		line-height: 2.2rem;
		font-size: 0.9375rem;
		letter-spacing: -0.36px;
		/*margin-left: 2%;margin-top: 1rem;*/
		position: absolute;right: 3%;top: 1rem;
		margin: 0 !important;
		}			
	/*.collegeinfo{width: 100%;overflow: hidden;}
	.collegeinfo ul{width: 100%;overflow: hidden;}
	.collegeinfo ul span{display: block;width: 100%;height: 1.94rem;font-family: PingFangSC-Regular;font-size: .9375rem;color: #333333;text-align: left;line-height: 1.94rem;margin-left: 4.3%;}
	.collegeinfo ul li{width: 100%;height: 2.75rem;border-bottom: 1px solid #f0f0f0;background: #fff;text-align: left;line-height: 2.75rem;padding-left: 4.3%;}*/
</style>