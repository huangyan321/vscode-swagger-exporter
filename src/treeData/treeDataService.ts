/** @format */
import * as vscode from 'vscode';
import { TreeNodeModel, TreeNodeType } from '../model/TreeNodeModel';
import { treeViewController } from '../controller/TreeViewController';
export class TreeDataService implements vscode.TreeDataProvider<TreeNodeModel> {
  private context: vscode.ExtensionContext;
  private onDidChangeTreeDataEvent: vscode.EventEmitter<
    TreeNodeModel | undefined | null
  > = new vscode.EventEmitter<TreeNodeModel | undefined | null>();
  public readonly onDidChangeTreeData: vscode.Event<any> =
    this.onDidChangeTreeDataEvent.event;

  public initialize(context: vscode.ExtensionContext): void {
    console.log('initialize');

    this.context = context;
  }
  public fire() {
    this.onDidChangeTreeDataEvent.fire(null);
  }
  public getTreeItem(
    element: TreeNodeModel
  ): vscode.TreeItem | Thenable<vscode.TreeItem> {
    if (element.id === 'notSignIn') {
      return {
        label: element.get_data().name,
        collapsibleState: vscode.TreeItemCollapsibleState.None, // 没有子节点
      };
    }
    return {
      label: element.name,
      collapsibleState: element.collapsibleState,
    };
  }
  public async getChildren(
    element?: TreeNodeModel | undefined
  ): Promise<TreeNodeModel[] | null | undefined> {
    if (!element) {
      const res = await treeViewController.getRootNodes();
      return res;
    }
    if (element.nodeType === TreeNodeType.TreeDataNormal) {
      const res = await treeViewController.getTagNodes(
        element.get_data().location
      );
      return res;
    }
    if (element.nodeType === TreeNodeType.TreeDataLeaf1) {
      const res = element.get_data().children?.map((item: any) => {
        return new TreeNodeModel(
          {
            id: item.post?.description ?? 'unknow',
            name: item.post?.description ?? 'unknow',
            rootNodeSortId: 2,
            collapsibleState: vscode.TreeItemCollapsibleState.None,
            location: '',
          },
          TreeNodeType.TreeDataLeaf2
        );
      });
      return res;
    }
    return Promise.resolve([]);
  }
}
export const treeDataService: TreeDataService = new TreeDataService();
