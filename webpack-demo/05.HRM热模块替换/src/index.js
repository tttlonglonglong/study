import _ from 'lodash'
import printMe from './print.js'
import './styles.css';

function component() {
	var element = document.createElement('div');
	var btn = document.createElement('button')

	// lodash (目前通过一个 script 脚本引入) 在index.html中
	element.innerHTML = _.join(['hello', '0.'], ' ');
	btn.innerText = "点击输出";
	btn.onclick = printMe; // onclick 事件绑定原始的 printMe 函数上

	element.appendChild(btn)
	return element;

}

let element = component(); // 当 print.js 改变导致页面重新渲染时, 重新获取渲染的元素
document.body.appendChild(element);

// document.body.appendChild(component());

if (module.hot) {
	module.hot.accept('./print.js', function () {
		console.log('Accepting the updated printMe module!');
		//  printMe();
		document.body.removeChild(element);
		element = component(); // 重新渲染页面后, component更新 click 时间处理
		document.body.appendChild(element)
	})
}