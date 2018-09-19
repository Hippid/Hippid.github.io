import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { ajax } from 'rxjs/observable/dom/ajax';

import {
  FETCH_TVSHOWS,
  fetchTvShowsFailure,
  fetchTvShowsSuccess,
} from '../actions';

export const rootEpic = combineEpics(fetchTvShowsEpic);
export default 'rootEpic';

const urlTvShows = 'http://api.tvmaze.com/search/shows?q=girls'; // The API for the TvMaze shows, just query the default Tv Shows example using the keyword 'Girls'.
// TODO: Expand TV Shows with user input.

/*
    The API returns the data in the following format:
    [{
        "score": 17.215446,
        "show": {
            "id": 139,
            "url": "http://www.tvmaze.com/shows/139/girls",
            "name": "Girls",
            "type": "Scripted",
            "language": "English",
            "genres": ["Drama", "Romance"],
            "status": "Ended",
            "runtime": 30,
            "premiered": "2012-04-15",
            "officialSite": "http://www.hbo.com/girls",
            "schedule": {
                "time": "22:00",
                "days": ["Sunday"]
            },
            "rating": {
                "average": 6.7
            },
            "weight": 90,
            "network": {
                "id": 8,
                "name": "HBO",
                "country": {
                    "name": "United States",
                    "code": "US",
                    "timezone": "America/New_York"
                }
            },
            "webChannel": null,
            "externals": {
                "tvrage": 30124,
                "thetvdb": 220411,
                "imdb": "tt1723816"
            },
            "image": {
                "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/31/78286.jpg",
                "original": "http://static.tvmaze.com/uploads/images/original_untouched/31/78286.jpg"
            },
            "summary": "<p>This Emmy winning series is a comic look at the assorted humiliations and rare triumphs of a group of girls in their 20s.</p>",
            "updated": 1532343735,
            "_links": {
                "self": {
                    "href": "http://api.tvmaze.com/shows/139"
                },
                "previousepisode": {
                    "href": "http://api.tvmaze.com/episodes/1079686"
                }
            }
        }
    }, {
    since we are only interested in the results array we will have to use map on our observable
 */
function fetchTvShowsEpic(action$) { // action$ is a stream of actions
  // action$.ofType is the outer Observable
  return action$
    // ofType(FETCH_TVSHOWS) is just a simpler version of .filter(x => x.type === FETCH_TVSHOWS)
    .ofType(FETCH_TVSHOWS)
    // ajax calls from Observable return observables. This is how we generate the inner Observable
    .switchMap(() => ajax
      // getJSON simply sends a GET request with Content-Type application/json
      .getJSON(urlTvShows)
      // filter out shows without image URLs (for convenience only)
      .map(tvshows => tvshows.filter(tvshow => !!tvshow.show.image)))
    // at the end our inner Observable has a stream of an array of show objects which will be merged into the outer Observable
    // map the resulting array to an action of type FETCH_WHISKIES_SUCCESS
    .map(tvshows => fetchTvShowsSuccess(tvshows))
    // every action that is contained in the stream returned from the epic is dispatched to Redux, this is why we map the actions to streams.
    // if an error occurs, create an Observable of the action to be dispatched on error. Unlike other operators, catch does not explicitly return an Observable.
    .catch(error => Observable.of(fetchTvShowsFailure(error.message)));
}
