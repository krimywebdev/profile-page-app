import React from 'react'
import { should } from 'should/should.js'
import { Thunk } from 'redux-testkit'
import { fetchUser,
         fetchUserFeedImages,
         fetchPopularFeedImages } from '../redux'
import PumpupService from '../api_services/services'

global.fetchMock = require('fetch-mock')

describe('tests for actions', () => {
  beforeEach(() => {
    fetchMock.reset()
  })

  it('should dispatch correct action when user bio is fetched from server', async () => {
    const data = require('./user.bio.json')
    fetchMock.post('http://api.pumpup.com/1/classes/User/318381', data)
    const dispatches = await Thunk(fetchUser).execute()
    dispatches.should.be.instanceof(Array).and.have.lengthOf(1)
    const isPlainObject = dispatches[0].isPlainObject()
    const actionObject = dispatches[0].getAction()
    const user = actionObject.user
    isPlainObject.should.be.true
    actionObject.should.have.property('type', 'SUCCESS_FETCH_USER')
    user.should.have.property('bio', 'Hello this is my bio')
    user.should.have.property('website', 'https://store.pumpup.com')
  })

  it('should dispatch correct action when user images feed is fetched from server', async () => {
    const data = require('./user.profile.images.json')
    fetchMock.post('http://api.pumpup.com/1/functions/feed/profile/load-batch', data)
    const dispatches = await Thunk(fetchUserFeedImages).execute()
    dispatches.should.be.instanceof(Array).and.have.lengthOf(1)
    const isPlainObject = dispatches[0].isPlainObject()
    const actionObject = dispatches[0].getAction()
    const userFeedImages = actionObject.userFeedImages
    isPlainObject.should.be.true
    actionObject.should.have.property('type', 'SUCCESS_FETCH_USER_FEED_IMAGES')
    userFeedImages.should.be.instanceof(Array).and.have.lengthOf(3)
  })

  it('should dispatch correct action when popular images feed is fetched from server', async () => {
    const data = require('./popular.feed.images.json')
    fetchMock.post('http://api.pumpup.com/1/functions/feed/popular/load-batch', data)
    const dispatches = await Thunk(fetchPopularFeedImages).execute()
    dispatches.should.be.instanceof(Array).and.have.lengthOf(1)
    const isPlainObject = dispatches[0].isPlainObject()
    const actionObject = dispatches[0].getAction()
    const popularFeedImages = actionObject.popularFeedImages
    isPlainObject.should.be.true
    actionObject.should.have.property('type', 'SUCCESS_FETCH_POPULAR_FEED_IMAGES')
    popularFeedImages.should.be.instanceof(Array).and.have.lengthOf(5)
  })

})
