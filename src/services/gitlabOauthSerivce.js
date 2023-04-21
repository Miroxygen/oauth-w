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
    getAuthorizationUrl() {
      const url = `${this.baseURL}/oauth/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=code&scope=${encodeURIComponent(this.scope)}`;
      return url
    }
  
    /**
     * Requests an access token from GitLab after authentication.
     * @param {string} code Value from GitLab when user is authenticated.
     * @returns Token string.
     */
    async getAccessToken(code, clientId, clientSecret, redirectUri, baseURL) {
      const formData = new URLSearchParams()
      formData.append('client_id', this.clientId)
      formData.append('client_secret', this.clientSecret)
      formData.append('code', code)
      formData.append('grant_type', 'authorization_code')
      formData.append('redirect_uri', this.redirectUri)
  
      const response = await fetch(`${this.baseURL}/oauth/token`, {
        method: 'POST',
        body: formData,
      })
  
      const data = await response.json()
      return data.access_token
    }
  }