import { createStore } from 'redux';

/*
 * Reducer
 */

const initialState = {
  userName: '',
  level: 1,
  score: {},

};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'setUserName':
      return Object.assign({}, state, {
        userName: action.userName,
      });
    case 'setLevel':
      return Object.assign({}, state, {
        level: action.level,
      });
    case 'setScore':
      return Object.assign({}, state, {
        score: action.score,
      });
    default:
      return state;
  }
};

/*
 * Store
 */
const store = createStore(counterReducer);
export default store;
