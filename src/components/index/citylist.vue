<template>
<div class="citylist">
	<div class="search">
		<input type="text" v-model="cityKey" class="common-input search-input" placeholder="请输入城市名称或拼音">
		<span class="search-btn" @click="searchCity()">搜索</span>
	</div>
	
	<div style="overflow-y: scroll;">
	<div class="hotCity" style="text-align:left" v-show="showHotCity">
		<div class="sort_letter">热门城市</div>
		<div style="height: 40px;line-height: 40px;padding-left:0.5rem;border-bottom:1px solid #ddd;"  v-for="item in hotCity">
				<div class="num_name" @click="showIndex(item.cName)">{{item.cName}}</div>
		</div>
	</div>
		<div id="letter" ></div>
	<div class="sort_box"></div>
	</div>
	
	<div class="initials">
		<ul>
			<li><img src="../../assets/start.png"></li>
		</ul>
	</div>
</div>
</template>

<script type="text/ecmascript-6">
	import $ from 'jquery';
	import {selCityList} from '@/service/getdata'
	export default {
		data(){
			return {
				selCityList:[],
				showHotCity:true,
				hotCity:[],
				cityKey:''
			}
		},
		mounted(){
			this.initData();
		},
		methods:{
			showIndex(cname){
				//this.$emit('closeCityList',cname);
				this.$router.push('/index?city='+cname);
			},
			searchCity(){
				if(this.cityKey){
					this.showHotCity = false;
				}else{
					this.showHotCity = true;
				}
				this.initData();
			},
			initData(){
				selCityList(this.cityKey).then(res=>{
				if(res.code=="000"){
						this.selCityList = res.cityList;
						var _self = this;
						$('.sort_box').html('');
						for(var i = 0;i<this.selCityList.length;i++){

							var str = '<div class="sort_list">'+
										'<div class="num_name" onclick="">'+_self.selCityList[i].cName+'</div>'+
									  '</div>';
							$('.sort_box').append(str);
						}
						$('.sort_list>.num_name').click(function(){
							_self.showIndex($(this).html());
						})
						let a = document.documentElement.clientHeight;
						$('.sort_box').css('height',a);
				
						/**************排序组件开始*************/
						//$(document).ready(function(){
				        var Initials=$('.initials');
				        var LetterBox=$('#letter');
				        var result = initials();
				        Initials.find('ul').html('');
				        for(var i = 0;i<result.length;i++){
				        	Initials.find('ul').append('<li>'+result[i]+'</li>');
				        }
				        $(".initials ul li").click(function(){
				            var _this=$(this);
				            var LetterHtml=_this.html();
				            LetterBox.html(LetterHtml).fadeIn();

				            Initials.css('background','rgba(145,145,145,0.6)');
				            
				            setTimeout(function(){
				                Initials.css('background','rgba(145,145,145,0)');
				                LetterBox.fadeOut();
				            },1000);

				            var _index = _this.index();
				            //alert(_index);
				            if(_index==0){
				                $('.sort_box').animate({scrollTop: '0px'}, 300);//点击第一个滚到顶部
				            }else if(_index==27){
				                var DefaultTop=$('#default').position().top;
				                $('.sort_box').animate({scrollTop: DefaultTop+'px'}, 300);//点击最后一个滚到#号
				            }else{
				                var letter = _this.text();
				                if($('#'+letter).length>0){
				                    var LetterTop = $('#'+letter).position().top;
				                    alert(LetterTop);
				                    $('.sort_box').animate({scrollTop: LetterTop-60+'px'}, 300);
				                }
				            }
				        })

				        var windowHeight=$(window).height();
				        var InitHeight=windowHeight-45;
				        Initials.height(InitHeight);

				        var LiHeight=InitHeight/28;
				        Initials.find('li').height(LiHeight);
						//})
						function initials() {//公众号排序
						    var SortList=$(".sort_list");
						    var SortBox=$(".sort_box");
						    SortList.sort(asc_sort).appendTo('.sort_box');//按首字母排序
						    function asc_sort(a, b) {
						        return makePy($(b).find('.num_name').text().charAt(0))[0].toUpperCase() < makePy($(a).find('.num_name').text().charAt(0))[0].toUpperCase() ? 1 : -1;
						    }

						    var initials = [];
						    var num=0;
						    SortList.each(function(i) {
						        var initial = makePy($(this).find('.num_name').text().charAt(0))[0].toUpperCase();
						        // console.log(initial);
						        if(initial>='A'&&initial<='Z'){
						            if (initials.indexOf(initial) === -1)
						                initials.push(initial);
						        }else{
						            num++;
						        }
						        //console.log(initials);
						    });

						    $.each(initials, function(index, value) {//添加首字母标签
						        SortBox.append('<div class="sort_letter" id="'+ value +'">' + value + '</div>');
						    });
						    if(num!=0){SortBox.append('<div class="sort_letter" id="default">#</div>');}

						    for (var i =0;i<SortList.length;i++) {//插入到对应的首字母后面
						        var letter=makePy(SortList.eq(i).find('.num_name').text().charAt(0))[0].toUpperCase();
						        switch(letter){
						            case "A":
						                $('#A').after(SortList.eq(i));
						                break;
						            case "B":
						                $('#B').after(SortList.eq(i));
						                break;
						            case "C":
						                $('#C').after(SortList.eq(i));
						                break;
						            case "D":
						                $('#D').after(SortList.eq(i));
						                break;
						            case "E":
						                $('#E').after(SortList.eq(i));
						                break;
						            case "F":
						                $('#F').after(SortList.eq(i));
						                break;
						            case "G":
						                $('#G').after(SortList.eq(i));
						                break;
						            case "H":
						                $('#H').after(SortList.eq(i));
						                break;
						            case "I":
						                $('#I').after(SortList.eq(i));
						                break;
						            case "J":
						                $('#J').after(SortList.eq(i));
						                break;
						            case "K":
						                $('#K').after(SortList.eq(i));
						                break;
						            case "L":
						                $('#L').after(SortList.eq(i));
						                break;
						            case "M":
						                $('#M').after(SortList.eq(i));
						                break;
						            case "N":
						                $('#N').after(SortList.eq(i));
						                break;
						            case "O":
						                $('#O').after(SortList.eq(i));
						                break;
						            case "P":
						                $('#P').after(SortList.eq(i));
						                break;
						            case "Q":
						                $('#Q').after(SortList.eq(i));
						                break;
						            case "R":
						                $('#R').after(SortList.eq(i));
						                break;
						            case "S":
						                $('#S').after(SortList.eq(i));
						                break;
						            case "T":
						                $('#T').after(SortList.eq(i));
						                break;
						            case "U":
						                $('#U').after(SortList.eq(i));
						                break;
						            case "V":
						                $('#V').after(SortList.eq(i));
						                break;
						            case "W":
						                $('#W').after(SortList.eq(i));
						                break;
						            case "X":
						                $('#X').after(SortList.eq(i));
						                break;
						            case "Y":
						                $('#Y').after(SortList.eq(i));
						                break;
						            case "Z":
						                $('#Z').after(SortList.eq(i));
						                break;
						            default:
						                $('#default').after(SortList.eq(i));
						                break;
						        }
						    };
						    // console.log(initials);
						    return initials;
						}
						/**************排序组件结束*************/
						//筛出热门城市
						for(var i=0;i<res.cityList.length;i++){
							if(res.cityList[i].hot){
								this.hotCity.push(res.cityList[i]);
							}
						}
				}else{
					alert('获取城市列表失败');
				}
			});
			}
			
		}
		
	}
