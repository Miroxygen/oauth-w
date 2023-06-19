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
      const activitiesFirstPage = await this.requestService.makeRequest(`${process.env.BASE_URL}/api/v4/users/${encodeURIComponent(userData.id)}/events?per_page=100`, req.session.token)
      let activities = activitiesFirstPage
      if(Object.keys(activitiesFirstPage).length === 100) {
        const activitiesSecondPage = await this.requestService.makeRequest(`${process.env.BASE_URL}/api/v4/users/${encodeURIComponent(userData.id)}/events?per_page=1&page=2`, req.session.token)
        activities = activities.concat(activitiesSecondPage)
      }
      return activities
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