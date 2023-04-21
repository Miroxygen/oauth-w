import fetch from "node-fetch"

/**
 * Fetches data with a GraphQL query.
 */
export class FetchDataGraphQlService {

  /**
   * Fetches data according to a url, query and if needed access token.
   * @param {string} query The requested query.
   * @param {string} url The endpoint url.
   * @param {string} accessToken Bearer token.
   * @returns Object with data.
   */
  async fetchData(query, url, accessToken) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ query }),
    })
    const { data } = await response.json()
    return data
  }
}