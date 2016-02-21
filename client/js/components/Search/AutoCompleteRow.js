import React, { Component, PropTypes } from 'react';
import Radium from 'radium'

class AutoCompleteRow extends Component {
    render() {
        const { actions, id, name, empty, disabled } = this.props;

        return (
            <div>
                { !empty ?
                    <div
                        style={[STYLES.row, STYLES.disabled(disabled)]}
                        key={id}
                        onClick={() => !disabled ? actions.getPlayerStats({id, name}) : null}
                    >
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
        ':hover': {
            opacity: 0.5,
            cursor: 'pointer'
        }
    },

    empty: {
        padding: '0.5rem'
    },

    disabled: (disabled) => {
        if (disabled) {
            return {
                opacity: '0.3',
                ':hover': {
                    opacity: '0.3',
                    cursor: 'not-allowed'
                }
            }
        } else {
            return {};
        }
    }
};

AutoCompleteRow.propTypes = {
    id    : PropTypes.string,
    name  : PropTypes.string,
    empty : PropTypes.bool
};

export default Radium(AutoCompleteRow);
