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
export namespace Swagger {
  export type ResourceResponse = {
    name: string;
    location: string;
    swaggerVersion: string;
  }[];
}
