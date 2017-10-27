<template>
	<div class="newsdetail">
		<!--<h3 class='name'>{{title}}</h3>
		<div class="content">
			<p class='respect'>尊敬的用户：</p>
			<p class='hello'>您好！</p>
			
			<p class='page page1'>{{content}}</p>
			<p class='page'>近期，朝鲜半岛局势引发关注。15日，外交部长王毅与俄罗斯外长拉夫罗夫、德国副总理兼外长加布里尔通电话，力防朝鲜半岛“八月危机”。</p>
			<div class="username">推广员</div>
			<div class="time">
				<span>2017</span>年<span>01</span>月<span>01</span>日
			</div>
		</div>-->
		
		<h3 class='name'>{{title}}</h3>
		<div class="content">
			{{content}}
		</div>
		
	</div>
</template>

<script>
	import { selAllMessageDetail  } from '@/service/getdata'
	
	export default {
		data(){
			return {
				mesgId:'',
				mesgDetail:'',
				content:'',
				title:''
			}
		},
		mounted(){
			this.mesgId = this.$route.query.mesgId
		
			selAllMessageDetail(this.mesgId).then(res=>{
				if(res.code == '000'){
					console.log(res)
					this.mesgDetail = res.mesgDetail
					this.title = res.mesgDetail.title||'后台没有标题'
					this.content = res.mesgDetail.content || '后台没有内容'
					//console.log(this.mesgDetail)					
				}
				
			})
		}
	}
</script>

<style scoped>
	
	.newsdetail{width: 100%;height: 100%;background: #fff;overflow: hidden;}
	.name{width: 60%;height: 1.13rem;font-family: .PingFangSC-Regular;font-size: 1.125rem;color: #282E37;letter-spacing: -0.43px;margin: 0 auto;margin-top: 1.69rem;color: #000;}
	
	.content{width: 87.7%;overflow: hidden;margin: 0 auto;margin-top: 1.06rem;}
	.respect{width: 100%;height: 1.13rem;font-family: .PingFangSC-Regular;font-size: 0.9375rem;color: #3D3D3D;letter-spacing: -0.3px;line-height: 1.125rem;text-align: left;color: #000;}
	.hello{width: 2.81rem;height: 1.13rem;font-family: .PingFangSC-Regular;font-size: .9375rem;color: #3D3D3D;letter-spacing: -0.3px;line-height: 1.125rem;text-align: left;margin-top: 1.12rem;}
	.page{width: 100%;overflow: hidden;font-family: .PingFangSC-Regular;font-size: .9375rem;color: #3D3D3D;letter-spacing: -0.3px;line-height: 1.125rem;text-align: left;}
	.page1{margin-top: 1.13rem;}
	.username{width: 20%;height: 1.13rem;margin-top: 2.5rem;margin-left: 58.5%;font-family: .PingFangSC-Regular;font-size: .9375rem;color: #000019;letter-spacing: -0.3px;line-height: 1.125rem;}
	.time{width: 40%;height: 1.13rem;margin-left: 49%;font-family: .PingFangSC-Regular;font-size: .9375rem;color: #000019;letter-spacing: -0.3px;line-height: 1.125rem;}
	.time span{display: inline-block;font-family: .SFNSText;font-size: .9375rem;color: #000019;letter-spacing: -0.3px;line-height: 1.125rem;}
</style>