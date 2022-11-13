import { Request, Response } from "express";
import { UnauthroizeException } from "../../common/exception";
import { ApiDataResponse } from "../../common/response";
import { UserWithEquipmentId } from "./user.model";
import * as UserService from "./user.service";

interface CreateUserRequest {
  name: string;
  hairId: number;
  headId: number;
}
interface CreateUserResponse {}

export const createUser = async (
  req: Request<any, any, CreateUserRequest>,
  res: Response<ApiDataResponse<CreateUserResponse>>
) => {
  const { name, hairId, headId } = req.body;

  await UserService.createUser({
    accountId: req.context?.accountId!!,
    name,
    hairId,
    headId,
  });

  res.status(200).json({
    data: {},
  });
};

interface GetUserByIdResponse {
  user: UserWithEquipmentId;
}

export const getUserById = async (
  req: Request,
  res: Response<ApiDataResponse<GetUserByIdResponse>>
) => {
  const { id } = req.params;

  const user = await UserService.getUserWithEquipmentId(Number.parseInt(id));

  res.status(200).json({
    data: {
      user,
    },
  });
};
