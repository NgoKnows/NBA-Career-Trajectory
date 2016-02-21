import React, { Component, PropTypes } from 'react';
import Radium from 'radium'

class Input extends Component {
    render() {
        const { actions, value } = this.props;

        return (
            <div>
                <input
                    onFocus={() => actions.toggleAutoComplete(true)}
                    style={STYLES}
                    onChange={(e) => {
                        actions.setSearchTerm(e.target.value);
                        actions.getSuggestions();
                    }}
                    value={value}
                    placeholder="Search for a player!"
                />
            </div>
        );
    }
}

const STYLES = {
    backgroundColor : '#EBEBEB',
    border          : 0,
    borderRadius    : '4px',
    boxSizing       : 'border-box',
    fontSize        : '1.5rem',
    outline         : 0,
    padding         : '0.5rem 1rem',
    width           : '100%',
    fontFamily      : 'Lato, Serif',
    ':focus' : {
        outline      : 'none',
        borderRadius : '4px 4px 0 0'
    }
};

Input.propTypes = {
    value : PropTypes.string
};

export default Radium(Input);
