import { destroyVM, createTest } from '../util'
import unitTestOne from '@/components/unitTestOne'

describe('unitTestOne.vue的单元测试', () => {
	let vm
  
	afterEach(() => {
	  destroyVM(vm)
	})
  
	it('测试获取元素内容', () => {
	  vm = createTest(unitTestOne, { content: 'Hello World' }, true)
	  expect(vm.$el.querySelector('.hello h1').textContent).to.equal('Welcome to Your 单元测试一')
	  expect(vm.$el.querySelector('.hello h2').textContent).to.have.be.equal('Hello World')
	})
  
	it('测试获取Vue对象中数据', () => {
	  vm = createTest(unitTestOne, { content: 'Hello World' }, true)
	  expect(vm.msg).to.equal('Welcome to Your 单元测试一')
	  // Chai的语言链是无意义的，可以随便写。如下：
	  expect(vm.content).which.have.to.be.that.equal('Hello World') 
	})
  
	it('测试获取DOM中是否存在某个class', () => {
	  vm = createTest(unitTestOne, { content: 'Hello World' }, true)
	  expect(vm.$el.classList.contains('hello')).to.be.true
	  const title = vm.$el.querySelector('.hello h1')
	  expect(title.classList.contains('hello-title')).to.be.true
	  const content = vm.$el.querySelector('.hello-content')
	  expect(content.classList.contains('hello-content')).to.be.true
	})
  })