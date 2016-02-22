import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable'

import DevTools from 'containers/DevTools'
import Reducer from './redux/reducer'

export default function composeStore() {

    //always use thunk middleware
    let middleware = [applyMiddleware(thunk)];
    //
    ////devtools only in development
    //if (process.env.NODE_ENV !== 'production') {
    //    middleware.push(DevTools.instrument());
    //}

    const finalCreateStore = compose(...middleware)(createStore);

    const store = finalCreateStore(Reducer);

    return store;
}
