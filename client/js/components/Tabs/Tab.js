import React, { Component, PropTypes } from 'react';
import Radium from 'radium'

class Tab extends Component {
    render() {
        const { name, active, handleClick } = this.props;

        return (
            <div onClick={handleClick} style={[STYLES.container, STYLES.active(active)]}>
                {name}
                <div style={[STYLES.underline, STYLES.activeUnderline(active)]} />
            </div>
        );
    }
}

const STYLES = {
    container: {
        fontSize: '24px',
        color: 'grey',
        opacity: '0.8',
        cursor: 'pointer'
    },

    active: (active) => {
        if (active) {
            return {
                color: 'black',
                opacity: '1',
            }
        } else {
            return {};
        }
    },

    underline: {
        marginTop: '3px',
        transition: 'width 0.25s ease-in-out',
        borderTop: '3px solid black',
        width: '0'
    },

    activeUnderline: (active) => {
        if (active) {
            return {
                width: '100%'
            }
        } else {
            return {};
        }
    }
};

Tab.propTypes = {};
Tab.defaultProps = {};

export default Radium(Tab);
