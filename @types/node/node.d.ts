declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;

    ACCESS_TOKEN_SECRET?: string;
    REFRESH_TOKEN_SECRET?: string;

    MATHPID_API_KEY?: string;
    MATHPID_GAME_CODE?: string;
    MATHPID_GAME_VERSION?: string;
  }
}
