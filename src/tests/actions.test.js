/* eslint-disable no-unused-vars */
import { should } from 'should/should.js'
/* eslint-enable no-unused-vars */
import { Thunk } from 'redux-testkit'
import { fetchUser,
  fetchUserFeedImages,
  fetchPopularFeedImages } from '../redux'

const fetchMock = require('fetch-mock')

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
    /* eslint-disable no-unused-expressions */
    isPlainObject.should.be.true
    /* eslint-enable no-unused-expressions */
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
    /* eslint-disable no-unused-expressions */
    isPlainObject.should.be.true
    /* eslint-enable no-unused-expressions */
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
    /* eslint-disable no-unused-expressions */
    isPlainObject.should.be.true
    /* eslint-enable no-unused-expressions */
    actionObject.should.have.property('type', 'SUCCESS_FETCH_POPULAR_FEED_IMAGES')
    popularFeedImages.should.be.instanceof(Array).and.have.lengthOf(5)
  })

})
