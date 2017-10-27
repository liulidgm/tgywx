<template>
	<!--上方搜索框-->
	<div id="home">
		<div style="position: fixed;height: 244px;width:100%;top:0;" class="homeone" > 
			<div id="top">
				<div @click="showCityList()">
					<div class="location"><img src="../../assets/homepage/didian@2x.png"/></div>
					<div class="address overflow_ell">{{city}}</div>
				</div>
						
				<input class='search' type="text" id="searchKeyword" placeholder="请输入搜索内容" />
				<div class='searchinfo' @click="selected('search')"></div>
			</div>		
		
			
			<swiper :options="swiperOption" style="min-height:160px;">
			    <!--<swiper-slide class="slide"><img :src="data.bansnerUrl" width="100%"></swiper-slide>-->		    
	  	  	    <swiper-slide class="slide" style="min-height:10rem;" v-for="item in bannerList"><img style="height:160px;" :src="item.bannerUrl" width="100%"></swiper-slide>
	  	  	  <!-- <swiper-slide class="slide"><img style="height:160px;" src="../../assets/test1.jpg" width="100%"></swiper-slide> -->	  	  	    
			    <div class="swiper-pagination"  slot="pagination"></div>
			</swiper>
		

			<ul class="menu">
				<!-- <li class="all"><i>全部</i><span><img src="../../assets/homepage/lshang2@2x.png" /></span></li>
				<li class="sort"><i>排序</ii></i><span><img src="../../assets/homepage/lshang2@2x.png" /></span></li> -->
				<li data-item="type">
					<span>全部</span>
					<span class="icon-bottom-arrow arrow"></span>
				</li>
				<!-- <li data-item="" @click="selected('sort','')">
					<span>排序</span>
				</li> -->
			</ul>
		</div>
		<!--列表部分-->
		<div class="list_content" id="list_content">
			<div class="selection-area" id="selection-area">
				<ul class="selection" id="type">
					<li :id="0" @click.capture="selected('type','')">不限</li>
					<li v-for="item in taskTypeList" :id="item.name" @click.capture="selected('type',item.name)">
						<span class="radio-class"></span><span class="sel-txt">{{item.name}}</span>
					</li>
				</ul>
			</div>
			<div class="list">
				<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" ref="loadmore" :auto-fill="false" :bottom-all-loaded="allLoaded"
				@bottom-status-change="handleBottomChange" v-show="!isEmpty">
					<ul class="homelists">
				  	  	<li v-for="item in tasklist" class="">
				  	  		<router-link :to="{path:'/gettest?title='+'任务详情',query:{taskId:item.taskId}}">
				  	  		<input type="hidden" :value="item.taskId">
			  	  			<div class='left'>{{item.taskType}}</div>
				  	  		<div class='center'>
				  	  			<div class="name">{{item.taskName}}</div>
				  	  			<div class="under">
				  	  				<div class="money">{{item.singleAmount}}</div>
					  	  			<div class="init">元</div>
					  	  			<div class="number">剩余{{item.surplusCount}}次</div>
				  	  			</div>	  	  			
				  	  		</div>
				  	  		<div class='right'>
				  	  			<!--<router-link :to="{path:'/gettest?title='+'任务详情',query:{taskId:item.taskId}}">-->
				  	  				<div class="todotest">{{item.surplusCount == '0' ? '已领完':'领任务'}}</div>
				  	  			<!--</router-link>-->
				  	  			<div class="todotests">24小时极速审核</div>
				  	  		</div> 
				  	  		</router-link>
				  	  	</li>
				  	  				  	  
			  	  </ul>
			  	  <div v-show="loadFlag" class="nomore">没有更多数据</div>
			  	  <div slot="top" class="mint-loadmore-top">
				      <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }" class="loadText">下拉刷新</span>
				      <span v-show="topStatus === 'loading'" class="loadText">Loading...</span>
				  </div>
				  <div slot="bottom" class="mint-loadmore-bottom">
				      <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }" class="loadText">加载更多</span>
				      <span v-show="bottomStatus === 'loading'" class="loadText">Loading...</span>
				  </div>
		  	  </mt-loadmore>
		  	  <div v-show="isEmpty" class="nodata" style="margin-top:2rem;">
		  	  		<img src = '../../assets/nodata.png' style="width:6rem;" />
		  	  		<p style="color:#666">暂无数据</p>
		  	  </div>   
			</div>		
		</div>
			
		<footers class='footers'></footers>
	</div>
