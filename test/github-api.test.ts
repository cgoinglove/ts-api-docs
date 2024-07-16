import { describe, it, expect } from 'vitest';
import { GitHubApi } from '../src/example/github-example.api';

describe('GitHubApi', () => {
  it('should fetch repository information with GET request', async () => {
    const data = await GitHubApi.GET('/repos/:owner/:repo', {
      pathvariable: { owner: 'facebook', repo: 'react' },
    });

    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('name', 'react');
    expect(data).toHaveProperty('full_name', 'facebook/react');
  });

  it('should fetch user information with GET request', async () => {
    const data = await GitHubApi.GET('/users/:username', {
      pathvariable: { username: 'octocat' },
    });

    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('login', 'octocat');
  });
});
