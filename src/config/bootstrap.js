/**
 * Module for bootstrapping.
 */

import { IoCContainer } from '../util/IoCContainer.js'
import { HttpRequestService } from '../services/httpRequestService.js'
import { FetchDataGraphQlService } from '../services/fetchDataGraphQlService.js'
import { GetAvatar } from '../services/getAvatar.js'
import { GitLabOauthService } from '../services/gitlabOauthSerivce.js'
import { ActivityController } from '../controllers/activityController.js'
import { AuthenticationController } from '../controllers/authenticationController.js'
import { GroupController } from '../controllers/groupController.js'
import { ProfileGitLabController } from '../controllers/profileGitLabController.js'

const iocContainer = new IoCContainer()

iocContainer.register('HttpRequestService', HttpRequestService, {
  singleton : true
})

iocContainer.register('FetchDataGraphQlService', FetchDataGraphQlService, {
  singleton : true
})

iocContainer.register('GetAvatar', GetAvatar, {
  dependencies: [
    'HttpRequestService'
  ],
  singleton : true
})

iocContainer.register('GitLabOauthService', GitLabOauthService, {
  singleton : true
})

iocContainer.register('ActivityController', ActivityController, {
  dependencies: [
    'HttpRequestService'
  ],
  singleton: true
})

iocContainer.register('AuthenticationController', AuthenticationController, {
  dependencies: [
    'GitLabOathService'
  ],
  singleton: true
})

iocContainer.register('GroupController', GroupController, {
  dependencies: [
    'FetchDataGraphQlService',
    'GetAvatar'
  ],
  singleton: true
})

iocContainer.register('ProfileGitLabController', ProfileGitLabController, {
  dependencies: [
    'HttpRequestService',
  ],
  singleton: true
})

export const container = Object.freeze(iocContainer)
