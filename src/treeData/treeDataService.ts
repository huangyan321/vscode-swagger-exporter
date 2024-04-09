/** @format */
import type { Event, TreeDataProvider, TreeItem } from 'vscode'
import { EventEmitter, TreeItemCollapsibleState } from 'vscode'

import { TreeNodeModel, TreeNodeType } from '../model/TreeNodeModel'
import { treeViewController } from '../controller/TreeViewController'

export class TreeDataService implements TreeDataProvider<TreeNodeModel> {
  private onDidChangeTreeDataEvent: EventEmitter<TreeNodeModel | undefined | null> = new EventEmitter<
  TreeNodeModel | undefined | null
>()

  // tslint:disable-next-line:member-ordering
  public readonly onDidChangeTreeData: Event<any> = this.onDidChangeTreeDataEvent.event

  public initialize(): void {
  }

  public fire() {
    this.onDidChangeTreeDataEvent.fire(null)
  }

  public getTreeItem(
    element: TreeNodeModel,
  ): TreeItem | Thenable<TreeItem> {
    if (element.id === 'notSignIn') {
      return {
        label: element.get_data().name,
        collapsibleState: TreeItemCollapsibleState.None, // 没有子节点
      }
    }
    let contextValue: string
    if (element.nodeType === TreeNodeType.Resource)
      contextValue = 'ApiResource'
    else if (element.nodeType === TreeNodeType.Group)
      contextValue = 'ApiGroup'
    else
      contextValue = 'ApiItem'

    return {
      label: element.name,
      collapsibleState: element.collapsibleState,
      contextValue,
    }
  }

  public async getChildren(
    element?: TreeNodeModel | undefined,
  ): Promise<TreeNodeModel[] | null | undefined> {
    if (!element) {
      const res = await treeViewController.getResourceNodes()
      return res
    }
    if (element.nodeType === TreeNodeType.Resource) {
      const res = await treeViewController.getGroupNodes(
        element.get_data().location,
      )
      return res
    }
    if (element.nodeType === TreeNodeType.Group) {
      const data = element.get_data()
      const res = data.children?.map((item: any) => {
        return new TreeNodeModel(
          {
            id: item.schema?.description ?? 'unknown',
            name: item.schema?.description ?? 'unknown',
            rootNodeSortId: 2,
            collapsibleState: TreeItemCollapsibleState.None,
            location: '',
            children: item,
            swaggerInstance: data.swaggerInstance,
          },
          TreeNodeType.Api,
        )
      })
      return res
    }
    return Promise.resolve([])
  }
}
export const treeDataService: TreeDataService = new TreeDataService()
