import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes'
import Radium from 'radium'

import AutoCompleteRow from './AutoCompleteRow'

class AutoComplete extends Component {
    render() {
        const { actions, suggestions, players } = this.props;

        return (
            <div style={STYLES.container}>
                {this.renderAutoCompleteRows()}
            </div>
        );
    }

    renderAutoCompleteRows() {
        const { actions, suggestions, players } = this.props;

        if (suggestions.size) {
            return suggestions.map((suggestion) => {
                const index = players.findIndex((player) => {
                    return player.id === suggestion.id;
                });

                return (
                    <AutoCompleteRow
                        disabled={index !== -1}
                        actions={actions}
                        id={suggestion.id}
                        key={suggestion.id}
                        name={suggestion.name}
                    />
                )
            })
        } else {
            return <AutoCompleteRow empty={true}/>;
        }
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

AutoComplete.propTypes = {
    suggestions: ImmutablePropTypes.list.isRequired,
    players      : ImmutablePropTypes.list.isRequired
};

export default Radium(AutoComplete);
