
import { createStore } from 'redux'
// import rootReducer from './rootReducer';
import reducer from './reducers';

const store = createStore(reducer)

export default store;