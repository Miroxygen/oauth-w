import { GitLabOauthService } from "../services/gitlabOauthSerivce.js";
import 'dotenv/config'


/**
 * Handles authentication.
 */
export class AuthenticationController {
  constructor(authService = new GitLabOauthService) {
    this.authService = authService
  }

  /**
   * Redirects to the Oauth Gitlab url.
   * @param {object} req Express req object.
   * @param {object} res Express res object.
   */
  authenticateTowardsGitLabWithOaut(req, res) {
    try {
      const authorizationUrl = this.authService.getAuthorizationUrl(process.env.BASE_URL, process.env.GITLAB_APP_ID, process.env.CALLBACK_URL)
      res.redirect(authorizationUrl)
    } catch (error) {
      res.render('errors/500')
    }
  }

  /**
   * Handles the callback from Oauth and redirects and sets accordingly.
   * @param {object} req Express req object.
   * @param {object} res Express res object.
   * @param {object} next Express next object.
   */
  async handleCallBack(req, res, next) {
    try {
      const code = req.query.code
      const accessToken = await this.authService.getAccessToken(code, process.env.GITLAB_APP_ID, process.env.GITLAB_SECRET, process.env.CALLBACK_URL, process.env.BASE_URL)
      req.session.token = accessToken
      req.session.loggedIn = true
      res.redirect('/auth-succesful')
    } catch (error) {
      if(error.message === "Invalid grant") {
        res.render('errors/invalid-grant')
      } else {
        res.render('errors/500')
      }
    }
  }
}