</script>

<style lang="scss">
@import 'src/style/mixin';
.citylist{
	@include wh(100%,100%);
	position:relative;
	.search-input{
		width: 78%;
	    border-radius: 1rem;
	    margin: 0.5rem 0;
	    /* margin-top: 0.3rem; */
	    background: #ddd;
	}
	.search-btn{}


	#letter{
	    width: 100px;
	    height: 100px;
	    border-radius: 5px;
	    font-size: 75px;
	    color: #555;
	    text-align: center;
	    line-height: 100px;
	    background: rgba(145,145,145,0.6);
	    position: fixed;
	    left: 50%;
	    top: 50%;
	    margin:-50px 0px 0px -50px;
	    z-index: 99;
	    display: none;
	}
	.sort_box{
	    width: 100%;
	    // padding-top: 45px;
	    //overflow-y: scroll;
	    text-align:left;
	    /*height: 100%;*/
	}
	.sort_list{
	    padding:10px 60px 10px 80px;
	    position: relative;
	    height: 40px;
	    line-height: 40px;
	    border-bottom:1px solid #ddd;
	    padding: 0.2rem 0.5rem;
	}

	.sort_list .num_logo{
	    width: 50px;
	    height: 50px;
	    border-radius: 10px;
	    overflow: hidden;
	    position: absolute;
	    top: 5px;
	    left: 20px;
	}
	.sort_list .num_logo img{
	    width: 50px;
	    height: 50px;
	}
	.sort_list .num_name{
	    color: #000;
	}

	.sort_letter{
	    height: 30px;
	    line-height: 30px;
	    padding-left: 20px;
	    color:#787878;
	    font-size: 14px;
	    border-bottom:1px solid #ddd;
	    background:#ddd;
	}
	.initials{
	    position:absolute;
	    top: 60px;
	    right: 0px;
	    height: 100%;
	    width: 15px;
	    padding-right: 10px;
	    text-align: center;
	    font-size: 12px;
	    /* z-index: 99;*/
	    background: rgba(145,145,145,0);
	}
	.initials li img{
	    width: 14px;
	}
}
	
</style>