import React, { Component, PropTypes } from 'react';
import Radium from 'radium'

import Loading from 'images/loading-balls.svg'

class LoadingIcon extends Component {
    render() {
        return (
            <div style={STYLES}>
                <img src={Loading}/>
            </div>
        );
    }
}

const STYLES = {
    position: 'absolute',
    left: '65%',
    top: '35%'
};

LoadingIcon.propTypes = {};
LoadingIcon.defaultProps = {};

export default Radium(LoadingIcon);
