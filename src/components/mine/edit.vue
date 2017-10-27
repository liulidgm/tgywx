<template>
	<div class='edit'>
		<!---进度条-->
		<div class='progressbar'>
			<!--<div id="jqmeter-container"></div>-->
			<span>资料填写完整度</span>
			
			<div class="bar">
				<div class='outbar'>
					<div class="inbar"></div>				
				</div>
				<span class="num">{{proportion}}</span>
			</div>
					
		</div>
		
		<!--头像-->
		<div class="head" @click="uploadHeaderPic()">
			<i>头像</i>
			<img class="imghead" :src="headImgUrl"  />
			<span><img src="../../assets/news/spider@2x.png" /></span>
		</div>		
		
		<!--具体信息-->
		<ul class="detail">			
			<li class="sex" @click="clickmesex()">
				<i>性别</i>				
				<span><img src="../../assets/news/spider@2x.png" /></span>
				<em class="sexdetail">{{gender}}</em>
			</li>			 
			
			<!--<router-link :to='{path:"/testchooce"}'>-->
			<li class="birth" @click="clickmebirth()">
				<i>生日</i>				
				<span><img src="../../assets/news/spider@2x.png" /></span>
				<em class='birthday'>{{data.birthday}}</em>
			</li>
			<!--</router-link>-->			 
			<!--出生年月日-->  
			<mt-datetime-picker		
				  ref="picker"
				  type="date"
				  :startDate='startDate'
				  :endDate='endDate'
				  year-format="{value} 年"
				  month-format="{value} 月"
				  date-format="{value} 日"
				  @confirm="handleConfirm">
			</mt-datetime-picker>
		

			<!--常住地-->		
			<li class="address" @click="clickoptcity()">
				<i>常住地</i>				
				<span><img src="../../assets/news/spider@2x.png" /></span>
				<em class="addressdetail">{{addressdetail}}</em>
			</li>
			
			<!---选择行业-->
			<li class="trade" @click="clickoptasd()">
				<i>行业</i>				
				<span><img src="../../assets/news/spider@2x.png" /></span>
				<em class="industry">{{data.industry}}</em>
			</li>
						
			<!---选择职业-->
			<li class="occupation" @click="optoccupation()">
				<i>职业名称</i>				
				<span><img src="../../assets/news/spider@2x.png" /></span>
				<em class="occupationName">{{data.occupationName}}</em>
			</li>

			<li class="college" @click="optcollege()">
				<i>院校名称</i>				
				<span><img src="../../assets/news/spider@2x.png" /></span>
				<em class="collegedetail">{{collegeName}}</em>
			</li>	
			
			<!-- 常住地	 -->											
		</ul>
	    <mt-popup v-model="popupVisible" position="bottom" class="mint-popup-4">  
              <div class="picker-toolbar cityPickerbar">  
                <span class="mint-datetime-action mint-datetime-cancel" @click="cancleaddress">取消</span>  
                <span class="mint-datetime-action mint-datetime-confirm" @click="selectaddress">确定</span>  
              </div>  
              <mt-picker :slots="citySlots" @change="onCityChange" :visible-item-count="3" class="cityPicker"></mt-picker> 
        </mt-popup>
        <mt-popup v-model="industryPopupVisible" position="bottom" class="mint-popup-4">  
              <div class="picker-toolbar industryPickerbar">  
                <span class="mint-datetime-action mint-datetime-cancel" @click="cancleIndustry">取消</span>  
                <span class="mint-datetime-action mint-datetime-confirm" @click="selectIndustry">确定</span>  
              </div>  
              <mt-picker :slots="industrySlots" @change="onIndustryChange" :visible-item-count="3" class="industryPicker"></mt-picker> 
        </mt-popup>	
      
        
        <mt-popup v-model="careerPopupVisible" position="bottom" class="mint-popup-4">  
              <div class="picker-toolbar careerPickerbar">  
                <span class="mint-datetime-action mint-datetime-cancel" @click="cancleCareer">取消</span>  
                <span class="mint-datetime-action mint-datetime-confirm" @click="selectCareer">确定</span>  
              </div>  
              <mt-picker :slots="optcareerSlots" @change="onCareerChange" :visible-item-count="3" class="careerPicker"></mt-picker> 
        </mt-popup>
      
		
		<div class='shadow'>			
		</div>			
		<!-- 选择性别 -->
		<div class="optsex">
			<div class="optinfo">请选择性别</div>
			<ul class="sexlist">
				<li class="active_sex">女</li>
				<li>男</li>
			</ul>
			<div class="suresex">确定</div>
			<div class="imgsex"><img src="../../assets/mine/guanbi@2x.png" /></div>
		</div>
			
	</div>
