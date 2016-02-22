import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes'
import Radium from 'radium'

import Input from './Input'
import AutoComplete from './AutoComplete'

class SearchInput extends Component {
    render() {
        const { value, autoComplete, suggestions, players, actions } = this.props;

        return (
            <div style={STYLES.container} onClick={(e) => e.stopPropagation()}>
                <h2>Player Search</h2>
                <Input actions={actions} value={value}/>
                {this.renderAutoComplete()}
            </div>
        );
    }

    renderAutoComplete() {
        const { suggestions, players, actions } = this.props;

        if (this.props.autoComplete) {
            return (
                <AutoComplete
                    actions={actions}
                    suggestions={suggestions}
                    players={players}
                />
            );
        } else {
            return null;
        }
    }
}

const STYLES = {
    container: {
        width  : '350px',
        margin : '15px 0'
    }
};

SearchInput.propTypes = {
    value        : PropTypes.string.isRequired,
    autoComplete : PropTypes.bool.isRequired,
    suggestions  : ImmutablePropTypes.list.isRequired,
    players      : ImmutablePropTypes.list.isRequired
};

export default Radium(SearchInput);
