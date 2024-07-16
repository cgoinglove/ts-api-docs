import { createFetcher } from './helper/create-fetcher';

type RepoDto = {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  owner: {
    login: string;
    id: number;
    [key: string]: any;
  };
  [key: string]: any;
};

type UserDto = {
  login: string;
  id: number;
  avatar_url: string;
  [key: string]: any;
};

type IssueDto = {
  id: number;
  title: string;
  body: string;
  state: string;
  [key: string]: any;
};

type GitHubApiSpec =
  | ApiEndpoint<'GET', '/repos/:owner/:repo', { repo: string }, RepoDto>
  | ApiEndpoint<'GET', '/users/:username', { username: string }, UserDto>
  | ApiEndpoint<'POST', '/repos/:owner/:repo/issues', { owner: string }, IssueDto[]>;

export const GitHubApi = createFetcher<GitHubApiSpec>('https://api.github.com');
