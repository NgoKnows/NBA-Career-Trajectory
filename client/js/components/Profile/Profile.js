import React, { Component, PropTypes } from 'react';
import Radium from 'radium'

class Profile extends Component {
    render() {
        const { id } = this.props
        return (
            <div style={STYLES.container}>
                <div style={STYLES.profileContainer}>
                    <img
                        style={STYLES.image}
                        src={`http://stats.nba.com/media/players/230x185/${id}.png`}
                    />
                    <div style={STYLES.name}>Stephen Curry</div>
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
    }
};

Profile.propTypes = {};
Profile.defaultProps = {};

export default Radium(Profile);
