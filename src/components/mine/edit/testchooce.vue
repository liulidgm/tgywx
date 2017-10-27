<template>  
  <div id="app">  
  <mt-picker :slots="slots" 
  	 @confirm="handleConfirm"></mt-picker>     
    <router-view></router-view>  
  </div>  
</template>  
   
<script>  
   
export default {  
  data () {  
  return {  
   slots:  
        [  
        {  
          flex: 1,  
          values: ['年假', '事假', '病假', '婚假', '其他'],  
          className: 'slot1',  
          textAlign: 'left'  
        }, {  
          divider: true,  
          content: '-',  
          className: 'slot2'  
        }, {  
          flex: 1,  
          values: ['2015-11', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],  
          className: 'slot3',  
          textAlign: 'right'  
        }  
      ] 
     }
  },  
  methods:{
  	handleConfirm(data){}
  },
  mounted:function(){  
   
  }  
}  
</script>  
   
<style>  
   
</style> 