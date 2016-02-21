import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes'
import Radium from 'radium'

import Chip from './Chip'

class Chips extends Component {
    render() {
        const { actions, players } = this.props;

        return (
            <div style={STYLES.container}>
                {this.renderChips()}
            </div>
        );
    }

    renderChips() {
        const { actions, players } = this.props;

        return players.map((player) => {
            return (
                <Chip
                    actions={actions}
                    name={player.name}
                    id={player.id}
                    key={player.id}
                />
            )
        });
    }
}

const STYLES = {
    container: {
        display       : 'flex',
        flexDirection : 'column',
        alignItems    : 'center'
    }
};

Chips.propTypes = {
    players : ImmutablePropTypes.list
};

export default Radium(Chips);
