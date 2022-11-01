import axios from "axios";

const api = axios.create({
  baseURL: "https://prd-brs-relay-model.mathpid.com/",
  headers: {
    "x-api-key": process.env.MATHPID_API_KEY,
  },
  validateStatus: (status) => status < 500,
});

export type ProblemLevel = "A" | "B" | "C" | "D";

interface GetProblemQuery {
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

interface GetProblemResult {
  code: string;
  content: string;
  description: string;
  answer: string;
  wrongAnswer: string[];
}

export async function getProblem({
  deviceId,
  os,
  level,
}: GetProblemQuery): Promise<GetProblemResult> {
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

  return {
    code: data.qstCd,
    content: data.qstCn,
    description: data.textCn,
    answer: data.qstCransr,
    wrongAnswer: data.qstWransr?.split(","),
  };
}
