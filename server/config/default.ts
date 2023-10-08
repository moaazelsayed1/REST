import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 1337,
  origin: process.env.ORIGIN || "http://localhost:3000",
  dbUri: process.env.DB_URI || "mongodb://localhost:27017/rest-api-tutorial",
  logLevel: process.env.LOG_LEVEL || "info",
  saltWorkFactor: 10,
  /* accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY, */
  /* accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY, */
  privateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
  publicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
  refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY,
  refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleOauthRedirectUrl: process.env.GOOGLE_OAUTH_REDIRECT_URI,
};
