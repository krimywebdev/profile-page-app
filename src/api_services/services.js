const PUMPUP_ENDPOINT_PREFIX = 'http://api.pumpup.com'

class PumpupService {
  async getUserBio() {
    const url = PUMPUP_ENDPOINT_PREFIX + "/1/classes/User/318381"
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "_method": "GET",
        "_version": "5.0.5",
        "_SessionToken":
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjI3MDc3OTgsImV4cCI6MTUzOTUzNTI1OTM2OH0.UK2qP1yk9QLk_Bkx1Ly0RPaitRYtec8ojZhzYRc0D-g"
      })
    })

    if(!response.ok) {
      throw new Error("PumpupService getUserBio failed, HTTP status " + response.status)
    }

    const data = await response.json()

    return data

  }
}

export default new PumpupService()
