<template>
	<div class="mine">
		<!--<p>1233456</p>-->
		<div class="top">
			<div class="header"><img :src="headImgUrl" /></div>
			<div class='phone'>{{moblie}}</div>
			<router-link :to="{path:'/edit',query:{title:'个人资料'}}"><img class='edit' src="../../assets/mine/edit@2x.png" /></router-link>
			<!--<router-link :to="{path:'/index'}">-->
		</div>
		<ul class="minelist">
			<router-link :to='{path:"/wallet",query:{title:"推荐有奖"}}'><li class="prize">
				<i><img src="../../assets/wode/tuijian@2x.png" /></i>				
				<em>推荐有奖</em>
				<span><img src="../../assets/news/spider@2x.png" /></span>
			</li></router-link>
			
			<router-link :to='{path:"/wallet",query:{title:"我的钱包"}}'><li class="wallet">
				<i><img src="../../assets/wode/qianbao@2x.png" /></i>				
				<em>我的钱包</em>
				<span><img src="../../assets/news/spider@2x.png" /></span>
			</li></router-link>
			
			<router-link :to='{path:"/helpback",query:{title:"帮助反馈"}}'><li class="help">
				<i><img src="../../assets/wode/bangzhu@2x.png" /></i>				
				<em>帮助反馈</em>
				<span><img src="../../assets/news/spider@2x.png" /></span>
			</li></router-link>
			
			<router-link :to='{path:"/about",query:{title:"关于"}}'><li class="about">
				<i><img src="../../assets/wode/guanyu@2x.png" /></i>				
				<em>关于</em>
				<span><img src="../../assets/news/spider@2x.png" /></span>
			</li></router-link>			
		</ul>
		<!--中间浮动定位部分-->
		<div class="center">
			<div class='left'>
				<span>{{allCount}}<span class="unit">个</span></span>
				<i>累计完成任务</i>
			</div>
			<div class='right'>
				<span>{{allAmount}}<span class="unit">元</span></span>
				<i>累计佣金</i>
			</div>
		</div>		
		<!--退出登录-->
		<!-- <div class='outlogin'>退出登录</div> -->
		<div class="contact">
			<!-- <a href="tel:13052096602">13052096602</a> -->
			<!-- <div class="tel"><i>Tel:</i><span><a href="tel:15238339534">12345678910</a></span></div> -->
			<div class="email"><i>Email:</i><span><a href="mailto:service@spreadape.com">service@spreadape.com</a></span></div>
		</div>
		<div class="record">
			<div class="email"><span>备案/许可证编号为：沪ICP备17040150号</span></div>
		</div>
		<footers></footers>
	</div>
</template>

<script>
	import footers from 'components/common/footers'
	import edit from 'components/mine/edit'
	import helpback from 'components/mine/helpback'
	import about from 'components/mine/about'
	import wallet from 'components/mine/wallet'
	import { getUserTaskStatistics } from '@/service/getdata'
	
	export default {
		data(){
			return {
				userTask:'',
				moblie:'',
				nickname:'',
				allCount:'',
				headImgUrl:'',
				allAmount:''
			}
		},
		mounted(){
			getUserTaskStatistics().then(res=>{	
				if(res.code == '000'){
					console.log(res)
					this.userTask = res.userTask;										
					//this.nickname = res.userTask.nickname;//
					this.allCount = res.userTask.allCount;
					this.headImgUrl = res.userTask.headImgUrl;
					this.allAmount = res.userTask.allAmount;
					console.log(this.allCount)
//					this.moblie = res.userTask.moblie||res.userTask.nickname;
					this.moblie = localStorage.getItem('phone')||res.userTask.nickname;
					//console.log(localStorage.getItem('phone'))
				}else{					
				}			
			})			
		},
		methods:{		
		},
		components:{ footers , edit , about , wallet ,helpback }
	}
	
</script>

