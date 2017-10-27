<template>
<div class="bindCard">
	<img src="../../../assets/testdetail/3@2x.png">
	<p>绑定成功!</p>
	<button class="common-btn" @click="bindCardSub()">
		返回
	</button>
</div>
	
</template>

<script type="text/ecmascript-6">
	import $ from 'jquery';
	
	export default {
		data(){
			return {}
		},
		mounted(){
			
		},
		methods:{
			bindCardSub(){
				this.$router.push('/wallet?title='+'我的钱包');
			}
		}
	}
</script>

<style lang="scss">
.bindCard{
	height:100%;
	background:#fff;
	padding:0 12.8%;
	img{height:4.82rem;
	width: 4.82rem;
	margin: 0 auto;
	margin-top:3rem;}
	p{
		line-height:1.5rem;
		margin:1rem 0 2rem 0;
	}
}
	
</style>