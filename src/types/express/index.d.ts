export {};

declare module "express-serve-static-core" {
  interface Request {
    context?: {
      accountId: number;
      userId: number;
    };
  }
}
