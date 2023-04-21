import fetch from "node-fetch"


/**
 * Service for making an HTTP request with one URL and if needed a Bearer token.
 */
export class HttpRequestService {
  
  /**
   * Makes a request based on url parameter.
   * @param {string} url URL endpoint.
   * @param {string} token Bearer token.
   * @returns Object data.
   */
  async makeRequest(url, token) {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error(error)
      return null
    }
  }
}