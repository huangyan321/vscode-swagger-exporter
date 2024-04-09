import Mustache from 'mustache'
import type { Swagger } from './swagger'

export class CodeGenerator {
  template: string
  constructor(
    public readonly path: string,
    public readonly swagger: Swagger,
  ) {
    this.swagger = swagger
    this.path = path
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

  public codeGen() {
    const code = Mustache.render(this.template, this.swagger.getSchemaByPath(this.path))
    return code
  }
}
