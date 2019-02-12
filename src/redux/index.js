import { createStore } from 'redux';

/*
 * Reducer
 */

const initialState = {
  // ui theme
  userName: '',
  level: 12,
  score: {},
  //theme: localStorage.theme?localStorage.theme:process.env.THEME, // true === white
  //userScale: (localStorage.userScale?localStorage.userScale:process.env.USERSCALE),
  //
  //navigation: null,
  //domain: '',
  //param: {},
  //
  //// user infomation
  //validation: null,
  //popup: null,
  //
  //checkList: {},
  //
  //employeeName: '',
  //id: '',
  //team: '',
  //headquarters: '',
  //token: localStorage.token,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'setUserName':
      return Object.assign({}, state, {
        userName: action.userName
      });
    case 'setLevel':
      return Object.assign({}, state, {
        level: action.level
      });
    case 'setScore':
      return Object.assign({}, state, {
        score: action.score
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
