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
 * {{description}}
 **/
export function {{ name }}({{params}}) {
  return request({
    url: '{{{path}}}',
    method: '{{method}}',{{extend}}
  })
}`
  }

  public codeGen() {
    const schema = this.swagger.getSchemaByPath(this.path)

    const context = {
      name: schema.operationId,
      path: this.path,
      description: schema.description,
      method: schema.method,
    }
    const code = Mustache.render(this.template, context)
    return code
  }
}
