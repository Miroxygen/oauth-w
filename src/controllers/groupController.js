import { FetchDataGraphQlService } from "../services/fetchDataGraphQlService.js";
import 'dotenv/config'
import { GetAvatar } from "../services/getAvatar.js";


/**
 * Controller for displaying correct group info from GitLab and user.
 */
export class GroupController {
  constructor(dataService = new FetchDataGraphQlService, avatarService = new GetAvatar) {
    this.dataService = dataService
    this.avatarService = avatarService
  }

  /**
   * Displays the requested data by the user.
   * @param {object} req Express req object.
   * @param {object} res Express res object.
   */
  async displayGroupData(req, res) {
    try {
      let sortedData = {sortedData : {}, noOfGroups : 0}
      const query = this.getQueryForGettingGroupData()
      const data = await this.dataService.fetchData(query, process.env.GRAPHQL_ADRESS, req.session.token)
      sortedData = this.sortDataAccordingToGroups(data)
      this.updateAvatarUrls(sortedData)
      res.render('groups', {group : sortedData.sortedData, groupNumber: sortedData.noOfGroups})
    } catch (error) {
      res.render('errors/500')
      console.log(error)
    }
  }

  /**
   * Constructs the query according to user parameters.
   * @returns Query string.
   */
  getQueryForGettingGroupData() {
    const query = `query {
      currentUser {
        groupCount
        groups(first : 5) {
          nodes {
            avatarUrl
            name
            fullPath
            webUrl
            projects(first : 3, includeSubgroups : true) {
              count
              nodes {
                name
                webUrl
                fullPath
                repository {
                  tree {
                    lastCommit {
                      author {
                        name
                        username
                        avatarUrl
                      }
                      authoredDate
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`
    return query
  }

  /**
   * Sorts the returned data in a nice object with names for the view.
   * @param {object} data Data about users groups.
   * @returns Sorted object with data.
   */
 sortDataAccordingToGroups(data) {
  const groups = data.currentUser.groups.nodes
  const groupCount = data.currentUser.groupCount
  const sortedData = []
  for (let i = 0; i < groups.length; i++) {
    const group = groups[i]
    const groupData = {
      avatarUrl: group.avatarUrl,
      name: group.name,
      fullPath: group.fullPath,
      webUrl: group.webUrl,
      projectCount : group.projects.count,
      projects: group.projects.nodes.map((project) => ({
        name: project.name,
        webUrl: project.webUrl,
        fullPath: project.fullPath,
        lastCommitAuthoredDate: project.repository.tree.lastCommit.authoredDate,
        lastCommitAuthorName: project.repository.tree.lastCommit.author.name,
        lastCommitAuthorUsername: project.repository.tree.lastCommit.author.username,
        lastCommitAuthorAvatar : project.repository.tree.lastCommit.author.avatarUrl
      }))
    }

    sortedData.push(groupData)
  }
  const groupData = {sortedData : sortedData, noOfGroups : groupCount}
  return groupData
 }

 /**
   * Updates avatarlinks so they are correct.
   * 
   * @param {Array} sortedData Data to update avatars on.
   */
 updateAvatarUrls(sortedData) {
  for (const data of sortedData.sortedData) {
    for (const project of data.projects) {
      const avatarUrl = this._avatarService.getAvatar(project.lastCommitAuthorAvatar)
      project.lastCommitAuthorAvatar = avatarUrl
    }
  }
}
}