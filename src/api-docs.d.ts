type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

type ApiEndpoint<M extends HttpMethod = any, Url extends string = string, Request = any, Response = any> = {
  method: M;
  url: Url;
  requestPayload: Request;
  responseData: Response;
};

type InferUrl<Spec extends ApiEndpoint, M extends HttpMethod> = Extract<Spec, { method: M }>['url'];

type InferRequestPayload<Spec extends ApiEndpoint, M extends HttpMethod, Url extends InferUrl<Spec, M>> = Extract<
  Spec,
  { method: M; url: Url }
>['requestPayload'];

type InferResponseData<Spec extends ApiEndpoint, M extends HttpMethod, Url extends InferUrl<Spec, M>> = Extract<
  Spec,
  { method: M; url: Url }
>['responseData'];

type Config<Spec extends ApiEndpoint, M extends HttpMethod, Url extends string> = {
  payload?: InferRequestPayload<Spec, M, Url>;
  pathvariable?: Record<string, string>;
  init?: Omit<RequestInit, 'body' | 'method'>;
};

type ApiClient<Spec extends ApiEndpoint> = {
  GET: <Url extends InferUrl<Spec, 'GET'>>(
    url: Url,
    config?: Config<Spec, 'GET', Url>,
  ) => Promise<InferResponseData<Spec, 'GET', Url>>;
  POST: <Url extends InferUrl<Spec, 'POST'>>(
    url: Url,
    config?: Config<Spec, 'POST', Url>,
  ) => Promise<InferResponseData<Spec, 'POST', Url>>;
};
