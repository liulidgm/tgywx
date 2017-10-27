<template>
	<div class='box'>
		<ul class='optcareer' v-for="data in typeList">
			<!--<router-link :to='{path:"/edit",query:{optcareer:data.name}}'>-->
				<li @click="clickoptcareer(data.name)">{{data.name}}<span><img src="../../../assets/mine/gouxuan-2@2x.png" /></span></li>			
			<!--<li>高管<span><img src="../../../assets/mine/gouxuan-2@2x.png" /></span></li>
			<li>职业经理人<span><img src="../../../assets/mine/gouxuan-2@2x.png" /></span></li>
			<li>市场<span><img src="../../../assets/mine/gouxuan-2@2x.png" /></span></li>
			<li>销售<span><img src="../../../assets/mine/gouxuan-2@2x.png" /></span></li>
			<li>人力资源<span><img src="../../../assets/mine/gouxuan-2@2x.png" /></span></li>-->			
		</ul>
		<router-link :to='{path:"/addcareer"}'><div class="add"><img src="../../../assets/mine/add.png" /><i>添加职业</i></div></router-link>
	</div>
</template>

<script>
	import $ from 'jquery';
	import addcareer from 'components/mine/edit/addcareer'	
	import {setUserInfo , selTypeList } from '@/service/getdata'
	
	export default {
		props:{			
		},
		data(){
			return {
				typeList:'',
				optcareer:''				
			}
		},
		mounted(){
			this.initdata()
//				$(this).addClass('active').siblings().removeClass('active')
//				var data = $(this).text();	
//				window.location.href = '/#/edit?optcareer='+data;
		},
		methods:{
			initdata(){
				//职业名称列表
				selTypeList(2).then(res=>{
					//console.log(res)
					if(res.code == '000'){	
						console.log(res)
						this.typeList = res.typeList;
						console.log(this.typeList)
					}else{
						console.log('系统异常')
					}
				})			
			},			
			clickoptcareer(data){
				setUserInfo('','',data,'','','').then(res=>{
					if(res.code=="000"){
						this.$router.push('/edit');
					}										
				})
			}
		},
		components:{ addcareer }
	}
	
</script>

<style>
	.box{width: 100%;overflow: hidden;}
	.optcareer{width: 100%;overflow: hidden;background: #fff;margin-top: 0;}
	.optcareer li{width: 100%;height: 2.75rem;text-align: left;text-indent: 0.88rem;line-height: 2.75rem;border-bottom: 1px solid #F0F0F0;}
	.optcareer li span{display: inline-block;width: 1rem;height: 1rem;float: right;padding-top: 1.21rem;padding-right: 1.55rem;}
	.optcareer li span img{display: block;width: 100%;height: 100%;display: none;}
	.add{width: 64%;height: 3.31rem;margin: 0 auto;margin-top: 1.88rem;border: 1px dashed #E5E6E7;
border-radius: 0.5rem;color: #0076FF;}
	.add img{width: 0.8rem;height: 0.8rem;display: inline-block;font-size: 1.5rem;line-height:1rem;text-align: center;font-weight: 100;background: #fff;background-size: cover;float: left;margin-top: 1rem;margin-left: 5rem;}
	.add i{display: inline-block;float: left;margin-left: 0.3rem;margin-top: 1rem;}
	.optcareer li.active img{display: block;}
</style>