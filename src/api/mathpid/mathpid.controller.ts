import axios from "axios";
import { Request, Response } from "express";
import { BadRequestException } from "../../common/exception";
import { ApiDataResponse } from "../../common/response";
import { MathpidProblem } from "./mathpid.model";
import * as MathpidService from "./mathpid.service";

interface GetMathpidProblemRequest {}
interface GetMathpidProblemResponse {
  problem: MathpidProblem;
}

export async function getMathpidProblem(
  req: Request<{}, {}, GetMathpidProblemRequest>,
  res: Response<ApiDataResponse<GetMathpidProblemResponse>>
) {
  const level = (req.query?.level as string | undefined)?.toUpperCase();
  if (level !== undefined && !["A", "B", "C", "D"].includes(level)) {
    throw new BadRequestException(
      "mathpid.invalid_level",
      "난이도을 다시 설정해주세요.",
      "Level은 A, B, C, D 중 하나여야합니다."
    );
  }

  const problem = await MathpidService.getMathpidProblem({
    os: "server",
    deviceId: "no_device",
    level: level,
  });

  res.status(200).json({
    data: {
      problem,
    },
  });
}
