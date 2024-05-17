import { createStore, applyMiddleware, compose } from 'redu';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import rootReducer from './reducers'

const initialstate = {}; 

const middleware = [thunk];

const store = createstore(
    rootReducer,
    initialstate,
    composeWithDevTools(applyMiddleware(...middleware))
);
export default store;