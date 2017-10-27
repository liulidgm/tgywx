<template>
	<div class='addcareer'>
		<div class='header'>
			<input class='input' type='text' placeholder="请输入职业名称" :value="content" ref="input" />
				<input class="button" type="button" value="确定" @click='clickbuttom(content)' />			
			<img src="../../../assets/homepage/fangda@2x.png" class="fangda" />
			<img src="../../../assets/mine/guanbi@2x.png" class="cancel" />
		</div>		
		<ul class='optcareer' v-for="data in typeList">
			<li @click="clickoptc(data.name)">{{data.name}}</li>						
		</ul>		
	</div>
</template>

<script>
	import edit from 'components/mine/edit'
	import {setUserInfo , selTypeList } from '@/service/getdata'
	
	export default {
		data(){
			return {
				typeList:'',
				content:''
			}
		},		
		mounted(){
			selTypeList(2).then(res=>{			
				this.typeList = res.typeList;
				console.log(this.typeList)
			})
		
		},
		methods:{
			clickoptc(data){
				this.content = data;
			},
			clickbuttom(data){
				//console.log(this.$refs.input.value())
				var input = $('.input').val()
				console.log(input)
				this.content = input
				setUserInfo('','',this.content,'','','').then(res=>{	
					if(res.code == '000'){
						console.log(res)
					    this.$router.push('/edit')
					}else{
						
					}
				})
			}
		},
		components:{ edit }
	}
</script>

<style>
	.addcareer{width: 100%;overflow: hidden;}
	.header{width: 100%;height: 3.63rem;background: #fff;position: relative;border-bottom: 1px solid #F0F0F0;}
	.input{width: 75%;height: 1.38rem;padding: 0.25rem 0;padding-left: 1.5rem;background: #F0F0F0;
border-radius: 1.25rem;border-radius: .94rem;border: 0;margin-top: .75rem;margin-left: 3.5%;}
	.button{width: 1.88rem;height: 1.31rem;font-family: .AppleSystemUIFont;font-size: 0.8rem;color: #0076FF;letter-spacing: -0.36px;text-align: center;line-height: 1.31rem;border: 0;background: #fff;margin-top: 0.94rem;}
	
	
	.optcareer{width: 100%;overflow: hidden;background: #fff;}
	.optcareer li{width: 100%;height: 2.75rem;text-align: left;text-indent: 0.88rem;line-height: 2.75rem;border-bottom: 1px solid #F0F0F0;}
	.fangda{width: .75rem;height: .8rem;position: absolute;left: 8.5%;top: 1.28rem;}
	.cancel{width: .81rem;height: .81rem;position: absolute;top: 1.28rem;right: 15%;}
</style>