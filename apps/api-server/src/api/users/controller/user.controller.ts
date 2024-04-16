import { NextFunction, Request, Response, Router } from "express";

import { asyncHandler } from "../../../lib/handlers/async-handler/async.handler";
import UserService from "../services/user.service";
import UserMongoRepository from "../repository/user.mongo.repository";
import { PartialUserResponse } from "../dto/response/partial-user.response";
import { getTokenId } from "../../../lib/handlers/jwt/jwt.handler";

const router = Router({ mergeParams: true });

const userService = new UserService(UserMongoRepository);

router.get(
  "/me",
  asyncHandler(
    async (
      req: Request<{}, PartialUserResponse, void, {}>,
      res: Response,
      _: NextFunction,
    ) => {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1] 
      const id = getTokenId(token as string)
      const partialUserResult = await userService.getMe(id as string);

      if (partialUserResult.isFailure()) {
        throw partialUserResult.error;
      }

      res.status(200).send(partialUserResult.value);
    }
  ),
);

export default router;