</template>

<script>
	import $ from 'jquery';
	import { DatetimePicker,Picker,Popup,Toast} from 'mint-ui';
	
	//import optcareers from 'components/mine/edit/optcareers'
	
	import college from 'components/mine/edit/college'
	import testchooce from 'components/mine/edit/testchooce'
	
	import { getUserInfo , getProvinceCity , setUserInfo ,selTypeList} from '@/service/getdata'
	import {chooseImage} from '@/config/utils'
	let address = {}
	let industryList = []
	let optcareerList = []
    export default {
    	props:{			
    	},
		data(){
			return {
				startDate: new Date('1900'),
			    endDate: new Date(),
			    value:'',
			    showToolbar:"false",		      
			    proportion:'',//百分比
			    headImgUrl:'',//头像
			    gender:'',
			    birthday:'',
			    addressdetail:'请选择',//住址
			    industry:'',//行业
			    career:'',//行业
			    occupationName:'',//职业
			    collegeName:'',//学校
			    showCity:false,
			    popupVisible: false,
			    areaPicker:'',
				addressProvince:'',
			    addressCity:'',
			    data: {
			      privinceName: '',
			      cityName: '',
			      industry:'',
			      career:'',
			      birthday:'',
			      gender:''
			    },
			    citySlots: [
			      {
			        flex: 1,
			        values: Object.keys(address),
			        className: 'slot1',
			        textAlign: 'center'
			      }, {
			        divider: true,
			        content: '-',
			        className: 'slot2'
			      }, {
			        flex: 1,
			        values: Object.values(address)[0],
			        className: 'slot3',
			        textAlign: 'center'
			      }
			    ],
			    industryPopupVisible:false,
			    careerPopupVisible:false,
			    industryPicker:'',
			    industrySlots:[
				  {
			        flex: 1,
			        values: industryList,
			        className: 'slot1',
			        textAlign: 'center'
			      }
			    ],
			    optcareerSlots:[
				  {
			        flex: 1,
			        values: optcareerList,
			        className: 'slot1',
			        textAlign: 'center'
			      }
			    ]
			}
		},
		created () {
			this.loadIndustry();
		   this.loadAreaList();
		},
		mounted(){
			var suresexinfo = '女';
			$('.sexlist li').click(function(){
				$(this).addClass('active_sex').siblings().removeClass('active_sex')
				suresexinfo = $(this).html();
				//return suresexinfo;				
			})
			//点击确定按钮
			$('.suresex').click(function(){
				var gender = suresexinfo == '男'? 0:1;
				//设置性别
				setUserInfo('','','','',gender,'').then(res=>{
					if(res.code=="000"){
						$('.sexdetail').text(suresexinfo);
						$('.shadow').css('display','none');
						$('.optsex').animate({bottom:'-11.25rem'});
						$('.optsex').css('display','none');
					}else{
						Toast(res.msg);
					}
					
				})				
			})
			//点击取消按钮
			$('.imgsex').click(function(){
				$('.shadow').css('display','none');
				$('.optsex').animate({bottom:'-11.25rem'});
				$('.optsex').css('display','none');
			})
			
			var birthday = $('.birthday');
				//获取用户信息
			getUserInfo().then(res=>{
				console.log(res)
				//百分比
				this.proportion = parseInt(res.proportion*100)+'%';				
				$('.num').text(this.proportion)
				$('.inbar').css('width',this.proportion)
				//头像
				this.headImgUrl = res.headImgUrl					
				//性别
				this.gender = res.gender=='1' ? '女':'男';			
				$('.sexdetail').text(this.gender);
				if(this.gender == ''){
					$('.sexdetail').text('女');
				}
				//生日
				this.data.birthday = res.birthday||'请选择';			
				//住址
				this.addressdetail = res.address||'请选择';
				//行业
				this.data.industry = res.industry||'请选择';
				//职业
				this.data.occupationName = res.occupationName||'请选择';
				console.log(this.data.occupationName)
				//学校
				this.collegeName = res.collegeName||'请选择';
			})
},
		methods:{
			loadAreaList: function () {
				//查询省份
				getProvinceCity().then(res=>{
					if(res.code=="000"){
						var arr = [];
						var obj = {};
						for(var i = 0;i<res.cities.length;i++){
							//var tempObj={};
							obj[res.cities[i].provincesName] = res.cities[i].cityName;
						}
						//console.log(obj);
					    arr.push(obj);
			            address = arr[0]
			            this.citySlots[0].values = Object.keys(address)
			            this.citySlots[2].values = Object.values(address)[0]		            
					}else{
						Toast('获取区域数据异常');
					}					
				})
		    },
		    loadIndustry:function(){
		    	selTypeList(1).then(res=>{
		    		console.log(res);
		    		if(res.code=="000"){
		    			for(var i=0;i<res.typeList.length;i++){
		    				industryList.push(res.typeList[i].name);
		    			}
		    			this.industrySlots[0].values = industryList;
		    			//console.log(industryList)
		    		}
		    	})
		    	selTypeList(2).then(res=>{
		    		console.log(res);
		    		if(res.code=="000"){
		    			for(var i=0;i<res.typeList.length;i++){
		    				optcareerList.push(res.typeList[i].name);
		    			}
		    			this.optcareerSlots[0].values = optcareerList;
		    			//console.log(optcareerList)
		    		}
		    	})
		    },
	    
		    
		    onCityChange: function (picker, values) {
		      this.industryPicker = picker
		      picker.setSlotValues(1, address[values[0]])
		      this.addressProvince = values[0]
		      this.addressCity = values[1]
		    },
		    cancleaddress: function () {
		      this.popupVisible = false
		      this.areaPicker.setSlotValue(0, this.data.privinceName)
		      this.areaPicker.setSlotValue(1, this.data.cityName)
		    },
		    selectaddress: function () {
		      this.popupVisible = false
		      this.data.privinceName = this.addressProvince
		      this.data.cityName = this.addressCity
		      var city = this.data.privinceName+' '+this.data.cityName;
		      setUserInfo(city,'','','','','').then(res=>{
		      		console.log(res);
		      		if(res.code=='000'){
		      			this.addressdetail = city;
		      		}
		    	})
		    },					
			//选择性别
			clickmesex(){
		        //this.$refs.picker.open();
		        $('.shadow').css('display','block');
				$('.optsex').css('display','block');
				$('.optsex').animate({bottom:'0'})
				
				$('.imgsex').css('display','block');		      
		    },
		    clickmebirth(){
		   		this.$refs.picker.open();
		    },
		    clickoptcity(){
		    	this.popupVisible = true;
		    },
		    clickoptasd(){
		    	this.industryPopupVisible = true;		    	
		    },
		    optoccupation(){
		    	this.careerPopupVisible = true;
		    	console.log(132)
		    },
		    
		    
		    
		    
		    //选择出出生年月日
		    handleConfirm(data){
		    	console.log(data);
		    	var time = null;
				function formatTen(num) { 
					return num > 9 ? (num + "") : ("0" + num); 
				} 
				
				function formatDate(date) { 
					var year = date.getFullYear(); 
					var month = date.getMonth() + 1; 
					var day = date.getDate(); 
					var hour = date.getHours(); 
					var minute = date.getMinutes(); 
					var second = date.getSeconds(); 
					time = year + "-" + formatTen(month) + "-" + formatTen(day); 
				} 
				formatDate(data);
				var birthday = $('.birthday');
				birthday.text(time)
				this.birthday = time;
				//设置出生年月日
		    	setUserInfo('','','','','',this.birthday).then(res=>{	
		    		if(res.code=="000"){
		    			this.data.birthday = this.birthday
		    		}else{
		    			Toast(res.msg);
		    		}
		    	})
		    },
		    //选择职业
//		    optoccupation(){
//		    	var title = '个人资料';
//		    	//this.$router.push('/optcareers?title='+title)		    	
//		    	//this.$router.push('/optcareer')		    	
//		    },
		    //选择院校
		    optcollege(){
		    	var title = '个人资料';
		    	this.$router.push('/college?title='+title)
		    },
		    //选择行业
		    onIndustryChange: function (picker, values) {
			     this.areaPicker = picker
			     this.industry = values[0]
			     console.log(this.areaPicker)
		    },	
		    cancleIndustry: function () {
		      	this.industryPopupVisible = false
		    },
		    //选择职业/////////////////////////////////////////
		    onCareerChange: function (picker, values) {
			     this.areaPicker = picker
			     this.career = values[0]
		    },	
		    cancleCareer: function () {
		      	this.careerPopupVisible = false
		    },
		    
		    
		    //设置行业
		    selectIndustry: function () {
		      this.industryPopupVisible = false;
		      setUserInfo('',this.industry,'','','','').then(res=>{
		      		if(res.code=="000"){
		     			this.data.industry = this.industry;
		      		}else{
		      			Toast(res.msg);
		      		}
		      })		     
		    },
		    //设置职业///////////////////////////////////
		    selectCareer: function () {
		      this.careerPopupVisible = false;
		      setUserInfo('','',this.career,'','','').then(res=>{
		      		if(res.code=="000"){
		      			console.log(res)
		     			this.data.career = this.career;
		      		}else{
		      			Toast(res.msg);
		      		}
		      })		     
		    },
		    
		    uploadHeaderPic:function(){
		        /*选择图片上传*/
		        var _self = this;		        
		        chooseImage('1',function (res) {
		        	//console.log(123)
		          if(res.code=="000"){		          	
		          	_self.headImgUrl = res.path;
		          }else{
		          	Toast(res.msg);
		          }
		        });
		    }   	    

		},
		components:{ Picker,Popup,college,testchooce }
	}

