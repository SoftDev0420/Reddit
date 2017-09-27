import { combineReducers } from 'redux';
import redditDataReducer from './redditData';

export default combineReducers({
  redditData: redditDataReducer,
});
