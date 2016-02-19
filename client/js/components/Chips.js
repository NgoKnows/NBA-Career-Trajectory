import React, { Component, PropTypes } from 'react';
import Radium from 'radium'

import Chip from 'components/Chip'

class Chips extends Component {
    render() {
        const { actions, players } = this.props;

        return (
            <div style={STYLES.container}>
                {players.map((player) => {
                    return (
                        <Chip
                            actions={actions}
                            name={player.name}
                            id={player.id}
                        />
                    )
                })}
            </div>
        );
    }
}

const STYLES = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
};

Chips.propTypes = {};
Chips.defaultProps = {};

export default Radium(Chips);
