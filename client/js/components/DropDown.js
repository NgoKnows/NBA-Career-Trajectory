import React, { Component, PropTypes } from 'react';
import Radium from 'radium'

import { INCLUDED_CATEGORIES, CATEGORY_TO_NAME } from 'd3/constants'
import Select from 'react-select'

console.log(CATEGORY_TO_NAME)
const options = INCLUDED_CATEGORIES.map((category) => {
    return {
        value: category,
        label: CATEGORY_TO_NAME[category]
    }
});

class DropDown extends Component {
    render() {
        const { actions, category } = this.props;

        return (
            <div style={STYLES.container}>
                <div style={STYLES.selectContainer}>
                    <div style={STYLES.category}>Category: </div>
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
        width: '250px'
    },

    selectContainer: {
        display: 'flex',
        alignItems: 'center'
    },

    category: {
        fontWeight: 'bold',
        marginRight: '10px',
        fontSize: '20px'
    }
};

DropDown.propTypes = {
    category: PropTypes.string.isRequired
};

export default Radium(DropDown);
