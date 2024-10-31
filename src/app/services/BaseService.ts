// Record<string, unknown>
// { 'conten-type': ''

import { BASE_URL } from "../constants/urls";

interface HttpRequestService {
  url?: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers: Record<string, string>;
  body?: Record<string, unknown>;
  params?: Record<string, string>;
}

export class BaseService {
  async httpRequest({
    url = BASE_URL,
    method,
    headers,
    body = {},
    params,
  }: HttpRequestService) {
    //url string
    //options {method, headers, body}
    const options: RequestInit = {
      method,
    };
    if (method !== "GET") {
      options.body = JSON.stringify(body);
    }
    if (headers) {
      options.headers = headers;
    }
    if (params) {
      const _params = new URLSearchParams(params);
      url = url + "?" + _params;
    }
    try {
      const response = await fetch(url, options);
      // 200-299 succesful
      if (response.ok) {
        const data = await response.json();
        return data;
      }

      throw new Error("Response error: " + response.status);
    } catch (error) {
      console.log(error);
    }
  }

  get({ url, headers, params }: HttpRequestService) {
    return this.httpRequest({ url, method: "GET", headers, params });
  }
  post({ url, headers, body, params }: HttpRequestService) {
    return this.httpRequest({ url, method: "POST", headers, body, params });
  }

  put({ url, headers, body, params }: HttpRequestService) {
    return this.httpRequest({ url, method: "PUT", headers, body, params });
  }
  //TODO: add the rest of request methods
}
