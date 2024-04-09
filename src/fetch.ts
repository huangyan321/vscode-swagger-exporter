/** @format */

import axios from 'axios'

export async function getSwaggerResource(
  url: string,
  cookie: string,
): Promise<ResourceResponse | undefined> {
  try {
    axios.defaults.headers.common.Cookie = cookie
    axios.defaults.headers.common.Authorization = 'Basic YWRtaW46ODAyMzE3'
    axios.defaults.timeout = 6000
    const res = await axios.get<ResourceResponse>(url)
    return res?.data
  }
  catch (error) {
  }
}
export async function getApiDocs(
  url: string,
  cookie: string,
): Promise<ApiDocsResponse | undefined> {
  try {
    axios.defaults.headers.common.Cookie = cookie
    axios.defaults.headers.common.Authorization = 'Basic YWRtaW46ODAyMzE3'
    axios.defaults.timeout = 6000
    const res = await axios.get<ApiDocsResponse>(url)
    return res?.data
  }
  catch (error) {
  }
}
export type ResourceResponse = {
  name: string
  location: string
  swaggerVersion: string
}[]
export interface ApiDocsResponse {
  basePath: string
  definitions: any
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
        parameters: [
          {
            name: string
            in: string
            description: string
            required: boolean
            type: string
          },
        ]
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
