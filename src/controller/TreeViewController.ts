/** @format */

import { getSwaggerResource } from '../fetch';
import { workspace, window } from 'vscode';
import { Config } from '../config';
import { TreeNodeModel, TreeNodeType } from '../model/TreeNodeModel';
class TreeViewController {
  async getRootNodes() {
    const cookie = Config.cookie;
    const resource = Config.resource;
    const res = await getSwaggerResource(resource, cookie);
    const baseNode: TreeNodeModel[] = res!.map((item) => {
      return new TreeNodeModel(
        {
          id: item.name,
          name: item.name,
          rootNodeSortId: 1,
          location: item.location,
        },
        TreeNodeType.TreeDataNormal
      );
    });
    return baseNode;
  }
}
export const treeViewController = new TreeViewController();
