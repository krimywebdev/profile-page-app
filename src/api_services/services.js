const PUMPUP_ENDPOINT_PREFIX = 'http://api.pumpup.com'

class PumpupService {

  /**
   * get User's Bio from the server
   */
  async getUserBio() {
    const url = PUMPUP_ENDPOINT_PREFIX + '/1/classes/User/318381'
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept'       : 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        '_method'       : 'GET',
        '_version'      : '5.0.5',
        '_SessionToken' :
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjI3MDc3OTgsImV4cCI6MTUzOTUzNTI1OTM2OH0.UK2qP1yk9QLk_Bkx1Ly0RPaitRYtec8ojZhzYRc0D-g'
      })
    })

    if(!response.ok) {
      throw new Error('PumpupService getUserBio failed, HTTP status ' + response.status)
    }

    const data = await response.json()

    return data

  }



  /**
   * get user feed images from the server
   */
  async getUserFeedImages() {
    const url = PUMPUP_ENDPOINT_PREFIX + '/1/functions/feed/profile/load-batch'
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept'       : 'application/json',
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        'isThumbnailsOnly' : true,
        'limit'            : 5,
        'userId'           : 2707798,
        '_method'          : 'POST',
        '_version'         : '5.0.5',
        '_SessionToken'    :
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjI3MDc3OTgsImV4cCI6MTUzOTUzNTI1OTM2OH0.UK2qP1yk9QLk_Bkx1Ly0RPaitRYtec8ojZhzYRc0D-g'
      })
    })

    if(!response.ok) {
      throw new Error('PumpupService getUserFeedImages failed, HTTP status ' + response.status)
    }

    const data = await response.json()

    return data

  }



  /**
   * get popular Feed Images from the server
   */
  async getPopularFeedImages() {
    const url = PUMPUP_ENDPOINT_PREFIX + '/1/functions/feed/popular/load-batch'
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept'       : 'application/json',
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        'isThumbnailsOnly' : true,
        'limit'            : 18,
        '_method'          : 'POST',
        '_version'         : '5.0.5',
        '_SessionToken'    :
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjI3MDc3OTgsImV4cCI6MTUzOTUzNTI1OTM2OH0.UK2qP1yk9QLk_Bkx1Ly0RPaitRYtec8ojZhzYRc0D-g'
      })
    })

    if(!response.ok) {
      throw new Error('PumpupService getPopularFeedImages failed, HTTP status ' + response.status)
    }

    const data = await response.json()

    return data

  }
}

export default new PumpupService()
