import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'

import App from 'containers/App'
import DevTools from 'containers/DevTools'

export default class Root extends Component {
    render() {
        return (
            <Provider store={this.props.store} >
                <div>
                    <App />
                </div>
            </Provider>
        )
    }
}