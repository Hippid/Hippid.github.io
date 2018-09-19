export const FETCH_TVSHOWS = 'FETCH_TVSHOWS';
export const FETCH_TVSHOWS_SUCCESS = 'FETCH_TVSHOWS_SUCCESS';
export const FETCH_TVSHOWS_FAILURE = 'FETCH_TVSHOWS_FAILURE';

export const fetchTvShows = () => ({
  type: FETCH_TVSHOWS,
});

export const fetchTvShowsSuccess = tvshows => ({
  type: FETCH_TVSHOWS_SUCCESS,
  payload: tvshows,
});

export const fetchTvShowsFailure = message => ({
  type: FETCH_TVSHOWS_FAILURE,
  payload: message,
});
