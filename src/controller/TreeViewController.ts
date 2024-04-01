/** @format */

import { getSwaggerResource, getApiDocs } from '../fetch';
import { workspace, window, TreeItemCollapsibleState } from 'vscode';
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
          collapsibleState: TreeItemCollapsibleState.Collapsed,
        },
        TreeNodeType.TreeDataNormal
      );
    });
    return baseNode;
  }
  async getTagNodes(location: string) {
    const cookie = Config.cookie;
    const resource = Config.resource;
    try {
      const res = await getApiDocs(
        'http://192.168.96.104:9700/swp/' + location,
        cookie
      );
      const tags = res!.tags;

      const paths = Object.entries(res!.paths).reduce((acc, [path, value]) => {
        // 假设只有post方法
        const _value = value.post;
        if (!_value) return acc;
        const tag = _value.tags[0];
        if (!acc[tag]) {
          acc[tag] = [];
        }
        acc[tag].push({
          path: path,
          ...value,
        });
        return acc;
      }, {} as any);

      const baseNode: TreeNodeModel[] = Object.entries(paths).map(
        ([name, value]) => {
          return new TreeNodeModel(
            {
              id: name,
              name: name,
              rootNodeSortId: 2,
              location: location,
              children: value as any,
              collapsibleState: TreeItemCollapsibleState.Collapsed,
            },
            TreeNodeType.TreeDataLeaf1
          );
        }
      );
      return baseNode;
    } catch (err) {
      console.log(err);
    }
  }
}
export const treeViewController = new TreeViewController();
