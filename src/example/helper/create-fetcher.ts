const queryStringParser = (params?: Record<string, any>) =>
  params ? `?${new URLSearchParams(params).toString()}` : '';

const pathvariableParser = (url: string, variable?: Record<string, any>) =>
  variable
    ? Object.entries(variable).reduce((prev, [key, value]) => prev.replace(new RegExp(`:${key}`, 'g'), value), url)
    : url;

export const createFetcher = <Spec extends ApiEndpoint>(baseUrl = ''): ApiClient<Spec> => {
  return {
    GET(url, config = {}) {
      const { init, pathvariable, payload } = config;
      return fetch(baseUrl + pathvariableParser(url, pathvariable) + queryStringParser(payload), {
        ...init,
        method: 'GET',
      }).then((response) => {
        return response.json();
      });
    },
    POST(url, config = {}) {
      const { init, pathvariable, payload } = config;
      return fetch(baseUrl + pathvariableParser(url, pathvariable), {
        ...init,
        body: JSON.stringify(payload),
        method: 'POST',
      }).then((response) => {
        return response.json();
      });
    },
  };
};
