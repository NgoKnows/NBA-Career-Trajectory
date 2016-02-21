import React from 'react'
import ReactDOM from 'react-dom'
import composeStore from 'js/CreateStore'
import Root from 'containers/Root'
import '../stylesheets/main.css'

const store = composeStore();

ReactDOM.render(<Root store={store}/>, document.getElementById('root'));
