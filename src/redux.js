import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux'

import thunk from 'redux-thunk';

/**
 * can be split into another file called actions.js
 */

export const showUser = user => ({
  type: 'SUCCESS_FETCH_USER',
  user,
})

export const sendError = () => ({ type: 'ERROR_FETCH_USER' })

export const fetchUser = () => dispatch =>
  fetch('http://api.pumpup.com/1/classes/User/318381', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "_method": "GET",
      "_version": "5.0.5",
      "_SessionToken":
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjI3MDc3OTgsImV4cCI6MTUzOTUzNTI1OTM2OH0.UK2qP1yk9QLk_Bkx1Ly0RPaitRYtec8ojZhzYRc0D-g"
    })
  }).then(response => response.json())
    .then(function(responseBody) {
      console.log(responseBody)
      dispatch(showUser(responseBody))
    })
    .catch(() => dispatch(sendError()))


export const showUserFeedImages = userFeedImages => ({
  type: 'SUCCESS_FETCH_USER_FEED_IMAGES',
  userFeedImages,
})

export const sendErrorFetchingUserFeedImages = () => ({ type: 'ERROR_FETCH_USER_FEED_IMAGES' })

export const fetchUserFeedImages = () => dispatch =>
  fetch('http://api.pumpup.com/1/functions/feed/profile/load-batch', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "isThumbnailsOnly": true,
      "limit": 5,
      "userId": 2707798,
      "_method": "POST",
      "_version": "5.0.5",
      "_SessionToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjI3MDc3OTgsImV4cCI6MTUzOTUzNTI1OTM2OH0.UK2qP1yk9QLk_Bkx1Ly0RPaitRYtec8ojZhzYRc0D-g"
    })
  }).then(response => response.json())
  .then(function(responseBody) {
    console.log(responseBody)
    dispatch(showUserFeedImages(responseBody.result.posts))
  })
  .catch(() => dispatch(sendErrorFetchingUserFeedImages()))


export const showPopularFeedImages = popularFeedImages => ({
  type: 'SUCCESS_FETCH_POPULAR_FEED_IMAGES',
  popularFeedImages,
})

export const sendErrorFetchingPopularFeedImages = () => ({ type: 'ERROR_FETCH_POPULAR_FEED_IMAGES' })

export const fetchPopularFeedImages = () => dispatch =>
fetch('http://api.pumpup.com/1/functions/feed/popular/load-batch', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    "isThumbnailsOnly": true,
    "limit": 18,
    "_method": "POST",
    "_version": "5.0.5",
    "_SessionToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjI3MDc3OTgsImV4cCI6MTUzOTUzNTI1OTM2OH0.UK2qP1yk9QLk_Bkx1Ly0RPaitRYtec8ojZhzYRc0D-g"
  })
}).then(response => response.json())
.then(function(responseBody) {
  console.log(responseBody)
  dispatch(showPopularFeedImages(responseBody.result.posts))
})
  .catch(() => dispatch(sendErrorFetchingPopularFeedImages()))


/**
 * can be split into another file called reducers.js
 */
export const userDetails = (state = {}, action) => {
  let new_state
  switch(action.type) {

    case 'SUCCESS_FETCH_USER':
      new_state = JSON.parse(JSON.stringify(state))
      new_state.user = action.user
      return new_state

    case 'ERROR_FETCH_USER':
      new_state = JSON.parse(JSON.stringify(state))
      new_state.user = { error: true }
      return new_state

    case 'SUCCESS_FETCH_USER_FEED_IMAGES':
      new_state = JSON.parse(JSON.stringify(state))
      new_state.userFeedImages = action.userFeedImages
      return new_state

    case 'ERROR_FETCH_USER_FEED_IMAGES':
      new_state = JSON.parse(JSON.stringify(state))
      new_state.userFeedImages = { error: true }
      return new_state

    case 'SUCCESS_FETCH_POPULAR_FEED_IMAGES':
      new_state = JSON.parse(JSON.stringify(state))
      new_state.popularFeedImages = action.popularFeedImages
      return new_state

    case 'ERROR_FETCH_POPULAR_FEED_IMAGES':
      new_state = JSON.parse(JSON.stringify(state))
      new_state.popularFeedImages = { error: true }
      return new_state

    default:
      return state
  }
}

export const reducers = combineReducers({
  userDetails,
})

/**
 * can be split into a separate file called store.js
 */
export function configureStore(initialState = {}) {
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(thunk)
  )
  return store
}

export const store = configureStore()