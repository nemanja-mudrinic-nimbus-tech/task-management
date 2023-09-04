/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TaskListResponse = {
  items: Array<{
    id: string;
    title: string;
    description: string;
    done: boolean;
    createdAt: string;
    updatedAt: string;
    priority: 'High' | 'Medium' | 'Low';
  }>;
  count: number;
};

