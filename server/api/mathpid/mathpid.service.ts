import axios from "axios";
import { MathpidProblem } from "./mathpid.model";

const api = axios.create({
  baseURL: "https://prd-brs-relay-model.mathpid.com/",
  headers: {
    "x-api-key": process.env.MATHPID_API_KEY,
  },
  validateStatus: (status) => status < 500,
});

interface GetMathpidProblemQuery {
  os: string;
  deviceId: string;
  /**
   * A: 덧셈
   * B: 뺄셈
   * C: 곱셈
   * D: 분수
   */
  level?: string;
}

export async function getMathpidProblem({
  deviceId,
  os,
  level,
}: GetMathpidProblemQuery): Promise<MathpidProblem> {
  const response = await api.post("/api/v1/contest/diagnosis/setting", {
    mbrId: "aaaaaaaaaaaaaaaaaaaa",
    deviceNm: deviceId,
    osScnCd: os,
    bgnLvl: level,
    langCd: "KO",
    timeZone: 9,
    gameCd: process.env.MATHPID_GAME_CODE,
    gameVer: process.env.MATHPID_GAME_VERSION,
  });

  const { data } = response.data;

  const choices = [data.qstCransr, ...data.qstWransr?.split(",")];
  choices.sort(() => Math.random() - 0.5);

  const correctChoiceId = choices.findIndex(
    (value) => value === data.qstCransr
  );

  return {
    code: data.qstCd,
    content: data.qstCn,
    description: data.textCn,
    choices: choices,
    correctChoiceId: correctChoiceId,
  };
}
