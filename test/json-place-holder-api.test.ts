import { describe, it, expect } from 'vitest';
import { JsonPlaceHolderApi } from '../src/example/json-placeholder-example.api';

describe('JSONPlaceholderApi', () => {
  it('should fetch todos with GET request', async () => {
    const data = await JsonPlaceHolderApi.GET('/todos');

    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
    expect(data[0]).toHaveProperty('id');
    expect(data[0]).toHaveProperty('title');
    expect(data[0]).toHaveProperty('completed');
    expect(data[0]).toHaveProperty('userId');
  });

  it('should fetch a single todo with GET request', async () => {
    const todoId = 1;
    const data = await JsonPlaceHolderApi.GET('/todos/:id', {
      pathvariable: { id: String(todoId) },
    });

    expect(data).toHaveProperty('id', todoId);
    expect(data).toHaveProperty('title');
    expect(data).toHaveProperty('completed');
    expect(data).toHaveProperty('userId');
  });

  it('should create a new todo with POST request', async () => {
    const newTodo = {
      title: 'foo',
      userId: 1,
      completed: false,
    };

    const data = await JsonPlaceHolderApi.POST('/todos', {
      payload: newTodo,
      init: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    });

    expect(data).toHaveProperty('id');
    expect(data.title).toBe(newTodo.title);
    expect(data.userId).toBe(newTodo.userId);
    expect(data.completed).toBe(newTodo.completed);
  });

  it('should fetch comments with GET request', async () => {
    const data = await JsonPlaceHolderApi.GET('/comments');

    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
    expect(data[0]).toHaveProperty('id');
    expect(data[0]).toHaveProperty('name');
    expect(data[0]).toHaveProperty('email');
    expect(data[0]).toHaveProperty('body');
    expect(data[0]).toHaveProperty('postId');
  });

  it('should fetch a single comment with GET request', async () => {
    const commentId = 1;
    const data = await JsonPlaceHolderApi.GET('/comments/:id', {
      pathvariable: { id: String(commentId) },
    });

    expect(data).toHaveProperty('id', commentId);
    expect(data).toHaveProperty('name');
    expect(data).toHaveProperty('email');
    expect(data).toHaveProperty('body');
    expect(data).toHaveProperty('postId');
  });

  it('should create a new comment with POST request', async () => {
    const newComment = {
      name: 'foo',
      email: 'foo@bar.com',
      body: 'This is a comment.',
      postId: 1,
    };

    const data = await JsonPlaceHolderApi.POST('/comments', {
      payload: newComment,
      init: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    });
    expect(data).toHaveProperty('id');
    expect(data.name).toBe(newComment.name);
    expect(data.email).toBe(newComment.email);
    expect(data.body).toBe(newComment.body);
    expect(data.postId).toBe(newComment.postId);
  });
});
