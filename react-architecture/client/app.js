import ReactDOM from 'react-dom'
import  React from 'react'
//热跟新, 用AppContainer 去包裹我们根节点想要渲染的 html 内容
import { AppContainer } from 'react-hot-loader'
import App from './App.jsx'

//ReactDOM.hydrate(<App />, document.getElementById('root'));


const root = document.getElementById('root');
const render = Component => {
    ReactDOM.hydrate(
        <AppContainer>
            <Component />
        </AppContainer>,
        root
    )
}

render(App)
if (module.hot) {
    module.hot.accept('./App.jsx', () => {
        const NextApp = require('./App.jsx').default;
        //ReactDOM.hydrate(<App />, document.getElementById('root'));
        render(NextApp)
    })
}