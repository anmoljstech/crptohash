import { combineReducers } from 'redux';
import authReducer from './Authreducer';
import dashbaordreducers from './Dashbordreducer'
import dispositreducers from './Despositreducer'
import Withdrawreducer from './Withdrawreducer'
const rootReducer = combineReducers({
    auth: authReducer,
    dashbaord:dashbaordreducers,
    despositdata:dispositreducers,
    withdrwal:Withdrawreducer,


});

export default rootReducer;