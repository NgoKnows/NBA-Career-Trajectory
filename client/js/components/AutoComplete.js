import React, { Component, PropTypes } from 'react';
import Radium from 'radium'

import AutoCompleteRow from './AutoCompleteRow'

class AutoComplete extends Component {
    render() {
        const { actions, suggestions } = this.props;

        return (
            <div style={STYLES.container}>
                {
                    suggestions.size ?
                        this.renderAutoCompleteRows() : <AutoCompleteRow empty={true}/>
                }
            </div>
        );
    }

    renderAutoCompleteRows() {
        const { actions, suggestions } = this.props;

        return suggestions.map((suggestion) => {
            return (
                <AutoCompleteRow
                    actions={actions}
                    id={suggestion.id}
                    key={suggestion.id}
                    name={suggestion.name}
                />
            )
        })
    }
}

const STYLES = {
    container: {
        backgroundColor: '#F2F2F2',
        border          : 0,
        borderRadius    : '2px',
        boxSizing       : 'border-box',
        fontSize        : '1.5rem',
        padding         : '0.3rem 0.5rem',
        width           : 'inherit',
    }
};

AutoComplete.propTypes = {};
AutoComplete.defaultProps = {};

export default Radium(AutoComplete);
