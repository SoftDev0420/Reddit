import types from '../config/actionTypes';

const API_URL = 'https://www.reddit.com';

export function callRedditDataSuccess(payload) {
  return (dispatch) => {
    dispatch({ type: types.API_DATA_SUCCESS, payload });
  };
}

export function callRedditDataFailure(error) {
  return (dispatch) => {
    dispatch({ type: types.API_DATA_FAILURE, error });
  };
}

export function callRedditDataRequest() {
  return (dispatch) => {
    fetch(`${API_URL}/r/aww.json`, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      const error = new Error(response.statusText);
      error.response = response;
      dispatch(callRedditDataFailure(error));
      throw error;
    })
    .then((response) => {
      dispatch(callRedditDataSuccess(response.data.children));
    })
    .catch((error) => { console.log('request failed', error); });
    dispatch({ type: types.API_DATA_REQUEST });
  };
}
