// swagger  存储一组接口
import type { Definitions, SwaggerApiGroupResponse } from './fetch'

export class Swagger {
  swagger: SwaggerApiGroupResponse
  groups: any
  paths: any
  constructor(swagger: SwaggerApiGroupResponse) {
    this.swagger = swagger
    this.groups = this.genGroups()
    this.paths = this.genPaths()
  }

  /**
   * swagger返回的实体类集合
   */
  private get definitions(): Definitions {
    return this.swagger.definitions
  }

  /**
   * 接口详情
   */
  private interface(path: string, method: string) {
    return this.swagger.paths?.[path]?.[method]
  }

  private genGroups() {
    return Object.entries(this.swagger!.paths).reduce((acc, [path, value]) => {
      let method: any
      for (const item of ['get', 'post', 'put', 'delete', 'patch', 'options', 'head', 'trace']) {
        if (value[item]) {
          method = item
          break
        }
      }
      if (!method)
        return acc
      const _value = value[method]
      const tag = _value.tags[0]
      if (!acc[tag])
        acc[tag] = []

      acc[tag].push({
        path,
        schema: {
          ..._value,
          method,
          path,
        },
      })
      return acc
    }, {} as any)
  }

  private genPaths() {
    return Object.entries(this.swagger!.paths).reduce((acc, [path, value]) => {
      let method: any
      for (const item of ['get', 'post', 'put', 'delete', 'patch', 'options', 'head', 'trace']) {
        if (value[item]) {
          method = item
          break
        }
      }
      if (!method)
        return acc
      const _value = value[method]
      acc[path] = {
        ..._value,
        method,
        path,
      }
      return acc
    }, {} as any)
  }

  public getSchemaByPath(path: string) {
    const rawSchema = this.paths[path]

    const title = rawSchema.description
    const tags = rawSchema.tags
    const summary = rawSchema.summary
    const method = rawSchema.method
    const description = rawSchema.description
    const parameters = rawSchema.parameters ?? []
    const name = rawSchema.operationId
    const headerParameters = parameters.filter((e: any) => e.in === 'header')
    const queryParameters = parameters.filter((e: any) => e.in === 'query')
    const pathParameters = parameters.filter((e: any) => e.in === 'path')
    const bodyParameters = parameters.filter((e: any) => e.in === 'body')

    return {
      title,
      name,
      path,
      tags,
      summary,
      method,
      description,
      headerParameters,
      queryParameters,
      pathParameters,
      bodyParameters,
    }
  }
}