</template>

<script>
	import $ from 'jquery'
	import gettest from 'components/index/gettest'
	import footers from 'components/common/footers'
	import news from 'components/news/news'
 	import {swiper,swiperSlide} from "vue-awesome-swiper"
    import { userLogin , bannerList,selTaskType,getTaskList } from '@/service/getdata'
    import cityList from './citylist'
    import { Radio,Toast } from 'mint-ui';
    import {getLocation,openLocation} from '@/config/utils'
	export default {
		name:"home",
		data(){
			return {
				tasklist:'',
		       	taskTypeList:'',
		       	sort:1,//时间正序，时间从大到小,0倒序
		       	page:1,
		       	tasktype:'',
		       	swiperOption:{
	       			autoplay:2000,
	       			pagination:".swiper-pagination"
		       	},
		       	bannerList:'',
		       	bannerUrl:'',
		       	bannerLink:'',
		       	city:localStorage.getItem('city')||'上海',
		       	allLoaded:false,
		       	loadFlag:false,
		       	topStatus:'',
        		bottomStatus:'',
		       	taskId:'',//任务列表返回数据
		       	taskType:'',
		       	taskName:'',
		       	singleAmount:'',
		       	surplusCount:'',
		       	cname : '',
		       	isEmpty:false,
		       	contentbtn:'领任务'
			}			
		},
		computed:{},
		beforeCreate(){	      
		},
		async beforeMount(){
	      this.city = this.$route.query.city || '上海';	      
	    },
		mounted(){
				
			let a = document.documentElement.clientHeight-294;
			$('#list_content').css('height',a);


			if($('#selection-area').css('display','none')){
//				$('list_content').css('overflow','hidden')
			}else if($('#selection-area').css('display','block')){
				$('.list_content').css('overflow','auto')///////////////////////
			}
			///////////////////////////////////
			if(this.$route.query.openid){    	
		        localStorage.openid = this.$route.query.openid;////
				this.openid = this.$route.query.openid;
		        userLogin(this.openid).then(res=>{       	
		        	if(res.code == "000"){
		        		console.log(res)
		        		localStorage.tokenid = res.tokenId||'';////
		        		//console.log(localStorage.tokenid)     		
		            	localStorage.loginFlag = true;
		            	//console.log('登录操作成功')
			            localStorage.setItem('city',res.city||'上海')
			          	console.log(localStorage.tokenid)
			            bannerList().then(res=>{
							if(res.code == '000'){
								this.bannerList = res.bannerList;
							}				
						});
						
						//2
						selTaskType().then(res=>{
							//console.log(res)
							if(res.code=='000'){
								this.taskTypeList = res.taskTypeList;
							}
						});	
						
						//3
						this.getTaskList('','',this.page,'',this.city);//默认列表不需要传参
			            this.$router.push('/index');  
			            Toast('登录成功')
			        	}else if(res.code == "001"){
			        		localStorage.loginFlag = false;
			            	Toast("系统异常");
			        	}else{
			        		Toast('登录失败')
			        	}        	
		        })	        
		      }
			/////////////////////////////////////////////////
			bannerList().then(res=>{
				if(res.code == '000'){
					this.bannerList = res.bannerList;
				}				
			});
			
			this.getTaskList('','',this.page,'',this.city);//默认列表不需要传参			

			selTaskType().then(res=>{
				//console.log(res)
				if(res.code=='000'){
					this.taskTypeList = res.taskTypeList;
				}
			});	
			////////////////////////////////
		
			var _self = this;
			$('.menu>li').click(function(){
					var item = $(this).data('item');
					//console.log(item)					 

					$('.list_content').css('overflow','auto')
					
					$('.arrow').removeClass('icon-top-arrow').addClass('icon-bottom-arrow')
					
					if(item){	
						
						if($('.selection').css('display','block')){
							
						}else if($('.selection').css('display','none')){
							//$('.arrow').toggleClass('icon-top-arrow')
						}
						
						$('.list_content').css('overflow','hidden')
						
						$($('.selection-area')[0]).css('display','none');						
						if($('#'+item).hasClass('active')){
							$('.selection-area .selection').removeClass('active');							
						
							//$('.list_content').css('overflow','auto')
						}else{
							$($('.selection-area')[0]).css('display','block');
							$('.selection-area .selection').removeClass('active');
							$('#'+$(this).data('item')).addClass('active');							
							$('.arrow').removeClass('icon-bottom-arrow').addClass('icon-top-arrow')							
						}
					}else{
						//排序
						if(this.sort){
							this.sort = 0;
							return
						}
						this.sort = 1
						$('.list_content').css('overflow','auto')
					}	
					//$('.list_content').css('overflow','auto')
			})
		},
		methods:{	
			loadTop() {
				  // 刷新数据
				  this.$refs.loadmore.onTopLoaded();			 
				  this.getTaskList('','',1,'',this.city)
			},
			loadBottom() {
				//下拉加载
				console.log("sdfdfg");
				this.allLoaded = false;
		        this.page +=1;
		        getTaskList('','',this.page,'',this.city).then(res => {

		              if(res.taskList.length == 0){
		                 $('.mint-loadmore-content').css('transform','translate3d(0px, 0px, 0px)');

		                  this.allLoaded = true;
		                  this.loadFlag = true;
		                  //console.log("sdfd");
		              }else{
		                this.tasklist = this.tasklist.concat(res.taskList);
		                this.$refs.loadmore.onBottomLoaded();
		              }
		        });				
			},	
			handleBottomChange(status) {
		        this.bottomStatus = status;
		    },	
		    selected(item,id){		    	
		    	$('.arrow').removeClass('icon-top-arrow').addClass('icon-bottom-arrow')
				if(id){//选择了类型,
					this.tasktype = id;
					$('.radio-class').removeClass('active');
					$('#'+id).find('span').eq(0).addClass('active');					
				}else{
					this.tasktype = "";
				}
				var searchName = $("#searchKeyword").val()||'';
				$('.selection-area .selection').removeClass('active');
				$($('.selection-area')[0]).css('display','none');
				
				this.getTaskList(this.tasktype,this.sort,this.page,searchName,this.city);
				
				//调用后台接口查询 默认第一页					
				//console.log(123)			    
			},
			getTaskList(tasktype,sort,page,keyword,city){
				
//				setTimeout(function(){
					 getTaskList(tasktype,sort,page,keyword,city).then(res=>{
					 	if(res.code=='000'){
					 		console.log(res)
					 		
					 		if(res.taskList.length==0){
					 			this.isEmpty = true
					 		}else{
					 			this.isEmpty = false;
					 			this.tasklist = res.taskList;
					 		}
					 	}else{
					 		//Toast(res.msg);/////////////////////////////////////
					 		//console.log(res.msg)
					 	}			    	
				    })
//				},100)
				 
			},
			showCityList(){
				//this.getLocation();
				//$('.citylist').addClass('citylist-scroll');
				this.$router.push('/citylist');
			},
			closeCityList(cname){
				$('.citylist').removeClass('citylist-scroll');
				this.cname = cname;
				$('.address').html(this.cname);
			}
		},
		components:{ swiper,swiperSlide,footers,news,gettest,cityList,Radio}
	}
