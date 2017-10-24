import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import unitTestOne from '@/components/unitTestOne'
import unitTestTwo from '@/components/unitTestTwo'
import unitTestThree from '@/components/unitTestThree'
import unitTestFour from '@/components/unitTestFour'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
	},
	{
		path: '/unitTestOne',
		name: 'unitTestOne',
		component: unitTestOne
	  },
	  {
		path: '/unitTestTwo',
		name: 'unitTestTwo',
		component: unitTestTwo
	  },
	  {
		path: '/unitTestThree',
		name: 'unitTestThree',
		component: unitTestThree
	  },
	  {
		path: '/unitTestFour',
		name: 'unitTestFour',
		component: unitTestFour
	  }
  ]
})
