/** @format */

import { TreeItemCollapsibleState } from 'vscode'
import { getApiGroup, getSwaggerResource } from '../fetch'
import { Config } from '../config'
import { TreeNodeModel, TreeNodeType } from '../model/TreeNodeModel'
import { Swagger } from '../swagger'

class TreeViewController {
  async getResourceNodes() {
    const cookie = Config.cookie
    const resource = Config.resource
    const res = await getSwaggerResource(resource, cookie)
    const baseNode: TreeNodeModel[] = res!.map((item) => {
      return new TreeNodeModel(
        {
          id: item.name,
          name: item.name,
          rootNodeSortId: 1,
          location: item.location,
          collapsibleState: TreeItemCollapsibleState.Collapsed,
        },
        TreeNodeType.Resource,
      )
    })
    return baseNode
  }

  async getGroupNodes(location: string) {
    const cookie = Config.cookie
    try {
      const res = await getApiGroup(
        `http://192.168.96.104:9700/swp/${location}`,
        cookie,
      )
      const swagger = new Swagger(res!)

      const baseNode: TreeNodeModel[] = Object.entries(swagger.groups).map(
        ([name, children]) => {
          return new TreeNodeModel(
            {
              id: name,
              name,
              rootNodeSortId: 2,
              location,
              children,
              swaggerInstance: swagger,
              collapsibleState: TreeItemCollapsibleState.Collapsed,
            },
            TreeNodeType.Group,
          )
        },
      )
      return baseNode
    }
    catch (err) {
    }
  }
}
export const treeViewController = new TreeViewController()
