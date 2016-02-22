import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes'
import Radium from 'radium'

import Chip from './Chip'

import 'velocity-animate'
import 'velocity-animate/velocity.ui'
import { VelocityTransitionGroup, velocityHelpers } from 'velocity-react'

var Animations = {
    // Register these with UI Pack so that we can use stagger later.
    In: velocityHelpers.registerEffect({
        calls: [
            [{
                transformPerspective: [ 800, 800 ],
                transformOriginX: [ '50%', '50%' ],
                transformOriginY: [ '100%', '100%' ],
                marginBottom: 0,
                opacity: 1,
                rotateX: [0, 130],
            }, 1, {
                easing: 'ease-out',
                display: 'inline-flex',
            }]
        ],
    }),

    Out: velocityHelpers.registerEffect({
        calls: [
            [{
                transformPerspective: [ 800, 800 ],
                transformOriginX: [ '50%', '50%' ],
                transformOriginY: [ '0%', '0%' ],
                marginBottom: -30,
                opacity: 0,
                rotateX: -70,
            }, 1, {
                easing: 'ease-out',
                display: 'block',
            }]
        ],
    }),
};

var enterAnimation = {
    animation: Animations.In,
    stagger: 150,
    duration: 400,
    backwards: true,
    display: 'inline-flex',
    style: {
        // Since we're staggering, we want to keep the display at "none" until Velocity runs
        // the display attribute at the start of the animation.
        display: 'none',
    },
};

var leaveAnimation = {
    animation: Animations.Out,
    stagger: 100,
    duration: 500,
    backwards: true,
};

class Chips extends Component {
    render() {
        const { actions, players, hoveringPlayer } = this.props;

        return (
            <div>
                <VelocityTransitionGroup
                    component="div"
                    style={STYLES.container}
                    enter={enterAnimation}
                    leave={leaveAnimation}>
                {this.renderChips(players)}
                </VelocityTransitionGroup>

            </div>
        );
    }

    renderChips(players) {
        const { actions, hoveringPlayer } = this.props;

        const hoveringID = hoveringPlayer.get('id');

        return players.map((player) => {
            return (
                <Chip
                    actions={actions}
                    name={player.name}
                    id={player.id}
                    key={player.id}
                    hovering={hoveringID == player.id}
                />
            )
        });
    }
}

const STYLES = {
    container: {
        display       : 'flex',
        flexDirection : 'column',
        alignItems    : 'center',
    }
};

Chips.propTypes = {
    players : ImmutablePropTypes.list.isRequired,
    hoveringPlayer: ImmutablePropTypes.map.isRequired
};

export default Radium(Chips);
