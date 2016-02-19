import React, { Component, PropTypes } from 'react';
import Radium from 'radium'

class AutoCompleteRow extends Component {
    render() {
        const { actions, id, name, empty } = this.props;

        return (
            <div onClick={() => actions.getPlayerStats({id, name})}>
                { !empty ?
                    <div style={STYLES.row} key={id}>
                        <div style={STYLES.imageContainer}>
                            <img
                                style={STYLES.image}
                                src={`http://stats.nba.com/media/players/230x185/${id}.png`}
                            />
                        </div>
                        <div>{name}</div>
                    </div>
                    :
                    <div style={STYLES.empty}>No Results!</div>
                }
            </div>
        );
    }
}

const STYLES = {
    imageContainer: {
        borderRadius: '50%',
        backgroundColor: '#F6F6F6',
        marginRight: '0.5em'
    },

    image: {
        borderRadius: '50%',
        height: '3.5rem',
        marginTop: '0.35rem'
    },

    row: {
        display: 'flex',
        alignItems: 'center',
        //borderStyle: 'none none solid none',
        ':hover': {
            opacity: 0.5,
            cursor: 'pointer'
        }
    },

    empty: {
        padding: '0.5rem'
    }
};

AutoCompleteRow.propTypes = {};
AutoCompleteRow.defaultProps = {};

export default Radium(AutoCompleteRow);
