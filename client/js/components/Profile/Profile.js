import React, { Component, PropTypes } from 'react';
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
                    {this.renderStats()}
                </div>
            </div>
        );
    }
    renderStats() {
        const { player } = this.props;

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

Profile.propTypes = {};
Profile.defaultProps = {};

export default Radium(Profile);
