import { TaskManagementApi, OpenAPIConfig } from "@task-management/api";

import { environmentVariables } from "../env/environmentVariables";

import { getAccessToken } from "./tokenHelper";

const ACCESS_TOKEN_URL_BLOCKLIST = ["login", "registration"];
const NO_TOKEN = "";

function urlInBlocklist(url: string) {
  return ACCESS_TOKEN_URL_BLOCKLIST.some((blocklistUrlSegment) =>
    url.includes(blocklistUrlSegment),
  );
}

const config: Partial<OpenAPIConfig> = {
  BASE: environmentVariables.baseApiUrl,
  VERSION: "3",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  TOKEN: async (options) =>
    urlInBlocklist(options.url) ? NO_TOKEN : getAccessToken() ?? NO_TOKEN,
};

export const api = new TaskManagementApi(config);
