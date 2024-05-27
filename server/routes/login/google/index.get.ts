import { generateState, generateCodeVerifier } from "arctic";
import { google } from "../../../utils/auth";

export default defineEventHandler(async (event) => {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ["profile", "email"],
  });

  setCookie(event, "google_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });
  // store code verifier as cookie
  setCookie(event, "code_verifier", codeVerifier, {
    secure: process.env.NODE_ENV === "production",
    path: "/",
    httpOnly: true,
    maxAge: 60 * 10, // 10 min
  });
  return sendRedirect(event, url.toString());
});
