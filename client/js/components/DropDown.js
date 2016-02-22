import React, { Component, PropTypes } from 'react';
import Radium from 'radium'

import { INCLUDED_CATEGORIES } from 'd3/constants'
import Select from 'react-select'

const options = INCLUDED_CATEGORIES.map((v) => {
    return {
        value: v,
        label: v
    }
});
class DropDown extends Component {
    render() {
        const { actions, category } = this.props;
        return (
            <div style={STYLES.container}>
                <div style={STYLES.select}>
                    <Select
                        name="form-field-name"
                        value={category}
                        options={options}
                        onChange={(option) => actions.setCategory(option.value)}
                        searchable={false}
                        clearable={false}
                    />
                </div>
            </div>
        );
    }
}

const STYLES = {
    container: {
        display: 'flex',
        justifyContent: 'center'
    },

    select: {
        width: '200px'
    }
};

DropDown.propTypes = {};
DropDown.defaultProps = {};

export default Radium(DropDown);
