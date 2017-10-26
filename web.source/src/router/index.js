import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Login from '@/views/Login'
import NotFound from '@/views/NotFound'

import DeviceAdvert from '@/views/DeviceAdvert'
import DeviceAdvertCreate from '@/views/DeviceAdvertCreate'
import DeviceAdvertEdit from '@/views/DeviceAdvertEdit'

import ShopAdvert from '@/views/ShopAdvert'
import ShopAdvertCreate from '@/views/ShopAdvertCreate'
import ShopAdvertEdit from '@/views/ShopAdvertEdit'

import KeyAdvert from '@/views/KeyAdvert'
import KeyAdvertCreate from '@/views/KeyAdvertCreate'
import KeyAdvertEdit from '@/views/KeyAdvertEdit'


import AppAdvert from '@/views/AppAdvert'
import AppAdvertCreate from '@/views/AppAdvertCreate'
import AppAdvertEdit from '@/views/AppAdvertEdit'

import Invitation from '@/views/Invitation'


// 新加广告
/*
    悬浮框广告
*/
import SuspensionAd from '../views/SuspensionAdver'
import SuspensionAdCreate from '../views/SuspensionAdCreate'
import SuspensionAdEdit from '../views/SuspensionAdEdit'
/*
    弹框广告
*/
import AlertAd from '../views/AlerAdver'
import AlertAdCreate from '../views/AlertAdCreate'
import AlertAdEdit from '../views/AlertAdEdit'
/*
    通知
*/
import Notice from '@/views/Notice'
import NoticeCreate from '@/views/NoticeCreated'

/*
    用户管理
*/
import User from '@/views/User'
import UserAnalyse from '@/views/UserAnalyse'

import store from '@/store'

Vue.use(Router)
// store.state.user.access_token = '4154b3ae7731fc9653c4428e15e61ddd369c1565'
const router = new Router({
    routes: [{
        path: '/',
        name: 'index',
        component: Index,
        beforeEnter: (to, from, next) => {
            // console.log(store.state.user.access_token)
            // if (!store.state.user.access_token) {
            //     next({ path: '/login' })
            // } else {
            //     next()
            // }
             next()
        },
        children: [{
            name: 'deviceAdvert',
            path: 'deviceAdvert',
            component: DeviceAdvert
        }, {
            name: 'deviceAdvert-create',
            path: 'deviceAdvert/create',
            component: DeviceAdvertCreate
        }, {
            name: 'deviceAdvert-edit',
            path: 'deviceAdvert/edit/:id',
            component: DeviceAdvertEdit
        }, {
            name: 'shopAdvert',
            path: 'shopAdvert',
            component: ShopAdvert
        }, {
            name: 'shopAdvert-create',
            path: 'shopAdvert/create',
            component: ShopAdvertCreate
        }, {
            name: 'shopAdvert-edit',
            path: 'shopAdvert/edit/:id',
            component: ShopAdvertEdit
        }, {
            name: 'keyAdvert',
            path: 'keyAdvert',
            component: KeyAdvert
        }, {
            name: 'keyAdvert-create',
            path: 'keyAdvert/create',
            component: KeyAdvertCreate
        }, {
            name: 'keyAdvert-edit',
            path: 'keyAdvert/edit/:id',
            component: KeyAdvertEdit
        }, {
            name: 'appAdvert',
            path: 'appAdvert',
            component: AppAdvert
        }, {
            name: 'appAdvert-create',
            path: 'appAdvert/create',
            component: AppAdvertCreate
        }, {
            name: 'appAdvert-edit',
            path: 'appAdvert/edit/:id',
            component: AppAdvertEdit
        }, {
            name: 'invitation',
            path: 'invitation',
            component: Invitation
        }, {
            name: 'suspensionAd',
            path: 'suspension',
            component: SuspensionAd
        }, {
            name: 'suspensionAdCreate',
            path: 'suspension/create',
            component: SuspensionAdCreate
        }, {
            name: 'suspensionAdEdit',
            path: 'suspension/edit/:id',
            component: SuspensionAdEdit
        }, {
            name: 'alertAd',
            path: 'alert',
            component: AlertAd,
        }, {
            name: 'alertAdCreate',
            path: 'alert/create',
            component: AlertAdCreate,
        }, {
            name: 'alertAdEdit',
            path: 'alert/edit/:id',
            component: AlertAdEdit,
        }, {
            name: 'notice',
            path: 'notice',
            component: Notice,
            //NoticeCreate
            
        },{
            name: 'notice-create',
            path: 'notice/create/:id',
            component: NoticeCreate,
            //NoticeCreate
            
        },{
            name: 'user',
            path: 'user',
            component: User,   
        }, {
            name: 'userAnalyse',
            path: 'user/analyse',
            component: UserAnalyse,   
        }]
    }, {
        path: '/login',
        name: 'login',
        component: Login
    }, {
        path: '*',
        component: NotFound
    }]
})

// router.beforeEach((to, from, next) => {
//   next()
// })

export default router
