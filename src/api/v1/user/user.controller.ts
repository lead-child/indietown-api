import { Request, Response } from "express";
import { ApiDataResponse } from "@src/common/response";
import {
  UserEquipment,
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

export const getUser = async (
  req: Request,
  res: Response<ApiDataResponse<GetUserByIdResponse>>
) => {
  const userId = req.context?.userId!!;

  const user = await UserService.getUserWithEquipmentId(userId);

  res.status(200).json({
    data: {
      user,
    },
  });
};

interface GetUserInventoryResponse {
  equipment: UserEquipment;
  items: UserInventoryItem[];
}

export const getUserInventoryById = async (
  req: Request<any, any, any>,
  res: Response<ApiDataResponse<GetUserInventoryResponse>>
) => {
  const userId = req.context?.userId!!;

  const equipment = await UserService.getUserEquipment(userId);
  const items = await UserService.getUserInventoryItems(userId);

  res.status(200).json({
    data: {
      equipment,
      items,
    },
  });
};

export const addItem = async (
  req: Request<any, any, any>,
  res: Response<ApiDataResponse<{}>>
) => {
  const userId = req.context?.userId!!;

  const itemId = Number.parseInt(req.body.itemId);
  const amount = Number.parseInt(req.body.amount);

  await UserService.addItem(userId, itemId, amount);

  res.status(200).json({
    data: {},
  });
};

export const equipItem = async (
  req: Request<{ id: string }, any, any>,
  res: Response<ApiDataResponse<any>>
) => {
  var userId = req.context?.userId!!;
  var itemId = parseInt(req.params.id);

  await UserService.equipItem(userId, itemId);

  res.status(200).json({ data: {} });
};

export const unequipItem = async (
  req: Request<{ id: string }, any, any>,
  res: Response<ApiDataResponse<any>>
) => {
  var userId = req.context?.userId!!;
  var itemId = parseInt(req.params.id);

  await UserService.unequipItem(userId, itemId);

  res.status(200).json({ data: {} });
};
