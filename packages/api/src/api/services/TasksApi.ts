/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTaskRequest } from '../models/CreateTaskRequest';
import type { TaskListResponse } from '../models/TaskListResponse';
import type { TaskResponse } from '../models/TaskResponse';
import type { UpdateTaskRequest } from '../models/UpdateTaskRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class TasksApi {

  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Create task endpoint
   * @param requestBody body
   * @returns TaskResponse Object with user data.
   * @throws ApiError
   */
  public postApiV1Tasks(
    requestBody?: CreateTaskRequest,
  ): CancelablePromise<TaskResponse> {
    return this.httpRequest.request({
      method: 'POST',
      url: 'api/v1/tasks',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Get tasks endpoint
   * @param limit
   * @param offset
   * @param direction
   * @param title
   * @param createdAt
   * @param done
   * @param priority
   * @returns TaskListResponse Object with user data.
   * @throws ApiError
   */
  public getApiV1Tasks(
    limit?: number,
    offset?: number,
    direction?: 'asc' | 'desc',
    title?: string,
    createdAt?: string,
    done?: boolean,
    priority?: 'High' | 'Medium' | 'Low',
  ): CancelablePromise<TaskListResponse> {
    return this.httpRequest.request({
      method: 'GET',
      url: 'api/v1/tasks',
      query: {
        'limit': limit,
        'offset': offset,
        'direction': direction,
        'title': title,
        'createdAt': createdAt,
        'done': done,
        'priority': priority,
      },
    });
  }

  /**
   * Update task endpoint
   * @param id
   * @param requestBody body
   * @returns TaskResponse Object with user data.
   * @throws ApiError
   */
  public patchApiV1Tasks(
    id: string,
    requestBody?: UpdateTaskRequest,
  ): CancelablePromise<TaskResponse> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: 'api/v1/tasks/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete task endpoint
   * @param id
   * @returns void
   * @throws ApiError
   */
  public deleteApiV1Tasks(
    id: string,
  ): CancelablePromise<void> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: 'api/v1/tasks/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Get task endpoint
   * @param id
   * @returns TaskResponse Object with user data.
   * @throws ApiError
   */
  public getApiV1Tasks1(
    id: string,
  ): CancelablePromise<TaskResponse> {
    return this.httpRequest.request({
      method: 'GET',
      url: 'api/v1/tasks/{id}',
      path: {
        'id': id,
      },
    });
  }

}
