import React, { Component, PropTypes } from 'react';
import Radium from 'radium'

class Chip extends Component {
    render() {
        const { actions, id, name } = this.props;
        return (
            <div style={STYLES.container}
                 onMouseOver={() => {
                 d3.selectAll('.player')
                    .classed('notSelected', (b) =>  b.name !== name )
                    }}
                 onMouseOut={() => {
                    d3.selectAll('.player')
                    .classed('notSelected', (b) => false )
                    }}
                 key={id}>

                <div style={STYLES.container}>
                    <div style={STYLES.imageContainer}>
                        <img style={STYLES.image} src={`http://stats.nba.com/media/players/230x185/${id}.png`}/>
                    </div>
                    <span style={STYLES.text}>{name}</span>
                    <span onClick={() => actions.removePlayerGraph(id)} style={STYLES.close}>x</span>
                </div>
            </div>




        );
    }
}

const STYLES = {
    container: {
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: '50px',
        margin: '10px 0',
        padding: 0,
        height: '50px',
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
        height: '50px',
        width: '62px',
        overflow: 'hidden',
        float: 'left',
        boxShadow: '2px 0px rgba(0,0,0,.3)',
        borderRadius: '50%'
    },

    image: {
        display: 'block',
        height: '50px'
    },

    text: {
        display: 'inline-block',
        margin: '0 8px',
        fontWeight: 400,
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

Chip.propTypes = {};
Chip.defaultProps = {};

export default Radium(Chip);
