import React from 'react'
import {should} from 'should/should.js'
import { createSelector } from 'reselect'
import {
  getUser,
  getUserState,
  getUserFeedPhotos,
  getUserFeedImagesState,
  getPopularFeedImages,
  getPopularFeedImagesState,
} from '../selectors'

const state = {
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

describe('tests for selectors', function(){

  it('getUserState selector should return correct state', function() {

    const user = getUserState(state)
    user.should.have.property('name', 'Pumpup')
    user.should.have.property('bio', 'Hello this is my bio')

  })

  it('getUserFeedImagesState selector should return correct state', function(){

    const userFeedImages = getUserFeedImagesState(state)
    userFeedImages.should.be.instanceof(Array).and.have.lengthOf(6);

  })

  it('getPopularFeedImagesState selector should return correct state', function(){

    const popularFeedImages = getPopularFeedImagesState(state)
    popularFeedImages.should.be.instanceof(Array).and.have.lengthOf(3);

  })
})