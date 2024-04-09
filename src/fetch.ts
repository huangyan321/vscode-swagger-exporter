/** @format */

import axios from 'axios'

export async function getSwaggerResource(
  url: string,
  cookie: string,
): Promise<SwaggerResourceResponse | undefined> {
  try {
    axios.defaults.headers.common.Cookie = cookie
    axios.defaults.headers.common.Authorization = 'Basic YWRtaW46ODAyMzE3'
    axios.defaults.timeout = 6000
    const res = await axios.get<SwaggerResourceResponse>(url)
    return res?.data
  }
  catch (error) {
  }
}
export async function getApiGroup(
  url: string,
  cookie: string,
): Promise<SwaggerApiGroupResponse | undefined> {
  try {
    axios.defaults.headers.common.Cookie = cookie
    axios.defaults.headers.common.Authorization = 'Basic YWRtaW46ODAyMzE3'
    axios.defaults.timeout = 6000
    const res = await axios.get<SwaggerApiGroupResponse>(url)
    return res?.data
  }
  catch (error) {
  }
}
export type SwaggerResourceResponse = {
  name: string
  location: string
  swaggerVersion: string
}[]
export interface SwaggerApiGroupResponse {
  basePath: string
  definitions: Definitions
  host: string
  info: string
  tags: { description: string; name: string; children?: any[] }[]
  paths: {
    [url: string]: {
      [method: string]: {
        tags: string[]
        summary: string
        description: string
        operationId: string
        consumes: string[]
        produces: string[]
        parameters: SchemaNode[]
        responses: {
          [key: string]: {
            description: string
          }
        }
        'x-order': string
      }
    }
  }
}

export interface Definitions {
  [defineStr: string]: {
    type: string
    properties: {
      [key: string]: {
        type: string
        description: string
        format: string
        example: any
      }
    }
  }
}
export interface SchemaNode {
  name: string
  in: string
  description: string
  required: boolean
  type: string
}
