import React, { Component, PropTypes } from 'react';
import Radium from 'radium'

import Tab from './Tab'

class Tabs extends Component {
    render() {
        const { format, actions } = this.props;
        return (
            <div style={STYLES.container}>
                <Tab name="Season" active={format === "season"} handleClick={() => actions.setFormat('season')}/>
                <Tab name="Year" active={format === "year"} handleClick={() => actions.setFormat('year')}/>
                <Tab name="Age" active={format === "age"} handleClick={() => actions.setFormat('age')}/>
            </div>
        );
    }
}

const STYLES = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '15px 200px'
    }
};

Tabs.propTypes = {};
Tabs.defaultProps = {};

export default Radium(Tabs);
