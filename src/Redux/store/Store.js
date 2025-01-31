import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
// import rootReducer from '../reducer/Rootreducer';
import rootReducer from '../reducer/Rootreducer';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;
