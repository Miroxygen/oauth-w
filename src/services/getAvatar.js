import { HttpRequestService } from "./httpRequestService.js";
import fetch from "node-fetch";
import 'dotenv/config'


export class GetAvatar {
  constructor(request = new HttpRequestService()) {
    this.request = request
  }

  /**
   * Retrieves a users avatar.
   */
  async getAvatar(avatarLink, token) {
    if(avatarLink.includes('gravatar.com/avatar')) {
      return avatarLink
    } else {
      const response = await this.request.makeRequest(`https://gitlab.lnu.se/api/v4/avatar?email=mh225wi@student.lnu.se&size=32`, token)
      return response.avatar_url
    }
  }
}