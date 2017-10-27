<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view></router-view>
  </div>
</template>

<script>
	import home from 'components/index/home'
	//import Hello from '@/components/Hello'
	
	import {userLogin} from '@/service/getdata'
 	import {UnUnicode} from '@/config/utils'
 	import {Toast} from 'mint-ui'
	export default {
	  name: 'app',
	  data(){
	  	return {
	  		openid:'',
	  		city:''
	  	}
	  },
	  async beforeMount(){
		  	/*从地址中获取openid存到本地*/
	    //   if(this.$route.query.openid){    	
	    //     localStorage.openid = this.$route.query.openid;////
	        		       		
					// this.openid = this.$route.query.openid;
	    //     console.log(123)
	    //     userLogin(this.openid).then(res=>{       	
	    //     	console.log(res)
	    //     	if(res.code == "000"){
	    //     		console.log(res)
	    //     		localStorage.tokenid = res.tokenId||'';////
	    //     		//console.log(localStorage.tokenid)     		
	    //         localStorage.loginFlag = true;
	    //         //console.log('登录操作成功')
	    //         localStorage.setItem('city',res.city||'上海')
	    //         //localStorage.city = res.city||''
	    //         //console.log(res.city)
	    //         this.$router.push('/index');  
	    //         Toast('登录成功')
	    //     	}else if(res.code == "001"){
	    //     		localStorage.loginFlag = false;
	    //         Toast("系统异常");
	    //     	}else{
	    //     		Toast('登录失败')
	    //     	}        	
	    //     })	        
	    //   }  
     
	      
    },
    beforeUpdate() {
      if(this.$route.query.title){
        document.title = UnUnicode(this.$route.query.title);
      }else{
        document.title = '推广猿'
      }
      /*关闭loading层*/
      //this.closeLoading();

    },
    mounted(){   	
    },
	  components:{home}
	}
</script>

<style>
	body,html{width: 100%;height: 100%;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  background: #F0F0F0;
  overflow: auto;
}
</style>
