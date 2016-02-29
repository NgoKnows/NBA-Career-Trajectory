import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes'
import Radium from 'radium'

class Profile extends Component {
    render() {
        const { player } = this.props

        return (
            <div style={STYLES.container}>
                <div style={STYLES.profileContainer}>
                    <img
                        style={STYLES.image}
                        src={`http://stats.nba.com/media/players/230x185/${player.get('id')}.png`}
                    />
                    {this.renderStats(player)}
                </div>
            </div>
        );
    }

    renderStats(player) {
        if (player.get('stats')) {
            return (
                <div style={STYLES.stats}>
                    <div style={STYLES.name}>
                        {player.get('name')}
                    </div>
                    <div>
                        {player.get('stats').team}
                    </div>
                    <div>
                        {player.get('stats').year + ' season'}
                    </div>
                    <div>
                        {player.get('stats').statValue + ' ' + player.get('stats').category}
                    </div>
                </div>
            );
        } else {
            return <div style={STYLES.name}>{player.get('name')}</div>;
        }
    }
}

const STYLES = {
    container: {
        display: 'flex',
        marginTop: '25px',
        justifyContent: 'center'
    },

    profileContainer: {
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    image: {
        borderRadius: '50%',
        height: '10rem',
    },

    name: {
        marginTop: '5px',
        fontSize: '24px'
    },

    stats: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
};

Profile.propTypes = {
    player: ImmutablePropTypes.map.isRequired
};

export default Radium(Profile);
