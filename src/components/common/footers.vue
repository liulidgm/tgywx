<template>
	<div class="footers">
		
			<router-link :to="{path:'/index'}" class="a-link">
				<span class="icon-index" ></span>
				<span class="icon-text">首页</span>
			</router-link>
			<router-link :to="{path:'/tests',query:{title:'任务状态'}}" class="a-link">
				<span class="icon-task" :style="styleObj"></span>
				<span class="icon-text">任务状态</span>
			</router-link>
			<router-link :to="{path:'/news',query:{title:'消息'}}" class="a-link">
				<span class="icon-msg"></span>
				<span class="icon-text">消息</span>
			</router-link>
		
			<router-link :to="{path:'/mine',query:{title:'个人中心'}}" class="a-link">
				<span class="icon-mine"></span>
				<span class="icon-text">我的</span>
			</router-link>
			
	</div>
</template>
<script>
	import $ from 'jquery'
	export default {
		props:['styleObj'],
		data(){
			return {
				
			}
		},
		mounted(){
//			var 
//				aImg = $('.footers img'),
//				aLi = $('.footers li');
//				//console.log(aLi);
//				aLi.click(function(){
//					console.log(123);
//				})
			this.click();

//			aImg.click(function(){
//				console.log(123)
//				//$(this).attr('src','../../assets/dibu/shouye-b@2x.png');
////				src="../../assets/dibu/shouye-a@2x.png"
//			})
		},
		methods:{
			click(){
				var 
					aImg = $('.footers img'),
					aLi = $('.footers li');
					//console.log(aLi);
					aLi.click(function(){
						//console.log(123);
					})
			}
		}
	}
</script>
<style lang="scss" scoped>
   @import 'src/style/icons';
   	.footers{
   		width: 100%;height: 3.13rem;background: #fff;position: fixed;left: 0;bottom: 0;
   		border-top:1px solid #c7c7cc;
   		display: flex;
   		z-index: 999999999999999999;
   		.a-link{
	 		flex: 1;
		    display: flex;
		    text-align: center;
		    flex-direction: column;
		    align-items: center;
		    padding-top:0.4rem;
   		}
   		.icon-text{
   			display: block;
   			height: .88rem;
   			font-size: .63rem;
   			color: #979797;;
   			text-align: center;
   			padding: .38rem 0;
   		}
   	}
	
	
	.footers 
	.router-link-active{
		span{
			color:#FFE37F;
		}
		.icon-text{color: #282E37;;}
	}
</style>