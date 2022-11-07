import { Request, Response } from "express";
import { ApiDataResponse } from "../../common/response";
import prisma from "../../prisma";

interface GetUserByIdResponse {}

export async function getUserById(
  req: Request<any, {}, {}>,
  res: Response<ApiDataResponse<any>>
) {
  const user = await prisma.user.findFirst({
    where: {
      id: {
        equals: Number.parseInt(req.params?.id),
      },
    },
    select: {
      id: true,
      name: true,
      level: true,
      headId: true,
      hairId: true,
      equipment: {
        select: {
          headItem: { select: { headId: true, headAccId: true } },
          torsoItem: {
            select: {
              chestId: true,
              spineId: true,
              spine2Id: true,
              armsId: true,
            },
          },
          legsItem: { select: { legsId: true } },
          leftWeaponItem: { select: { leftWeaponId: true } },
          rightWeaponItem: { select: { rightWeaponId: true } },
          leftShieldItem: { select: { leftShieldId: true } },
        },
      },
    },
  });

  res.status(200).json({
    data: user,
  });
}
