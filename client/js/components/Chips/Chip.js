import React, { Component, PropTypes } from 'react';
import Radium from 'radium'

class Chip extends Component {
    render() {
        const { actions, id, name } = this.props;

        return (
                <div
                    style={STYLES.container}
                    onMouseOver={() => this.handleMouseOver()}
                    onMouseOut={() => this.handleMouseOut()}
                    key={id}
                >
                    <div style={STYLES.imageContainer}>
                        <img
                            style={STYLES.image}
                            src={`http://stats.nba.com/media/players/230x185/${id}.png`}
                        />
                    </div>
                    <span style={STYLES.text}>{name}</span>
                    <span
                        onClick={() => this.handleRemoveClick()}
                        style={STYLES.close}
                    >
                        x
                    </span>
                </div>
        );
    }

    handleMouseOver() {
        const { id, name } = this.props;

        d3.selectAll('.player')
            .classed('notSelected', (player) =>  player.name !== name )
        d3.selectAll('g.dot')
            .classed('notSelected', (player) =>  player.name !== name )
    }

    handleMouseOut() {
        d3.selectAll('.player')
            .classed('notSelected', (b) => false )
        d3.selectAll('g.dot')
            .classed('notSelected', (player) =>  false )
    }

    handleRemoveClick() {
        const { actions, id } = this.props;

        actions.removePlayerThunk(id)

        d3.selectAll('.player')
            .classed('notSelected', (b) => false )
        d3.selectAll('g.dot')
            .classed('notSelected', (player) =>  false )
    }
}

const STYLES = {
    container: {
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: '55px',
        margin: '10px 0',
        padding: 0,
        height: '55px',
        boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)',
        transition: '.2s ease-out',
        ':hover' : {
            boxShadow: '0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15)',
            cursor: 'pointer'
        }
    },

    imageContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: '55px',
        width: '55px',
        overflow: 'hidden',
        boxShadow: '2px 0px rgba(0,0,0,.3)',
        borderRadius: '50%',
    },

    image: {
        display: 'block',
        height: '55px'
    },

    text: {
        display: 'inline-block',
        margin: '0 10px',
        fontSize: '18px',
    },

    close: {
        display: 'inline-block',
        fontWeight: 400,
        marginRight: '15px',
        fontSize: '15px',
        color: 'grey'
    }
};

Chip.propTypes = {
    name : PropTypes.string,
    id   : PropTypes.string
};

export default Radium(Chip);