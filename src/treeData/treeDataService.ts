/** @format */
import * as vscode from 'vscode';
import type { TreeNodeModel } from '../model/TreeNodeModel';
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
  public getTreeItem(element: TreeNodeModel): vscode.TreeItem {}
  public getChildren(
    element?: TreeNodeModel | undefined
  ): Promise<TreeNodeModel[] | null | undefined> {
    if (!element) {
      const res = treeViewController.getRootNodes();
      console.log('🚀 ~ TreeDataService ~ res:', res)
      return res;
    }
    return Promise.resolve([]);
  }
}
export const treeDataService: TreeDataService = new TreeDataService();
