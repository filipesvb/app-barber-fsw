import { createAuthClient } from "better-auth/react";
import { getAuthUrl } from "./get-auth-url";

export const authClient = createAuthClient({
  baseURL: getAuthUrl(),
});
