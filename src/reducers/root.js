import {
  FETCH_TVSHOWS,
  FETCH_TVSHOWS_SUCCESS,
  FETCH_TVSHOWS_FAILURE,
} from '../actions';

const initialState = {
  tvshows: [],
  isLoading: false,
  error: null,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TVSHOWS:
      return {
        ...state,
        // whenever we want to fetch the tv shows, set isLoading to true to show a spinner
        isLoading: true,
        error: null,
      };
    case FETCH_TVSHOWS_SUCCESS:
      console.log('FETCH_TVSHOWS_SUCCESS');
      console.log(action.payload);
      return {
        tvshows: [...action.payload],
        // whenever the fetching finishes, we stop showing the spinner and then show the data
        isLoading: false,
        error: null,
      };
    case FETCH_TVSHOWS_FAILURE:
      console.log('FETCH_TVSHOWS_FAILURE');
      console.log(action.payload);
      return {
        tvshows: [],
        isLoading: false,
        // same as FETCH_TVSHOWS_SUCCESS, but instead of data we will show an error message
        error: action.payload,
      };
    default:
      return state;
  }
}
