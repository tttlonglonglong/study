import Vue from 'vue'  // 导入Vue用于生成Vue实例
import HelloWorld from '@/components/HelloWorld'  // 导入组件

// 测试脚本里面应该包括一个或多个describe块，称为测试套件（test suite）
describe('这是hello.vue的单元测试', () => {

	// describe 的钩子函数
	before(function() {
		// 在本区块的所有测试用例之前执行
		console.log('before--0--在本区块的所有测试用例之前执行');
	  });

	  after(function() {
		// 在本区块的所有测试用例之后执行
		console.log('after--0--在本区块的所有测试用例之后执行');
		
	  });

	  beforeEach(function() {
		// 在本区块的每个测试用例之前执行
		console.log('beforeEach--0--在本区块的每个测试用例之前执行');
		
	  });

	  afterEach(function() {
		// 在本区块的每个测试用例之后执行
		console.log('afterEach--0--在本区块的每个测试用例之后执行');
		
	  });


	// 每个describe块应该包括一个或多个it块，称为测试用例（test case）
  it('测试功能的描述(函数输出是xxx, 接口请求xxxx)', () => {
    const Constructor = Vue.extend(HelloWorld) // 获得Hello组件实例
	const vm = new Constructor().$mount()   // 将组件挂在到DOM上     



	//断言：DOM中class为hello的元素中的h1元素的文本内容为Welcome to Your Vue.js App
    expect(vm.$el.querySelector('.hello h1').textContent)
	  .to.equal('Welcome to UNIT TEST')
	  


  })
})
