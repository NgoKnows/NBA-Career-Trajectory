import React, { Component, PropTypes } from 'react';
import Radium from 'radium'

import Input from './Input'
import AutoComplete from './AutoComplete'

class SearchInput extends Component {
    render() {
        const { value, autoComplete, suggestions, actions } = this.props;
        const { focused } = this.state;

        return (
            <div style={STYLES.container} onClick={(e) => e.stopPropagation()}>
                <Input
                    toggleFocused={this.toggleFocused}
                    actions={actions}
                    value={value}
                />

                {autoComplete ?
                    <AutoComplete
                        actions={actions}
                        suggestions={suggestions}
                    />
                    : null
                }
            </div>
        );
    }
}

const STYLES = {
    container: {
        width: '350px',
        zIndex: 90000
    }
};

SearchInput.propTypes = {};
SearchInput.defaultProps = {};

export default Radium(SearchInput);
