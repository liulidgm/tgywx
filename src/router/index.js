import Vue from 'vue'
import Router from 'vue-router'

import home from 'components/index/home'
import citylist from 'components/index/citylist'
import gettest from 'components/index/gettest'


import footers from 'components/common/footers'

import tests from 'components/tests/tests'
//任务详情
import testdetail from 'components/tests/testdetail'
//未通过审核详情
import nopassdetail from 'components/tests/nopassdetail'
//审核中详情
import testingdetail from 'components/tests/testingdetail'
//已完成详情
import donedetail from 'components/tests/donedetail'
//做任务
import todotest from 'components/tests/todotest'


import testchooce from 'components/mine/edit/testchooce'



import news from 'components/news/news'
import newsdetail from 'components/news/newsdetail'



import mine from 'components/mine/mine'
import edit from 'components/mine/edit'
import optcareer from 'components/mine/edit/optcareer'//选择职业
import optcareers from 'components/mine/edit/optcareers'//添加职业之二
import addcareer from 'components/mine/edit/addcareer'//添加行业
import college from 'components/mine/edit/college'//添加院校


import about from 'components/mine/about'

import wallet from 'components/mine/wallet'
import mymoneydetail from 'components/mine/mymoneydetail'//我的佣金明细
import helpback from 'components/mine/helpback'

import bindbankone from 'components/mine/bindbank/bindbankone'
import bindbanktwo from 'components/mine/bindbank/bindbanktwo'
import bindbankthree from 'components/mine/bindbank/bindbankthree'
import bindbankSuccess from 'components/mine/bindbank/bindbankSuccess'
import transDetail from 'components/mine/transDetail'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/index',
      name: 'home',
      component: home
    },{
      path:'/citylist',
      component:citylist
    },{
      path: '/gettest',
      name: 'gettest',
      component: gettest
    },
    {
      path: '/tests',
      name: 'tests',
      component: tests
    },{//任务详情
      path: '/testdetail',
      name: 'testdetail',
      component: testdetail
    },{//未通过审核详情
      path: '/nopassdetail',
      name: 'nopassdetail',
      component: nopassdetail
    },{//审核中详情
      path: '/testingdetail',
      name: 'testingdetail',
      component: testingdetail
    },{//已完成详情
      path: '/donedetail',
      name: 'donedetail',
      component: donedetail
    },
    {//做任务
      path: '/todotest',
      name: 'todotest',
      component: todotest
    },
    {
      path:'/common',
      name: 'footers',
      component: footers
    },
   
    {
      path:'/news',
      name: 'news',
      component: news
    }, {
      path:'/newsdetail',
      name: 'newsdetail',
      component: newsdetail
    },
   
		{
      path:'/mine',
      name: 'mine',
      component: mine
   },
   {//编辑
      path:'/edit',
      name: 'edit',
      component: edit
   },{//选择职业
      path:'/optcareer',
      name: 'optcareer',
      component: optcareer
   },{//添加职业
      path:'/addcareer',
      name: 'addcareer',
      component: addcareer
   },{//添加职业之二
      path:'/optcareers',
      name: 'optcareers',
      component: optcareers
   },
   {//选择院校
      path:'/college',
      name: 'college',
      component: college
   },
   {//帮助反馈
      path:'/helpback',
      name: 'helpback',
      component: helpback
   },
   {//关于
      path:'/about',
      name: 'about',
      component: about
   },{//钱包
      path:'/wallet',
      name: 'wallet',
      component: wallet
   },{//我的佣金明细
      path:'/mymoneydetail',
      name: 'mymoneydetail',
      component: mymoneydetail
   },
   {//钱包中绑定银行卡
      path:'/bindbankone',
      component: bindbankone
   },
   {
      path:'/bindbanktwo',
      component: bindbanktwo
   },
   {
      path:'/bindbankthree',
      component: bindbankthree
   },
    {
      path:'/bindbankSuccess',
      component: bindbankSuccess
   },
   {
      path:'/testchooce',
      component: testchooce
   },
   {
    path:'/transDetail',
    component:transDetail
   }
   
  ]
})
