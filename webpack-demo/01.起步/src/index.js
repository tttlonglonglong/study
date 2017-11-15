import  _ from 'lodash'

function component() {
	var element =  document.createElement('div');

	// lodash (目前通过一个 script 脚本引入) 在index.html中
	element.innerHTML = _.join(['hello', 'webapck'], ' ');

	return element;

}

document.body.appendChild(component() );