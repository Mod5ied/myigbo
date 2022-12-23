import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { AccessTokens, RefTokens } from "../models/tokens.js";
import { UserModel } from "../models/entities.js";
config();

class AuthTokens {
  static async generateAccessTokens(user) {
    const { email, role, ...rest } = user;
    const aToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
    await Promise.all([
      AccessTokens.create({ email, role, accessToken: aToken }),
      AccessTokens.selfDestructToken(user.email),
    ]);
    return aToken;
  }
  static async generateRefreshTokens(user) {
    const { email, role, ...rest } = user;
    const rToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    await RefTokens.create({ email, role, refToken: rToken });
    return rToken;
  }
  static async signUserTokens(user) {
    try {
      const accessToken = await this.generateAccessTokens(user);
      const refreshToken = await this.generateRefreshTokens(user);
      return { accessToken, refreshToken };
    } catch (err) {
      return err;
    }
  }
  static async verifyTokens(tk) {
    const verifiedResult = jwt.verify(tk, process.env.ACCESS_TOKEN_SECRET);
    if (!verifiedResult || verifiedResult === null) return err;

    const token = await AccessTokens.find({ email: verifiedResult.email }).lean();
    if (token.length === 0 && verifiedResult) return false;

    return verifiedResult;
  }
  static async verifyUserSession(email) {
    const token = await AccessTokens.find({ email }).select(["email"]).lean();
    if (token.length == 0) return false;
    return true;
  }
}

export { AuthTokens };