<style lang="scss" scoped>
	/*@import 'src/style/mixin';*/
	 
	.mine{width: 100%;height: 100%;position: relative;}
	.top{width: 100%;height: 7.56rem;background: #ffd743;}
	.header{
		width: 3rem;
		height: 3rem;
		border:1px solid #fff;
	    float: left;
	    margin: 1.3rem 0.5rem 0 1rem;
	    border-radius: 100%;
	   /* background:red;*/
	    img{
	    	height: 3rem;
	    	width: 3rem;
	    	border-radius:100%;
	    }
	}
	.phone{float: left;width: 25%;height: 2.56rem;margin-top: 1.72rem;margin-left: 1.2%;font-family: PingFangSC-Regular;font-size: 16px;color: #333333;line-height: 2.56rem;text-align: left;}
	.edit{float: right;width: 1.38rem;height: 1.5rem;margin-top: 1.31rem;margin-right: 5%;padding-left: 5%;padding-top: 1rem;}
	.minelist{width: 96.5%;overflow: hidden;background: #fff;padding-left: 3.5%;margin-top: 2.75rem;}
	.minelist li{width: 100%;height: 2.75rem;}
	.minelist li{border-bottom: 1px solid #E3E3E3;}
	.minelist .wallet{background: #fff;}
	.minelist li i{display: inline-block;float: left;font-style: normal;width: 1rem;height: 1.06rem;margin: 0 auto;margin-top: 0.88rem;}
	.minelist li i img{width: 100%;height: 100%;}
	.minelist li em{display: inline-block;float: left;font-style: normal;width: 4rem;height: 1.38rem;line-height: 1.38rem;margin: 0 auto;font-family: PingFangSC-Regular;font-size: 1rem;color: #282E37;margin-top: 0.72rem;margin-left: 2.9%;}
	.minelist li span{display: inline-block;float: right;width: 3rem;height: 100%;}
	.minelist li span img{width: .56rem;height: .81rem;margin-right: 5.6%;padding-top: .9rem;}
	.minelist .about{border-bottom: 0;}
	.minelist .about em{width: 2rem;height: 1.38rem;}
	
	.center{width: 94.7%;height: 5.5rem;position: absolute;top: 4.81rem;left: 2.65%;right: 2.65%;background: #FFFFFF;box-shadow: 0 2px 4px 0 rgba(197,197,197,0.50);border-radius: 8px;}
	.center .left{float: left;width: 49.7%;height: 2.87rem;margin-top: 1rem;margin-bottom: 1.63rem;border-right: 1px solid #E5E6E7;}
	.center .left span{display: block;height: 1.75rem;font-family: PingFangSC-Semibold;font-size: 1.25rem;color: #282E37;margin: 0 auto;}
	.center .left .unit {display:inline-block;font-size:14px;}
	.center .left span em{display: inline-block;float: left;}
	.center .left span i{display: inline-block;float: left;height: 1.75rem;width: 0.88rem;line-height: 1.75rem;}
	.center .left i{display: block;font-style: normal;width: 4.94rem;height: 1.13rem;margin: 0 auto;font-family: PingFangSC-Regular;font-size: 0.8125rem;color: #979797;}
	
	
	/*.center .right{float: left;width: 49.8%;}*/
	.center .right{float: left;width: 49.7%;height: 2.87rem;margin-top: 1rem;margin-bottom: 1.63rem;}
	.center .right span{display: block;height: 1.75rem;font-family: PingFangSC-Semibold;font-size: 1.25rem;color: #282E37;margin: 0 auto;}
	.center .right .unit {display:inline-block;font-size:14px;padding-left:0.3rem;}
	.center .right span em{display: inline-block;float: left;}
	.center .right span i{display: inline-block;float: left;height: 1.75rem;width: 0.88rem;line-height: 1.75rem;}
	.center .right i{display: block;font-style: normal;width: 4.94rem;height: 1.13rem;margin: 0 auto;font-family: PingFangSC-Regular;font-size: 0.8125rem;color: #979797;}
	
	.outlogin{width: 19rem;height: 2.75rem;background: #FFD743;border-radius: 20px;background: #ffd743;font-family: PingFangSC-Regular;font-size: 18px;color: #333333;line-height: 2.75rem;margin: 0 auto;margin-top: 15.4%;}
	
	.contact{width: 19rem;height: 1.13rem;margin: 0 auto;margin-top: 1.25rem;}	
	.contact .tel{float: left;width: 36.4%;height: 100%;font-family: PingFangSC-Regular;font-size: 0.8125rem;color: #979797;margin-right: 5.7%;}
	.contact .tel i{display: inline-block;float: left;width: 19.9%;line-height: 1.13rem;}
	.contact .tel span{display: inline-block;float: left;width: 80.1%;font-family: PingFangSC-Regular;font-size: 0.8rem;color: #5496e3;line-height: 1.125rem;}
	.contact .email{
		 /*float: left;
		 width: 45.3%;
		 height: 100%;*/
		 font-family: PingFangSC-Regular;
		font-size: 0.8125rem;
		color: #979797;
	}
	.contact .email span{font-family: PingFangSC-Regular;font-size: 13px;color: #5496e3;line-height: 1.125rem;}
	.contact span a{color: #5496e3;}
	
	.record{
			/*width: 80%;height: 1.13rem;
			margin: 0 auto;
			position: fixed;bottom: 6rem;
			left: 10%;right: 10%;*/
			width: 19rem;height: 1.13rem;margin: 0 auto;margin-top: 1.25rem;
			}	
	.record .email{
		 /*float: left;
		 width: 45.3%;
		 height: 100%;*/
		 font-family: PingFangSC-Regular;
		font-size: 0.8125rem;
		color: #979797;
	}
	.record .email span{font-family: PingFangSC-Regular;font-size: 13px;color: #5496e3;line-height: 1.125rem;}
	.record span a{color: #5496e3;}
</style>