</script>

<style scoped lang="scss">
 @import 'src/style/icons';
 
 .homeone{z-index: 6;}
.menu{background: #fff;
    min-height: 2rem;
    border-bottom: 1px solid #ddd;}
.menu li{float:left;width: 5rem;height:2rem;line-height:2rem;position:relative}
.arrow{display:inline-block;position: absolute;left:60px;top:7px;}
.list{
	min-height:5rem;
	width:100%;
	position:relative;
}
#home{width: 100%;font-size: 1rem;overflow: auto;}
#top{width: 100%;height: 3.13rem;background: #fff;position: relative;}
.location{float: left;width: 0.75rem;height: 1.062rem;
	margin-left: 2.2%;
	margin-top: 1.06rem;
	background-size: cover;
	img{
		width: 100%;height: 100%;
	}
}		
.address{float: left;width: 10.1%;height: 1.38rem;margin-top: 0.88rem;margin-left: 1.4%;line-height: 1.38rem;font-family: PingFangSC-Regular;font-size: 16px;color: #333333;}
.search{float: left;width: 70.7%;height: 1.88rem;font-size: .937rem;color: #666666;margin-top: .56rem;border-radius: 20px;border: 0;margin-left: 4%;padding-left: 4%;line-height: 1.88rem;background: #f0f0f0;font-family: PingFangSC-Regular;}
.searchinfo{width: 3.2%;height: .75rem;background: url(../../assets/homepage/fangda@2x.png) no-repeat 0 0;background-size: cover;position: absolute;margin-top: 1.1rem;margin-left: 90.7%;}


.list_content{
	overflow: auto;
	margin-top:243px;
	position:relative;
	.selection-area{
		z-index: 3;
		display: none;
		min-height: inherit;
		width:100%;
		height: 100%;
	    position: absolute;
	    top: 0;
	    background-color:rgba(0,0,0,0.6);
	    text-align: left;
	    .selection.active{display:block}
	    .selection{
	    	display: none;
	    	background: #fff;
	    	min-height: 1rem;
	    	text-align:left;
	    	li{
	    		height: 2rem;
    			line-height: 2rem;
    			padding-left:1.5rem;
    			position:relative;
    			.radio-class{
    				position:absolute;
    				display: inline-block;
    				height: 1rem;
    				width: 1rem;
    				border-radius:100%;
    				border:1px solid #ccc;
    				left: 21px;
    				top: 7px;
    			}
    			.radio-class.active{
    				background:url('../../assets/icons/gouxuan.png') no-repeat;
    				background-size:100%;
    				border: 1px solid #fff;
    			}
    			.sel-txt{display:inline-block;margin-left:1.5rem}
	    	}
	    }
	}
}


.homelist{width: 100%;height: 3.25rem;overflow: hidden;background: #FFFFFF;box-shadow: 0 2px 4px 0 rgba(191,191,191,0.78);border-bottom: 1px solid rgba(191,191,191,.22);}
.homelist li{float: left;width: 22%;height: 1.38rem;margin-top: 0.88rem;margin-left: 4.5%;}
/*.homelist .all{background: pink;}*/
.homelist li i{display: inline-block;float: left;width: 45.5%;height: 100%;font-style: normal;text-align: left;line-height: 1.38rem}
.homelist li span{display: inline-block;float: left;width: .81rem;height: 100%;}
.homelist li span img{display: inline-block;width: 100%;height: .5rem;margin-left: 0;}


.homelists{width: 100%;overflow: hidden;background: #fff;}
.homelists li{width: 100%;height: 5rem;border-bottom: 1px solid rgba(191,191,191,0.22);}
.homelists li .left{width: 2.75rem;height: 2.75rem;margin-top: 1.13rem;margin-left: 3.7%;background: #ffd743;border-radius: 50%;float: 	left;text-align: center;line-height: 2.75rem;color: #333;font-weight: bold;font-family: PingFangSC-Semibold;
	overflow: hidden;
	}
.homelists li .center{float: left;margin-left: 3.7%;margin-top: 1.19rem;width: 50%;}
.homelists li .center .name{width: 100%;height: 1.38rem;text-align: left;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #333333;}
.homelists li .center .under{width: 100%;height: 1.75rem;overflow: hidden;}
.homelists li .center .under .money{float: left;width: auto;height: 1.75rem;font-family: PingFangSC-Medium;font-size: 20px;color: #F5A623;}
.homelists li .center .under .init{float: left;width: 14%;height: 1.31rem;font-family: PingFangSC-Semibold;font-size: 15px;color: #F5A623;text-align: left;line-height: 1.31rem;font-weight: 700;margin-top: 0.13rem;}
.homelists li .center .under .number{float: left;width: 46%;height: 1.13rem;text-align: left;font-family: PingFangSC-Regular;font-size: 13px;color: #778892;line-height: 1.13rem;margin-top: 0.25rem;}

.homelists li .right{float: right;width: 27%;height: 2.75rem;margin-top: 1.1rem;margin-right: 2.7%;}
.homelists li .right a{width: 100%;height: 100%;}
.homelists li .right .todotest{width: 80.6%;height: 1.56rem;margin: 0 auto;line-height: 1.56rem;background: #FFE37F;border-radius: 44px;font-family: PingFangSC-Regular;font-size: 14px;color: #333333;}
.homelists li .right .todotests{width: 100%;height: 1.06rem;font-family: PingFangSC-Regular;font-size: 12px;color: #C7C7CC;margin-top: 0.13rem;}
.citylist{
	z-index: 2;
    position: absolute;
    background: #fff;
    left:500px;
	// transition:left .5s;
	// // Safari
	// -webkit-transition:left .5s;
}
.citylist-scroll{
	left:0;
}
.overflow_ell{
	overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 42px;
}

// .nodata{
// 	margin-top: 2rem;
// 	img{width: 6rem}
// 	p{color: #666}
// }


/*.footers{display: none;}*/

</style>