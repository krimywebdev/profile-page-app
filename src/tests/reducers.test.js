import React from 'react'
import {should} from 'should/should.js'
import {userDetails} from '../redux'

const initialState = {
  userDetails: {
    user: {},

    userFeedImages: [],

    popularFeedImages: [],
  }
}

const newState = {
  userDetails: {
    user: {
      bio: "Hello this is my bio",
      name: "Pumpup"
    },

    userFeedImages: [
      {thumbnail: "https://abc.com/abc.jpg"},
      {thumbnail: "https://abc.com/abc.jpg"},
      {thumbnail: "https://abc.com/abc.jpg"},
      {thumbnail: "https://abc.com/abc.jpg"},
      {thumbnail: "https://abc.com/abc.jpg"},
      {thumbnail: "https://abc.com/abc.jpg"},
    ],

    popularFeedImages: [
      {thumbnail: "https://abc.com/abc.jpg"},
      {thumbnail: "https://abc.com/abc.jpg"},
      {thumbnail: "https://abc.com/abc.jpg"},
    ],
  }
}

const errorState = {
  userDetails: {
    user: { error: true },

    userFeedImages: { error: true },

    popularFeedImages: { error: true },
  }
}
describe('tests for reducers', function(){
  it('reducer should return correct initial state', function() {

    const init_state = userDetails().userDetails

    init_state.user.should.be.an.Object().and.be.empty();

    init_state.userFeedImages.should.be.instanceof(Array).and.have.lengthOf(0);

    init_state.popularFeedImages.should.be.instanceof(Array).and.have.lengthOf(0);

  })

  it('reducer should return correct state on success of fetching user', function() {

    const new_user = userDetails(newState, {type: 'SUCCESS_FETCH_USER'}).userDetails.user

    new_user.should.have.property('name', 'Pumpup')
    new_user.should.have.property('bio', 'Hello this is my bio')

  })

  it('reducer should return error state on failure of fetching user', function() {

    const new_user = userDetails(errorState, {type: 'ERROR_FETCH_USER'}).userDetails.user

    new_user.should.have.property('error', true)

  })

  it('reducer should return correct user feed images on success of fetching user feed images', function() {

    const userFeedImages = userDetails(newState, {type: 'SUCCESS_FETCH_USER_FEED_IMAGES'}).userDetails.userFeedImages

    userFeedImages.should.be.instanceof(Array).and.have.lengthOf(6);

  })

  it('reducer should return error state on failure of fetching user feed images', function() {

    const userFeedImages = userDetails(errorState, {type: 'ERROR_FETCH_USER_FEED_IMAGES'}).userDetails.userFeedImages

    userFeedImages.should.have.property('error', true)

  })


  it('reducer should return correct popular feed images on success of fetching popular feed images', function() {

    const popularFeedImages = userDetails(newState, {type: 'SUCCESS_FETCH_POPULAR_FEED_IMAGES'}).userDetails.popularFeedImages

    popularFeedImages.should.be.instanceof(Array).and.have.lengthOf(3);

  })

  it('reducer should return error state on failure of fetching popular feed images', function() {

    const popularFeedImages = userDetails(errorState, {type: 'ERROR_FETCH_POPULAR_FEED_IMAGES'}).userDetails.popularFeedImages

    popularFeedImages.should.have.property('error', true)

  })
})