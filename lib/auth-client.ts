"use client";

import { createAuthClient } from "better-auth/react";

// Same-origin client: requests go to our /api/auth/* routes.
export const authClient = createAuthClient();

export const { useSession } = authClient;
