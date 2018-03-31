import { combineReducers } from 'redux';
import { LOGIN } from './constraints';

const initialState = {
    username: '',
    id: '',
    profilePic: ''
}

function reducer (state = initialState, action) {
    switch(action.type) {
        case LOGIN:
            return state = action.payload;
        default:
            return state;
    }
};

const rootReducer = combineReducers({reducer});

export default rootReducer;