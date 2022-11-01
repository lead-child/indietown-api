import axios from "axios";
import { Request, Response } from "express";
import { BadRequestException } from "../../common/exception";
import { ApiDataResponse } from "../../common/response";
import { getProblem, ProblemLevel } from "./mathpid.service";

interface GetMathpidProblemRequest {}
interface GetMathpidProblemResponse {}

export async function getMathpidProblem(
  req: Request<{}, {}, GetMathpidProblemRequest>,
  res: Response<ApiDataResponse<GetMathpidProblemResponse>>
) {
  const level = (req.query?.level as string | undefined)?.toUpperCase();

  const data = await getProblem({
    os: "server",
    deviceId: "no_device",
    level: level,
  });

  res.status(200).json({
    data,
  });
}
