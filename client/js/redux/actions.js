import { SET_SEARCH_TERM, ADD_PLAYER, REMOVE_PLAYER,
    SET_SUGGESTIONS, TOGGLE_AUTO_COMPLETE, TOGGLE_LOADING } from './constants'

import request from 'superagent-bluebird-promise'
import { test } from 'd3/index'


// Actions
// --------------------------------------------------
export function setSearchTerm(searchTerm) {
    return {
        type: SET_SEARCH_TERM,
        searchTerm
    }
}

export function addPlayer(player) {
    return {
        type: ADD_PLAYER,
        player
    }
}

export function removePlayer(id) {
    return {
        type: REMOVE_PLAYER,
        id
    }
}

export function setSuggestions(suggestions) {
    return {
        type: SET_SUGGESTIONS,
        suggestions
    }
}

export function toggleAutoComplete(show) {
    return {
        type: TOGGLE_AUTO_COMPLETE,
        show
    }
}

export function toggleLoading(loading) {
    return {
        type: TOGGLE_LOADING,
        loading
    }
}

// Thunks
// --------------------------------------------------
export function getSuggestions() {
    return (dispatch, getState) => {
        console.log('here')
        const searchTerm = getState().get('searchTerm');
        request
            .get(`/api/players/${searchTerm || '!'}`)
            .then((res) => dispatch(setSuggestions(res.body)));
    }
}

//export function addPlayer(player) {
//    return (dispatch, getState) => {
//        dispatch(getPlayerStats(player))
//    }
//}

export function getPlayerStats(player) {
    return (dispatch, getState) => {
        dispatch(toggleLoading(true));
        request
            .get(`/api/player/${player.id}`)
            .then(((res) => {
                const playerStats = {
                    id: player.id,
                    name: player.name,
                    stats: JSON.parse(res.text)
                }

                dispatch(addPlayer(playerStats));
                dispatch(toggleLoading(false));
                const players = getState().get('players').toJS()
                test(players)
            }));
    }
}

export function removePlayerGraph(id) {
    return (dispatch, getState) => {
        dispatch(removePlayer(id));
        const players = getState().get('players').toJS()
        test(players)
    }
}