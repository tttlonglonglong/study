import  _ from 'lodash'
import './style.css';
import Icon from './icon.jpg';
import Data from './data/data.xml';
import Data2 from './data/data.json';
function component() {
	var element =  document.createElement('div');

	// lodash (目前通过一个 script 脚本引入) 在index.html中
	element.innerHTML = _.join(['hello', 'webapck'], ' ');
	element.classList.add('hello');

	// 将图片添加到我们现有的 div
	var myIcon = new Image();
	var myIcon2 = new Image();

	myIcon.src = Icon;
	myIcon2.src = Icon;


	var element2 =  document.createElement('div');
	element2.appendChild(myIcon2);
	element.appendChild(myIcon);
	element.appendChild(element2);

	console.log('打印xml数据' ,Data);
	console.log('打印json数据' ,Data2);

	return element;

}

document.body.appendChild(component() );