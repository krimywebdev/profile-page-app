import PumpupService from '../api_services/services'

const fetchMock = require('fetch-mock')

describe('tests for utility methods', () => {
  beforeEach(() => {
    fetchMock.reset()
  })

  it('should fetch user bio', async () => {
    const data = require('./user.bio.json')
    fetchMock.post('http://api.pumpup.com/1/classes/User/318381', data)
    const response = await PumpupService.getUserBio()
    response.should.have.property('bio', 'Hello this is my bio')
    response.should.have.property('website', 'https://store.pumpup.com')
  })

  it('should fetch user feed images', async () => {
    const data = require('./user.profile.images.json')
    fetchMock.post('http://api.pumpup.com/1/functions/feed/profile/load-batch', data)
    const response = await PumpupService.getUserFeedImages()
    const posts = response.result.posts
    response.should.have.property('result').be.instanceOf(Object)
    posts.should.be.instanceof(Array).and.have.lengthOf(3)
  })

  it('should fetch popular feed images', async () => {
    const data = require('./popular.feed.images.json')
    fetchMock.post('http://api.pumpup.com/1/functions/feed/popular/load-batch', data)
    const response = await PumpupService.getPopularFeedImages()
    const posts = response.result.posts
    response.should.have.property('result').be.instanceOf(Object)
    posts.should.be.instanceof(Array).and.have.lengthOf(5)
  })
})

