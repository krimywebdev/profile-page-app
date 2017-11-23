import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux'

import thunk from 'redux-thunk'

import PumpupService from './api_services/services'

/**
 * can be split into another file called actions.js
 */




export const showUser = user => ({
  type: 'SUCCESS_FETCH_USER',
  user,
})

export const sendError = () => ({ type: 'ERROR_FETCH_USER' })

export const fetchUser = () => {
  return async(dispatch, getState) => {
    try {
      const user = await PumpupService.getUserBio()
      dispatch(showUser(user))
    } catch (error) {
      console.log('error' + error)
      dispatch(sendError())
    }
  }
}

export const showUserFeedImages = userFeedImages => ({
  type: 'SUCCESS_FETCH_USER_FEED_IMAGES',
  userFeedImages,
})

export const sendErrorFetchingUserFeedImages = () => ({ type: 'ERROR_FETCH_USER_FEED_IMAGES' })

export const fetchUserFeedImages = () => {
  return async(dispatch, getState) => {
    try {
      const images = await PumpupService.getUserFeedImages()
      dispatch(showUserFeedImages(images.result.posts))
    } catch (error) {
      console.log('error' + error)
      dispatch(sendErrorFetchingUserFeedImages())
    }
  }
}

export const showPopularFeedImages = popularFeedImages => ({
  type: 'SUCCESS_FETCH_POPULAR_FEED_IMAGES',
  popularFeedImages,
})

export const sendErrorFetchingPopularFeedImages = () => ({ type: 'ERROR_FETCH_POPULAR_FEED_IMAGES' })

export const fetchPopularFeedImages = () => {
  return async(dispatch, getState) => {
    try {
      const images = await PumpupService.getPopularFeedImages()
      dispatch(showPopularFeedImages(images.result.posts))
    } catch (error) {
      console.log('error' + error)
      dispatch(sendErrorFetchingPopularFeedImages())
    }
  }
}



/**
 * can be split into another file called reducers.js
 */

const initialState = {
  userDetails: {
    user: {},

    userFeedImages: [],

    popularFeedImages: [],
  }
}

export const userDetails = (state = initialState, action = {}) => {
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
    new_state.userFeedImages = [{ error: true }]
    return new_state

  case 'SUCCESS_FETCH_POPULAR_FEED_IMAGES':
    new_state = JSON.parse(JSON.stringify(state))
    new_state.popularFeedImages = action.popularFeedImages
    return new_state

  case 'ERROR_FETCH_POPULAR_FEED_IMAGES':
    new_state = JSON.parse(JSON.stringify(state))
    new_state.popularFeedImages = [{ error: true }]
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