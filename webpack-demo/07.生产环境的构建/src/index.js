import _ from 'lodash'
import { cube } from './math'


function component() {
	var element = document.createElement('pre');

	// lodash (目前通过一个 script 脚本引入) 在index.html中
	// element.innerHTML = _.join(['hello', '0.'], ' ');
	element.innerHTML = [
		'Hello webpack',
		'5 cubed is equal to' + cube(5)
	].join('\n\n')


	return element;

}

let element = component(); // 当 print.js 改变导致页面重新渲染时, 重新获取渲染的元素
document.body.appendChild(element);

 