import React from 'react'
import ReactDOM from 'react-dom'
import composeStore from 'js/CreateStore'
import Root from 'containers/Root'

const store = composeStore();

ReactDOM.render(<Root store={store}/>, document.getElementById('root'));
