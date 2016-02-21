import { SET_SEARCH_TERM, ADD_PLAYER, REMOVE_PLAYER,
    SET_SUGGESTIONS, TOGGLE_AUTO_COMPLETE, TOGGLE_LOADING,
    SET_FORMAT, SET_CATEGORY, SET_HOVERING_PLAYER} from './constants'

import { combineReducers } from 'redux-immutablejs'
import Immutable from 'immutable'


// Search
// --------------------------------------------------
let initialSearchState = Immutable.Map({
    searchTerm: '',
    suggestions: Immutable.List()
});
function search(state = initialSearchState, action) {
    switch(action.type) {
        case SET_SEARCH_TERM:
            return state.set('searchTerm', action.searchTerm);

        case SET_SUGGESTIONS:
            return state.set('suggestions', Immutable.List(action.suggestions));

        default:
            return state;
    }
}

// Players
// --------------------------------------------------
let initialPlayerState = Immutable.List();
function players(state = initialPlayerState, action) {
    switch(action.type) {
        case ADD_PLAYER:
            return state.push(action.player);

        case REMOVE_PLAYER:
            const index = state.findIndex((value) => {
                return value.id === action.id
            });

            return state.delete(index);

        default:
            return state;
    }
}

// Graph
// --------------------------------------------------
let graphState = Immutable.Map({
    format: 'season',
    category: 'PTS'
});
function graph(state = graphState, action) {
    switch(action.type) {
        case SET_FORMAT:
            return state.set('format', action.format);

        case SET_CATEGORY:
            return state.set('category', action.category);

        default:
            return state;
    }
}

// UI
// --------------------------------------------------
let uiState = Immutable.Map({
    autoComplete: false,
    loading: false,
    hoveringPlayer: Immutable.Map()
});
function ui(state = uiState, action) {
    switch(action.type) {
        case TOGGLE_AUTO_COMPLETE:
            return state.set('autoComplete', action.show);

        case TOGGLE_LOADING:
            return state.set('loading', action.loading);

        case SET_HOVERING_PLAYER:
            return state.set('hoveringPlayer', Immutable.Map(action.player))

        default:
            return state;
    }
}

const app = combineReducers({
    search,
    players,
    graph,
    ui
});

export default app;
