/** @format */

import axios from 'axios';

export async function getSwaggerResource(
  url: string,
  cookie: string
): Promise<Swagger.ResourceResponse | undefined> {
  try {
    axios.defaults.headers.common['Cookie'] = cookie;
    axios.defaults.headers.common['Authorization'] = 'Basic YWRtaW46ODAyMzE3';
    axios.defaults.timeout = 6000;
    const res = await axios.get<Swagger.ResourceResponse>(url);
    return res?.data;
  } catch (error) {
    console.log(error);

    return;
  }
}
export async function getApiDocs(
  url: string,
  cookie: string
): Promise<Swagger.ApiDocsResponse | undefined> {
  try {
    axios.defaults.headers.common['Cookie'] = cookie;
    axios.defaults.headers.common['Authorization'] = 'Basic YWRtaW46ODAyMzE3';
    axios.defaults.timeout = 6000;
    const res = await axios.get<Swagger.ApiDocsResponse>(url);
    return res?.data;
  } catch (error) {
    console.log(error);

    return;
  }
}
export namespace Swagger {
  export type ResourceResponse = {
    name: string;
    location: string;
    swaggerVersion: string;
  }[];
  export type ApiDocsResponse = {
    basePath: string;
    definitions: any;
    host: string;
    info: string;
    tags: { description: string; name: string; children?: any[] }[];
    paths: {
      [url: string]: {
        [method: string]: {
          tags: string[];
          summary: string;
          description: string;
          operationId: string;
          consumes: string[];
          produces: string[];
          parameters: [
            {
              name: string;
              in: string;
              description: string;
              required: boolean;
              type: string;
            }
          ];
          responses: {
            [key: string]: {
              description: string;
            };
          };
          'x-order': string;
        };
      };
    };
  };
}
