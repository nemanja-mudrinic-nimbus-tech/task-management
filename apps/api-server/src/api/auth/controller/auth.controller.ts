import { NextFunction, Request, Response, Router } from "express";

import authService from "../services/auth.service";
import { asyncHandler } from "../../../lib/handlers/async-handler/async.handler";
import { RegistrationRequest } from "../dto/request/registration/registration.request";
import { LoginResponse } from "../dto/response/login/login.response";
import { LoginRequest } from "../dto/request/login/login.request";

const router = Router({ mergeParams: true });

router.post(
  "/auth/registration",
  asyncHandler(
    async (
      req: Request<{}, void, RegistrationRequest, {}>,
      res: Response,
      _: NextFunction,
    ) => {
      const signUpResult = await authService.signUp(req.body);

      // TODO: Make a function to avoid this block in each route
      if (signUpResult.isFailure()) {
        throw signUpResult.error;
      }

      res.status(201);
    },
  ),
);

router.post(
  "/auth/login",
  asyncHandler(
    async (
      req: Request<{}, LoginResponse, LoginRequest, {}>,
      res: Response,
      next: NextFunction,
    ) => {
      const signInResult = await authService.signIn(req.body);

      if (signInResult.isFailure()) {
        throw signInResult.error;
      }

      res.status(200).send(signInResult.value);
    },
  ),
);

export default router;
