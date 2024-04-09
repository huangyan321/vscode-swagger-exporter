/** @format */

import { commands, window, workspace } from 'vscode'
import type { ExtensionContext } from 'vscode'
import { Config } from './config'
import { treeDataService } from './treeData/treeDataService'
import type { TreeNodeModel } from './model/TreeNodeModel'
import { CodeGenerator } from './CodeGenerator'

export function activate(context: ExtensionContext) {
  const workUri = workspace?.workspaceFolders?.[0]?.uri
  if (!workUri)
    return window.showErrorMessage('Please open it in your workspace.')

  const resource = Config.resource
  if (!resource)
    return window.showWarningMessage('No swagger-resources defined.')

  context.subscriptions.push(
    window.createTreeView('ApiExplorer', {
      treeDataProvider: treeDataService,
      showCollapseAll: true,
    }),
    commands.registerCommand('swagger-exporter.addFavorite', (node: TreeNodeModel) => {
      const template = ``
      const code = new CodeGenerator(node, template).codeGen()

      window.activeTextEditor?.edit((editBuilder) => {
        editBuilder.insert({
          line: 0,
          character: 0,
        }, code)
      })
    }),
  )
}

export function deactivate(context: ExtensionContext) {
  context.subscriptions.forEach((element) => {
    element.dispose()
  })
}
