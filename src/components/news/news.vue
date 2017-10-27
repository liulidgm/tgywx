<template>
	<ul class="newslist">
		<li class="singlenews" v-for="data in mesgList">
			<h3>{{data.title}}</h3>
			<p></p>
			<div class="under">
				<div class="time">{{data.insdate}}</div>
				<router-link :to='{path:"/newsdetail",query:{mesgId:data.mesgId}}'><div class="detail"><i>查看详情</i><span></span></div></router-link>
			</div>
		</li>			
		
	
		<!--<li class="singlenews">
			<h3>热烈祝贺壹盐双创新版本上线</h3>
			<p>热烈祝贺壹盐双创新版本上线热烈祝贺壹盐双创新版本上线</p>
			<div class="under">
				<div class="time">2017-8-11</div>
				<div class="detail"><i>查看详情</i><span></span></div>
			</div>
		</li>
		<li></li>-->
		
		<footers></footers>
	</ul>	
	
</template>

<script>
	import footers from 'components/common/footers'
	import newsdetail from 'components/news/newsdetail'
	import { selAllMessage  } from '@/service/getdata'
		
	export default {
		name:"news",
		data(){
			return {
				mesgList:'',
				mesgId:''
			}
		},
		mounted(){
			selAllMessage().then(res=>{
				if(res.code == '000'){
					console.log(res)					
					this.mesgList = res.mesgList
					//console.log(this.mesgList)
				}else{
					
				}
				
			})
		},
		components:{ footers ,newsdetail }
		
	}
</script>

<style scoped>
	.newslist{width: 100%;overflow: hidden;}
	.newslist li{background: #fff;overflow: hidden;}
	.singlenews{width: 100%;height: 9.31rem;margin-top: 0.38rem;padding-left: 7.2%;font-family: PingFangSC-Regular;}
	.singlenews h3{width: 86.1%;height: 1.56rem;margin-top: 0.88rem;font-weight: 500;font-size: 1.125rem;letter-spacing: -0.39px;color: #282E37;text-align: left;}
	.singlenews p{width: 86.1%;height: 2.63rem;font-family: PingFangSC-Regular;font-size: .94rem;color: #979797;letter-spacing: -0.32px;text-align: left;line-height: 1.32rem;padding-bottom: 1.03rem;border-bottom: 1px solid #E3E3E3;}
	.under{width: 86.1%;overflow: hidden;margin-top: .59rem;}
	.under .time{float: left;width: 25.68%;height: 1.31rem;line-height: 1.31rem;font-family: PingFangSC-Regular;font-size: .94rem;color: #647076;letter-spacing: -0.32px;}
	.under .detail{float: right;width: 23.7%;height: 1.13rem;color: #647076;}
	.under .detail i{float: left;display: inline-block;font-style: normal;height: 100%;line-height: 1.13rem;font-family: PingFangSC-Regular;font-size: .94rem;text-align: left;}
	.under .detail span{float: left;display: inline-block;width: .56rem;height: .81rem;margin-left: 6px;background: url(../../assets/news/spider@2x.png) no-repeat 0 0;margin-top: 3px;background-size: cover;}
</style>