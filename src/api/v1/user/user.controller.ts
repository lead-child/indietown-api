import { Request, Response } from "express";
import { ApiDataResponse } from "@src/common/response";
import {
  UserEquipmentDetail,
  UserInventoryItem,
  UserWithEquipmentId,
} from "./user.model";
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

interface GetUserInventoryResponse {
  equipment: UserEquipmentDetail;
  inventoryItems: UserInventoryItem[];
}

export const getUserInventoryById = async (
  req: Request<any, any, any>,
  res: Response<ApiDataResponse<GetUserInventoryResponse>>
) => {
  const userId = req.context?.userId!!;

  const equipment = await UserService.getUserEquipment(userId);
  const inventoryItems = await UserService.getUserInventoryItems(userId);

  res.status(200).json({
    data: {
      equipment,
      inventoryItems,
    },
  });
};