</script>

<style lang="scss" scoped>
	@import 'src/style/mixin';
	
	.edit .mint-datetime .picker-toolbar{position: absolute !important;bottom: 0 !important;}
	
	body{width: 100%;height: 100%;background: #f0f0f0;}
	template{width: 100%;height: 100%;background: #F0F0F0;}
	.edit{width: 100%;height: 100%;
		/*@include abody();*/
	}
	.progressbar{width: 100%;height: 5.88rem;overflow: hidden;
		/*@include abody();*/
	}
	/*#jqmeter-container{width: 100%;height: 100%;}*/
	.progressbar span{display: block;margin: 0 auto;width: 5.81rem;height: 1rem;font-size: 0.8125rem;color: #666666;margin-top: 1.69rem;}
	
	.bar{width: 100%;overflow: hidden;}
	.bar .outbar{width: 71.2%;height: 0.38rem;background: #D8D8D8;border-radius: .5rem;margin-left: 9.1%;margin-top: 0.94rem;float: left;}
    .bar .outbar .inbar{width: 80%;height: 100%;background: #FFD743;border-radius: .5rem;}
	.bar .num{display: inline-block;width: 10%;height: 1rem;font-size: .8125rem;color: #333333;letter-spacing: 0;float: left;margin-top: 0.8125rem;}
	
	
	.head{width: 100%;height: 4.25rem;background: #fff;margin-bottom: .63rem;}
	.head i{display: inline-block;font-style: normal;float: left;width: 10%;height: 1.31rem;margin-left: 3.8%;margin-top: 1.5rem;font-family: PingFangSC-Regular;font-size: .94rem;color: #979797;line-height: 1.31rem;}
	.head .imghead{display: inline-block;font-style: normal;float: left;width: 2.49rem;height: 2.49rem;border-radius: 50%;margin-left: 5.3%;margin-top: .88rem;border:none;}
	.head span{display: inline-block;font-style: normal;float: right;width: 1.91rem;height: 100%;}
	.head span img{display: inline-block;width: .56rem;height: .81rem;margin-top: 1.75rem;}
		
	.detail{width: 100%;overflow: hidden;}
	.detail li{width: 100%;height: 2.75rem;border-bottom: 1px solid #f0f0f0;background: #fff;}
    .detail i{display: inline-block;font-style: normal;float: left;width: 22.7%;height: 1.31rem;margin-left: 3.8%;margin-top: .69rem;font-family: PingFangSC-Regular;font-size: .94rem;color: #979797;line-height: 1.31rem;text-align: left;}
    /*信息*/
    .detail em{display: inline-block;font-style: normal;float: right;height: 100%;overflow: hidden;line-height: 2.75rem;font-family: PingFangSC-Regular;font-size: 0.9375rem;color: #333333;letter-spacing: -0.32px;}
    /*箭头*/
    .detail span{display: inline-block;font-style: normal;float: right;width: 1.91rem;height: 100%;}
    .detail span img{display: inline-block;width: .56rem;height: .81rem;margin-top: .95rem;}
    .detail .trade{margin-top: .63rem;}
    .detail .college{margin-top: .63rem;}
   
    
    
    .shadow{width: 100%;height: 100%;background: rgba(0,0,0,.2);z-index: 999;position: absolute;left: 0;top: 0;display: none;}
    .cityShadow{width: 100%;height: 100%;background: rgba(0,0,0,.2);z-index: 999;position: absolute;left: 0;top: 0;}
    /*******************性别***************************/
    .optsex{width: 100%;height: 11.25rem;background: #fff;z-index: 999999;position: absolute;left: 0;
    	/*bottom: 0;*/
    	bottom: -11.25rem;
    	border-radius: .5rem;
    	line-height: 2.75rem;font-size: .9275rem;display: none;
    	transition: 0.02s;
    }   
    .optsex .optinfo{width: 100%;height: 2.75rem;font-family: PingFangSC-Regular;color: #979797;}
    .optsex ul{width: 100%;overflow: hidden;border-top: 1px solid #f0f0f0;}
    .optsex ul li{width: 100%;height: 2.75rem;border-bottom: 1px solid #f0f0f0;}
    .optsex .suresex{color: #0076FF;}
    .optsex .imgsex{width: 1.19rem;height: 1.19rem;position: absolute;top: 0.5rem;right: 1.78rem;z-index: 9999999;line-height: 1.19rem;display: none;}    
    .optsex .imgsex img{width: 100%;height: 100%;}
    .active_sex{background: #F7F8F9;border-top:#E5E6E7;border-bottom:#E5E6E7;color: #000;}
    
    /*******************生日***************************/

    .picker .picker-toolbar{display: none!important;}
    
   
    .cityPicker{
    	.picker-items{
			height: 250px;
		}
    }
 
    
    /*.optcity{width: 100%;height: 11.25rem;background: #fff;z-index: 999999;position: absolute;left: 0;bottom: 0;border-radius: .5rem;line-height: 2.75rem;font-size: .9275rem;display: none;}   
    .optcity .optinfocity{width: 100%;height: 2.75rem;font-family: PingFangSC-Regular;color: #979797;}
    .optcity ul{width: 100%;overflow: hidden;border-top: 1px solid #f0f0f0;}
    .optcity ul li{width: 100%;height: 2.75rem;border-bottom: 1px solid #f0f0f0;}
    .suresex{color: #0076FF;}
    .imgsex{width: 1.19rem;height: 1.19rem;position: absolute;bottom: 9.4rem;right: 1.78rem;z-index: 9999999;display: none;}    
    .imgsex img{width: 100%;height: 100%;}
    .active_city{background: #F7F8F9;border-top:#E5E6E7;border-bottom:#E5E6E7;color: #000;}*/
   .mint-popup-4 {
    width: 100%;
    height: 220px;
	}
.mint-popup-4 .picker-slot-wrapper, .page-popup .mint-popup-4 .picker-item {
    -webkit-backface-visibility: hidden;
  }
 
</style>
