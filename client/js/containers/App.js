import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from 'flux/actions'
import SearchInput from 'components/SearchInput'
import Chips from 'components/Chips'

import { start } from 'd3/index.js'

class App extends Component {
    componentDidMount() {
        start();
    }

    render() {
        const { actions, players, searchTerm, suggestions, autoComplete, loading } = this.props;
        return (
            <div style={STYLES.container} onClick={() => actions.toggleAutoComplete(false)}>
                <div>
                    <SearchInput
                        actions={actions}
                        value={searchTerm}
                        autoComplete={autoComplete}
                        suggestions={suggestions}
                    />
                    <Chips actions={actions} players={players}/>
                </div>
                <svg id="viz" width="1000" height="500" />
            </div>
        );
    }
}

App.propTypes = {}

function mapStateToProps(state) {
    return {
        searchTerm   : state.get('searchTerm'),
        players      : state.get('players'),
        suggestions  : state.get('suggestions'),
        autoComplete : state.get('autoComplete'),
        loading      : state.get('loading')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions : bindActionCreators(actions, dispatch)
    };
}

const STYLES = {
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        fontFamily: 'Lato, Serif',
        height: '100vh',
        margin: '1em 0'
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
