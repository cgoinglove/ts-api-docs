import { createFetcher } from './helper/create-fetcher';

type TodoDto = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type CommentDto = {
  id: number;
  name: string;
  email: string;
  body: string;
  postId: number;
};

type JSONPlaceholderApiSpec =
  | ApiEndpoint<'GET', '/todos', void, TodoDto[]>
  | ApiEndpoint<'GET', '/todos/:id', void, TodoDto>
  | ApiEndpoint<'POST', '/todos', { title: string; userId: number; completed: boolean }, TodoDto>
  | ApiEndpoint<'GET', '/comments', void, CommentDto[]>
  | ApiEndpoint<'GET', '/comments/:id', void, CommentDto>
  | ApiEndpoint<'POST', '/comments', { name: string; email: string; body: string; postId: number }, CommentDto>;

export const JsonPlaceHolderApi = createFetcher<JSONPlaceholderApiSpec>('https://jsonplaceholder.typicode.com');
