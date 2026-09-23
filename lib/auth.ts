import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

const secret = process.env.BETTER_AUTH_SECRET;
if (!secret) {
  throw new Error(
    "[StaticGK] BETTER_AUTH_SECRET is not set. Add it to your environment " +
      "variables (generate with: npx @better-auth/cli secret) and redeploy."
  );
}

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!googleClientId || !googleClientSecret) {
  console.warn(
    "[StaticGK] GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET not set — Google sign-in will fail until configured."
  );
}

// Self-hosted Better Auth: Google-only sign-in, Postgres via Prisma
// on Neon. Session cookies are first-party under our own origin.
export const auth = betterAuth({
  secret,
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  socialProviders: {
    ...(googleClientId && googleClientSecret
      ? { google: { clientId: googleClientId, clientSecret: googleClientSecret } }
      : {}),
  },
});
