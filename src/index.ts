/** @format */

import { window, commands, workspace } from 'vscode';
import type { ExtensionContext } from 'vscode';
import { Config } from './config';
import { getSwaggerResource } from './fetch';
import { treeDataService } from './treeData/treeDataService';
export function activate(context: ExtensionContext) {
  console.log(
    'Congratulations, your extension "swagger-exporter" is now active!'
  );
  const workUri = workspace?.workspaceFolders?.[0]?.uri;
  if (!workUri) {
    return window.showErrorMessage('Please open it in your workspace.');
  }
  const resource = Config.resource;
  if (!resource) {
    return window.showWarningMessage('No swagger-resources defined.');
  }
  context.subscriptions.push(
    window.createTreeView('ApiExplorer', {
      treeDataProvider: treeDataService,
      showCollapseAll: true,
    })
  );
}

export function deactivate(context: ExtensionContext) {
  console.log(
    'Congratulations, your extension "swagger-exporter" is now deactive!'
  );
  context.subscriptions.forEach((element) => {
    element.dispose();
  });
}
