import _ from 'lodash';
import './style.css';
import Icon from './icon.jpg';
import Icon2 from './icon2.png';
import XML from './data/data.xml';
import JSON from './data/data.xml';

function component() {
	var element = document.createElement('div');
	var element2 = document.createElement('div');

	// Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
	// Lodash, now imported by this script
	element.innerHTML = _.join(['Hello', 'webpack', 'webapck引入css'], ' ');
	// element.innerHTML ='hahah';
	element.classList.add('hello');
	var myIcon = new Image();
	var myIcon2 = new Image();
	myIcon.src = Icon;
	myIcon2.src = Icon2;
 
	element2.innerHTML ='<i class="iconfont">&#xe616;</i>';
	element.appendChild(myIcon);
	element.appendChild(myIcon2);
	element.appendChild(element2);

	console.log('XML', XML, 'JSON',  JSON);
	return element;
}

document.body.appendChild(component());