<template>
	<div class="helpback">
		<span>您的建议</span>
		<textarea v-model="content" placeholder="请输入您的意见和反馈，我们会在第一时间通知您"></textarea>
		<div type="button" class="submit" @click="subOption()">提交</div>
	</div>
</template>

<script>
	import $ from 'jquery'
	import {saveOpinion} from '@/service/getdata'
	import {} from '@/config/utils'
	import {Toast} from 'mint-ui'
	
	export default {
		data(){
			return {
				content:''			
			}
		},
		methods:{
			subOption(){
				saveOpinion(this.content).then(res=>{
					console.log(res)
					if(res.code=="000"){
						this.$toast('提交成功');
						//Toast('提交成功');
					}else{
						this.$toast(res.msg);
					}
				})
			}
		}
	}
</script>

<style scoped>

    /*@import 'src/style/mixin';*/
   
	.helpback{width: 100%;height: 100%;overflow: hidden;background: #fff;}
	.helpback span{display: block;width: 5rem;height: 1.31rem;margin-top: 1.5rem;margin-left: 4.3%;font-family: .PingFang-SC-Regular;font-size: 0.9375rem;color: #282E37;}
	.helpback textarea{display: block;width: 86.1%;height: 10rem;margin-left: 3.7%;margin-top: 0.63rem;border: 0;font-family:.PingFang-SC-Regular;font-size: 0.9375rem;color: #979797;letter-spacing: -0.36px;padding: 0.44rem 0.88rem 0 0.63rem;background: #F8F8F8;resize: none;line-height: 1.31rem;border-radius: 4px;}
	.helpback .submit{width: 74.7%;height: 2.5rem;line-height: 2.5rem;
		/*@include beijing2();*/
		background: #FFD743;border: 0;margin-top: 2.5rem;margin-left: 12.8%;margin-right: 12.5%;font-family: .PingFangSC-Regular;font-size: 1.125rem;color: #FFFFFF;letter-spacing: 0;
		border-radius: 1.25rem;
	}
</style>