import { HttpRequestService } from "../services/httpRequestService.js";
import 'dotenv/config'

/**
 * Controller for Gitlab activites.
 */
export class ActivityController {
  constructor(requestService = new HttpRequestService) {
    this.requestService = requestService
  }

  /**
   * Get GitLab users activites.
   * @param {object} req Express req object.
   * @param {object} res Express res object.
   * @returns Object containting data of activites.
   */
  async getActivities(req, res) {
    try {
      const userData = await this.requestService.makeRequest(`${process.env.BASE_URL}/api/v4/user`, req.session.token)
      const data = await this.requestService.makeRequest(`${process.env.BASE_URL}/api/v4/users/${encodeURIComponent(userData.id)}/events?per_page=101`, req.session.token)
      return data
    } catch (error) {
      res.render('errors/500')
    }
  }

  /**
   * Displays the activities in a view.
   * @param {object} req Express req object.
   * @param {object} res Express res object.
   */
  async displayActivites(req, res) {
    try {
      const data = await this.getActivities(req, res)
      res.render('activity', {activities : data})
    } catch (error) {
      res.render('errors/500')
    }
  }
}