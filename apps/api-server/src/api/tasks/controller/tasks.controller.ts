import { NextFunction, Request, Response, Router } from "express";

import taskService from "../services/tasks.service";
import { asyncHandler } from "../../../lib/handlers/async-handler/async.handler";
import {
  CreateTaskRequest,
  createTaskRequestRequestSchema,
} from "../dto/request/create-task/create-task.request";
import { TaskListResponse } from "../dto/response/task-list/task-list.response";
import {
  GetTaskListQueryRequest,
  getTaskListQueryRequestSchema,
} from "../dto/request/get-task-list/get-task-list.request";
import { TaskResponse } from "../dto/response/task/task.response";
import {
  UpdateTaskRequest,
  updateTaskRequestRequestSchema,
} from "../dto/request/update-task/update-task.request";
import {
  IdPathRequest,
  idPathRequestSchema,
} from "../../../lib/dto/request/id-path.request";

const router = Router({ mergeParams: true });

router.post(
  "/tasks",
  asyncHandler(
    async (
      req: Request<{}, void, CreateTaskRequest, {}>,
      res: Response,
      _: NextFunction,
    ) => {
      const createTaskResult = await taskService.createTask(req.body);

      if (createTaskResult.isFailure()) {
        throw createTaskResult.error;
      }

      res.status(201).send(createTaskResult.value);
    },
    { body: createTaskRequestRequestSchema },
  ),
);

router.get(
  "/tasks",
  asyncHandler(
    async (
      req: Request<{}, TaskListResponse, {}, GetTaskListQueryRequest>,
      res: Response,
      _: NextFunction,
    ) => {
      const getTasksResult = await taskService.getTasks(req.query);

      if (getTasksResult.isFailure()) {
        throw getTasksResult.error;
      }

      res.status(200).send(getTasksResult.value);
    },
    { query: getTaskListQueryRequestSchema },
  ),
);

router.patch(
  "/tasks/:id",
  asyncHandler(
    async (
      req: Request<IdPathRequest, TaskResponse, UpdateTaskRequest, {}>,
      res: Response,
      _: NextFunction,
    ) => {
      const patchTaskResult = await taskService.updateTask(
        req.params.id,
        req.body,
      );

      if (patchTaskResult.isFailure()) {
        throw patchTaskResult.error;
      }

      res.status(200).send(patchTaskResult.value);
    },
    { params: idPathRequestSchema, body: updateTaskRequestRequestSchema },
  ),
);

router.delete(
  "/tasks/:id",
  asyncHandler(
    async (
      req: Request<IdPathRequest, {}, {}, {}>,
      res: Response,
      _: NextFunction,
    ) => {
      const deleteTaskResult = await taskService.deleteTask(req.params.id);

      if (deleteTaskResult.isFailure()) {
        throw deleteTaskResult.error;
      }

      res.status(204).send(deleteTaskResult.value);
    },
    { params: idPathRequestSchema },
  ),
);

router.get(
  "/tasks/:id",
  asyncHandler(
    async (
      req: Request<IdPathRequest, {}, {}, {}>,
      res: Response,
      _: NextFunction,
    ) => {
      const getTaskResult = await taskService.getTask(req.params.id);

      if (getTaskResult.isFailure()) {
        throw getTaskResult.error;
      }

      res.status(204).send(getTaskResult.value);
    },
    { params: idPathRequestSchema },
  ),
);

export default router;
