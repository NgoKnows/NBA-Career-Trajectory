import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SearchInput from 'components/Search/SearchInput'
import Chips from 'components/Chips/Chips'
import Tabs from 'components/Tabs/Tabs'
import Profile from 'components/Profile/Profile'
import LoadingIcon from 'components/LoadingIcon'
import DropDown from 'components/DropDown'


import { init, update } from 'd3/index.js'

import * as actions from 'flux/actions'

class App extends Component {
    componentDidMount() {
        init(this.props.actions);
    }

    componentWillReceiveProps(nextProps) {
        const { players, category, format} = this.props;
        if (this.props.players !== nextProps.players) {
            update(nextProps.players.toJS(), format, category);
        } else if (this.props.format !== nextProps.format) {
            update(players.toJS(), nextProps.format, category);
        } else if (this.props.category !== nextProps.category) {
            update(players.toJS(), format, nextProps.category);
        }
    }

    render() {
        const { actions, players, searchTerm,
            suggestions, autoComplete, loading,
            category, format, hoveringPlayer } = this.props;

        return (
            <div
                onClick={() => actions.toggleAutoComplete(false)}
                style={STYLES.container}
            >
                <div>
                    <SearchInput
                        actions={actions}
                        autoComplete={autoComplete}
                        suggestions={suggestions}
                        value={searchTerm}
                        players={players}
                    />
                    <Chips actions={actions} players={players}/>
                    {hoveringPlayer.size ? <Profile player={hoveringPlayer}/> : null}
                </div>
                <div>
                    {loading ? <LoadingIcon /> : null}
                    <DropDown category={category} actions={actions}/>
                    <svg id="viz" width="800" height="540" />
                    <Tabs actions={actions} format={format}/>
                </div>
            </div>
        );
    }
}

const STYLES = {
    container: {
        display        : 'flex',
        fontFamily     : 'Lato, Serif',
        height         : '100vh',
        justifyContent : 'space-around',
        margin         : '1em 0'
    }
}

App.propTypes = {
    searchTerm   : PropTypes.string,
    suggestions  : ImmutablePropTypes.list,
    players      : ImmutablePropTypes.list,
    autoComplete : PropTypes.bool,
    loading      : PropTypes.bool
}

function mapStateToProps(state) {
    return {
        searchTerm   : state.getIn(['search', 'searchTerm']),
        suggestions  : state.getIn(['search', 'suggestions']),
        autoComplete : state.getIn(['ui', 'autoComplete']),
        loading      : state.getIn(['ui', 'loading']),
        hoveringPlayer  : state.getIn(['ui', 'hoveringPlayer']),
        players      : state.get('players'),
        category     : state.getIn(['graph', 'category']),
        format       : state.getIn(['graph', 'format'])
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions : bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
