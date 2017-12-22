import  _ from 'lodash'
import  printMe from './print.js'


function component() {
	var element =  document.createElement('div');
	var btn = document.createElement('button')

	// lodash (目前通过一个 script 脚本引入) 在index.html中
	element.innerHTML = _.join(['hello', 'webapck'], ' ');

	btn.onclick = printMe
	
	element.appendChild(btn)
	return element;

}

document.body.appendChild(component() );