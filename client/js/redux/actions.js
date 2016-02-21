import { SET_SEARCH_TERM, ADD_PLAYER, REMOVE_PLAYER,
    SET_SUGGESTIONS, SET_CATEGORY, SET_FORMAT,
    TOGGLE_AUTO_COMPLETE, TOGGLE_LOADING, SET_HOVERING_PLAYER } from './constants'

import request from 'superagent-bluebird-promise'
import { update } from 'd3/index'


// Search Actions
// --------------------------------------------------
export function setSuggestions(suggestions) {
    return {
        type: SET_SUGGESTIONS,
        suggestions
    }
}

export function setSearchTerm(searchTerm) {
    return {
        type: SET_SEARCH_TERM,
        searchTerm
    }
}

// Player Actions
// --------------------------------------------------
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

// Graph Actions
// --------------------------------------------------
export function setCategory(category) {
    return {
        type: SET_CATEGORY,
        category
    }
}

export function setFormat(format) {
    return {
        type: SET_FORMAT,
        format
    }
}

// UI Actions
// --------------------------------------------------
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

export function setHoveringPlayer(player) {
    return {
        type: SET_HOVERING_PLAYER,
        player
    }
}

// Thunks
// --------------------------------------------------
export function getSuggestions() {
    return (dispatch, getState) => {
        const searchTerm = getState().getIn(['search', 'searchTerm']);
        request
            .get(`/api/search/${searchTerm || '!'}`)
            .then((res) => dispatch(setSuggestions(res.body)));
    }
}

export function addPlayerThunk(player) {
    return (dispatch, getState) => {
        dispatch(getPlayerStats(player))
    }
}

export function removePlayerThunk(id) {
    return (dispatch, getState) => {
        dispatch(removePlayer(id));
    }
}

export function getPlayerStats(player) {
    return (dispatch, getState) => {
        dispatch(toggleLoading(true));
        dispatch(toggleAutoComplete(false));
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
            }));
    }
}
