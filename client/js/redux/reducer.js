import { SET_SEARCH_TERM, ADD_PLAYER, REMOVE_PLAYER,
    SET_SUGGESTIONS, TOGGLE_AUTO_COMPLETE, TOGGLE_LOADING } from './constants'
import { combineReducers } from 'redux-immutablejs'
import Immutable from 'immutable'

let initialState = Immutable.Map({
    players: Immutable.List(),
    suggestions: Immutable.List(),
    searchTerm: '',
    autoComplete: false,
    loading: false
});
function app(state = initialState, action) {
    switch(action.type) {
        case SET_SEARCH_TERM:
            return state.set('searchTerm', action.searchTerm);

        case ADD_PLAYER:
            return state.update('players', (players) => players.push(action.player));

        case REMOVE_PLAYER:
            return state.update('players', (players) => {
                const index = players.indexOf((value) => {
                    return value.id === action.id
                });
                console.log(index)
                return players.delete(index);
            });
        
        case SET_SUGGESTIONS:
            return state.set('suggestions', Immutable.List(action.suggestions));

        case TOGGLE_AUTO_COMPLETE:
            return state.set('autoComplete', action.show);

        case TOGGLE_LOADING:
            return state.set('loading', action.loading);

        default:
            return state;
    }
}

//const rootReducer = combineReducers({
//    app
//});

export default app;
