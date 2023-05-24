import { HttpRequestService } from "../services/httpRequestService.js"
import 'dotenv/config'

/**
 * Displays a users profile
 */
export class ProfileGitLabController {
  constructor(request = new HttpRequestService) {
    this.requestService = request
  }

  /**
   * Gets data about user.
   * @param {object} req Express req object.
   * @param {object} res Express res object.
   * @returns Object with data.
   */
  async getProfile(req, res) {
    try {
      const data = await this.requestService.makeRequest(`${process.env.BASE_URL}/api/v4/user`, req.session.token)
      return data
    } catch (error) {
      res.render('errors/500')
    } 
  }

  /**
   * Displays the profile for view.
   * @param {object} req Express req object.
   * @param {object} res Express res object.
   */
  async displayProfile(req, res) {
    try {
      const profile = await this.getProfile(req, res)
      console.log(profile)
      res.render('profile', {user : profile})
    } catch (error) {
      res.render('errors/500')
    }
  }
}