export type MathpidProblemLevel = "A" | "B" | "C" | "D";

export interface MathpidProblem {
  code: string;
  content: string;
  description: string;
  choices: string[];
  correctChoiceId: number;
}
