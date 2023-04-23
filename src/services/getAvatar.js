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
  async getAvatar (avatarLink) {
    if (avatarLink.includes('gravatar.com/avatar')) {
      return avatarLink
    } else {
      const newLink = `${process.env.BASE_URL}${avatarLink}`
      return newLink
    }
  }
}