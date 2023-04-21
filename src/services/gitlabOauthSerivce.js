import fetch from "node-fetch"

/**
 * Service for authenticating towards GitLab with OAuth.
 */
export class GitLabOauthService {
    constructor() {
      this.scope = 'read_user read_repository read_api'
    }
  
    /**
     * Gets the needed URL for auth endpoint.
     * @returns String url.
     */
    getAuthorizationUrl(baseURL, clientId, redirectUri) {
      const url = `${baseURL}/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${encodeURIComponent(this.scope)}`;
      return url
    }
  
    /**
     * Requests an access token from GitLab after authentication.
     * @param {string} code Value from GitLab when user is authenticated.
     * @returns Token string.
     */
    async getAccessToken(code, clientId, clientSecret, redirectUri, baseURL) {
      const formData = new URLSearchParams()
      formData.append('client_id', clientId)
      formData.append('client_secret', clientSecret)
      formData.append('code', code)
      formData.append('grant_type', 'authorization_code')
      formData.append('redirect_uri', redirectUri)
  
      const response = await fetch(`${baseURL}/oauth/token`, {
        method: 'POST',
        body: formData,
      })
  
      const data = await response.json()
      return data.access_token
    }
  }