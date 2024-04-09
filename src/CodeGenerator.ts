import Mustache from 'mustache'
import type { Swagger } from './swagger'
import type { TreeNodeModel } from './model/TreeNodeModel'

export class CodeGenerator {
  path: string
  swagger: Swagger
  constructor(
    private readonly node: TreeNodeModel,
    private readonly template: string,
  ) {
    const nodeData = node.get_data()
    this.swagger = nodeData.swaggerInstance as Swagger
    this.path = nodeData.children.path
    this.template = `
    /**
     * @title    {{title}}
     * @tags     {{tags}}
     * @summary  {{summary}}
     * @desc     {{description}}
     */
    export function {{name}}({{params}}) {
      return request({
           url: '{{&path}}',
           method: '{{method}}',{{#params}}
            {{params}}{{/params}}
          });
    }`
  }

  private combine() {
    const views = this.swagger.getSchemaByPath(this.path)
    return Mustache.render(this.template, views)
  }

  public codeGen() {
    return this.combine()
  }
}
